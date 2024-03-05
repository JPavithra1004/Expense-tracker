const cors = require('cors')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const express = require('express')  
const { Expense } = require ('./schema')
const app = express()
app.use(bodyParser.json())
app.use(cors())



    /**
 * Expense Tracker
 * features and functionalitand endpoints
 * FUNCTIONALITIES
     Adding a new new expenses/income    :/add-expense -> post
     displaying existing expenses        :/get-expense -> get
    editing expenses                     :/edit-expense -> patch/put
    deleting expenses                    :/delete-expense -> delete

budget reporting
creating new user
validating user




defining schema
categories,amount,date
*/


async function connectToDb() {
  try{
    await  mongoose.connect('mongodb+srv://pavisri:pavi1004@cluster0.ip7ppiq.mongodb.net/Expensetracker?retryWrites=true&w=majority&appName=Cluster0')
    console.log('DB connection established and connected to the database')
   
     const port  = process.env.port || 8000
 app.listen(port,function(){
     console.log(`Listening on port ${port}`)
 })
  }catch {
    console.log("cant connect to the DB")
  }
}
connectToDb()

app.post('/add-expense', async function(request, response){
    try {
    await Expense.create({
        "amount": request.body.amount,
        "category" :request.body.category,
        "date": request.body.date
    })
    response.status(201).json({
        "status" : "success",
        "message" : "new entry add to the DB"
    })}
   catch(error) {
     response.status(500).json({
        "status": "failure",
        "message" : "entry not created" ,
        "error" : error
        
     })
   }
    })

    app.get('/get.expenses', async function(request, response){
        try{
        const expenseData = await Expense.find()
        response.status().json(expenseData)
        }catch(error){
        response.status(500).json({
                  "status": "failure",
                 "message" : "entry not created" ,
                 "error" : error
                })
        }
    })

    app.delete('/delete-expenses/:id', async function(request, response) {
        try {
            const expenseData = await Expense.findById(request.params.id)
            if(expenseData) {
                await Expense.findByIdAndDelete(request.params.id)
                response.status(200).json({
                    "status" : "success",
                    "message" : "deleted entry"
                })
            } else {
                response.status(404).json({
                    "status" : "failure",
                    "message" : "could not find entry"
                })
            }
        } catch(error) {
            response.status(500).json({
                "status" : "failure",
                "message" : "could not delete entry",
                "error" : error
            })
        }
    })

app.patch('/edit-expense/:id', async function(request, response) {
        try {
            const expenseEntry = await Expense.findById(request.params.id)
            if(expenseEntry) {
                await expenseEntry.updateOne({
                    "amount" : request.body.amount,
                    "category" : request.body.category,
                    "date" : request.body.date
                })
                response.status(200).json({
                    "status" : "success",
                    "message" : "updated entry"
                })
            } else {
                response.status(404).json({
                    "status" : "failure",
                    "message" : "could not find entry"
                })
            }
        } catch(error) {
            response.status(500).json({
                "status" : "failure",
                "message" : "could not delete entry",
                "error" : error
            })
        }
    })