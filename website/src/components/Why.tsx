import { Container } from "./Container";
import {
  BicepsFlexed,
  Plug,
  GraduationCap,
  LayoutPanelLeft,
  LockOpen,
  Sparkles,
} from "lucide-react";

const features = [
  {
    name: "Get a head start",
    description:
      "Kickstart your project with pre-built components that help you ship your admin faster than ever—no need to reinvent the wheel.",
    icon: LayoutPanelLeft,
  },
  {
    name: "Trusted expertise",
    description:
      "Maintained by senior developers with proven open-source expertise (80k+ stars).",
    icon: GraduationCap,
  },
  {
    name: "Headless",
    description:
      "Exposes a rich library of hooks that can be used with any React component.",
    icon: Plug,
  },
  {
    name: "No lock-in",
    description:
      "The code is open-source. Host it anywhere with zero hidden costs.",
    icon: LockOpen,
  },
  {
    name: "Industry best practices",
    description:
      "Composability, separation of concerns, strict typing, batteries included but removable, awesome DX.",
    icon: BicepsFlexed,
  },
  {
    name: "AI ready",
    description: "Shadcn admin kit comes with an MCP server.",
    icon: Sparkles,
  },
];

export function Why() {
  return (
    <section
      id="why"
      aria-label="Why choose Shadcn Admin Kit"
      className="py-20"
    >
      <Container>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Why choose Shadcn Admin Kit?
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-xl font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                      <feature.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
