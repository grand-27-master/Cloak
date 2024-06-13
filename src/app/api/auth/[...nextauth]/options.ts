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
            email: { label: "Email", type: "email", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials:any): Promise<any> {
            await dbConnect();
            
            try {
                const user = await UserModel.findOne({ email: credentials.email }, {name:credentials.name});
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return user;
                } else {
                    throw new Error("Invalid credentials");
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
        signIn: "/signin"
      },


    session: {
        strategy: "jwt",
    },

    secret: process.env.SECRET_KEY,

    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
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