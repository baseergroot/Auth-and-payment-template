import { DropdownMenuAvatar } from "@/components/dropDownProfile";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Github } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {

  const session = await auth.api.getSession({ headers: await headers() });

  // console.log("Session:", session);

  return (
    <main className="w-screen h-screen">
      <nav className="flex justify-between items-center p-5 w-full h-1/10 ">
        <section>
          <span className="font-bold">Better Auth</span>
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
          <section className="w-full h-5/10 flex flex-col items-center justify-center gap-5">
            <h2 className="text-2xl text-center font-bold">Welcome back, {session.user?.email}!</h2>
            <p className="text-center px-5">You are successfully logged in. Explore the features of the Better Auth Template and start building your application.</p>
          </section>
        ) : (
          <section className="w-full h-5/10 mt-20 px-7  flex flex-col items-center gap-5">
            <h1 className="text-2xl text-center font-bold">Better Auth <br className="md:hidden" /> Template</h1>
            <p className="text-center">
              A clean, minimal starter kit for your next project. Secure authentication, session managment, and simple integration out of the box.
            </p>
            <Button>
              <Link href={"/signup"}>Create an Account</Link>
            </Button>
          </section>
        )
      }
    </main>
  );
}
