import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomerServiceChat from "./CustomerServiceChat";

interface LayoutProps {
  children: ReactNode;
  withHeroBackground?: boolean;
  hideFooter?: boolean;
}

const Layout = ({ children, withHeroBackground = false, hideFooter = false }: LayoutProps) => {
  return (
    <div className={withHeroBackground ? "" : "min-h-screen bg-background"}>
      <Navbar />
      <main>{children}</main>
      {!hideFooter && <Footer />}
      <CustomerServiceChat />
    </div>
  );
};

export default Layout;
