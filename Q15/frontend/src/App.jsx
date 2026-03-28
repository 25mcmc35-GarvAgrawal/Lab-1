import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import AddNotes from "./components/AddNotes/AddNotes.jsx";
import Button from "./components/button/Button.jsx"; // 👈 your button component

function App() {
    const [notes, setNotes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    const handleUpdateNotes = (note) => {
        setShowForm(true);
        setEditingNote(note);
    }

    const getNotes = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8000/api/v1/notes/get-notes"
            );
            setNotes(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/notes/delete-note/${id}`);
            getNotes();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <div className="min-h-screen bg-yellow-100 p-6">

            <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold">📝 Notes App</h1>

                <Button onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Close" : "Add Note"}
                </Button>
            </div>

            {/* 🔥 Form */}
            {showForm && (
                <div className="mb-6 max-w-4xl mx-auto">
                    <AddNotes refreshNotes={getNotes}
                              setShowForm={setShowForm}
                              editingNote={editingNote}
                              setEditingNote={setEditingNote}/>
                </div>
            )}

            {/* 🔥 Notes Grid */}
            <div className="flex flex-wrap gap-6 justify-center">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="w-48 min-h-[80px] max-h-[150px] p-4 bg-yellow-200 rounded-lg shadow-lg
                        rotate-[-2deg] hover:rotate-0 transition transform hover:scale-105"
                    >
                        <h3 className="font-bold text-lg mb-2">{note.title}</h3>
                        <p className="text-sm whitespace-pre-wrap overflow-hidden">
                            {note.content}
                        </p>
                        <div className={"flex justify-between"}>
                            <p
                                onClick={() => handleUpdateNotes(note)}
                                className="text-sm hover:scale-125 transition cursor-pointer"
                            >
                                ✏️
                            </p>
                            <p className={"text-lg hover:scale-110 transform cursor-pointer"}
                               onClick={() => deleteNote(note.id)}>🗑️</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default App;