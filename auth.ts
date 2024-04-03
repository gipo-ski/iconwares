// // auth.ts
// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";


// import { Auth } from "@auth/core";


// const request = new Request(origin);
// const response = await Auth(request, {
// 	providers: [
// 		GitHub({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET }),
// 		Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
// 	],
// });

// export const { auth, handlers } = NextAuth({ providers: [GitHub, Google] });