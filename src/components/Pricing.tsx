import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Check, X } from 'lucide-react';

// Initialize Stripe
const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface PricingFeature {
  name: string;
  free: boolean;
  pro: boolean;
}

const features: PricingFeature[] = [
  { name: 'Basic CGT calculation', free: true, pro: true },
  { name: 'CoinSpot CSV import', free: true, pro: true },
  { name: 'Up to 50 transactions', free: true, pro: true },
  { name: 'Current tax year only', free: true, pro: true },
  { name: 'Basic PDF report', free: true, pro: true },
  { name: 'Unlimited transactions', free: false, pro: true },
  { name: 'Multi-year tax reports', free: false, pro: true },
  { name: 'Binance CSV import', free: false, pro: true },
  { name: 'Advanced analytics', free: false, pro: true },
  { name: 'Tax loss harvesting alerts', free: false, pro: true },
  { name: 'Priority email support', free: false, pro: true },
  { name: 'Export to Excel/CSV', free: false, pro: true },
];

export default function Pricing() {
  const [isLoading, setIsLoading] = useState(false);
  // Only yearly pricing - no monthly option
const billingCycle = 'yearly';

  const handleSubscribe = async () => {
    setIsLoading(true);
    
    try {
      const stripe = await stripePromise;
      
      // Call your backend to create a checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_1TBm910r44KWiPLvZGBhZYlE',  // Your Stripe yearly price ID
        }),
      });

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });

      if (result?.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that's right for your crypto tax needs
          </p>
        </div>

        {/* Yearly Pricing Only */}
        <div className="mt-8 text-center">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Yearly subscription - Best value
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto">
          {/* Free Plan */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Free</h3>
              <p className="mt-2 text-sm text-gray-500">
                Perfect for casual crypto traders
              </p>
              <p className="mt-4">
                <span className="text-4xl font-extrabold text-gray-900">$0</span>
                <span className="text-base font-medium text-gray-500">/forever</span>
              </p>
              <button
                disabled
                className="mt-6 w-full bg-gray-100 text-gray-400 py-3 px-4 rounded-lg font-medium cursor-not-allowed"
              >
                Current Plan
              </button>
            </div>
            <div className="px-6 pt-6 pb-8">
              <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                What's included
              </h4>
              <ul className="mt-6 space-y-4">
                {features.filter(f => f.free).map((feature) => (
                  <li key={feature.name} className="flex">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-gray-700">{feature.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white border-2 border-blue-500 rounded-2xl shadow-lg divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-blue-900">Pro</h3>
              <p className="mt-2 text-sm text-blue-600">
                For serious crypto investors
              </p>
              <p className="mt-4">
                <span className="text-4xl font-extrabold text-gray-900">$29</span>
                <span className="text-base font-medium text-gray-500">/year</span>
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Less than $2.50/month
              </p>
              <button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Upgrade to Pro'}
              </button>
            </div>
            <div className="px-6 pt-6 pb-8">
              <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                Everything in Free, plus
              </h4>
              <ul className="mt-6 space-y-4">
                {features.filter(f => !f.free && f.pro).map((feature) => (
                  <li key={feature.name} className="flex">
                    <Check className="flex-shrink-0 h-5 w-5 text-blue-500" />
                    <span className="ml-3 text-sm text-gray-700">{feature.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ or Trust Badges */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Secure payment powered by Stripe. Cancel anytime.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            30-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </div>
  );
}
