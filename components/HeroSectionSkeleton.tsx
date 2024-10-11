import React from 'react';
import { Skeleton } from "@/components/ui/skeleton"

const HeroSectionSkeleton = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <Skeleton className="w-[250px] h-[250px] rounded-full mx-auto" />
        </div>
        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-12 w-1/2 mx-auto mb-6" />
        <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-4" />
        <Skeleton className="h-6 w-full max-w-xl mx-auto mb-8" />
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-40" />
        </div>
      </div>
    </section>
  );
};

export default HeroSectionSkeleton;
