import {z} from 'zod';

export const verifySchema = z.object({
  otp: z.string().min(4, 'Token must be at least 4 digits long'),
});

export default verifySchema;