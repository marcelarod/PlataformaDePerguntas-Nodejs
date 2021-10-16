const Sequelize = require("sequelize")
const connection = require("./databse")

const answer= connection.define('answer',{
    body:{ 
        type: Sequelize.TEXT,
        allowNull: false
    },
    askId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
answer.sync({force:false})

module.exports = answer