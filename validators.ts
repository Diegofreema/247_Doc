import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter your email',
      invalid_type_error: 'Please enter a valid email',
    })
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string({ required_error: 'Please enter your password' })
    .min(1, { message: 'Password must be at least 5 characters long' }),
});
export const forgotSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter your email',
      invalid_type_error: 'Please enter a valid email',
    })
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Please enter a valid email address' }),
});

export const defaultDateOfBirth = new Date(
  new Date().setFullYear(new Date().getFullYear() - 18)
);
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .regex(
        passwordRegExp,
        'Password must include at least one capital letter, one number, one lower case letter, and one special character'
      ),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    address: z.string().min(1, 'Address is required'),
    gender: z.string().min(1, 'State is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(
        passwordRegExp,
        'Password must include at least one capital letter, one number, one lower case letter, and one special character'
      ),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
