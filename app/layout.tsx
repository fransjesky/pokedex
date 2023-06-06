import './globals.css';
import { Montserrat } from 'next/font/google';

// components
import Header from '@/components/Header';

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Pokedex',
  description: 'Modern pokedex app built on Next 13 and Typescript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={montserrat.className}>
        <Header />
        <main style={{ marginTop: '5rem' }}>{children}</main>
      </body>
    </html>
  );
}
