

import express from 'express'
import publicRoutes from './routes/public.js';
import path from 'path';


const app = express();


// Rotas Publicas
// app.use('/',publicRoutes)

app.get('/',(req,res) =>{
   res.render(path.join(process.cwd(),'react', 'index.html'))
});

console.log(path.join(process.cwd(),'react', 'index.html'))





app.listen(1000, () => console.log("Servidor Rodando"));

//