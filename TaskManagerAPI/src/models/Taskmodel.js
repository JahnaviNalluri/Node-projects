const mongoose=require("mongoose");
const TaskSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","completed"],
        required:true,
        default:"pending",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    
})