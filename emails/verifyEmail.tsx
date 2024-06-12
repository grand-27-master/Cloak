import{
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
} from '@react-email/components';
import { url } from 'inspector';
import { format } from 'path';


interface VerifyEmailProps {
    name: string;
    otp: string;
}

export default function VerifyEmail({name, otp}: VerifyEmailProps) {
    return (
        <Html lang="en" dir='ltr'>
            <Head>
                <title>Verification Code</title>
            
            <Font
            fontFamily='Roboto'
            fallbackFontFamily="Verdana"
            webFont={{url:'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
                format : 'woff2'
            }}
            fontWeight={400}
            fontStyle='normal'
            />
            </Head>

            <Preview>
                Here&apos;s your verification code: {otp}
            </Preview>

            <Section>
                <Row>
                    <Heading as='h2'>Hi {name},</Heading>
                </Row>
                <Row>
                    <Text>
                       Thank you for registering, please use the following verification code to complete your registration:
                    </Text>
                </Row>
                <Row>
                    {otp}
                </Row>
                <Row>
                   <Text>
                    If you did not request this code, please ignore this email.
                   </Text>
                </Row>
            </Section>
        </Html>
    );
}