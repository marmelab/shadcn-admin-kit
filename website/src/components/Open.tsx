export function Open() {
  return (
    <div className="relative bg-white py-12 sm:py-24">
      <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
        <p className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Open source, Open Code
        </p>
        <p className="mx-auto mt-5 max-w-prose text-xl text-muted-foreground mb-10">
          Don't get locked-in to proprietary, black-box solutions. With Shadcn
          Admin Kit you have always 100% control over your project.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <div className="rounded-lg border text-card-foreground shadow-sm text-center p-6 bg-black">
            <div className="p-6 pt-6">
              <div className="text-4xl font-bold mb-2 text-white">50</div>
              <p className="text-white">components</p>
            </div>
          </div>
          <div className="rounded-lg border text-card-foreground shadow-sm text-center p-6 bg-black">
            <div className="p-6 pt-6">
              <div className="text-4xl font-bold mb-2 text-white">50+</div>
              <p className="text-white">supported backends</p>
            </div>
          </div>
          <div className="rounded-lg border text-card-foreground shadow-sm text-center p-6 bg-black">
            <div className="p-6 pt-6">
              <div className="text-4xl font-bold mb-2 text-white">30+</div>
              <p className="text-white">languages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
