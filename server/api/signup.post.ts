import { z } from 'zod'
import { PASSWORD_EXPRESSION } from '~/constants/expressions'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().regex(PASSWORD_EXPRESSION),
  subscribe: z.boolean().optional()
})

export default defineEventHandler(async (event) => {
  const isValid = await readValidatedBody(event, bodySchema.parse)

  if (!isValid) {
    return {
      statusCode: 400,
      message: 'Invalid request'
    }
  }

  // TODO: check if user already exists, and create a new user

  return {
    statusCode: 200,
    message: 'User created successfully'
  }
})