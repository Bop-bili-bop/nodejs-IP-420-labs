const { sequelize, Language } = require('./models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connection OK');

    const langs = await Language.findAll({ limit: 3 });
    console.log('Languages:', langs.map(l => l.name));

    console.log('Associations OK');
    process.exit(0);
  } catch (err) {
    console.error('Smoke test failed:', err.message);
    process.exit(1);
  }
})();
