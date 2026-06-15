import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn, scrollTo } from "@/lib/utils";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Preloader from "@/components/Preloader";
import styles from "@/styles/Container.module.css";

type IconProps = {
  ["data-hide"]: boolean;
};

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

type NavProps = {
  text: string;
  href: string;
  i: number;
  className?: string;
  onClick?: () => void;
};

const variants = {
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.12,
    },
  }),
  hidden: { opacity: 0 },
};

const navLinks = [
  { href: "#home", text: "Home" },
  { href: "#about", text: "About" },
  { href: "#projects", text: "Projects" },
  { href: "#services", text: "Services" },
  { href: "#contact", text: "Contact" },
];

function NavItem(props: NavProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(href);
      scrollTo(section);
    }
    if (props.onClick) props.onClick();
  };

  return (
    <motion.li
      className={props.className}
      variants={variants}
      custom={props.i}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <a
        href={props.href}
        onClick={handleClick}
        className={cn(props.i === 0 && "nav-active", "nav-link")}
      >
        {props.text}
      </a>
    </motion.li>
  );
}

export default function Container(props: ContainerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { children, ...customMeta } = props;
  const router = useRouter();

  const meta = {
    title: "Ezequiel Rifos | Frontend Developer",
    description: `Frontend developer from Argentina. Specializing in React, TypeScript and Tailwind CSS. Available for freelance and remote junior roles.`,
    image: "/assets/logo.webp",
    type: "website",
    ...customMeta,
  };

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // preloader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="theme-color" content="#7B82FE" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://portfolio-sooty-five-67.vercel.app${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://portfolio-sooty-five-67.vercel.app${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Ezequiel Rifos" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Ezequiel Rifos" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>

      <nav
        className={cn(
          styles.nav,
          isScrolled
            ? "bg-gradient-to-br from-background to-transparent shadow-md backdrop-blur transition"
            : "bg-transparent",
        )}
      >
        {/* BOTÓN HAMBURGUESA (Solo se ve si el menú está CERRADO) */}
        {!isOpen && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-neutral-100 focus:outline-none"
              aria-label="Open menu"
            >
              <MenuIcon data-hide={false} />
            </button>
          </div>
        )}

        <Link href="/">
          <span className="cursor-pointer text-lg font-semibold">Ezequiel</span>
        </Link>

        {/* Desktop menu */}
        <ul className={styles["desktop-nav"]}>
          {navLinks.map((link, i) => (
            <NavItem
              key={link.href}
              href={link.href}
              text={link.text}
              i={i}
              className="text-base"
            />
          ))}
        </ul>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              className="fixed right-0 top-0 z-50 flex h-screen w-full flex-col justify-start overflow-y-hidden bg-background"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, type: "spring", bounce: 0 }}
            >
              <div className="flex h-20 max-h-20 min-h-[60px] w-full items-center justify-between border-b pl-[22px] pr-4">
                <span className="text-base font-medium lowercase">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center text-neutral-100 focus:outline-none"
                  aria-label="Close menu"
                >
                  <CrossIcon data-hide={false} />
                </button>
              </div>

              <div className="flex h-full flex-col items-start justify-between overflow-y-auto">
                <ul className="flex min-h-fit w-full flex-col items-start space-y-6 px-[22px] py-[58px]">
                  {navLinks.map((link, i) => (
                    <NavItem
                      key={link.href}
                      href={link.href}
                      text={link.text}
                      i={i}
                      className="text-xl"
                      onClick={() => setIsOpen(false)}
                    />
                  ))}
                </ul>

                {/* Footer del Menú */}
                <div className="flex min-h-fit w-full flex-col space-y-8 px-[22px] py-10">
                  <span className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Ezequiel. All rights reserved.
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx global>{`
          html,
          body {
            overflow-y: ${isOpen ? "hidden" : "initial"};
            scrollbar-width: ${isOpen ? "none" : "unset"};
            -ms-overflow-style: ${isOpen ? "none" : "unset"};
            touch-action: ${isOpen ? "none" : "unset"};
          }
        `}</style>
      </nav>
      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Main content */}
      <main className={cn("container mx-auto px-4", props.className)}>
        {children}
      </main>

      <Footer />
    </>
  );
}

function MenuIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute h-5 w-5 text-neutral-100 transition-opacity duration-200",
        props["data-hide"] ? "opacity-0" : "opacity-100",
      )}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M2.5 2.5H17.5M2.5 7.5H17.5M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon(props: IconProps) {
  return (
    <svg
      className={cn(
        "absolute h-5 w-5 text-neutral-100 transition-opacity duration-200",
        props["data-hide"] ? "opacity-0" : "opacity-100",
      )}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
