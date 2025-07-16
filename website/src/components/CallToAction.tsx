import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <div className="bg-black">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl max-w-lg mx-auto">
          Generate a beautiful admin panel in just a few clicks.
        </h2>
        <Button asChild className="mt-10" size="lg" variant="outline">
          <a
            href="https://github.com/marmelab/shadcn-admin-kit/blob/main/docs/2-Quick-Start-Guide.md"
            target="_blank"
          >
            Get started
          </a>
        </Button>
      </div>
    </div>
  );
}
