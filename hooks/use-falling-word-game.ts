import { useState, useEffect, useCallback } from 'react';

interface Word {
  id: number;
  term: string;
  definition: string;
}

interface WordWithPosition extends Word {
  positionX: number;
  positionY: number;
  speed: number;
}

interface DictionaryResult {
  term: string;
  definition: string;
}

interface GameState {
  fallingWords: WordWithPosition[];
  userInput: string;
  timer: number;
  gameOver: boolean;
  score: number;
  gameStarted: boolean;
  customWords: Word[];
  isUsingCustomWords: boolean;
  dialogOpen: boolean;
  dictionarySearch: string;
  searchResults: DictionaryResult[];
  isSearching: boolean;
  gameAreaHeight: number;
}

const presetWordList: Word[] = [
  { id: 1, term: '안녕하세요', definition: 'hello' },
  { id: 2, term: '감사합니다', definition: 'terima kasih' },
  { id: 3, term: '사랑해요', definition: 'aku cinta kamu' },
  { id: 4, term: '미안해요', definition: 'maaf' },
  { id: 5, term: '잘자요', definition: 'selamat tidur' },
  { id: 6, term: '맛있어요', definition: 'enak' },
  { id: 7, term: '좋아요', definition: 'suka' },
  { id: 8, term: '화이팅', definition: 'semangat' },
  { id: 9, term: '괜찮아요', definition: 'tidak apa-apa' },
  { id: 10, term: '재미있어요', definition: 'menyenangkan' },
];

export function useFallingWordGame() {
  const [state, setState] = useState<GameState>({
    fallingWords: [],
    userInput: '',
    timer: 120,
    gameOver: false,
    score: 0,
    gameStarted: false,
    customWords: [],
    isUsingCustomWords: false,
    dialogOpen: false,
    dictionarySearch: '',
    searchResults: [],
    isSearching: false,
    gameAreaHeight: 0
  });

  const getWordList = () => state.isUsingCustomWords ? state.customWords : presetWordList;

  const setGameAreaHeight = (height: number) => {
    setState(prev => ({ ...prev, gameAreaHeight: height }));
  };

  const searchDictionary = async (query: string) => {
    if (!query.trim()) return;
    
    setState(prev => ({ ...prev, isSearching: true }));
    try {
      const response = await fetch(`/api/korean-dictionary?q=${encodeURIComponent(query)}`);
      const xmlText = await response.text();
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      
      const items = xmlDoc.getElementsByTagName('item');
      const results: DictionaryResult[] = [];
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const term = item.getElementsByTagName('word')[0]?.textContent || '';
        const definition = item.getElementsByTagName('trans_word')[0]?.textContent || '';
        
        if (term && definition) {
          results.push({ term, definition });
        }
      }
      
      setState(prev => ({ ...prev, searchResults: results }));
    } catch (error) {
      console.error('Error searching dictionary:', error);
    } finally {
      setState(prev => ({ ...prev, isSearching: false }));
    }
  };

  const startGame = () => {
    if (state.isUsingCustomWords && state.customWords.length === 0) return;
    
    setState(prev => ({
      ...prev,
      gameStarted: true,
      gameOver: false,
      score: 0,
      timer: 120,
      fallingWords: [],
      userInput: '',
      dialogOpen: false
    }));
  };

  const handleInputChange = (value: string) => {
    setState(prev => ({ ...prev, userInput: value }));

    const matchedWord = state.fallingWords.find(
      word => value.trim().toLowerCase() === word.definition.trim().toLowerCase()
    );

    if (matchedWord) {
      setState(prev => ({
        ...prev,
        score: prev.score + 1,
        fallingWords: prev.fallingWords.filter(w => w.id !== matchedWord.id),
        userInput: ''
      }));
    }
  };

  const addCustomWord = (term: string, definition: string) => {
    if (term.trim() && definition.trim()) {
      setState(prev => ({
        ...prev,
        customWords: [
          ...prev.customWords,
          {
            id: Date.now(),
            term: term.trim(),
            definition: definition.trim()
          }
        ]
      }));
    }
  };

  const addFromDictionary = (result: DictionaryResult) => {
    setState(prev => ({
      ...prev,
      customWords: [
        ...prev.customWords,
        {
          id: Date.now(),
          term: result.term,
          definition: result.definition
        }
      ]
    }));
  };

  const removeCustomWord = (id: number) => {
    setState(prev => ({
      ...prev,
      customWords: prev.customWords.filter(word => word.id !== id)
    }));
  };

  const setDialogOpen = (open: boolean) => {
    setState(prev => ({ ...prev, dialogOpen: open }));
  };

  const setDictionarySearch = (search: string) => {
    setState(prev => ({ ...prev, dictionarySearch: search }));
  };

  const setIsUsingCustomWords = (using: boolean) => {
    setState(prev => ({ ...prev, isUsingCustomWords: using }));
  };

  // Add new words every 3 seconds
  useEffect(() => {
    if (!state.gameStarted || state.gameOver) return;

    const wordList = getWordList();
    const addWordInterval = setInterval(() => {
      const unusedWords = wordList.filter(word => 
        !state.fallingWords.some(falling => falling.id === word.id)
      );
      
      if (unusedWords.length > 0 && state.fallingWords.length < 5) {
        const randomWord = unusedWords[Math.floor(Math.random() * unusedWords.length)];
        const positionX = Math.floor(Math.random() * (80 - 20 + 1) + 20);
        const speed = Math.random() * (1.5 - 0.5) + 0.5;
        
        const newWord = { 
          ...randomWord, 
          positionX, 
          positionY: 0, 
          speed 
        };

        setState(prev => ({
          ...prev,
          fallingWords: [...prev.fallingWords, newWord]
        }));
      }
    }, 3000);

    return () => clearInterval(addWordInterval);
  }, [state.gameStarted, state.gameOver]);

  // Move words down and check for ground collision
  useEffect(() => {
    if (!state.gameStarted || state.gameOver || !state.gameAreaHeight) return;

    const groundLevel = state.gameAreaHeight - 50; // 50px above bottom for the danger zone

    const moveWordsInterval = setInterval(() => {
      setState(prev => {
        const updatedWords = prev.fallingWords.map(word => ({
          ...word,
          positionY: word.positionY + word.speed
        }));

        // Check if any word has hit the ground line
        const hasWordHitGround = updatedWords.some(word => word.positionY >= groundLevel);

        if (hasWordHitGround) {
          return {
            ...prev,
            gameOver: true,
            gameStarted: false,
            fallingWords: []
          };
        }

        return {
          ...prev,
          fallingWords: updatedWords
        };
      });
    }, 50);

    return () => clearInterval(moveWordsInterval);
  }, [state.gameStarted, state.gameOver, state.gameAreaHeight]);

  // Game timer
  useEffect(() => {
    if (!state.gameStarted || state.gameOver) return;

    const countdown = setInterval(() => {
      setState(prev => {
        if (prev.timer <= 1) {
          return {
            ...prev,
            gameOver: true,
            gameStarted: false,
            timer: 0
          };
        }
        return {
          ...prev,
          timer: prev.timer - 1
        };
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [state.gameStarted, state.gameOver]);

  return {
    state,
    actions: {
      startGame,
      handleInputChange,
      addCustomWord,
      addFromDictionary,
      removeCustomWord,
      setDialogOpen,
      setDictionarySearch,
      setIsUsingCustomWords,
      searchDictionary,
      setGameAreaHeight
    }
  };
}
