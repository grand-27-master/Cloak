import {z} from 'zod';

export const acceptMessageSchema = z.object({
  acceptMessage: z.boolean(),
});

export default acceptMessageSchema;