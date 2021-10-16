const Sequelize = require("sequelize")
const connection = require("./databse")

const ask = connection.define('ask',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

ask.sync({force:false}).then(()=>{
    console.log("criou")
})

module.exports = ask