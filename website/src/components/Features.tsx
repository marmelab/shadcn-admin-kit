import {
  ArrowDownUp,
  AlignJustify,
  NotepadText,
  KeyRound,
  ScanSearch,
  Earth,
  Palette,
  BugOff,
} from "lucide-react";

const features = [
  {
    name: "Data Fetching",
    description: "Efficient hooks for robust API interactions",
    icon: ArrowDownUp,
  },
  {
    name: "Lists & Data Tables",
    description: "Flexible list components for displaying data collections",
    icon: AlignJustify,
  },
  {
    name: "Forms & Validation",
    description:
      "Data-bound inputs, adaptable layouts, and dynamic field support",
    icon: NotepadText,
  },
  {
    name: "Authentication",
    description: "Secure authentication flows and user management",
    icon: KeyRound,
  },

  {
    name: "Search & Filtering",
    description:
      "Components for search-as-you-type, combined filters, and more",
    icon: ScanSearch,
  },
  {
    name: "I18n",
    description: "Internationalization support for global applications",
    icon: Earth,
  },
  {
    name: "Flexible Theming",
    description: "App themes, light/dark mode & granular component styling",
    icon: Palette,
  },
  {
    name: "Resilient UI",
    description: "Gracefully manages loading, empty, and error states",
    icon: BugOff,
  },
];

export function Features() {
  return (
    <section
      id="features"
      aria-label="Shadcn Admin Kit Essential Features"
      className="relative bg-white py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-semibold uppercase text-gray-800">
          All the Essentials
        </h2>
        <p className="mt-4 text-3xl font-black font-heading tracking-tight text-gray-900 sm:text-4xl">
          Beyond UI Elements
        </p>
        <p className="mx-auto mt-5 max-w-prose text-xl text-muted-foreground">
          With Shadcn Admin Kit, all the essential features come preconfigured
          with proven best practices. Spend less time on repetitive setup and
          more on what makes your app unique: your business logic.
        </p>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 max-w-256 mx-auto">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="flow-root rounded-lg bg-gray-50 px-6 py-6 shadow-md hover:shadow-lg transition-shadow h-full"
              >
                <div>
                  <div>
                    <span className="inline-flex items-center justify-center rounded-xl p-2">
                      <feature.icon
                        aria-hidden="true"
                        className="h-8 w-8 text-black"
                      />
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-heading leading-8 tracking-tight text-black mt-1">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 mt-2">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
