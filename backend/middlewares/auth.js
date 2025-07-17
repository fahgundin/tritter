
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const JWT_SECRET = process.env.JWT_SECRET

const auth = (req, res, next) =>{

    const token = req.headers.authorization
    
    try{
        const decoded = jwt.verify(token.replace('Bearer ',''),JWT_SECRET)

        console.log(decoded)

        next

    }catch(err){
        return res.status(401).json({message:"nao autorizado"})
    }
    

}

export default auth