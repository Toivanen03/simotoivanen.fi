import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Message from '../models/Message.js'
import Blog from '../models/Blog.js'
import MailSender from '../utils/mailer.js'
import { createUserSchema, validateContact } from './userValidation.js'
import { GraphQLError } from 'graphql'
import { z } from 'zod'

const requireAuth = (user) => {
  if (!user) throw new Error("Ei valtuuksia!")
}

const requireAdmin = (user) => {
  requireAuth(user)
  if (user.username === 'test@simotoivanen.fi' || user.id === "68ecdd9525778d45ea771a33") {
    throw new Error("Toiminto ei ole käytettävissä testitunnuksilla.")
  } else if (!user.admin) {
    throw new Error("Ei valtuuksia!")
  }
}

const requireTestAdmin = (user) => {
  requireAuth(user)
  if (user.username === 'test@simotoivanen.fi' || user.id === "68ecdd9525778d45ea771a33") {
    return
  }
}

const resolvers = {
  Query: {
    me: async (_root, _args, context) => {
      return context.currentUser || null
    },

    users: async (_root, _args, context) => {
      try {
        requireTestAdmin(context.currentUser)
      } catch {
        requireAdmin(context.currentUser)
      }
      return await User.find({})
    },

    user: async (_root, { id }) => {
      const user = await User.findById(id)
      if (!user) return null

      const messages = await Message.find({ userId: id })
      user.messages = messages

      return user
    },

    blogs: async (_root, _args) => {
      return await Blog.find({})
    },

    latestBlogs: async () => {
      return await Blog.find().sort({ createdAt: -1 }).limit(2);
    },

    getBlog: async (_root, { id }) => {
      return await Blog.findById(id)
    }
  },

  Mutation: {
    newBlog: async (root, args, context) => {
      requireAdmin(context.currentUser)
      const blogTitle = args.title
      const blogSubtitle = args.subtitle || null
      const blogContent = args.content

      const newBlog = new Blog ({
        title: blogTitle,
        subtitle: blogSubtitle,
        content: blogContent,
        createdAt: new Date()
      })

      return await newBlog.save()
    },

    createUser: async (_root, { username, password, emailConsent }) => {
      try {
        createUserSchema.parse({ username, password, admin: false, emailConsent })
      } catch (err) {
        if (err instanceof z.ZodError) {
          const errors = err.errors.map(e => e.message).join('\n')
          throw new GraphQLError(errors)
        }
        throw err
      }

      const passwordHash = await bcrypt.hash(password, 10)
      const user = await new User({ username, passwordHash, admin: false, emailConsent }).save()

      const userToken = {
        username: user.username,
        id: user.id,
        admin: user.admin
      }

      return {
        value: jwt.sign(userToken, process.env.JWT_SECRET),
        user
      }
    },

    login: async (_root, { username, password }) => {
      const user = await User.findOne({ username })
      const valid = user && await bcrypt.compare(password, user.passwordHash)
      if (!valid) throw new Error("Virheellinen käyttäjätunnus tai salasana!")

      const userToken = {
        username: user.username,
        id: user._id,
        admin: user.admin
      }

      return { value: jwt.sign(userToken, process.env.JWT_SECRET) }
    },

    deleteUser: async (_root, { id }, context) => {
      requireAdmin(context.currentUser)

      const deletedUser = await User.findByIdAndDelete(id)
      if (!deletedUser) {
        throw new Error("Käyttäjää ei löytynyt")
      }

      return deletedUser
    },

    deleteBlog: async (_root, {id}, context) => {
      requireAdmin(context.currentUser)
      const blogToDelete = await Blog.findByIdAndDelete(id)
      if (!blogToDelete) {
        throw new Error("Blogia ei löydy")
      }
      return blogToDelete
    },

    deleteMany: async (root, args, context) => {
      requireAdmin(context.currentUser)
      const blogsToDelete = args.blogIds
      const result = await Blog.deleteMany({_id: {$in: blogsToDelete}})
      return { deletedCount: result.deletedCount }
    },

    updateUser: async (_root, args, context) => {
      const { id, admin, phone, about, emailConsent } = args
      const user = await User.findById(id)
      if (!user) throw new Error('Käyttäjää ei löytynyt')

      if (context.currentUser.username !== 'test@simotoivanen.fi') {
        if (context.currentUser.username === 'posti@simotoivanen.fi' || context.currentUser.username === 'st@simotoivanen.fi') {
          if (admin !== undefined) user.admin = admin
        }

        if (about !== undefined) user.about = about
        if (emailConsent !== undefined) user.emailConsent = emailConsent
      }

      if (phone !== undefined) user.phone = phone

      await user.save()
      return user
    },

    updateBlog: async (_root, args, context) => {
      requireAdmin(context.currentUser)
      const { id, title, subtitle, content } = args
      const blog = await Blog.findById(id)
      if (!blog) throw new Error('Blogia ei löytynyt')

      if (title !== undefined) blog.title = title
      if (subtitle !== undefined) blog.subtitle = subtitle
      if (content !== undefined) blog.content = content

      await blog.save()
      return blog
    },

    updatePassword: async (_root, { currentPassword, newPassword, token }, context) => {
      let user

      if (context.currentUser) {
        user = await User.findById(context.currentUser.id)
        if (!user) {
          throw new Error("Käyttäjää ei löytynyt")
        }

        if (user.username === 'test@simotoivanen.fi') {
          throw new Error("Testikäyttäjän salasanaa ei voi vaihtaa.")
        }

        const passwordCorrect = await bcrypt.compare(currentPassword, user.passwordHash)
        if (!passwordCorrect) {
          throw new Error("Väärä nykyinen salasana")
        }

      } else if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET)
          user = await User.findById(decoded.id)
          if (!user) {
            throw new Error("Käyttäjää ei löytynyt")
          }
          if (user.resetToken !== token) {
            throw new Error("Virheellinen tai vanhentunut linkki")
          }

          if (!user.resetTokenExpiry || user.resetTokenExpiry <= new Date()) {
            throw new Error("Virheellinen tai vanhentunut linkki")
          }
        } catch {
          throw new Error("Virheellinen tai vanhentunut linkki")
        }

      } else {
        throw new Error("Ei oikeuksia")
      }

      const passwordHash = await bcrypt.hash(newPassword, 10)
      user.passwordHash = passwordHash
      user.resetToken = null
      user.resetTokenExpiry = null
      await user.save()

      return { id: user.id }
    },

    sendMessage: async (root, args, context) => {
      const userId = context.currentUser ? context.currentUser._id : null
      const email = args.email
      const message = args.message
      
      try {
        validateContact.parse({ email, message })
      } catch (error) {
          if (error instanceof z.ZodError) {
            const errors = error.errors.map(e => e.message).join('\n')
            throw new GraphQLError(errors)
          }
          throw error
      }

      const newMessage = new Message({
        userId: userId,
        email: email,
        message: message,
        createdAt: new Date()
      })

      await newMessage.save()

      try {
        await MailSender(
          { username: 'posti@simotoivanen.fi' },
          null,
          null,
          { email, message }
        )
      } catch (mailError) {
        console.error('Sähköposti-ilmoitus epäonnistui:', mailError)
      }
      return newMessage
    },
  }
}

export default resolvers