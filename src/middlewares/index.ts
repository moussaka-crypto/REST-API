import express from 'express';
import {get, merge} from 'lodash';
import { getUserBySessionToken } from '../db/users';

// Authentication middleware
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['CHRIS-AUTH'];
        if(!sessionToken){
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        if(!existingUser){
            return res.sendStatus(403);
        }

        merge(req, {identity: existingUser});
        return next();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

// Authorization middleware
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const {id} = req.params;
        const currentUserId = get(req, 'identity.id') as string;
        if(!currentUserId){
            return res.sendStatus(403);
        }

        if(currentUserId.toString() !== id){
            return res.sendStatus(403);
        }

        next();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}