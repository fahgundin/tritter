

import express from 'express'
import publicRoutes from './routes/public.js';
import path from 'path';
import { fileURLToPath } from 'url';



const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(process.cwd(), 'public')));



// Rotas Publicas
// app.use('/',publicRoutes)

app.get('/',(req,res) =>{
//    res.render(path.join(process.cwd(),'react', 'index'))
    res.sendFile(path.join(__dirname, '../client/index.html'))
});







app.listen(1000, () => console.log("Servidor Rodando"));

//