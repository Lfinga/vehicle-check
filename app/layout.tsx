import './globals.css';
import { Suspense } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning className='dark'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body className='bg-[#111] min-h-screen'>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
