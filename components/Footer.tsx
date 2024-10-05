import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Footer = () => {
  return (
    <footer className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-secondary-foreground">Temukan Peluang di Korea</h2>
            <p className="text-secondary-foreground/80">Wujudkan impian Anda untuk belajar, bekerja, dan tinggal di Korea Selatan.</p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-lg text-secondary-foreground">Kursus</h3>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><Link href="/courses" className="hover:text-secondary-foreground transition-colors">Semua Kursus</Link></li>
              <li><Link href="/courses/beginner" className="hover:text-secondary-foreground transition-colors">Bahasa Korea Dasar</Link></li>
              <li><Link href="/courses/intermediate" className="hover:text-secondary-foreground transition-colors">Bahasa Korea Menengah</Link></li>
              <li><Link href="/courses/advanced" className="hover:text-secondary-foreground transition-colors">Bahasa Korea Mahir</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-lg text-secondary-foreground">Komunitas & Panduan</h3>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><Link href="/community" className="hover:text-secondary-foreground transition-colors">Forum Diskusi</Link></li>
              <li><Link href="/events" className="hover:text-secondary-foreground transition-colors">Acara Komunitas</Link></li>
              <li><Link href="/guide/work" className="hover:text-secondary-foreground transition-colors">Panduan Kerja di Korea</Link></li>
              <li><Link href="/guide/culture" className="hover:text-secondary-foreground transition-colors">Wawasan Budaya Korea</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-lg text-secondary-foreground">Berlangganan</h3>
            <p className="text-secondary-foreground/80 mb-4">Dapatkan info terbaru tentang kursus dan peluang di Korea.</p>
            <form className="space-y-2">
              <Input type="email" placeholder="Email Anda" className="bg-secondary-foreground/10" />
              <Button className="w-full">Berlangganan</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-secondary-foreground/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left text-sm text-secondary-foreground/70 mb-4 md:mb-0">
            © 2023 Temukan Peluang di Korea. Hak Cipta Dilindungi.
          </p>
          <div className="flex space-x-4 text-sm text-secondary-foreground/70">
            <Link href="/privacy" className="hover:text-secondary-foreground transition-colors">Kebijakan Privasi</Link>
            <Link href="/terms" className="hover:text-secondary-foreground transition-colors">Syarat dan Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;