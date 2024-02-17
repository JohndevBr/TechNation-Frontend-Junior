import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import { GlobalStyle } from "../styles/global";
import NavBar from "../components/navbar";


const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Teste Técnico TechNation - Frontend",
  description: "Sistema Financeiro da TechNation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}
        <NavBar />
      </body>
      <GlobalStyle />

    </html>
  );
}