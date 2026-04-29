import Fastify from 'fastify'
import { envVariables } from './utils/envVariables.js'
import { authRoutes } from './routes/auth.route.js'
import { initPlugin } from './plugins/index.js'
import { logger } from './config/logger.js'
import { foodsRoute } from './routes/foods.route.js'

// App instance
const app = Fastify({
    logger: logger
})
const port = envVariables.PORT

// Plugins
app.register(initPlugin)

// Routes
app.register(authRoutes, {prefix: "/api/v1/auth"})
app.register(foodsRoute, {prefix: "/api/v1/food"})

app.listen({port: port}, (error, address) => {

    if(error){
        console.log(error)
        process.exit(1)
    }

    console.log(`Server is running on ${address}`)
})