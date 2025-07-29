

import express from 'express'
import publicRoutes from './routes/public.js';
import privateRoutes from './routes/private.js';
import auth from './middlewares/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
const port = process.env.PORT || 1000;



const app = express();
const corsOptions = {
    origin: ["http://127.0.0.1:5173","http://localhost:5173"]
}

app.use(cors(corsOptions));

app.use(express.json())

app.use('/',publicRoutes)
app.use('/', auth, privateRoutes)



// Rotas Publicas


app.get('/',(req,res) =>{

    

});

app.listen(port, () => {

  console.log(`Servidor rodando na porta 1000!`);

});

