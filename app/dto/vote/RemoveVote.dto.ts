import { z } from 'zod'

export const RemoveVoteDto = z.object({
  gameId: z.string(),
})

export type IRemoveVoteDto = z.infer<typeof RemoveVoteDto>
