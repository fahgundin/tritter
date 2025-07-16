

import express from 'express'
import publicRoutes from './routes/public.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';




const app = express();
const corsOptions = {
    origin: ["http://127.0.0.1:5173","http://localhost:5173"]
}
app.use(express.json())

app.use('/',publicRoutes)


app.use(cors(corsOptions));

// Rotas Publicas


app.get('/',(req,res) =>{

    res.json({fruits: ["bananas", "macas"]})

});

app.listen('1000', () => {

  console.log(`Servidor rodando em http://localhost:1000`);

});

