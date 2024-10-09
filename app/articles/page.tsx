import React from 'react';
import Link from 'next/link';
import { getArticles } from '@/app/actions/get-articles';
import { ArticlePreview } from '@/components/articles/article-preview';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { currentUser } from '@/lib/auth';

export const metadata = {
  title: 'Articles | Aquarium',
  description: 'Explore our collection of articles on aquarium care and maintenance.',
};

export default async function ArticlesPage() {
  const articles = await getArticles();
  const user = await currentUser();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Articles</h1>
        {user && (
          <Link href="/articles/create" passHref>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Article
            </Button>
          </Link>
        )}
      </div>
      
      {articles.length === 0 ? (
        <p className="text-center text-gray-500">No articles found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticlePreview key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}