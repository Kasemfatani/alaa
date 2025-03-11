import './globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/home/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../style/main.css';
import { Toaster } from "@/components/ui/sonner";
import { getSeoData } from '@/lib/getSeoData';
import logo from '../assets/images/home/logo.png';


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const seoData = await getSeoData();  // Fetch SEO Data from Server

  return (
    <html lang="ar" dir='rtl' id='root'>
      <head>
        <title>{seoData?.seo_title || 'Alalaa'}</title>
        <meta name="description" content={seoData?.seo_description || 'Default description...'} />
        <meta name="keywords" content={seoData?.seo_keywords || 'default, keywords'} />
        {/* OpenGraph Metadata */}
        <meta property="og:title" content={seoData?.seo_title || 'Alalaa'} />
        <meta property="og:description" content={seoData?.seo_description || 'Default description...'} />
        <meta property="og:image" content={seoData?.seo_image || logo.src} />
      </head>
      <body className="w-full" suppressHydrationWarning={true}>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
