import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <div className="bg-black">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl max-w-xl mx-auto">
          Generate a beautiful admin panel in just a few lines of code.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Then customize every detail to fit your unique requirements.
        </p>
        <Button asChild className="mt-10" size="lg" variant="outline">
          <a href="https://marmelab.com/shadcn-admin-kit/docs" target="_blank">
            Get started
          </a>
        </Button>
      </div>
    </div>
  );
}
