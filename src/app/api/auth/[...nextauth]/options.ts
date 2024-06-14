import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Session } from "inspector";

const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({

          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          id: "credentials",
        
          credentials: {
            email: { label: "Email", type: "email"},
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials:any): Promise<any> {
            await dbConnect();
            
            try {
                const user = await UserModel.findOne({$or:[{ email: credentials.identifier }, {name:credentials.identifier}],});
                if (!user) {
                    throw new Error('No user found with this email');
                  }
                  if (!user.isVerified) {
                    throw new Error('Please verify your account before logging in');
                  }
                  const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                  );
                  if (isPasswordCorrect) {
                    return user;
                  } else {
                    throw new Error('Incorrect password');
                  }
                }
            catch (error) {
                console.log("Failed to authorize user",error);
                return null;
            }
          }
        })
      ],

      pages: {
        signIn: "/sign-in"
      },


    session: {
        strategy: "jwt",
    },

    secret: process.env.SECRET_KEY,

    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id?.toString();
                token.name = user.name;
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
            }
    
            else
            console.log("No user found in jwt callback");
    
            return token;
        },
        async session({session, token}) {
           if(token) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.isVerified = token.isVerified;
            session.user.isAcceptingMessages = token.isAcceptingMessages;
            }

            else
            console.log("No token found in session callback");

            return session;
        }
    }
};

export default options;