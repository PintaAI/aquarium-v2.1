"use client";

import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealCardProps {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}

interface TextRevealCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface TextRevealCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const TextRevealCard: React.FC<TextRevealCardProps> = ({
  text,
  revealText,
  children,
  className,
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const [cardDimensions, setCardDimensions] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (cardRef.current) {
        const { left, width } = cardRef.current.getBoundingClientRect();
        setCardDimensions({ left, width });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX } = event;
    const relativeX = clientX - cardDimensions.left;
    setWidthPercentage((relativeX / cardDimensions.width) * 100);
  }, [cardDimensions]);

  const handleTouchMove = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    const clientX = event.touches[0]!.clientX;
    const relativeX = clientX - cardDimensions.left;
    setWidthPercentage((relativeX / cardDimensions.width) * 100);
  }, [cardDimensions]);

  const rotateDeg = (widthPercentage - 50) * 0.1;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => {
        setIsMouseOver(false);
        setWidthPercentage(0);
      }}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsMouseOver(true)}
      onTouchEnd={() => {
        setIsMouseOver(false);
        setWidthPercentage(0);
      }}
      onTouchMove={handleTouchMove}
      className={cn(
        "bg-[#1d1c20] border border-white/[0.08] w-full max-w-[40rem] rounded-lg p-8 relative overflow-hidden",
        className
      )}
    >
      {children}

      <div className="h-40 relative flex items-center overflow-hidden">
        <motion.div
          className="absolute bg-[#1d1c20] z-20 w-full will-change-transform"
          animate={
            isMouseOver
              ? {
                  opacity: widthPercentage > 0 ? 1 : 0,
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
              : {
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
          }
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
        >
          <p className="text-base sm:text-[3rem] py-10 font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 drop-shadow-[4px_4px_15px_rgba(0,0,0,0.5)]">
            {revealText}
          </p>
        </motion.div>
        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="h-40 w-[8px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent absolute z-50 will-change-transform"
        />

        <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
          <p className="text-base sm:text-[3rem] py-10 font-bold bg-clip-text text-transparent bg-[#323238]">
            {text}
          </p>
          <MemoizedStars />
        </div>
      </div>
    </div>
  );
};

export const TextRevealCardTitle: React.FC<TextRevealCardTitleProps> = ({
  children,
  className,
}) => {
  return (
    <h2 className={cn("text-white text-lg mb-2", className)}>
      {children}
    </h2>
  );
};

export const TextRevealCardDescription: React.FC<TextRevealCardDescriptionProps> = ({
  children,
  className,
}) => {
  return (
    <p className={cn("text-[#a9a9a9] text-sm", className)}>{children}</p>
  );
};

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(80)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="inline-block absolute w-[2px] h-[2px] bg-white rounded-full z-[1]"
          style={{
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export const MemoizedStars = memo(Stars);
