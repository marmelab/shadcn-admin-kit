import { Button } from "@/components/ui/button";
import SupabaseLogo from "/img/supabase-logo-icon.svg";
import AppwriteLogo from "/img/appwrite-logo.svg";
import FirebaseLogo from "/img/firebase-logo.svg";
import StrapiLogo from "/img/strapi-logo.svg";
import HasuraLogo from "/img/hasura-logo.svg";
import DataProviderSchema from "/img/dataProvider-schema.svg";

const backends = [
  {
    name: "Supabase",
    logo: SupabaseLogo,
  },
  {
    name: "Appwrite",
    logo: AppwriteLogo,
  },
  {
    name: "Firebase",
    logo: FirebaseLogo,
  },
  {
    name: "Strapi",
    logo: StrapiLogo,
  },
  {
    name: "Hasura",
    logo: HasuraLogo,
  },
];

export function Backends() {
  return (
    <section id="backends" aria-label="Supported Backends">
      <div className="overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
            <div>
              <div className="lg:max-w-lg">
                <h2 className="text-lg font-semibold uppercase text-gray-800">
                  Effortless Integration
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                  Connect to Any Backend
                </p>
                <p className="my-10 text-lg leading-8 text-muted-foreground">
                  Shadcn Admin Kit is designed to fit seamlessly with the tools
                  you already know and love. As a single-page app, it connects
                  to any backend—REST, GraphQL, or custom APIs—and works with
                  any authentication provider.
                </p>
                <div className="flex flex-wrap gap-3">
                  {backends.map((backend, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/5 text-secondary-foreground hover:bg-primary/15 text-sm py-1 px-3"
                    >
                      <img
                        alt={backend.name}
                        src={backend.logo}
                        width={16}
                        height={16}
                        className="mr-2 inline-block"
                      />
                      {backend.name}
                    </div>
                  ))}
                  <div className="inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/5 text-secondary-foreground text-sm py-1 px-3">
                    + 40 more
                  </div>
                </div>
                <Button asChild className="mt-6 lg:my-6">
                  <a
                    href="https://marmelab.com/shadcn-admin-kit/docs/dataproviders/"
                    target="_blank"
                  >
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
            <img
              alt="DataProvider Schema"
              src={DataProviderSchema}
              className="w-full mx-auto max-w-112"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
