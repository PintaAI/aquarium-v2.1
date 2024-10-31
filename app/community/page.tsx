"use client";

import { Instagram, Users, MessageCircle, Calendar, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

interface FeatureItemProps {
  icon: LucideIcon;
  text: string;
  color: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, text, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li
      className={cn("flex items-center gap-3 p-2 rounded-md transition-colors", 
        isHovered ? "bg-secondary" : "")}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className={`w-6 h-6 ${color}`} />
      <span className="font-medium">{text}</span>
    </motion.li>
  );
};

export default function CommunityPage() {
  return (
    <AnimatePresence>
      <motion.div
        className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center bg-clip-text " 
          variants={itemVariants}
        >
          Komunitas PejuangKorea
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <motion.div variants={itemVariants}>
            <Card className="w-full h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Segera Hadir</CardTitle>
                <CardDescription className="text-lg mt-2">Persiapkan Dirimu!</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <p className="text-center mb-6">
                  Halaman komunitas kami sedang dalam tahap akhir pengembangan. Kami tidak sabar untuk berbagi pengalaman belajar bahasa Korea bersama Anda!
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <Button
                    asChild
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white w-full transition-all duration-300"
                  >
                    <a
                      href="https://www.instagram.com/pejuangkorea/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Instagram className="w-5 h-5" />
                      Ikuti @pejuangkorea
                    </a>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="w-full h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Fitur Mendatang</CardTitle>
                <CardDescription className="text-lg mt-2">Yang Dapat Anda Nantikan</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    { icon: Users, text: "Forum diskusi interaktif", color: "text-blue-500" },
                    { icon: MessageCircle, text: "Sesi tanya jawab dengan native speaker", color: "text-green-500" },
                    { icon: Calendar, text: "Event belajar bersama mingguan", color: "text-yellow-500" },
                  ].map((item, index) => (
                    <FeatureItem key={index} {...item} />
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <motion.div
          className="mt-12 text-center"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold mb-4 bg-clip-text ">Bergabunglah dengan Komunitas Kami</h2>
          <p className="max-w-2xl mx-auto">
            Dapatkan akses eksklusif ke materi pembelajaran, diskusi menarik, dan kesempatan networking dengan sesama pelajar bahasa Korea. Bersama-sama, kita akan mencapai impian berbahasa Korea dengan lancar!
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}