import {Router} from "express";
import {createNode, deleteNode, getAllNodes, updateNode} from "../controller/notes.controller.js";

const notesRoutes = Router();

notesRoutes.post("/create-note", createNode);
notesRoutes.get("/get-notes", getAllNodes);
notesRoutes.put("/update-note/:id", updateNode);
notesRoutes.delete("/delete-note/:id", deleteNode);

export default notesRoutes;