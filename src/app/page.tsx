import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

export default async function Home() {

  // const session = true
  
  return (
    <main className="w-screen h-screen">
      <nav className="flex justify-between items-center p-5 w-full h-1/10 ">
        <section>
          <span className="font-bold">Better Auth</span>
        </section>
        <section className="flex gap-3 items-center">
          <Github />
          <Button>
            <Link href={"/login"}>Login</Link>
          </Button>
        </section>
      </nav>

      <section className="w-full h-5/10 mt-20 px-7  flex flex-col items-center gap-5">
        <h1 className="text-2xl text-center font-bold">Better Auth <br className="md:hidden" /> Template</h1>
        <p className="text-center">
          A clean, minimal starter kit for your next project. Secure authentication, session managment, and simple integration out of the box.
        </p>
        <Button>
          <Link href={"/signup"}>Create an Account</Link>
        </Button>
      </section>
    </main>
  );
}
