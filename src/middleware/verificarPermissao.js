function verificarPermissao(permissoesPermitidas) {
  return (req, res, next) => {
    const papel = req.user?.papel;

    if (!papel || !permissoesPermitidas.includes(papel)) {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    next();
  };
}

module.exports = verificarPermissao;
