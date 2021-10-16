const express = require("express");
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/databse")
const askModel = require("./database/Ask")
const answerModel = require("./database/Answer")

connection
    .authenticate()
    .then(() =>{
        console.log("fez a conexao")
    })
    .catch((error) =>{
        console.log(error)
    })

app.set("view engine", "ejs")
app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", (req, res) =>{
    askModel.findAll({raw:true, order:[
      ['id','DESC'] //ASC: crescente DESC: decrescente
    ]}).then(ask =>{
        res.render("index",{
            ask:ask
        })
    })
})

app.get("/ask", (req, res) =>{
    res.render("answer")
})

app.post("/saveask", (req, res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    askModel.create({
        title:titulo,
        description:descricao
    }).then(()=>{
        res.redirect("/")
    })
})

app.get("/answer/:id", (req, res) =>{
   var id= req.params.id
   askModel.findOne({
       where:{ id:id }
    }).then(ask =>{
        if(ask != undefined){
            answerModel.findAll({
             where:{askId: ask.id}, 
             order:[
                 ['id','DESC']
            ]
            }).then(answer=>{
                res.render("answerFound",{
                    ask:ask,
                    answer:answer
                })
            })
      
        }else{
         res.redirect("/")
        }
    })
})

app.post("/resolve", (req, res) =>{
  var body = req.body.body
  var askId = req.body.inputid
  answerModel.create({
        body:body,
        askId:askId
    }).then(()=>{
        res.redirect("/answer/"+askId)
    })
})

app.listen(8080, ()=>{
    console.log("rodando")
})