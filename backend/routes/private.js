import express from 'express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// ROTA PARA PEGAR INFORMAÇÕES DE UM USUARIO COM USERNAME 

router.get('/user/:username',async(req,res) =>{
    const user = await prisma.users.findUnique({
        omit: {password: true},
        where: {username: req.params.username}
    })
    if(!user){
        return res.status(404).json({message:'usuario nao encontrado'})
    }
    res.status(200).json(user)

});

export default router