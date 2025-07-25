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



// ATUALIZAR IMAGEM DE PERFIL

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

// RESPONDER POST

router.post('/api/quote/post/:postid', async(req,res) =>{
    try {
        const post_info = req.body
        const token = req.headers.authorization
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)

        const post = await prisma.posts.findUnique({
            where:{
                postID:parseInt(req.params.postid)
            }
        })
        if (!post){
            return res.status(401).json({message:"not found"})
        }

        const postDB = await prisma.posts.create({
            data:{
                content: post_info.content,
                userid: decoded.userid,
                quote: parseInt(req.params.postid)
            }
        }
        )
        res.status(200).json({message:"deu tudo certo"})


    }catch(err){
        console.log(err)
    }

})

// PEGAR QUOTES DE UM POST

router.get('/api/quote/get/:postid', async(req,res) =>{
    const posts = await prisma.posts.findMany({
        where:{
            quote:parseInt(req.params.postid)
        }
    })
    res.status(200).json(posts)

})

// EXCLUIR POST

router.delete('/api/delete/post/:postid', async(req,res)=>{
    try{
        const token = req.headers.authorization
        const decoded = jwt.verify(token.replace('Bearer ',''), JWT_SECRET)

        const post = await prisma.posts.findUnique({
            where:{
                postID: parseInt(req.params.postid)
            }
        })
        if(!post){
            return res.status(401).json({message:"not found"})
        }
        if(decoded.userid === post.userid){
            await prisma.posts.delete({
                where:{
                    postID: parseInt(req.params.postid)
                }
            })
        }else{
            return res.status(400).json({message:"denied"})
        }
        res.status(200).json({message:"tudo certo"})
        
    }catch(err){
        console.log(err)
    }
})


//SEGUIR

router.put('/api/follow/:user', async(req,res)=>{
    try{
        const DataAtual = new Date();
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
            const texto_notificacao = decoded.username + ' começou a seguir você!'
            const notificacaoDB = await prisma.notifications.findMany({
                where:{
                    userid: user.userid,
                    content: texto_notificacao
                }
            })
            if(!notificacaoDB){
                const notification = await prisma.notifications.create({
                    data:{
                        content: texto_notificacao,
                        userid: user.userid
                    }
                })
            }else{
                const diffDeNotificacao = DataAtual.getTime() - notificacaoDB.created_at
                const diaEmMilissegundo = 24 * 60 * 60 * 1000
                if(diffDeNotificacao > diaEmMilissegundo){
                    notificacaoDB = await prisma.notifications.update({
                        where:{
                            userid: user.userid,
                            content: texto_notificacao
                    }, 
                        data:{
                            read: false,
                            created_at: DataAtual.getTime()
                    }
                    })
                }
            }
            
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
        res.status(200).json({message:"tudo certo "})
    }catch(err){
        console.log(err)
    }
})

// CHECKAR NOTIFICAÇÕES 

router.get('/api/withoutread/getnotifications', async(req,res)=>{
    const token = req.headers.authorization
    const decoded = jwt.verify(token.replace('Bearer ', ''),JWT_SECRET)

    const notifications = await prisma.notifications.findMany({
        where:{
            userid: decoded.userid
        }
    })

    res.status(200).json(notifications)


})

// CHECKAR NOTIFICAÇÕES ( VAI LER )

router.get('/api/getnotifications', async(req,res)=>{
    const token = req.headers.authorization
    const decoded = jwt.verify(token.replace('Bearer ', ''),JWT_SECRET)

    const notifications = await prisma.notifications.findMany({
        where:{
            userid: decoded.userid
        }
    })
    const notificationsDB = await prisma.notifications.update({
        where:{
            userid: decoded.userid
        },
        data:{
            read:true
        }
    })

    res.status(200).json(notifications)


})

//PEGAR POSTS DE PESSOAS SEGUINDO

router.get('/api/getfollowingposts',async(req,res)=>{

    const token = req.headers.authorization
    const decoded = jwt.verify(token.replace('Bearer ',''),JWT_SECRET)

    const user = await prisma.users.findUnique({
        where:{
            userid:decoded.userid
        }
    })
    const following_people = await prisma.users.findMany({
        where:{
            username:{
                in:user.follows
            }
        },
        select:{
            userid:true
        }
    })
    const followingIDS = following_people.map(person => person.userid)
    
    const following_posts = await prisma.posts.findMany({
        where:{
            
            userid:{
                in:followingIDS
            }
        },
        include:{
            users:{
                select:{
                    username:true,
                    user_icon:true,

                }
            }
        }
    })

    res.status(200).json(following_posts)



})



export default router