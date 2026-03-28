import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import getDB from "./DB/index.js";


(async () => {
    try {
        const db = getDB();

        await db.execute("SELECT 1");
        console.log("DB connected ✅");

        const PORT = process.env.PORT;

        console.log("PORT", PORT);

        app.listen(PORT, () => {
            console.log("Server is running on port:", PORT);
        });

    } catch (err) {
        console.log("MySQL connection failed ❌", err.message);
    }
})();