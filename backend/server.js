

import express from 'express'
import publicRoutes from './routes/public.js';
import privateRoutes from './routes/private.js';
import auth from './middlewares/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';




const app = express();
const corsOptions = {
    origin: ["http://127.0.0.1:5173","http://localhost:5173"]
}

app.use(cors(corsOptions));

app.use(express.json())

app.use('/',publicRoutes)
app.use('/api/', auth, privateRoutes)



// Rotas Publicas


app.get('/',(req,res) =>{

    

});

app.listen('1000', () => {

  console.log(`Servidor rodando em http://localhost:1000`);

});

