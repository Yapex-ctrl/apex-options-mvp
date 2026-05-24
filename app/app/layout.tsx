import './globals.css';

export const metadata = {
  title: 'Apex Options Intelligence',
  description: 'Options intelligence for contracts, volatility, and strategies',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ar"><body>{children}</body></html>;
}
