const Sequelize = require("sequelize")

const connection = new Sequelize('answer', 'root', 'demulidor123',{
    host: "localhost",
    dialect: "mysql"
})

module.exports = connection;