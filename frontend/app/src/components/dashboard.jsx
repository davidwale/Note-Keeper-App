import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import Note from "./note";
import CreateArea from "./create";

function Dashboard() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  function fetchNotes() {
    const token = window.localStorage.getItem("token");

    axios
      .get("http://172.20.10.5:4000/notes", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addNote(title, content) {
    const token = window.localStorage.getItem("token");
    const newNote = {
      title: title,
      content: content,
    };

    axios
      .post("http://172.20.10.5:4000/notes", newNote, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        fetchNotes(); // Fetch the updated notes after adding a new note
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="dashboard">
      <Header />
      
      <div className="content">
      <CreateArea onAdd={addNote} />
      {notes && notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
          />
        );
      })}
      </div>
      <Footer className="footer"/>
    </div>
  );
}

export default Dashboard;
