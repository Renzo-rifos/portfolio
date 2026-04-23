import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MailIcon } from "lucide-react";
 
const navLinks = [
  { href: "#home", text: "Home" },
  { href: "#about", text: "About" },
  { href: "#projects", text: "Projects" },
  { href: "#services", text: "Services" },
  { href: "#contact", text: "Contact" },
];
 
export default function Footer() {
  const [time, setTime] = useState<string>("");
 
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "America/Argentina/Buenos_Aires",
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
        }),
      );
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);
 
  return (
    <footer className="w-full border-t border-white/[0.06] bg-gradient-to-t from-primary/[1%] to-transparent">
      {/* Main grid */}
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 py-12 md:grid-cols-3">
 
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <span className="text-base font-semibold tracking-tight text-foreground">
            Ezequiel Rifos
          </span>
          <p className="text-sm leading-relaxed tracking-tight text-muted-foreground">
            Frontend developer
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-xs text-green-400/80">Available for freelance</span>
          </div>
        </div>
 
        {/* Nav */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/50">
            Navigation
          </span>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm tracking-tight text-muted-foreground transition hover:text-foreground"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
 
        {/* Contact */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/50">
            Contact
          </span>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="https://github.com/Renzo-rifos"
                target="_blank"
                className="text-sm tracking-tight text-muted-foreground transition hover:text-foreground"
              >
                github.com/Renzo-rifos
              </Link>
            </li>
            <li>
              <Link
                href="https://linkedin.com/in/rifos-ezequiel"
                target="_blank"
                className="text-sm tracking-tight text-muted-foreground transition hover:text-foreground"
              >
                linkedin.com/in/rifos-ezequiel
              </Link>
            </li>
            <li>
              <Link
                href="mailto:renzorifosezequiel20@gmail.com"
                className="text-sm tracking-tight text-muted-foreground transition hover:text-foreground"
              >
                renzorifosezequiel20@gmail.com
              </Link>
            </li>
          </ul>
        </div>
      </div>
 
      {/* Radial divider */}
      <div className="h-px bg-[radial-gradient(closest-side,#8486ff,#42357d,#5d83ff,transparent)] opacity-30" />
 
      {/* Bottom bar */}
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row">
        <span className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ezequiel Rifos. All rights reserved.
          </p>
          <hr className="hidden h-4 border-l border-muted sm:block" />
          <span className="hidden items-center gap-1.5 sm:flex">
            <p className="text-xs text-muted-foreground">Puerto Madryn ·</p>
            <p className="text-xs font-semibold">{time} UTC−3</p>
          </span>
        </span>
 
        <Link
          href="mailto:renzorifosezequiel20@gmail.com"
          passHref
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          <Button variant="outline" size="sm">
            <MailIcon className="h-3.5 w-3.5 md:mr-2" />
            <span className="hidden md:flex">renzorifosezequiel20@gmail.com</span>
          </Button>
        </Link>
      </div>
    </footer>
  );
}