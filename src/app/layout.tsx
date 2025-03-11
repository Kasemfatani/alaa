
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/home/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../style/main.css';
import logo from '../assets/images/home/logo.png';
import { Toaster } from "@/components/ui/sonner"
import { API_BASE_URL } from '@/lib/apiConfig';

export async function generateMetadata(): Promise<Metadata> {
  try {
    // Fetch SEO data from the API
    const response = await fetch(`${API_BASE_URL}/seo`, {
      headers: { 'Content-Type': 'application/json', lang: 'ar' }, // Adjust language dynamically if needed
      cache: 'no-store' // Prevents caching in Next.js for fresh data
    });

    if (!response.ok) {
      throw new Error('Failed to fetch SEO data');
    }

    const seoData = await response.json();
    console.log('seoData', seoData.data);
    
    return {
      title: seoData?.data?.seo_title || 'Alalaa',
      description: seoData?.data?.seo_description || 'Default description',
      keywords: seoData?.data?.seo_keywords || 'default, keywords',
      openGraph: {
        title: seoData?.data?.seo_title || 'Alalaa',
        description: seoData?.data?.seo_description || 'Default description',
        url: 'https://www.alalaa.co/',
        siteName: "الالااء",
        images: [
          {
            url: seoData?.data?.seo_image || logo.src,
            width: 1200,
            height: 630,
            alt: 'الالاء',
          },
        ],
        type: 'website',
        locale: 'ar_SA',
      },
    };
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return {
      title: 'Alalaa',
      description: 'تأسست شركة الآلاء الوطنية التجارية في عام 1998م ...',
      keywords: "الالاء ,نقل مواد بتروليه",
      openGraph: {
        title: 'Alalaa',
        description: 'تأسست شركة الآلاء الوطنية التجارية في عام 1998م ...',
        url: 'https://www.alalaa.co/',
        siteName: "الالااء",
        images: [
          {
            url: logo.src,
            width: 1200,
            height: 630,
            alt: 'الالاء',
          },
        ],
        type: 'website',
        locale: 'ar_SA',
      },
    };
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir='rtl' id='root'>
      {/* Google Tag Manager */}
      <body className="w-full" suppressHydrationWarning={true}>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
