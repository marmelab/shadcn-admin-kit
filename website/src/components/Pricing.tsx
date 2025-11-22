import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Open-Source",
    id: "free-tier",
    href: "https://marmelab.com/shadcn-admin-kit/docs/install/",
    price: "$0",
    priceFreq: "/month",
    description: "The one and only tier",
    features: [
      "Unlimited users",
      "Unlimited projects",
      "Free SSO",
      "Host on Supabase or your own infrastructure",
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="bg-black py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-white uppercase">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Free as in beer
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Shadcn Admin Kit is open-source and free to use.
          <br />
          We already make a living with{" "}
          <a href="https://marmelab.com/react-admin">react-admin</a>.
        </p>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div></div>
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="ring-1 ring-black/10 rounded-3xl p-8 xl:p-10 bg-white"
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3 id={tier.id} className="text-2xl font-semibold leading-8">
                  {tier.name}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-700">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight">
                  {tier.price}
                </span>
                <span className="text-sm">{tier.priceFreq}</span>
              </p>

              <ul
                role="list"
                className="mt-8 space-y-2 text-sm leading-6 text-gray-700 xl:mt-10"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check aria-hidden="true" className="h-6 w-5 flex-none" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-10 w-full" size="lg">
                <a href={tier.href} aria-describedby={tier.id}>
                  Get started
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
