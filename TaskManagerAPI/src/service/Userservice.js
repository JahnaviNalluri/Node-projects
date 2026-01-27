const User=require("../models/Usermodel");
const createUser=async(userData)=>{
    const{username,email}=userData;
    const exists=await findOne({email});
    if(exists){
        throw Error(`user already exist`);
    }
    const newuser=new User({
        username,email
    });
    return await newuser.save();
}
const getAllUsers=async()=>{
    return await User.find();
}
const getUserById=async(userId)=>{
    const user=await findById(userId);
    if(!user){
        throw Error(`User not found`);
    }
    return user;
};
const deleteUser=async(userId)=>{
    const exists=await findByIdAndDelete(userId);
     if(!exists){
        throw Error(`user not exist`);
    }
    return exists;
}
const updateUser= async(userId,updatedData)=>{
    const exists=await findByIdAndUpdate(
        userId,
        updatedData,
        {new:true}
    );
    if(!exists){
        throw Error(`User not exist`);
    }
    return exists;
}

export default{createUser,deleteUser,updateUser,getAllUsers,getUserById};