import express from 'express'
import Blog from '../models/Blog.js'

const router = express.Router()

router.get('/sitemap.xml', async (req, res) => {
  try {
    const blogs = await Blog.find({})

    let urls = blogs.map(blog => {
      return `<url><loc>https://simotoivanen.fi/blog/${blog.id}</loc></url>`
    })

    const staticUrls = [
      '<url><loc>https://simotoivanen.fi/</loc></url>',
      '<url><loc>https://simotoivanen.fi/aboutpage</loc></url>',
      '<url><loc>https://simotoivanen.fi/contact</loc></url>',
      '<url><loc>https://simotoivanen.fi/blogs</loc></url>',
      '<url><loc>https://simotoivanen.fi/exercises</loc></url>',
      '<url><loc>https://simotoivanen.fi/games</loc></url>'
    ]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${[...staticUrls, ...urls].join('\n  ')}
      </urlset>`

    res.type('application/xml')
    res.send(xml)
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
})

export { router as sitemapRouter }