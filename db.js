const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'universities_api',
  password: 'password',
  port: 5432,
});

const getAllProfessors = (request, response) => {
  pool.query('SELECT * FROM professors ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addProfessor = (request, response) => {
  const { name, title, school, department, difficulty } = request.body;

  pool.query('INSERT INTO professors (name, title, school, department, difficulty)' + 'VALUES ($1, $2, $3, $4, $5) RETURNING id', [name, title, school, department, difficulty], (error, result) => {
    if (error) {
      throw error;
    }
    response.status(201).send(result.body);
  });
};

module.exports = {getAllProfessors, addProfessor};