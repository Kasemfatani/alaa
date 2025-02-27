
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/home/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../style/main.css';
import { Toaster } from "@/components/ui/sonner"


export const metadata: Metadata = {
  title: 'Alalaa',
  description: 'تأسست شركة الآلاء الوطنية التجارية في عام 1998م كمؤسسة فردية وتحولت لشركة ذات مسؤولية محدودة في عام 2016م، وتطورت منذ ذلك الحين لتصبح إحدى الشركات الرائدة في المملكة العربية السعودية، حيث تقدم خدمات متكاملة في مجالات النقل البري، إدارة وتشغيل محطات الوقود، المقاولات العامة، الأمن، والسلامة. تعمل الشركة وفق أعلى معايير الجودة والابتكار لتحقيق رؤيتها المتمثلة في دعم تطلعات عملائها والمساهمة في تحقيق أهداف رؤية المملكة 2030. ',
};

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
