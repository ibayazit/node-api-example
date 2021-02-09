const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

const app = express()

// Utils
const config = require('./src/utils/config')

// Middlewares
const auth = require('./src/middleware/auth')

// Database
const {startDatabase} = require('./src/database/mongo')
const {insertAd} = require('./src/database/ads')
const {insertUser, findUser} = require('./src/database/user')

app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

// Middleware
app.use('/api', auth.isAuthorized, (req, res, next) => {
    console.log('api connection found...')
    next()
})

// Routers
const adRouter = require('./src/routes/v1/ad')

app.use('/api', adRouter)

// Welcome
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/login', async (req, res) => {
    const user = await findUser(req.body.id)

    res.json({
        access_token : jwt.sign(user, config.app.key)
    })
})

// Fallback Route
app.get('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

// Listen
startDatabase().then(async () => {
    await insertAd({title: "Hello there! It Works..."})
    const userID = await insertUser({name: "İbrahim", surname: "Bayazit", email: "ibrbayazit@gmail.com"})

    app.listen(config.app.port, () => {
        console.log('Server started...', userID)
    })
})