import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

import featuresScreenshot from "/img/features-screenshot.jpeg";

const features = [
  {
    name: "Rapid CRUD Generation",
    description: "Build admin UIs automatically from your API",
  },
  {
    name: "Easy relationships",
    description: "Combine data from multiple resources seamlessly",
  },
  {
    name: "Roles & permissions",
    description: "Manage user access with fine-grained control",
  },
  {
    name: "Undo Functionality",
    description: "Let users easily revert changes",
  },
  {
    name: "Bulk Actions",
    description: "Select and modify multiple items at once",
  },
  {
    name: "User preferences",
    description: "Save and restore user settings automatically",
  },
  {
    name: "Fully customizable",
    description: "Modify components directly in your source code",
  },
];

export function AdvancedCapabilities() {
  return (
    <section
      id="advanced-capabilities"
      aria-label="Shadcn Admin Kit Advanced Capabilities"
    >
      <div className="overflow-hidden bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
            <div>
              <div className="lg:max-w-lg">
                <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Advanced Capabilities
                </p>
                <p className="mt-6 text-lg leading-8 text-white">
                  Beyond the basics, Shadcn Admin Kit offers sophisticated
                  features to reduce development costs and enhance the developer
                  experience.
                </p>
                <dl className="my-10 max-w-xl space-y-2 text-base leading-7 text-white lg:max-w-none">
                  {features.map((feature, index) => (
                    <div key={index} className="relative pl-9">
                      <dt className="font-bold">
                        <Check
                          aria-hidden="true"
                          className="absolute left-1 top-1 h-5 w-5 text-white"
                        />
                        {feature.name}
                      </dt>

                      <dd className="inline opacity-80">
                        {feature.description}
                      </dd>
                    </div>
                  ))}
                </dl>
                <Button variant="outline" asChild>
                  <a
                    href="https://github.com/marmelab/shadcn-admin-kit/blob/main/docs/2-Quick-Start-Guide.md"
                    target="_blank"
                  >
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
            <img
              alt="Features screenshot"
              src={featuresScreenshot}
              className="w-full rounded-xl shadow-xl ring-1 ring-white/10 md:-ml-4 lg:-ml-0 lg:-order-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
