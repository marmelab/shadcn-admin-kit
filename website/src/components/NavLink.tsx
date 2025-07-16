export function NavLink({
  href,
  children,
  target,
}: {
  href: string;
  target?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={target}
      className="text-md inline-block rounded-lg px-2 py-1 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </a>
  );
}
