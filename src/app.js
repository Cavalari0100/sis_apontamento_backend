const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());


const funcionarioRoutes = require('./routes/funcionarioRoutes');
app.use(express.json());
app.use('/api/funcionarios' , funcionarioRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


