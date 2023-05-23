import React, { useState } from "react";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";

function Note(props) {
  const [expanded, setExpanded] = useState(false);

  function handleDelete() {
    const token = window.localStorage.getItem("token");

    axios
      .delete(`http://172.20.10.5:4000/notes/${String(props.id)}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // Handle the response if needed
        console.log("Note deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function toggleExpand() {
    setExpanded(!expanded);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      {expanded ? (
        <p>{props.content}</p>
      ) : (
        <p>{props.content.substring(0, 100)}...</p>
      )}
      {props.content.length > 100 && (
        <button onClick={toggleExpand}>
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
      <button onClick={handleDelete}>
        <FaRegTrashAlt />
      </button>
    </div>
  );
}

export default Note;
