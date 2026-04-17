import { os } from '@orpc/server'
import * as z from 'zod'

export const auth = os
  .input(
    z.object({
      password: z.string(),
    }),
  )
  .handler(() => {
    // your list code here
    return [{ id: 1, name: 'name' }]
  })
