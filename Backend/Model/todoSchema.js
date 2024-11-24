import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true,
    },

    completed : {
        type: Boolean,
        required : true,
        default : false,
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    }
})

const ToDo = mongoose.model("ToDo", todoSchema);
export default ToDo;