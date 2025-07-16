import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import HeroScreenshot from "/img/hero-screenshot.jpeg";

export function Hero() {
  return (
    <Container className="pb05 pt-5 text-center lg:pt-10">
      <div className="relative isolate">
        <div className="py-12 sm:py-28 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-6xl font-heading">
                The Open-Source Admin Kit For Shadcn
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Powerful open-source shadcn blocks to build beautiful internal
                tools, <br className="hidden md:block" />
                admin panels, and dashboards with React.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg">
                  <a
                    href="https://github.com/marmelab/shadcn-admin-kit/blob/main/docs/2-Quick-Start-Guide.md"
                    target="_blank"
                  >
                    Get started
                  </a>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <a
                    href="https://marmelab.com/shadcn-admin-kit/demo"
                    // className="text-sm font-semibold leading-6 text-gray-900"
                    target="_blank"
                  >
                    Test it online <span aria-hidden="true">→</span>
                  </a>
                </Button>
              </div>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <img
                src={HeroScreenshot}
                alt="Hero screenshot"
                className="mx-auto rounded-2xl shadow-lg ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
