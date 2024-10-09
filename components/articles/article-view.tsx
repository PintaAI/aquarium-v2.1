"use client";
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { deleteArticle } from '@/app/actions/article-actions';
import { useRouter } from 'next/navigation';

interface Author {
  id: string;
  name: string | null;
  image: string | null;
}

interface ArticleViewProps {
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
  currentUserId: string | null;
}

export function ArticleView({ article, currentUserId }: ArticleViewProps) {
  const router = useRouter();
  const isAuthor = currentUserId === article.authorId;

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteArticle(article.id);
        router.push('/articles');
      } catch (error) {
        console.error('Failed to delete article:', error);
        alert('Failed to delete article. Please try again.');
      }
    }
  };

  return (
    <Card className="w-full p-0 md:p-6"> {/* Added padding for spacing */}
      <CardHeader className="space-y-2 md:space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0"> {/* Flex column on small screens */}
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={article.author?.image || undefined} alt={article.author?.name || 'Author'} />
              <AvatarFallback>{article.author?.name?.[0] || 'A'}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl md:text-3xl font-bold">{article.title}</CardTitle> {/* Responsive font size */}
              <CardDescription>
                By {article.author?.name || 'Unknown'} • {new Date(article.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
          {isAuthor && (
            <div className="flex space-x-2">
              <Link href={`/articles/${article.id}/edit`} passHref>
                <Button variant="outline" className="text-sm md:text-base"> {/* Responsive button size */}
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </Link>
              <Button variant="destructive" onClick={handleDelete} className="text-sm md:text-base">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <Separator className="my-4" />
      <CardContent>
  <div
    className="prose max-w-none dark:prose-invert break-words text-sm md:text-base"
    dangerouslySetInnerHTML={{ __html: article.htmlDescription }}
  /> {/* Text size is smaller on mobile and normal on larger screens */}
</CardContent>

      <Separator className="my-4" />
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date(article.updatedAt).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
