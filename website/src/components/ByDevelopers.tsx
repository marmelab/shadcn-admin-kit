import vscodeScreenshot from "/img/vscode.webp";

export function ByDevelopers() {
  return (
    <div className="relative bg-white py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
          <div className="mx-auto max-w-md px-6 text-center lg:text-start sm:max-w-3xl lg:max-w-7xl lg:px-8">
            <p className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Built by developers for developers
            </p>
            <p className="mx-auto mt-5 max-w-prose text-xl text-muted-foreground mb-10">
              Composability, separation of concerns, clean code, strong typing
              and smart auto-completion ensure a pleasant DX.
            </p>
          </div>
          <img
            alt="VSCode Screenshot"
            src={vscodeScreenshot}
            className="w-full rounded-xl shadow-xl ring-1 ring-white/10 mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
