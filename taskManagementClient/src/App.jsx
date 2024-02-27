import { useState, useMemo, useEffect, useContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { io } from "socket.io-client";
import "./App.css";
import Navbar from "./Components/Navbar";
import { AuthContext } from "./AuthComponent/AuthContextProvider";
function App() {
  const { taskData, settaskData } = useContext(AuthContext);
  const socket = useMemo(() => {
    return io("http://localhost:3000");
  }, []);
  useEffect(() => {
    if (!socket) return;
    socket.on("newTask", (newTask) => {
      settaskData([...taskData, newTask]);
    });
    return () => {
      socket.disconnect();
      socket.off("newTask");
    };
  }, [socket, settaskData]);
  return (
    <>
      <Navbar />
    </>
  );
}

export default App;
