const app = require('./src/app');
const db = require('./src/models/index').sequelize
const port = process.env.PORT || 5000;

db.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})