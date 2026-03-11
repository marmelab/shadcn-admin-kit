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
            <NavLink href="https://marmelab.com/shadcn-admin-kit/docs/install/">
              Doc
            </NavLink>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-md inline-block rounded-lg px-2 py-1 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                Demos
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64"
              >
                <DropdownMenuItem
                  className="m-1"
                  render={
                    <a
                      href="https://marmelab.com/shadcn-admin-kit/demo"
                      target="_blank"
                    />
                  }
                >
                  E-Commerce
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="m-1"
                  render={
                    <a
                      href="https://marmelab.com/atomic-crm-demo/"
                      target="_blank"
                    />
                  }
                >
                  CRM
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <NavLink href="#pricing">Pricing</NavLink>
            <Button
              render={
                <a
                  href="https://github.com/marmelab/shadcn-admin-kit"
                  target="_blank"
                />
              }
              nativeButton={false}
            >
              <img
                src={GithubLogo}
                alt="Github"
                className="inline h-4 w-auto"
              />{" "}
              Star us on Github!
            </Button>
          </div>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
                <Menu className="size-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64"
              >
                <DropdownMenuItem className="m-1" render={<a href="#features" />}>
                  Features
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="m-1"
                  render={<a href="https://marmelab.com/shadcn-admin-kit/docs/install/" />}
                >
                  Doc
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="m-1"
                  render={
                    <a
                      href="https://marmelab.com/shadcn-admin-kit/demo"
                      target="_blank"
                    />
                  }
                >
                  Demo E-Commerce
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="m-1"
                  render={
                    <a
                      href="https://marmelab.com/atomic-crm-demo/"
                      target="_blank"
                    />
                  }
                >
                  Demo CRM
                </DropdownMenuItem>
                <DropdownMenuItem className="m-1" render={<a href="#pricing" />}>
                  Pricing
                </DropdownMenuItem>
                <div className="w-full p-1">
                  <Button
                    className="w-full"
                    render={
                      <a
                        href="https://github.com/marmelab/shadcn-admin-kit"
                        target="_blank"
                        className="flex-1"
                      />
                    }
                    nativeButton={false}
                  >
                    <img
                      src={GithubLogo}
                      alt="Github"
                      className="inline h-4"
                    />{" "}
                    Star us on Github!
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
