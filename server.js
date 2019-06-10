// bring in express
const express = require('express');

// create express server
const server = express();

// link to account model
const AccountModel = require('./data/accounts-model')

// your code here

server.get('/', async (req, res) => {
    try {
        const am = await AccountModel.find()
        res.status(200).json(am)
    } catch (error) {
        res.status(500).json({
            message: "The account information could not be retrieved"
        })
    }
});

// GET Accounts by ID
server.get('/:id', async (req, res) => {
    try {
        const am = await AccountModel.findById(req.params.id)
        res.status(200).json(am)
    } catch (error) {
        res.status(500).json({
            message: "The account information could not be retrieved"
        })
    }
})


// ADD Account
server.post('/', async (req, res) => {
    try {
        const am = await AccountModel.add(req.body)
        res.status(201).json(am)
    } catch (error) {
        res.status(500).json({
            message: "Please provide all the content necessary"
        })
    }
});


// UPDATE Account
server.get('/:id', async (req, res) => {
    try {
        const am = await AccountModel.update(req.params.id, req.body)
        if (am) {
            res.status(200).json(am)
        } else {
            res.status(404).json({
                message: "The account wit hthe specified ID does not exist"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "The account information could not be modified"
        })
    }
})

// REMOVE Account
server.delete('/:id', async (req, res) => {
    try {
        const count = await AccountModel.remove(req.params.id)
        if (count > 0) {
            res.status(200).json({
                message: "The account has been deleted"
            })
        } else {
            res.status(404).json({
                message: "The account with the specific ID does not exist"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "The account could not be removed"
        })
    }
})

module.exports = server;