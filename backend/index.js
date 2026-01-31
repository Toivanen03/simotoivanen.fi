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

const isBot = ua =>
  /facebookexternalhit|Facebot|LinkedInBot|LinkedInBot\/[0-9.]+|Twitterbot|Slackbot|Discordbot|WhatsApp|Googlebot/i.test(ua)

const esc = s =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const trim = (text, len = 160) => {
  if (!text) return ''
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= len) return t
  return t.slice(0, len).replace(/\s+\S*$/, '') + '…'
}

async function checkForNewContent(lastCheck) {
  const newBlogs = await Blog.find({ createdAt: { $gt: lastCheck } }).countDocuments()
  return newBlogs > 0
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()

const app = express()

app.use(cors({
  origin: ['https://blogs.simotoivanen.fi', 'https://lifeline.simotoivanen.fi', 'https://www.blogs.simotoivanen.fi', 'https://www.lifeline.simotoivanen.fi', 'https://simotoivanen.fi', 'https://www.simotoivanen.fi'],
  credentials: true
}))

app.use(express.json())
app.use('/api', passwordResetRoutes)
app.use('/api', blogNotificationRouter)

app.use((req, res, next) => {
    const auth = req.headers.authorization
    if (auth && auth.startsWith('Bearer ')) {
        req.token = auth.substring(7)
    }
    next()
})

app.get('/blog/:id', async (req, res, next) => {
  const ua = req.get('user-agent') || ''

  if (!isBot(ua)) return next()

    try {
      const blog = await Blog.findById(req.params.id).lean()
      if (!blog) return res.status(404).end()

      const descriptionSource = blog.subtitle || blog.content || ''

      const url = `https://blogs.simotoivanen.fi/blog/${blog._id}`

      res.send(`
      <!DOCTYPE html>
      <html lang="fi">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>${esc(blog.title)}</title>
        <link rel="canonical" href="${url}" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="${esc(blog.title)}" />
        <meta property="og:description" content="${esc(trim(descriptionSource))}" />
        <meta property="og:image" content="https://simotoivanen.fi/img/blogImg.png" />
        <meta property="og:url" content="${url}" />
      </head>
      <body>
        <h1>${esc(blog.title)}</h1>
      </body>
      </html>
      `)
  } catch (err) {
    return res.status(404).end()
  }
})

app.get('/', (req, res, next) => {
  const ua = req.get('user-agent') || ''

  if (!isBot(ua)) return next()

  const url = 'https://simotoivanen.fi'
  const title = 'Simo Toivanen - Ohjelmistokehittäjä. Projektini ja portfolioni. Tervetuloa!'
  const description = 'Sivustoni esittelee ohjelmistokehittäjä Simo Toivasen projekteja ja osaamista. Rakennettu moderneilla web-teknologioilla kuten React, Apollo Client, GraphQL, Express, MongoDB ja Bootstrap.'

  res.send(`
    <!DOCTYPE html>
    <html lang="fi">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${esc(title)}</title>
        <meta name="description" content="${esc(description)}" />
        <meta property="og:title" content="${esc(title)}" />
        <meta property="og:description" content="${esc(description)}" />
        <meta property="og:image" content="https://simotoivanen.fi/img/simo.jpg" />
        <meta property="og:url" content="${url}" />
        <link rel="canonical" href="${url}" />
      </head>
      <body>
        <h1>Simo Toivanen - Ohjelmistokehittäjä. Projektini ja portfolioni. Tervetuloa!</h1>
        <div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>
  `)
})

app.use(express.static(join(__dirname, 'build')))

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