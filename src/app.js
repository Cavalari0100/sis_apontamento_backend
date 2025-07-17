const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const funcionarioRoutes = require('./routes/funcionarioRoutes');
const fazendaRoutes = require('./routes/fazendaRoutes');
const authRoutes = require('./routes/authRoutes');
const timeQualidadeRoutes = require('./routes/timeQualidadeRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/funcionarios', funcionarioRoutes);
app.use('/api/fazendas', fazendaRoutes);
app.use('/api/time-qualidade', timeQualidadeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
