import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function SiteLayout({ children }) {
  return (
    <>
     
      <div className="mt-20">{children}</div>
      <Footer />
    </>
  );
}
