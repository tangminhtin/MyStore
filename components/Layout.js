import NavBar from "./NavBar";
import Notify from "./Notify";
import Modal from "./Modal";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="container">
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <NavBar />
        <Notify />
        <Modal />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
