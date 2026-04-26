import {asyncHandler} from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import getDB from "../DB/index.js";

// create Note

const createNode = asyncHandler(async (req, res) => {
//     1) get the title , content from user
//     2) verify if there is title , content inside

    const {title, content} = req.body;

    if (!title) {
        throw new ApiError(400, "Title is required");
    }

    if (!content) {
        throw new ApiError(400, "Content is required");
    }

    const db = getDB();

    const [result] = await db.execute(
        "INSERT INTO notes (title, content) VALUES (?, ?)",
        [title, content]
    );

    return res.status(200).json(new ApiResponse(200, [], "Notes created successfully"));
})

const getAllNodes = asyncHandler(async (req, res) => {
    const db = getDB();
    const [result] = await db.execute("SELECT * FROM notes");


    return res.status(200).json(new ApiResponse(200, result, "All Node"));
})

const updateNode = asyncHandler(async (req, res) => {

    const db = getDB();

    const id = parseInt(req.params.id);
    const {title, content} = req.body;

    if (!id) {
        throw new ApiError(400, "ID is required");
    }

    if (!title && !content) {
        throw new ApiError(400, "Title Or Content is required");
    }

    let field = [];
    let value = [];

    if (title) {
        field.push("title = ?");
        value.push(title);
    }

    if (content) {
        field.push("content = ?");
        value.push(content);
    }

    value.push(id);

    if (field.length === 0) {
        throw new ApiError(400, "No fields to update");
    }

    const [result] = await db.execute(
        `UPDATE notes
         SET ${field.join(", ")}
         WHERE id = ?;`,
        value
    );

    if (result.affectedRows === 0) {
        throw new ApiError(404, "Note Not Found");
    }

    return res.status(200).json(new ApiResponse(200, result, "Note Updated successfully"));
})

const deleteNode = asyncHandler(async (req, res) => {
    const db = getDB();

    const id = parseInt(req.params.id);

    if (!id) {
        throw new ApiError(400, "ID is required");
    }

    let query = "DELETE FROM notes WHERE id=?";

    const [result] = await db.execute(query, [id]);

    if (result.affectedRows === 0) {
        throw new ApiError(404, "Note Not Found");
    }

    return res.status(200).json(new ApiResponse(200, [], "Note Deleted successfully"));
})

export {createNode, getAllNodes, updateNode, deleteNode};