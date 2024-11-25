const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados');
    app.listen(PORT, () => {
      console.log(`Rodando no endereço http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error);
  });