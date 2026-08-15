import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "@/components/ChatWidget";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <ScrollToTop />
    <Header />
    <main className="min-h-screen">{children}</main>
    <Footer />
    <ChatWidget />
  </>
);

export default Layout;
