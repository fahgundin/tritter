

import express from 'express'
import publicRoutes from './routes/public.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';



const app = express();
const corsOptions = {
    origin: ["http://127.0.0.1:5173"]
}

app.use(cors(corsOptions));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));



// Rotas Publicas
// app.use('/',publicRoutes)

app.get('/',(req,res) =>{
//    res.render(path.join(process.cwd(),'react', 'index'))
    res.json({fruits: ["bananas", "macas"]})
});

app.listen('1000', () => {
  console.log(`Servidor rodando em http://localhost:1000`);
});

//