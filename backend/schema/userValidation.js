import { z } from 'zod'

export const createUserSchema = z.object({
  username: z.string()
    .email('\n- Käyttäjätunnuksen on oltava kelvollinen sähköpostiosoite'),
  password: z.string()
    .min(8, '\n- Salasanan on oltava vähintään 8 merkkiä pitkä')
    .refine(val => /[a-zA-Z]/.test(val), '\n- Salasanassa tulee olla kirjaimia')
    .refine(val => /\d/.test(val), '\n- Salasanassa tulee olla numeroita')
    .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), '\n- Salasanassa on oltava vähintään yksi erikoismerkki'),
  admin: z.boolean()
})

export const validateContact = z.object({
  email: z.string()
    .refine(value => {
      const isEmail = z.string().email().safeParse(value).success
      const isPhone = /^(\+|0)[1-9][0-9]*$/.test(value) && value.length >= 8 && value.length <= 12
      return isEmail || isPhone
    }, {
      message: '\n- Anna kelvollinen sähköpostiosoite tai puhelinnumero',
    }),
  message: z.string()
    .min(5, '\n- Kirjoita viesti')
    .max(1000, '\n- Liian pitkä viesti')
    .refine(val => val.trim().split(/\s+/).length >= 3, {
      message: '\n- Liian lyhyt viesti, kirjoita vähintään kolme sanaa.'
    })
})