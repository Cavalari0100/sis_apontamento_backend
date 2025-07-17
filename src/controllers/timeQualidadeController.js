const model = require('../models/timeQualidadeModel');

exports.criar = async (req, res) => {
  const { nome, funcao_no_time } = req.body;
  const criado_por = req.user.id;

  try {
    const membro = await model.criarMembro(nome, funcao_no_time, criado_por);
    res.status(201).json(membro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarMenbrosQualidade = async (req, res) => {
  try {
    const membros = await model.listarTime();
    res.json(membros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

