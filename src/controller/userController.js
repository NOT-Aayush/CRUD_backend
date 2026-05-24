import { getUserByIdService, createUserService, getAllUsersService, updateUserService, deleteUserService } from "../models/userModel.js";

const handleResponse = (res, status, message, data = null) =>{
    res.status(status).json({
        status,
        message,
        data
    })
};

export const createUser = async (req, res, next)=>{
    const { name, email } = req.body;
    try{
        const newUser = await createUserService(name, email);
        handleResponse(res, 201, "User created Successfully",newUser)
    }catch(err){
        next(err);

    }
}
export const getAllUsers = async (req, res, next)=>{
    try{
        const allUsers = await getAllUsersService();
        handleResponse(res, 200, "displaying all users",allUsers)
    }catch(err){
        next(err);

    }
}
export const getUserById = async (req, res, next)=>{
    try{
        const user  = await getUserByIdService(req.params.id);
        if (!user) return handleResponse(res,404,"User not found")
        handleResponse(res, 200, "User fetched successfully: ",user)
    }catch(err){
        next(err);

    }
}
export const updateUser = async (req, res, next)=>{
    const { name, email} = req.body;
    try{
        const newUser = await updateUserService(req.params.id,name, email);
        if (!newUser) return handleResponse(res,404,"User not found")
        handleResponse(res, 200, "User updated Successfully",newUser)
    }catch(err){
        next(err);

    }
}
export const deleteUser = async (req, res, next)=>{
    try{
        const delUser = await deleteUserService(req.params.id);
        if (!delUser) return handleResponse(res,404,"User not found")
        handleResponse(res, 200, "User deleted Successfully",delUser)
    }catch(err){
        next(err);

    }
}