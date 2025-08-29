import { Menu } from "lucide-react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import GithubLogo from "/img/github-mark-white.svg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  return (
    <header className="py-4 lg:py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center gap-x-2">
            <a href="#" aria-label="Home">
              <Logo className="h-8 w-auto" />
            </a>
            <h1 className="text-xl md:text-2xl font-extrabold leading-none tracking-tight text-slate-900 font-heading">
              shadcn-admin-kit
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-x-0 lg:gap-x-2 xl:gap-x-6">
            <NavLink href="#features">Features</NavLink>
            <NavLink
              href="https://github.com/marmelab/shadcn-admin-kit/tree/main/src/components/admin"
              target="_blank"
            >
              Components
            </NavLink>
            <NavLink
              href="https://marmelab.com/shadcn-admin-kit/docs"
              target="_blank"
            >
              Doc
            </NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink
              href="https://marmelab.com/shadcn-admin-kit/demo"
              target="_blank"
            >
              Demo
            </NavLink>
            <Button asChild>
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
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" color="black">
                  <Menu className="size-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <DropdownMenuItem className="m-1">
                  <a href="#features">Features</a>
                </DropdownMenuItem>
                <DropdownMenuItem className="m-1">
                  <a
                    href="https://github.com/marmelab/shadcn-admin-kit/tree/main/src/components/admin"
                    target="_blank"
                  >
                    Components
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="m-1">
                  <a
                    href="https://marmelab.com/shadcn-admin-kit/docs"
                    target="_blank"
                  >
                    Doc
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="m-1">
                  <a href="#pricing">Pricing</a>
                </DropdownMenuItem>
                <DropdownMenuItem className="m-1">
                  <a
                    href="https://marmelab.com/shadcn-admin-kit/demo"
                    target="_blank"
                  >
                    Demo
                  </a>
                </DropdownMenuItem>
                <div className="w-full p-1">
                  <Button asChild className="w-full">
                    <a
                      href="https://github.com/marmelab/shadcn-admin-kit"
                      target="_blank"
                    >
                      <img
                        src={GithubLogo}
                        alt="Github"
                        className="inline h-4"
                      />{" "}
                      Star us on Github!
                    </a>
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </Container>
    </header>
  );
}
