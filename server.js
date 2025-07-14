

import express from 'express'
import publicRoutes from './routes/public.js';


const app = express();
app.use(express.json())

// Rotas Publicas
app.use('/',publicRoutes)


app.listen(1000, () => console.log("Servidor Rodando"));

//postgresql://postgres:[e436YYuaZ5Im]@db.nyksufcqiighnjcvkoee.supabase.co:5432/postgres