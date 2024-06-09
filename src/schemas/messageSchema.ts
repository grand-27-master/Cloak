import {z} from 'zod';

export const messageSchema = z.object({
  message: z.string().max(500, 'Message must be at most 500 characters long')
});

export default messageSchema;