import { DropdownMenuAvatar } from "@/components/dropDownProfile";
import SubscriptionsComp from "@/components/subscription";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Github } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {

  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <main className="w-screen h-screen">
      <nav className="flex justify-between items-center p-5 w-full h-1/10 ">
        <section>
          <div className="flex flex-col">
            <span className="font-bold">Better Auth</span>
            <span className="text-xs text-gray-500">Auth + Payment</span>
          </div>
        </section>
        <section className="flex gap-3 items-center">
          <a href="https://github.com/baseergroot/Auth-Template.git" target="_blank" rel="noopener noreferrer">
            <Github />
          </a>

          {
            session ? (
              <DropdownMenuAvatar user={session.user} />
            ) :
              (
                <Button>
                  <Link href={"/login"}>Login</Link>
                </Button>
              )
          }

        </section>
      </nav>

      {
        session ? (
          <section className="w-full h-3/10 flex flex-col items-center justify-center gap-5">
            <h2 className="text-2xl text-center font-bold">Welcome back, {session.user?.email}!</h2>
            <p className="text-center px-5">You are successfully logged in. Explore the features of the Better Auth Template and start building your application.</p>
          </section>
        ) : (
          <section className="w-full h-5/10 mt-20 px-7  flex flex-col items-center gap-5">
            <h1 className="text-2xl text-center font-bold">Better Auth <br className="md:hidden" /> + Payment Template</h1>
            <p className="text-center">
              A complete starter kit with secure authentication, payment integration, and subscription management out of the box.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md text-sm text-center">
              <p className="font-semibold text-yellow-800 mb-2">⚠️ Demo Mode - Do Not Pay</p>
              <p className="text-yellow-700 mb-2">Use this test card for demo:</p>
              <p className="font-mono text-yellow-900">4242 4242 4242 4242 | Name: Demo</p>
            </div>
            <Button>
              <Link href={"/signup"}>Create an Account</Link>
            </Button>
          </section>
        )
      }

      {
        session && <SubscriptionsComp />
      }
      {/* <CancelSubsciptionBtn /> */}
    </main>
  );
}
