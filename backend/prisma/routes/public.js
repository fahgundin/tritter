import express from 'express';
import React from 'react';

const router = express.Router();

// Cadastro

router.post('/signup',(req,res)=>{
    const user = req.body;

    

});

router.get('/',(res,req) =>{
   res.send("aa")
});

export default router;
