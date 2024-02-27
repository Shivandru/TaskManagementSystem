import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AllRoutes from "../AllRoutesFolder/AllRoutes";
import { AuthContext } from "../AuthComponent/AuthContextProvider";
export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  async function handleLogout() {
    let res = await fetch(
      `https://taskmanagementsystem-production.up.railway.app/user/logout`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    let data = await res.json();
    alert(data.msg);
    if (data.msg == "Logged out successfully") {
      setIsLoggedIn(false);
    }
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          // border: "2px solid black",
          padding: "1rem",
          alignItems: "center",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
        <Link
          style={{
            textDecoration: "none",
            color: "#63B3ED",
            fontWeight: "bold",
          }}
          to="/"
        >
          HOME
        </Link>
        <Link
          style={{
            textDecoration: "none",
            color: "#63B3ED",
            fontWeight: "bold",
          }}
          to="/register"
        >
          REGISTER
        </Link>
        <Link
          style={{
            textDecoration: "none",
            color: "#63B3ED",
            fontWeight: "bold",
          }}
          to="/login"
        >
          LOGIN
        </Link>
        <Link
          style={{
            textDecoration: "none",
            color: "#63B3ED",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
          to="/tasks"
        >
          TASKS
        </Link>
        <button
          onClick={handleLogout}
          style={{
            // padding: "5px",
            cursor: "pointer",
            color: "#63B3ED",
            fontWeight: "bold",
            backgroundColor: "#FFFFFF",
            border: "none",
            fontSize: "1rem",
          }}
        >
          LOGOUT
        </button>
      </div>
      <AllRoutes />
    </>
  );
}
