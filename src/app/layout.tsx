import './globals.css';
import Header from '../components/Header';
import { Inter } from 'next/font/google';
import SessionProviderWrapper from '../components/SessionProviderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PMS Airbnb',
  description: 'Sistema de gestão de propriedades para Airbnb',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-100`}>
        <SessionProviderWrapper>
          <Header />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
