import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KidsFashion - Quality Kids Clothing & Accessories',
  description: 'Shop the latest trends in kids fashion. Quality clothing, shoes, and accessories for babies, toddlers, and children. Free shipping on orders over $50!',
  keywords: 'kids clothing, children fashion, baby clothes, toddler outfits, kids shoes, kids accessories',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
