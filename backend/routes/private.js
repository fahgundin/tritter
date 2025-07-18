import express from 'express'
import { PrismaClient } from '@prisma/client';
import jwt, { decode } from 'jsonwebtoken';
import upload from '../middlewares/multer.js';
import cloudinary from '../utils/cloudinary.js';   
import { name } from 'ejs';


const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET

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
router.post('/api/updateimage/:user',upload.single('image'), async(req,res) => {
    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token.replace('Bearer ',''),JWT_SECRET)
        if((decoded.username !== req.params.user)){
            return res.status(401).json({message:"não é seu"})
        }
        
        const name_file = decoded.username + "_icon"
        


        cloudinary.uploader.upload(req.file.path,{
            public_id:name_file,
            overwrite:true
        },async function(err, result){
            if(err){
                return res.status(200)
            }else{
                const userDB = await prisma.users.update({
                    where:{
                        userid:decoded.userid 
                    },
                    data:{
                        user_icon:cloudinary.url(result.secure_url)
                    }
                })
            }
        })
        
        
       


        res.status(200).json({message:"foi"})
    }catch(err){
        console.log(err)
    
        return res.status(401).json({message:"acesso negado"})
        
    }
    
    
})



export default router