import vine from '@vinejs/vine'

export const updateAuthorValidator = vine.compile(
  vine.object({
    age: vine.number().min(1).max(100),

    params: vine.object({
      id: vine.number(),
    }),
  })
)
