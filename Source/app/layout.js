import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatBox from "@/components/ai/ChatBox";
import { CartProvider } from "@/context/CartContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Aura Interiors | AI-Powered Design",
  description: "Premium interior design e-commerce featuring Aura AI assistant.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <CartProvider>
          <div className="layout-wrapper">
            <Header />
            <main>{children}</main>
            <Footer />
            <ChatBox />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
