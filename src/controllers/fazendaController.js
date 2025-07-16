const pool = require('../models/db')

// CREATE
exports.createFazenda = async (req, res) => {
    const { cod_fazenda, nome, talhao, tamanho_ha } = req.body;

    if (!cod_fazenda || !nome || !talhao || !tamanho_ha) {
        return res.status(400).json({ error: "Você deixou algum dos campos obrigatórios de fora!" });
    }

    try {
        const result = await pool.query(
            'INSERT INTO fazenda (cod_fazenda, nome, talhao, tamanho_ha) VALUES ($1, $2, $3, $4) RETURNING *',
            [cod_fazenda, nome, talhao, tamanho_ha]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LISTA 
exports.getFazendas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM fazenda');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LISTABYID
exports.getFazendaById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM fazenda WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Fazenda não encontrada' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE
exports.updateFazenda = async (req, res) => {
    const { id } = req.params;
    const { cod_fazenda, nome, talhao, tamanho_ha } = req.body;

    try {
        const result = await pool.query(
            `UPDATE fazenda
             SET cod_fazenda = $1, nome = $2, talhao = $3, tamanho_ha = $4
             WHERE id = $5 RETURNING *`,
            [cod_fazenda, nome, talhao, tamanho_ha, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Fazenda não encontrada' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
exports.deleteFazenda = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM fazenda WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Fazenda não encontrada' });
        }

        res.json({ message: 'Fazenda excluída com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};