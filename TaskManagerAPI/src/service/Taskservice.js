const Task=require("../models/Taskmodel")
const User=require("../models/Usermodel")
const createTask=async(taskData)=>{
    const{title,userId}=taskData;
    const userexists=await User.findById(userId);
    if(!userexists){
        throw new Error(`user doesn't exist`);
    }
    const newtask=new Task({
        title,
        userId
    })
    return await newtask.save();
}
const getAllTasks=async()=>{
    return await Task.find();
}
const getTaskById=async(taskId)=>{
    const exists=await Task.findById(taskId);
    if(!exists){
        throw new Error(`task not found`);
    }
    return exists;
}
const getTaskByUser=async(userId)=>{
    return await Task.find({userId});
}
const updateTask=async(taskId,newData)=>{
    const exist=await Task.findByIdAndUpdate(
        taskId,
        newData,
        {new:true},
    )
    if(!exist){
        throw new Error(`Task not found`);
    }
    return exist;
}
const deleteTask=async(taskId)=>{
    const exist=await Task.findByIdAndDelete(taskId);
    if(!exist){
        throw new Error(`Task not found`);
    }
    return exist;
}
module.exports={
    createTask,getAllTasks,getTaskById,updateTask,deleteTask,getTaskByUser
}