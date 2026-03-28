import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: "http://localhost:5174",
}));

app.use(express.json());

import notesRoutes from "./routes/notes.routes.js";

app.use("/api/v1/notes" , notesRoutes);


export {app} ;