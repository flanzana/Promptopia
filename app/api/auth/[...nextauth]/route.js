import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/database';
import User from '@models/user';

// Learn more on https://next-auth.js.org/getting-started/example
const handler = NextAuth({
  providers: [
    GoogleProvider({
      // Create credentials on https://console.cloud.google.com (Create new project -> 'OAuth consent screen' -> ...)
      // Instructions in https://www.youtube.com/watch?v=wm5gMKuwSYk at 1:19-1:23
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile}) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

// next-auth requires to have export like this, same for GET and POST
export { handler as GET, handler as POST }