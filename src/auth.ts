import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

//export functions generated for us based on the NextAuth function
export const {auth,handlers,signIn,signOut}=NextAuth({
    providers:[GitHub]
})