import express from 'express'
import User from '../models/User.js'
import MailSender from '../utils/mailer.js'

const router = express.Router()

router.post('/blogsender', async (req, res) => {
    const blog = req.body
    const recipients = await User.find({emailConsent: true})

    try {
        if (recipients.length > 0) {
            await MailSender(recipients, null, blog)

            res.status(200).json({
                message: "Ilmoitus lähetetty tilaajille"
            })
        } else {
            res.status(202).json({
                message: "Ei tilaajia"
            })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Palvelinvirhe' })
    }
})

export { router as blogNotificationRouter }