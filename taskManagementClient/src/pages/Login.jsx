import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthComponent/AuthContextProvider";
export default function Login() {
  const [formState, setFormState] = useState({
    email: "",
    pass: "",
  });
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  function handleChange(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      let res = await fetch(`https://taskmanagementsystem-production.up.railway.app/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(formState),
      });
      let data = await res.json();
      alert(data.msg);
      if (data.msg == "Login Successful") {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setFormState({
        email: "",
        pass: "",
      });
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  }
  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "10vh", color: "#63B3ED" }}>
        Login Page
      </h2>
      <div
        style={{
          margin: "auto",
          textAlign: "center",
          // border: "2px solid black",
          width: "fit-content",
          marginTop: "3vh",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            style={{
              marginTop: "10px",
              height: "5vh",
              width: "100%",
              textAlign: "center",
              borderRadius: "0.3rem",
              border: "2px solid #63B3ED",
            }}
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={formState.email}
          />
          <br />
          <input
            style={{
              marginTop: "10px",
              height: "5vh",
              width: "100%",
              textAlign: "center",
              borderRadius: "0.3rem",
              border: "2px solid #63B3ED",
            }}
            type="password"
            name="pass"
            placeholder="Enter your password"
            onChange={handleChange}
            value={formState.pass}
          />
          <br />
          <input
            style={{
              marginTop: "10px",
              padding: "10px",
              width: "100%",
              borderRadius: "1rem",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#63B3ED",
              color: "#FFFFFF",
            }}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
