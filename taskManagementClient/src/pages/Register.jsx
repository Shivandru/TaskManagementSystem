import React, { useState } from "react";

export default function Register() {
  const [formState, setFormState] = useState({
    email: "",
    username: "",
    pass: "",
  });

  function handleChange(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    let response = await fetch(
      `https://taskmanagementsystem-production.up.railway.app/user/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(formState),
      }
    );
    const data = await response.json();
    alert(data.msg);
    setFormState({
      email: "",
      username: "",
      pass: "",
    });
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "10vh", color: "#63B3ED" }}>
        Register Page
      </h2>
      <div
        style={{
          margin: "auto",
          textAlign: "center",
          // border: "2px solid black",
          padding: "2rem",
          marginTop: "3vh",
          width: "fit-content",
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
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={handleChange}
            value={formState.username}
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
