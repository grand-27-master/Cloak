import 'next-auth'

declare module 'next-auth' {
    interface User {
        id?: string
        name?: string
        isVerified?: boolean
        isAcceptingMessages?: boolean
    }

    interface Session {
       user: {id?: string
        name?: string
        isVerified?: boolean
        isAcceptingMessages?: boolean
    }& DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string
        name?: string
        isVerified?: boolean
        isAcceptingMessages?: boolean
    }
}