const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());


const funcionarioRoutes = require('./routes/funcionarioRoutes');
const fazendaRoutes = require('./routes/fazendaRoutes');

app.use(express.json());
app.use('/api/funcionarios' , funcionarioRoutes);
app.use('/api/fazendas' , fazendaRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


