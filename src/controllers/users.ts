import express from 'express';
import {deleteUserById, getUserById, getUsers} from '../db/users';

// User controllers

// Get all users controller
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try{
        const users = await getUsers();
        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

// Delete user controller
export const deleteUser = async (req: express.Request, res: express.Response) => {
    try{
        const {id} = req.params;
        const deletedUser = await deleteUserById(id);
        return res.json(deletedUser);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

// Update user controller
export const updateUser = async (req: express.Request, res: express.Response) => {
    try{
        const {id} = req.params;
        const {username} = req.body;
        if(!username){
            return res.sendStatus(400);
        }

        const user = await getUserById(id);
        user.username = username;
        await user.save();
        
        return res.status(200).json(user).end();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}