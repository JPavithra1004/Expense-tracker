const mongoose = require('mongoose')

const Expensetrackerschema = new mongoose.Schema({
    amount: {
        type :Number
    },
    category : {
        type : String
    },
    date : {
        type : String
    }
})
const Expense = mongoose.model('expensedetails',
Expensetrackerschema)

module.exports = {Expense}