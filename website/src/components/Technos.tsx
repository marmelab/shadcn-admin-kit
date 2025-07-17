import { Container } from "./Container";

import TypeScriptLogo from "/img/ts-logo.svg";
import ReactLogo from "/img/react-logo.svg";
import ShadcnUILogo from "/img/shadcn-ui-logo.svg";
import ReactRouterLogo from "/img/react-router-logo.svg";
import ReactQueryLogo from "/img/react-query-logo.svg";
import TailwindLogo from "/img/tailwind-logo.svg";
import RadixUILogo from "/img/radix-ui-logo.svg";
import ReactHookFormLogo from "/img/react-hook-form-logo.svg";

const technos = [
  {
    name: "React",
    logo: ReactLogo,
  },
  {
    name: "shadcn/ui",
    logo: ShadcnUILogo,
  },
  {
    name: "Tailwind CSS",
    logo: TailwindLogo,
  },
  {
    name: "Radix UI",
    logo: RadixUILogo,
  },
  {
    name: "React Router",
    logo: ReactRouterLogo,
  },
  {
    name: "TanStack Query",
    logo: ReactQueryLogo,
  },
  {
    name: "React Hook Form",
    logo: ReactHookFormLogo,
  },
  {
    name: "TypeScript",
    logo: TypeScriptLogo,
  },
];

export function Technos() {
  return (
    <section id="techno" aria-label="Logo clous" className="bg-black py-24">
      <Container>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 justify-items-center">
            <div className="mx-auto w-full max-w-xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground text-center">
                Built on the Shoulders Of Giants
              </h2>
              <p className="mt-8 text-lg leading-8 text-primary-foreground/80 text-center">
                Shadcn Admin Kit leverages first-class libraries, acclaimed by
                the React community for their robustness, documentation and
                performance.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-y-12 md:gap-y-14 gap-x-6 md:gap-x-12 justify-center justify-items-center">
              {technos.map((techno) => (
                <div
                  key={techno.name}
                  className="flex flex-col items-center place-content-between gap-2"
                >
                  <img
                    alt={techno.name}
                    src={techno.logo}
                    width={64}
                    height={64}
                    className="h-14 w-14"
                  />
                  <p className="text-primary-foreground/80">{techno.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
