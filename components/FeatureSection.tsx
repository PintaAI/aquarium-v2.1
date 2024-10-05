"use client";
import React from "react";
import { WobbleCard } from "./ui/wobble-card";
import { cn } from "@/lib/utils";

export function FeatureSection() {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-foreground">
          Temukan Peluang di Korea
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 max-w-7xl mx-auto w-full">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-primary min-h-[400px] sm:min-h-[500px] lg:min-h-[300px]"
            className="p-4 sm:p-6"
          >
            <div className="max-w-xs">
              <h2 className={cn("text-left text-base sm:text-xl lg:text-3xl font-semibold tracking-[-0.015em]", "text-primary-foreground")}>
                Kursus Bahasa Korea
              </h2>
              <p className={cn("mt-3 sm:mt-4 text-left text-sm sm:text-base", "text-primary-foreground/90")}>
                Pelajari bahasa Korea dari dasar hingga mahir dengan instruktur berpengalaman.
              </p>
            </div>
          </WobbleCard>
          <WobbleCard
            containerClassName="col-span-1 min-h-[300px] bg-secondary"
            className="p-4 sm:p-6"
          >
            <h2 className={cn("text-left text-base sm:text-xl lg:text-3xl font-semibold tracking-[-0.015em]", "text-secondary-foreground")}>
              Komunitas Supportif
            </h2>
            <p className={cn("mt-3 sm:mt-4 text-left text-sm sm:text-base", "text-secondary-foreground/90")}>
              Bergabung dengan ribuan pejuang Indonesia lainnya yang bekerja dan tinggal di Korea.
            </p>
          </WobbleCard>
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-3 bg-accent min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]"
            className="p-4 sm:p-6"
          >
            <div className="max-w-sm">
              <h2 className={cn("text-left text-base sm:text-xl lg:text-3xl font-semibold tracking-[-0.015em]", "text-accent-foreground")}>
                Panduan Kerja & Wawasan Budaya
              </h2>
              <p className={cn("mt-3 sm:mt-4 text-left text-sm sm:text-base", "text-accent-foreground/90")}>
                Dapatkan informasi lengkap tentang cara mendapatkan pekerjaan dan izin tinggal di Korea. Pelajari budaya Korea untuk memudahkan adaptasi Anda di lingkungan baru.
              </p>
            </div>
          </WobbleCard>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
