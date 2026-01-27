import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'
import config from './config.js'

const MailSender = async (users, resetToken, blog, message) => {
    let url
    if (process.env.npm_lifecycle_event === 'dev') {
        url = `${config()}5173`
    } else {
        url = `${config()}`
    }

    let subject = ''
    let html
    const resetMail = process.env.RESET_MAIL
    const otherMail = process.env.OTHER_MAIL

    const resetTransporter = nodemailer.createTransport({
        host: 'send.one.com',
        port: 465,
        secure: true,
        auth: {
            user: resetMail,
            pass: process.env.EMAIL_PASS
        }
    })

    const notificationTransporter = nodemailer.createTransport({
        host: 'send.one.com',
        port: 465,
        secure: true,
        auth: {
            user: otherMail,
            pass: process.env.EMAIL_PASS
        }
    })

    if (resetToken) {
        const resetLink = `${url}/reset-password?token=${resetToken}`
        subject = 'Salasanan palautus'
        html = fs.readFileSync(path.resolve('emailTemplates', 'resetPassword.html'), 'utf-8')
            .replace('{{RESET_LINK}}', resetLink)

        await resetTransporter.sendMail({
            from: `"simotoivanen.fi" <${resetMail}>`,
            to: users.username,
            subject,
            html
        })

    } else if (blog) {
        subject = 'Uusi blogi osoitteesta simotoivanen.fi'
        if (blog.title !== 'TESTIOTSIKKO, ei voi muuttaa') {
            const template = fs.readFileSync(path.resolve('emailTemplates', 'newBlog.html'), 'utf-8')
            const sendResults = await Promise.allSettled(
            users.map(user => {
                const personalizedHtml = template
                .replace('{{BLOG_TITLE}}', blog.title)
                .replace('{{BLOG_SUBTITLE}}', blog.subtitle || '')
                .replace('{{BLOG_CONTENT}}', blog.content.replace(/\n/g, '<br>'))
                .replace('{{EMAIL}}', user.username)

                return notificationTransporter.sendMail({
                from: `"simotoivanen.fi" <${otherMail}>`,
                to: user.username,
                subject,
                html: personalizedHtml
                })
            }).filter(Boolean)
            )

            const failures = sendResults.filter(r => r?.status === 'rejected')
            if (failures.length > 0) {
            failures.forEach(f => console.error(failures.length, ' Sähköpostin lähetys epäonnistui:', f.reason))
            }

        } else {
            const html = fs.readFileSync(path.resolve('emailTemplates', 'newBlog.html'), 'utf-8')
            .replace('{{BLOG_TITLE}}', blog.title)
            .replace('{{BLOG_SUBTITLE}}', blog.subtitle || '')
            .replace('{{BLOG_CONTENT}}', blog.content.replace(/\n/g, '<br>'))
            .replace('{{EMAIL}}', 'test@simotoivanen.fi')

            await notificationTransporter.sendMail({
            from: `"simotoivanen.fi" <${otherMail}>`,
            to: 'test@simotoivanen.fi',
            subject,
            html
            })
        }

    } else if (message) {
        subject = `Uusi yhteydenottoviesti: ${message.email}`
        html = `
            <h3>Yhteydenotto</h3>
            <p><strong>Lähettäjä:</strong> ${message.email}</p>
            <p><strong>Viesti:</strong></p>
            <p>${message.message.replace(/\n/g, '<br>')}</p>
        `
        await notificationTransporter.sendMail({
            from: `"simotoivanen.fi" <${otherMail}>`,
            to: 'st@simotoivanen.fi',
            subject,
            html
        })
    }
}

export default MailSender