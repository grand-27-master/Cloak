import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";
import bcrypt from "bcryptjs";

export async function POST(request:Request)
{
    await dbConnect(); 
    
    try
    {
        const {name,email,password} = await request.json();
        const user = await User.findOne({name,verified:true});
        if(user)
        {
            return Response.json({success:false,message:'Name already exists'},{status:400});
        }

        const userEmail = await User.findOne({email,verified:true});
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const expireDate= new Date();
        expireDate.setMinutes(expireDate.getMinutes()+5);

        // if user email exists
        if(userEmail)
        {
            // if user email is verified
            if(userEmail.isVerified)
            {
                return Response.json({success:false,message:'Email already exists'},{status:400});
            }

            // if user email is not verified
            else
            {
                const expireDate = new Date();
                expireDate.setMinutes(expireDate.getMinutes()+1);
                userEmail.verifyCode = verifyCode;
                userEmail.codeExpired = expireDate;
                userEmail.password = hashedPassword;
                await userEmail.save();
            }
        }

        // if user email does not exist
        else
    {
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            verifyCode,
            codeExpired: expireDate,
            isAcceptingMessages: true,
            isVerified: false,
            messages: []
        });
        await newUser.save();
    }

    // send verification email
    const emailResponse=await sendVerificationEmail(email,name,verifyCode);

    // if email sending fails
    if(!emailResponse.success)
    {
        return Response.json({success:false,message:'Failed to send verification email'},{status:500});
    }

    
    return Response.json({success:true,message:'User registered successfully'},{status:200});
}

    catch(error)
    {
        console.log('Error in user registration',error);
        return new Response(JSON.stringify({ success: false, message: 'Failed to register user' }), { status: 500 });
    }
}