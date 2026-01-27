import express from 'express'
import mongoose from 'mongoose'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './schema/typeDefs.js'
import resolvers from './schema/resolvers.js'
import jwt from 'jsonwebtoken'
import User from './models/User.js'
import Blog from './models/Blog.js'
import { passwordResetRoutes } from './routes/passwordReset.js'
import { blogNotificationRouter } from './routes/blogNotification.js'
import { sitemapRouter } from './routes/sitemap.js'

async function checkForNewContent(lastCheck) {
  const newBlogs = await Blog.find({ createdAt: { $gt: lastCheck } }).countDocuments()
  return newBlogs > 0
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', sitemapRouter)
app.use('/api', passwordResetRoutes)
app.use('/api', blogNotificationRouter)
app.use(express.static(join(__dirname, 'build')))

app.use((req, res, next) => {
    const auth = req.headers.authorization
    if (auth && auth.startsWith('Bearer ')) {
        req.token = auth.substring(7)
    }
    next()
})

app.get('/api/check-new-content', async (req, res) => {
  try {
    const lastCheckParam = req.query.lastCheck
    const lastCheck = lastCheckParam ? new Date(lastCheckParam) : new Date(0)
    const hasNewContent = await checkForNewContent(lastCheck)

    res.json({ hasNewContent, now: new Date() })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

app.get('*', async (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).send('API route not found')
  }
  res.sendFile(join(__dirname, 'build', 'index.html'))
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: "bounded",
  context: async ({ req }) => {
    const auth = req.headers.authorization
    if (auth && auth.startsWith('Bearer ')) {
      try {
        const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      } catch (err) {
        console.error('Virhe:', err.message)
        return {}
      }
    }
    return {}
  }
})

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGODB_URI

await server.start()
server.applyMiddleware({ app, path: '/graphql' })

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`MongoDB connected`)
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(err => console.error(err))