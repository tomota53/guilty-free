import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約・免責事項 | GuiltyFree',
  description: 'GuiltyFreeの利用規約と免責事項。本サービスは医療行為ではなく、AIによる一般的な助言のみを提供します。',
  openGraph: {
    title: '利用規約・免責事項 | GuiltyFree',
    description: 'GuiltyFreeの利用規約と免責事項',
    url: 'https://guilty-free.vercel.app/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
