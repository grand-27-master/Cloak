import {z} from 'zod';

export const signupSchema = z.object({
  email: z.string().email().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'enter a valid email'),
  password: z.string().min(5, 'Password must be at least 5 characters long'),
  name: z.string().min(3, 'Name must be at least 3 characters long'),
});

export default signupSchema;