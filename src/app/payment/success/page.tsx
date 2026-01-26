import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <main className="w-screen h-screen">
      <nav className="flex justify-between items-center p-5 w-full h-1/10">
        <section>
          <span className="font-bold">Better Auth</span>
        </section>
      </nav>

      <section className="w-full h-9/10 flex flex-col items-center justify-center gap-6 px-7">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        <h1 className="text-3xl text-center font-bold">Payment Successful</h1>

        <p className="text-center text-gray-600 max-w-md">
          Thank you for your subscription. Your payment has been processed successfully. You now have access to all premium features.
        </p>

        <div className="flex gap-4 mt-4">
          <Button>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button variant="outline">
            <Link href="/dashboard">View Dashboard</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
