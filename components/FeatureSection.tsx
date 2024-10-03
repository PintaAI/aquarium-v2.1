"use client";
import React from "react";
import { WobbleCard } from "./ui/wobble-card";
import { cn } from "@/lib/utils";

export function FeatureSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Temukan Peluang di Korea</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-primary min-h-[500px] lg:min-h-[300px]"
            className="p-6"
          >
            <div className="max-w-xs">
              <h2 className={cn("text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em]", "text-primary-foreground")}>
                Kursus Bahasa Korea
              </h2>
              <p className={cn("mt-4 text-left text-base/6", "text-primary-foreground/90")}>
                Pelajari bahasa Korea dari dasar hingga mahir dengan instruktur berpengalaman.
              </p>
            </div>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-secondary" className="p-6">
            <h2 className={cn("max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em]", "text-secondary-foreground")}>
              Komunitas Supportif
            </h2>
            <p className={cn("mt-4 max-w-[26rem] text-left text-base/6", "text-secondary-foreground/90")}>
              Bergabung dengan ribuan pejuang Indonesia lainnya yang bekerja dan tinggal di Korea.
            </p>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-accent min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]" className="p-6">
            <div className="max-w-sm">
              <h2 className={cn("max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em]", "text-accent-foreground")}>
                Panduan Kerja & Wawasan Budaya
              </h2>
              <p className={cn("mt-4 max-w-[26rem] text-left text-base/6", "text-accent-foreground/90")}>
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