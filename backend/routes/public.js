import express, { json } from 'express';
import bcrypt, { compare } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';


// Instancia o Prisma Client
const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET

// Rota Cadastro

router.post('/signup', async(req,res)=>{

    try{
        // capta o request
        const user = req.body;
        //gera uma semente para o hash
        const salt  = await bcrypt.genSalt(10)
        //criptografa a senha do request com bcrypt
        const hashPassword = await bcrypt.hash(user.password,salt);


        //CADASTRA UM USUARIO NO BD
        const userDB = await prisma.users.create({
            data:{
                username: user.username,
                email: user.email,
                password: hashPassword
            }
        } )
        return res.status(201).json({message:"cadastro concluido"})
        // THROW erros
    }catch(err) {
        res.status(500).json({message:'erro'})
        console.log(err)
    }
});
// Rota login

router.post('/login', async(req,res) =>{
    
    try{

        // capta request
        const user_info = req.body;


        //Busca se há o usuario do request no BD
        const user = await prisma.users.findUnique({ 
            where: {username: user_info.username, 
            },
        })

        // Se não há usuario retorna um erro 404
        if(!user){
            return res.status(404).json({"message":"usuario ou senha invalida"});
        }

        // compara a senha do request com a senha criptografada pelo bcrypt do banco de dados 
        const isMatch = await bcrypt.compare(user_info.password,user.password)

        // se a senha do request nao condiz com a do banco de dados, retorna um erro 404
        if(!isMatch){
            return res.status(404).json({"message":"usuario ou senha invalida"});
        }

        //gerar token JWT
        const token = jwt.sign({userid: user.userid, username: user.username }, JWT_SECRET)

        res.status(200).json(token)

    }catch(err){
        res.status(500).json({message:'erro'})
    }
})

// PEGAR INFORMAÇÕES DE USUARIO

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

router.get('/post/:postid',async(req,res)=>{
    const postid = parseInt(req.params.postid)
    const post = await prisma.posts.findUnique({
        where:{postID: postid}
    })
    if (!post){
        return res.status(401)
    }
    const user = await prisma.users.findUnique({
        where:{userid: post.userid}, 
        omit:{password: true, email:true, biography: true}
    })
    const json_object = {
        post: post,
        user: user
    }


    res.status(200).json(json_object)
    

})


export default router;
