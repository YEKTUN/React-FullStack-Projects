const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const commentRoute = require('./routes/comment')
const likeRoute = require('./routes/like')
dotenv.config()