import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch notes when page loads
  useEffect(() => {
    fetchNotes();
  }, []);

  // Get notes from backend
  const fetchNotes = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5000/notes"
      );

      console.log(response.data);

      setNotes(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // Add new note
  const addNote = async () => {

    // Prevent empty note
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:5000/notes",
        {
          title,
          content,
        }
      );

      // Add new note to UI
      setNotes([...notes, response.data]);

      // Clear input fields
      setTitle("");
      setContent("");

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="app">

      <div className="container">

        <h1 className="heading">
          Notes App
        </h1>

        {/* Form Section */}
        <div className="note-form">

          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button onClick={addNote}>
            Add Note
          </button>

        </div>

        {/* Notes Section */}
        <div className="notes-grid">

          {
            notes.map((note) => (

              <div
                className="note-card"
                key={note._id}
              >

                <h3>{note.title}</h3>

                <p>{note.content}</p>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  );
}

export default App;