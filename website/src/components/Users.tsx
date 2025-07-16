import { Button } from "@/components/ui/button";
import { useState } from "react";
import GithubLogo from "/img/github-mark-white.svg";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Users() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section id="users" aria-label="Users" className="py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-sm font-medium tracking-wider text-muted-foreground uppercase mb-8 text-center mt-10">
          Join thousands of developers &amp; businesses that already use our
          admin kits
        </h2>
        <ul
          className={classNames(
            "mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-12 md:cursor-pointer overflow-hidden transition-all",
            expanded ? "md:max-h-100" : "md:max-h-48"
          )}
          onClick={() => setExpanded((e) => !e)}
        >
          <li>
            <img
              src="./img/users/toyota.webp"
              alt="Toyota"
              width="120"
              height="22"
            />
          </li>
          <li>
            <img
              src="./img/users/walt_disney.png"
              alt="Walt Disney"
              width="80"
              height="58"
            />
          </li>
          <li>
            <img
              src="./img/users/intel.webp"
              alt="Intel"
              width="79"
              height="52"
            />
          </li>
          <li>
            <img src="./img/users/ibm.webp" alt="IBM" width="90" height="62" />
          </li>
          <li>
            <img
              src="./img/users/nvidia.webp"
              alt="NVIDIA"
              width="78"
              height="62"
            />
          </li>
          <li>
            <img
              src="./img/users/adobe.webp"
              alt="Adobe"
              width="129"
              height="32"
            />
          </li>
          <li>
            <img
              src="./img/users/ford.webp"
              alt="Ford"
              width="106"
              height="40"
            />
          </li>
          <li>
            <img
              src="./img/users/puma.webp"
              alt="Puma"
              width="88"
              height="48"
            />
          </li>
          <li>
            <img
              src="./img/users/activision.webp"
              alt="Activision"
              width="150"
              height="36"
            />
          </li>
          <li>
            <img
              src="./img/users/vodafone.webp"
              alt="Vodafone"
              width="87"
              height="62"
            />
          </li>
          <li>
            <img
              src="./img/users/t-mobile.webp"
              alt="T-Mobile"
              width="70"
              height="40"
            />
          </li>
          <li>
            <img
              src="./img/users/audi.webp"
              alt="Audi"
              width="80"
              height="46"
            />
          </li>
          <li className="hidden md:block">
            <img
              src="./img/users/xiaomi.webp"
              alt="Xiaomi"
              width="137"
              height="40"
            />
          </li>
          <li className="hidden md:block">
            <img
              src="./img/users/barclays.webp"
              alt="Barclays"
              width="140"
              height="25"
            />
          </li>
          <li className="hidden md:block">
            <img
              src="./img/users/bnp_paribas.webp"
              alt="BNP Paribas"
              width="150"
              height="48"
            />
          </li>
          <li className="hidden md:block">
            <img
              src="./img/users/hyatt.webp"
              alt="Hyatt"
              width="120"
              height="31"
            />
          </li>
          <li className="hidden md:block">
            <img
              src="./img/users/accor.webp"
              alt="Accor"
              width="62"
              height="62"
            />
          </li>
          <li className="hidden md:block">
            <img
              src="./img/users/british_airways.webp"
              alt="British Airways"
              width="160"
              height="40"
            />
          </li>
          <li className="hidden md:block">
            <img
              src="./img/users/royal_canin.webp"
              alt="Royal Canin"
              width="120"
              height="45"
            />
          </li>
          <li className="hidden md:block">
            <img
              src="./img/users/barilla.webp"
              alt="Barilla"
              width="120"
              height="48"
            />
          </li>
          <li className="hidden md:block">
            <img
              src="./img/users/lockheed_martin.webp"
              alt="Lockheed Martin"
              width="180"
              height="43"
            />
          </li>
          <li className="hidden md:block">
            <img
              src="./img/users/decathlon.webp"
              alt="Decathlon"
              width="126"
              height="32"
            />
          </li>
          <li className="hidden md:block">
            <img
              src="./img/users/aldi.webp"
              alt="Aldi"
              width="90"
              height="51"
            />
          </li>
          <li className="hidden md:block">
            <img
              src="./img/users/yves-rocher.webp"
              alt="Yves Rocher"
              width="150"
              height="62"
            />
          </li>
          <li className="hidden md:block">
            <img
              src="./img/users/zalando.webp"
              alt="Zalando"
              width="128"
              height="24"
            />
          </li>
          <li className="hidden md:block">
            <img
              src="./img/users/intersport.webp"
              alt="Intersport"
              width="160"
              height="20"
            />
          </li>
          <li className="hidden md:block">
            <img
              src="./img/users/vinted.webp"
              alt="Vinted"
              width="80"
              height="30"
            />
          </li>
        </ul>
        <div className="w-full text-center">
          <Button asChild size="lg" className="mt-16 md:mt-12">
            <a
              href="https://github.com/marmelab/shadcn-admin-kit"
              target="_blank"
            >
              <img
                src={GithubLogo}
                alt="Github"
                className="inline h-4 w-auto"
              />{" "}
              Star us on Github!
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
