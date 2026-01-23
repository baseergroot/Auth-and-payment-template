This is a Authentication Template project bootstrapped with Nextjs App Router, Better Auth and Mongodb.

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/baseergroot/Auth-Template.git
```

2. Enter project directory:
```bash
cd Auth-Template
```

3. Enter project directory:
```bash


BETTER_AUTH_SECRET= # Your better auth secret
BETTER_AUTH_URL=http://localhost:3000 # Base URL of your app

# Your Mongodb URI
MONGODB_URI=

# this from "https://app.brevo.com"
EMAIL_ADDRESS=
EMAIL_USER=
EMAIL_PASS=

# Get your keys from "https://console.cloud.google.com"
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

```

4. Install dependencies:
```bash
pnpm i
```

5. Run project:
```bash
pnpm dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about tech stack used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Better Auth](https://www.better-auth.com) - Self host authentication framework.
- [Mongodb](https://www.mongodb.com) - NoSQL Database.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
