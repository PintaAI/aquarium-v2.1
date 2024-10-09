import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Author {
  id: string;
  name: string | null;
  image: string | null;
}

interface ArticlePreviewProps {
  article: {
    id: number;
    title: string;
    description: string | null;
    jsonDescription: string;
    htmlDescription: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    author: Author;
  };
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  return (
    <Link href={`/articles/${article.id}`} passHref>
      <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={article.author?.image || undefined} alt={article.author?.name || 'Author'} />
              <AvatarFallback>{article.author?.name?.[0] || 'A'}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold line-clamp-2">{article.title}</CardTitle>
              <CardDescription className="text-sm">
                By {article.author?.name || 'Unknown'} • {new Date(article.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{article.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}