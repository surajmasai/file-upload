const express = require('express');

const usercontroller = require('./controllers/users.controller');

const gallerycontroller = require('./controllers/gallery.controller');

const app = express();

app.use(express.json());

app.use("/users", usercontroller);

app.use("/gallery", gallerycontroller);



module.exports = app;