"use client"
import upgradeSubscription from '@/actions/subscription/upgrade';
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/aut-client';
import React, { useEffect, useState, useTransition } from 'react'
import CancelSubsciptionBtn from './cancelSubsciptionBtn';

interface SubscriptionLimits {
  projects: number;
  storage: number;
}

interface Subscription {
  id: string;
  limits: SubscriptionLimits;
  plan: string;
  priceId: string;
  referenceId: string;
  seats: number;
  status: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  periodStart: Date;
  periodEnd: Date;
  cancelAt: Date | null;
  cancelAtPeriodEnd: boolean;
  canceledAt: Date | null;
  endedAt: Date | null;
}

type ProjectLimit = number[];

const SubscriptionsComp = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [limits, setLimits] = useState<ProjectLimit | null>(null);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);

  const handleBasic = async () => {
    
    startTransition(async () => {
      const result = await upgradeSubscription();
      if (result?.url) {
        window.location.href = result.url;
      }
    })
    
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: subscriptions, error } = await authClient.subscription.list();

      // get the active subscription
      const activeSubscription = subscriptions?.find(
        sub => sub.status === "active" || sub.status === "trialing"
      ) || null;

      console.log({ activeSubscription });

      setSubscription(activeSubscription as Subscription | null);

      // Check subscription limits
      const projectLimit: number[] | null = subscriptions ? subscriptions.map(sub => {
        const limits = sub.limits as SubscriptionLimits | undefined;
        return limits?.projects || 0;
      }) : null;

      setLimits(projectLimit);

      console.log({ projectLimit });
      setLoading(false);
    })()
  }, [])

  if (loading) {
    return (
      <section className="w-full h-5/10 flex flex-col items-center justify-center gap-5 px-7">
        <p>Loading subscription...</p>
      </section>
    );
  }

  return (
    <section className="w-full h-5/10 flex flex-col items-center justify-center gap-5 px-7">
      {
        subscription ? (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md max-w-md w-full">
            <h3 className="text-xl font-bold text-center mb-4">Your Subscription</h3>
            <p className="mb-2"><strong>Plan:</strong> {subscription.plan}</p>
            <p className="mb-2"><strong>Status:</strong> {subscription.status}</p>
            <p className="mb-2"><strong>Seats:</strong> {subscription.seats}</p>
            <p className="mb-2"><strong>Limits:</strong> Projects: {subscription.limits?.projects || 0}, Storage: {subscription.limits?.storage || 0} GB</p>
            <p className="mb-2"><strong>Period Start:</strong> {subscription.periodStart.toLocaleDateString()}</p>
            <p className="mb-2"><strong>Period End:</strong> {subscription.periodEnd.toLocaleDateString()}</p>
            <p className="mb-2"><strong>Project Limits:</strong> {limits?.join(', ')}</p>
            {subscription.cancelAtPeriodEnd && <p className="mb-2 text-red-500"><strong>Note:</strong> Subscription will cancel at period end.</p>}
            <CancelSubsciptionBtn />
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">No Active Subscription</h3>
            <p className="mb-4">Upgrade to access premium features.</p>
            <Button onClick={handleBasic} disabled={isPending}>
              {isPending ? 'Processing...' : 'Buy Basic'}
            </Button>
          </div>
        )
      }
    </section>
  )
}

export default SubscriptionsComp