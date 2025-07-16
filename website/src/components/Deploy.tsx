import VercelLogo from "/img/logo-vercel.svg";
import NetlifyLogo from "/img/netlify-logo.svg";
import GitHubPagesLogo from "/img/github-logo.svg";
import CloudflareLogo from "/img/cloudflare-logo.svg";

const hosts = [
  {
    name: "Vercel",
    logo: VercelLogo,
  },
  {
    name: "Netlify",
    logo: NetlifyLogo,
  },
  {
    name: "GitHub Pages",
    logo: GitHubPagesLogo,
  },
  {
    name: "Cloudflare",
    logo: CloudflareLogo,
  },
];

export function Deploy() {
  return (
    <section id="hosts" aria-label="Hosting backends">
      <div className="overflow-hidden py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
            <div>
              <div className="lg:max-w-lg">
                <h2 className="text-lg font-semibold uppercase text-gray-800">
                  Zero Lock-In
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                  Host Anywhere
                </p>
                <p className="my-10 text-lg leading-8 text-muted-foreground">
                  Shadcn Admin Kit apps are lightweight, static assets you can
                  host almost anywhere—for close to nothing. When you go to
                  production, you own your app. No hidden fees, no SSO paywalls,
                  and no surprises.
                </p>
                <div className="flex flex-wrap gap-3">
                  {hosts.map((host, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/5 text-secondary-foreground hover:bg-primary/15 text-sm py-1 px-3"
                    >
                      <img
                        alt={host.name}
                        src={host.logo}
                        width={16}
                        height={16}
                        className="mr-2 inline-block"
                      />
                      {host.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-lg shadow-lg p-6 border border-border lg:-order-1 bg-primary/1">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-sm text-muted-foreground">
                  Terminal
                </div>
              </div>
              <div className="bg-black rounded-md p-4 font-mono text-sm text-white">
                <p className="opacity-90">
                  <span className="text-green-400">$</span> npm run build
                </p>
                <p className="opacity-70">
                  Creating an optimized production build...
                </p>
                <p className="opacity-90">
                  <span className="text-green-400">
                    ✓ Compiled successfully
                  </span>
                </p>
                <p className="opacity-90">
                  <span className="text-green-400">$</span> npm run deploy
                </p>
                <p className="opacity-70">Deploying to production...</p>
                <p className="opacity-90">
                  <span className="text-green-400">✓ Deployment complete!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
