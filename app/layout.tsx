import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GuiltyFree - 罪悪感を和らげるAI',
  description: 'キャリアコンサルタントの視点から、あなたの罪悪感を優しく和らげます。有給を取った、定時で帰った、自分の時間を持った...そんな小さな罪悪感をAIが軽くします。',
  keywords: ['罪悪感', 'AI', 'カウンセリング', 'セルフケア', 'メンタルヘルス', 'キャリアコンサルタント', '悩み相談', '心のケア'],
  authors: [{ name: 'GuiltyFree' }],
  creator: 'GuiltyFree',
  publisher: 'GuiltyFree',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'GuiltyFree - 罪悪感を和らげるAI',
    description: 'キャリアコンサルタントの視点から、あなたの罪悪感を優しく和らげます',
    url: 'https://guilty-free.vercel.app',
    siteName: 'GuiltyFree',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: 'https://guilty-free.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GuiltyFree - 罪悪感を和らげるAI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GuiltyFree - 罪悪感を和らげるAI',
    description: 'キャリアコンサルタントの視点から、あなたの罪悪感を優しく和らげます',
    creator: '@GuiltyFree',
    images: ['https://guilty-free.vercel.app/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console認証用（後で追加）
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'GuiltyFree',
    description: 'キャリアコンサルタントの視点から、あなたの罪悪感を優しく和らげるAIサービス',
    url: 'https://guilty-free.vercel.app',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'JPY',
    },
    creator: {
      '@type': 'Organization',
      name: 'GuiltyFree',
    },
    inLanguage: 'ja',
  };

  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
