"use client"
import React from 'react';
import { motion } from 'framer-motion';
import AuthCard from '@/components/AuthCard';
import { Book, Users, Briefcase, Globe } from 'lucide-react';

const WebsiteInfo = () => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="bg-gradient-to-br from-secondary/10 to-primary/10 p-8 rounded-lg shadow-lg backdrop-blur-sm"
  >
    <h2 className="text-3xl font-bold mb-6 text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
      Temukan Peluang di Korea
    </h2>
    <p className="text-gray-200 text-lg mb-6 leading-relaxed">
      Buka pintu kesempatan untuk bekerja dan tinggal di Korea. Kami menyediakan kursus bahasa Korea, komunitas supportif, dan panduan kerja lengkap untuk membantu Anda mencapai impian.
    </p>
    <div className="space-y-6">
      <FeatureItem 
        icon={<Book className="w-6 h-6 text-primary" />}
        title="Kursus Bahasa Korea"
        description="Pelajari bahasa Korea dari dasar hingga mahir dengan instruktur berpengalaman."
      />
      <FeatureItem 
        icon={<Users className="w-6 h-6 text-primary" />}
        title="Komunitas Supportif"
        description="Bergabung dengan ribuan pejuang Indonesia lainnya yang bekerja dan tinggal di Korea."
      />
      <FeatureItem 
        icon={<Briefcase className="w-6 h-6 text-primary" />}
        title="Panduan Kerja"
        description="Dapatkan informasi lengkap tentang cara mendapatkan pekerjaan dan izin tinggal di Korea."
      />
      <FeatureItem 
        icon={<Globe className="w-6 h-6 text-primary" />}
        title="Wawasan Budaya"
        description="Pelajari budaya Korea untuk memudahkan adaptasi Anda di lingkungan baru."
      />
    </div>
  </motion.div>
);

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4">
    {icon}
    <div>
      <h3 className="text-xl font-semibold text-primary mb-1">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </div>
);

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/30 via-background to-secondary/30 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
          <WebsiteInfo />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2"
        >
          <AuthCard mode="register" />
        </motion.div>
      </div>
    </div>
  );
}