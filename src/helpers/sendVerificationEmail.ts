import {resend} from '../lib/resend'
import VerifyEmail from '../../emails/verifyEmail'
import { ApiResponse } from '@/types/ApiResponse'

export async function sendVerificationEmail(email: string, name: string, otp: string): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Code',
            react: VerifyEmail({name, otp})
        });
        return {
            success: true,
            message: "Verification email sent successfully.",
        };
    } catch (error) {
        return {
            success: false,
            message: "Failed to send verification email, please try again later.",
        };
    }
}

export default sendVerificationEmail;