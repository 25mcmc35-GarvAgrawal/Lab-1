import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";

const AddNotes = ({refreshNotes, setShowForm, editingNote, setEditingNote}) => {

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setValue,
        reset
    } = useForm();

    const onSubmit = async (data) => {
        try {

            if (editingNote) {
                await axios.put(`http://localhost:8000/api/v1/notes/update-note/${editingNote.id}`, data);
            } else {
                await axios.post(
                    "http://localhost:8000/api/v1/notes/create-note",
                    data
                );
            }
            reset();
            setEditingNote(null);
            setShowForm(false);
            refreshNotes();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (editingNote) {
            setValue("title", editingNote.title)
            setValue("content", editingNote.content);
        }
    }, [editingNote]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-yellow-100">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">{editingNote ? "Edit Note" : "Add Note"}</h2>

                <input
                    {...register("title", {
                        required: "Title is Required",
                    })}
                    type="text"
                    placeholder="Title"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}

                <textarea
                    {...register("content", {
                        required: "Content is Required",
                    })}
                    placeholder="Content"
                    className="w-full p-2 border rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {errors.content && (
                    <p className="text-red-500 text-sm">{errors.content.message}</p>
                )}

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    {isSubmitting ? "Loading..." : editingNote ? "Update Note" : "Add Note"}
                </button>
            </form>

        </div>
    );
};

export default AddNotes;