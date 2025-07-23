import express from 'express'
import { PrismaClient } from '@prisma/client';
import jwt, { decode } from 'jsonwebtoken';
import upload from '../middlewares/multer.js';
import cloudinary from '../utils/cloudinary.js';   
import { name } from 'ejs';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';


const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET

// ROTA PARA PEGAR INFORMAÇÕES DE UM USUARIO COM USERNAME 


router.post('/api/updateimage/',upload.single('image'), async(req,res) => {
    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token.replace('Bearer ',''),JWT_SECRET)
        
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

//POSTAR

router.post('/api/post', async(req,res) =>{
    try {
        const post_info = req.body
        const token = req.headers.authorization
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)


        const postDB = await prisma.posts.create({
            data:{
                content: post_info.content,
                userid: decoded.userid,
            }
        }
        )
        res.status(200).json({message:"deu tudo certo"})


    }catch(err){
        console.log(err)
    }




})

//SEGUIR

router.put('/api/follow/:user', async(req,res)=>{
    try{
        const token = req.headers.authorization
        const decoded = jwt.verify(token.replace('Bearer ',''), JWT_SECRET)

        const user = await prisma.users.findUnique({
            where:{
                username:req.params.user
            }
        })
        
        if (!user){
            return res.status(401).json({message:"not found"})
        }
        if (!user.followers.includes(decoded.username)){
            const update_follower = await prisma.users.update({
            where:{
                userid:user.userid
            },
            data:{
                followers:{
                    push: decoded.username
                }
            }
            })
            const update_follow = await prisma.users.update({
                where:{
                    userid:decoded.userid
                },
                data:{
                    follows:{
                        push: user.username
                    }
                }
            })
        }else{
            const { followers } = await prisma.users.findUnique({
                where: {
                    userid: user.userid
                },
                select: {
                    followers: true
                },
                });
            const { follows } = await prisma.users.findUnique({
                where: {
                    userid: decoded.userid
                },
                select: {
                    follows: true
                },
                });
            await prisma.users.update({
            where:{
                userid:user.userid
            },
            data:{
                followers:{
                    set: followers.filter((userid) => userid !== decoded.username) 
                }
            }
            })
            await prisma.users.update({
                where:{
                    userid:decoded.userid
                },
                data:{
                    follows:{
                        set: follows.filter((userid) => userid !== user.username) 
                    }
                }
            })
        }
        
        

        res.status(200).json(user)
    }catch(err){
        console.log(err)
    }

})



export default router