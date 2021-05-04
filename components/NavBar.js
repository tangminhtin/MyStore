import classes from "./NavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";

function NavBar() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;

  const isActive = (r) => (r === router.pathname ? " " + classes.active : "");

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");

    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Đăng xuất thành công!" } });
    return router.push("/");
  };

  const loginRouter = () => {
    return (
      <li className="nav-item">
        <Link href="/signin">
          <a className={"nav-link " + classes.navLink + isActive("/signin")}>
            <i className="fas fa-sign-in-alt" aria-hidden></i> Đăng nhập
          </a>
        </Link>
      </li>
    );
  };

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <a
          className={"nav-link dropdown-toggle " + classes.navLink}
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            className={classes.avatar}
            src={auth.user.avatar}
            alt={auth.user.avatar}
          />{" "}
          {auth.user.name}
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <Link href="/profile">
              <a className="dropdown-item" href="#">
                Thông tin cá nhân
              </a>
            </Link>
          </li>

          {auth.user.role === "admin" && adminRouter()}

          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt" aria-hidden></i> Đăng xuất
            </a>
          </li>
        </ul>
      </li>
    );
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link href="/users">
            <a className="dropdown-item" href="#">
              Người dùng
            </a>
          </Link>
        </li>
        <li>
          <Link href="/create">
            <a className="dropdown-item" href="#">
              Sản phẩm
            </a>
          </Link>
        </li>
        <li>
          <Link href="/categories">
            <a className="dropdown-item" href="#">
              Danh mục
            </a>
          </Link>
        </li>
      </>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">
            <img
              className={"shadow " + classes.imageLogo}
              src="/images/logo.png"
              alt="Lam Vinh Phat"
            />
            <span className={classes.brandName}>Lâm Vĩnh Phát</span>
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/">
                <a
                  className={"nav-link " + classes.navLink + isActive("/")}
                  aria-current="page"
                >
                  <i className="fas fa-home" aria-hidden></i> Trang chủ
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <a
                  className={"nav-link " + classes.navLink + isActive("/store")}
                  aria-current="page"
                >
                  <i className="fab fa-shopify" aria-hidden></i> Cửa hàng
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/cart">
                <a
                  className={"nav-link " + classes.navLink + isActive("/cart")}
                >
                  <i
                    className="fas fa-shopping-cart position-relative"
                    aria-hidden
                  >
                    <span
                      className="position-absolute"
                      style={{
                        padding: "3px 6px",
                        background: "#ed143dc2",
                        borderRadius: "50%",
                        top: "-10px",
                        right: "-10px",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    >
                      {cart.length}
                    </span>
                  </i>{" "}
                  Giỏ hàng
                </a>
              </Link>
            </li>
            {Object.keys(auth).length === 0 ? loginRouter() : loggedRouter()}
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Nhập sản phẩm..."
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              <i className="fas fa-search" aria-hidden></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
