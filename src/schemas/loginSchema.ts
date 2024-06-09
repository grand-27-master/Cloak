import {z} from 'zod';

export const loginSchema = z.object({
  email: z.string().email().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'enter a valid email'),
  password: z.string(),
});

export default loginSchema;