import Link from "next/link"


const Page = () => {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4 flex flex-col gap-6 ">
      <h1 className="text-2xl font-bold">Verify your email address</h1>
      <p>We have sent a verification link to your email address. Please check your <a href={"https://mail.google.com"} target="_blank" className="text-blue-600 hover:underline">inbox</a> and click on the link to verify your email.</p>

      <Link href="/" className="text-blue-600 hover:underline">
        Back to Home
      </Link>
    </main>
  )
}

export default Page