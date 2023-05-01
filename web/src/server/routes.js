const { Router } = require('express');
const { indexUser } = require('./Controllers/UsersController');
const routes = Router();


routes.get('/teste', (req, res) => {
    return res.status(200).json({ message: "Server is ON..." });
})

routes.get('/user', indexUser)
