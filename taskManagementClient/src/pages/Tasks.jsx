import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthComponent/AuthContextProvider";
export default function Tasks() {
  let [task, settask] = useState({ title: "", body: "", date: "", status: "" });
  const [selectedId, setSelectedId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState({});
  const navigate = useNavigate();
  const { isLoggedIn, taskData, settaskData } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = taskData.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (isLoggedIn == false) {
    navigate("/login");
  }
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(task);
    let res = await fetch(`http://localhost:3000/task/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(task),
    });
    let data = await res.json();
    alert(data.msg);
    console.log(data.msg);
    settask({ title: "", body: "", date: "", status: "" });
  }

  function handleChange(event) {
    settask({
      ...task,
      [event.target.name]: event.target.value,
    });
  }
  async function getTasks() {
    let res = await fetch(`http://localhost:3000/task`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    let data = await res.json();
    settaskData(data.data);
  }

  useEffect(() => {
    getTasks();
  }, []);

  async function handleDelete(id) {
    try {
      let res = await fetch(`http://localhost:3000/task/delete/${id}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      });
      let data = await res.json();
      alert(data.msg);
    } catch (error) {
      console.log(error);
    }
  }

  function handleToggle(id) {
    setSelectedId(id);
    setEdit(!edit);
    let selectedTask = taskData?.find((item) => item._id === id);
    setUpdate((prevValue) => ({
      ...prevValue,
      title: selectedTask.title,
      body: selectedTask.body,
      date: selectedTask.date,
      status: selectedTask.status,
    }));
  }

  const handleTextArea = (name, value) => {
    setUpdate((prevUpdate) => ({
      ...prevUpdate,
      [name]: value,
    }));
  };
  async function handleUpdate(id) {
    try {
      console.log(update);
      let res = await fetch(`http://localhost:3000/task/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(update),
      });
      let data = await res.json();
      alert(data.msg);
      setEdit(!edit);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h2
        style={{
          textAlign: "center",
          marginTop: "10vh",
          color: "#63B3ED",
          fontSize: "2rem",
        }}
      >
        Tasks
      </h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div
          style={{
            width: "25%",
            height: "auto",
            // border: "2px solid black",
            padding: "2rem",
            borderRadius: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <input
              style={{
                height: "5vh",
                width: "100%",
                textAlign: "center",
                borderRadius: "0.3rem",
                border: "2px solid #63B3ED",
              }}
              placeholder="Enter Your Task Title"
              type="text"
              name="title"
              onChange={handleChange}
            />
            <input
              style={{
                marginTop: "10px",
                height: "20vh",
                width: "100%",
                textAlign: "center",
                borderRadius: "0.3rem",
                border: "2px solid #63B3ED",
              }}
              placeholder="Enter Task Description"
              type="text"
              name="body"
              onChange={handleChange}
            />
            <input
              style={{
                marginTop: "10px",
                height: "5vh",
                width: "100%",
                textAlign: "center",
                borderRadius: "0.3rem",
                border: "2px solid #63B3ED",
              }}
              placeholder="Enter date"
              type="date"
              name="date"
              onChange={handleChange}
            />
            <input
              style={{
                marginTop: "10px",
                height: "5vh",
                width: "100%",
                textAlign: "center",
                borderRadius: "0.3rem",
                border: "2px solid #63B3ED",
              }}
              placeholder="completion status"
              type="text"
              name="status"
              onChange={handleChange}
            />
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
        <div
          style={{
            width: "50vw",
            padding: "10px",
          }}
        >
          {currentItems?.map((item) => (
            <div
              style={{
                marginTop: "10px",
                // border: "2px solid black",
                padding: "1rem",
                width: "fit-content",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
              key={item._id}
            >
              {edit && selectedId === item._id ? (
                <div>
                  <textarea
                    style={{ height: "2vh" }}
                    value={update.title}
                    name="title"
                    onChange={(e) => handleTextArea("title", e.target.value)}
                  ></textarea>
                  <br />
                  <textarea
                    value={update.body}
                    name="body"
                    onChange={(e) => handleTextArea("body", e.target.value)}
                  ></textarea>
                  <br />
                  <textarea
                    value={update.date}
                    name="date"
                    onChange={(e) => handleTextArea("date", e.target.value)}
                  ></textarea>
                  <br />
                  <textarea
                    value={update.status}
                    name="status"
                    onChange={(e) => handleTextArea("status", e.target.value)}
                  ></textarea>
                  <br />
                  <button
                    onClick={() => handleUpdate(item._id)}
                    style={{
                      cursor: "pointer",
                      padding: "0.5rem",
                      borderRadius: "0.3rem",
                      border: "none",
                      backgroundColor: "#63B3ED",
                      color: "#FFFFFF",
                      width: "4rem",
                    }}
                  >
                    SAVE
                  </button>
                </div>
              ) : (
                <div>
                  <li>
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "18px",
                        color: "#63B3ED",
                      }}
                    >
                      Task:{" "}
                    </span>
                    {item.title}
                  </li>
                  <li>
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "18px",
                        color: "#63B3ED",
                      }}
                    >
                      Description :{" "}
                    </span>
                    {item.body}
                  </li>
                  <li>
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "18px",
                        color: "#63B3ED",
                      }}
                    >
                      Date :{" "}
                    </span>
                    {item.date}
                  </li>
                  <li>
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "18px",
                        color: "#63B3ED",
                      }}
                    >
                      status :{" "}
                    </span>
                    {item.status}
                  </li>
                </div>
              )}
              <li>
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#63B3ED",
                  }}
                >
                  Created By:{" "}
                </span>{" "}
                {item.username}
              </li>

              <button
                onClick={() => {
                  handleToggle(item._id);
                }}
                style={{
                  cursor: "pointer",
                  padding: "0.5rem",
                  borderRadius: "0.3rem",
                  border: "none",
                  backgroundColor: "#63B3ED",
                  color: "#FFFFFF",
                  width: "4rem",
                  marginRight: "0.5rem",
                }}
              >
                {edit && selectedId === item._id ? "BACK" : "EDIT"}
              </button>

              <button
                onClick={() => {
                  handleDelete(item._id);
                }}
                style={{
                  cursor: "pointer",
                  padding: "0.5rem",
                  borderRadius: "0.3rem",
                  border: "none",
                  backgroundColor: "#63B3ED",
                  color: "#FFFFFF",
                  width: "4rem",
                }}
              >
                DELETE
              </button>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
          // border: "1px solid black",
          gap: "1rem",
        }}
      >
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            cursor: "pointer",
            padding: "0.5rem",
            borderRadius: "0.3rem",
            border: "none",
            backgroundColor: "#63B3ED",
            color: "#FFFFFF",
            width: "4rem",
          }}
        >
          Prev
        </button>
        <p>Page {currentPage}</p>
        <button
          onClick={() => paginate(currentPage + 1)}
          style={{
            cursor: "pointer",
            padding: "0.5rem",
            borderRadius: "0.3rem",
            border: "none",
            backgroundColor: "#63B3ED",
            color: "#FFFFFF",
            width: "4rem",
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}
