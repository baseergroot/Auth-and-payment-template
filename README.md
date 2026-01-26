# Auth and Payment Template

A Next.js application template featuring authentication and payment integration using Better Auth, MongoDB, Stripe, and social login.

## Features

- **Authentication**: Email/password signup and sign-in, Google OAuth
- **Email Verification**: Using Brevo for email services
- **Payment Integration**: Stripe for subscriptions with Basic and Pro plans
- **Database**: MongoDB for user and subscription data
- **UI Components**: Modern UI with custom components

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Better Auth](https://www.better-auth.com) - Authentication framework
- [MongoDB](https://www.mongodb.com) - NoSQL database
- [Stripe](https://stripe.com) - Payment processing
- [Brevo](https://www.brevo.com) - Email service
- [Tailwind CSS](https://tailwindcss.com) - Styling

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/baseergroot/Auth-and-payment-template.git
```

2. Navigate to the project directory:

```bash
cd auth-payment-template
```

3. Install dependencies:

```bash
pnpm install
```

4. Set up environment variables:

Create a `.env` file in the root directory and fill in the required values for the following environment variables:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
MONGODB_URI=
EMAIL_ADDRESS=
EMAIL_USER=
EMAIL_PASS=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_PUBLISHABLE=
STRIPE_SECRET_KEY=
BASIC_PRICE_ID=
PRO_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
```

5. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - Reusable UI components
- `src/actions/` - Server actions for auth and payments
- `src/db/` - Database connection and models
- `src/lib/` - Utility functions and configurations

## Deployment

Deploy to [Vercel](https://vercel.com) or any platform supporting Next.js.

Make sure to set all environment variables in your deployment platform's settings.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Documentation](https://www.better-auth.com)
- [Stripe Documentation](https://stripe.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
