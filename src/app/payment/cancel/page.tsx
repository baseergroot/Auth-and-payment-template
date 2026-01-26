import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentCancel() {
  return (
    <main className="w-screen h-screen">
      <nav className="flex justify-between items-center p-5 w-full h-1/10">
        <section>
          <span className="font-bold">Better Auth</span>
        </section>
      </nav>

      <section className="w-full h-9/10 flex flex-col items-center justify-center gap-6 px-7">
        <div className="flex justify-center">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>

        <h1 className="text-3xl text-center font-bold">Payment Cancelled</h1>

        <p className="text-center text-gray-600 max-w-md">
          Your payment has been cancelled. No charges have been made. You can try again or explore our plans at any time.
        </p>

        <div className="flex gap-4 mt-4">
          <Button>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button variant="outline">
            <Link href="/#subscription">View Plans</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
