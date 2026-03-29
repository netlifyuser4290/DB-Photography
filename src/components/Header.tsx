"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/gallery", label: "Portfolio" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-[1000] py-4 transition-all">
        <nav className="max-w-[1200px] mx-auto flex justify-between items-center px-8">
          <Link href="/" className="font-display text-[1.8rem] font-bold text-charcoal">
            DB Photography
          </Link>
          <ul className="hidden md:flex list-none gap-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="nav-link relative text-charcoal font-medium hover:text-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            {/* <li>
              <Link
                href="/admin"
                className="nav-link relative text-charcoal font-medium hover:text-accent transition-colors"
              >
                Admin
              </Link>
            </li> */}
          </ul>
          <button
            type="button"
            className="md:hidden text-charcoal text-2xl cursor-pointer"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            &#9776;
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 w-[300px] h-full bg-white/98 backdrop-blur-xl z-[2000] p-12 pt-16 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          type="button"
          className="absolute top-6 right-6 text-2xl text-charcoal cursor-pointer"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          &times;
        </button>
        <ul className="list-none">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="block py-4 text-lg text-charcoal border-b border-black/10 hover:text-accent"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          {/* <li>
            <Link
              href="/admin"
              className="block py-4 text-lg text-charcoal border-b border-black/10 hover:text-accent"
              onClick={() => setMobileOpen(false)}
            >
              Admin
            </Link>
          </li> */}
        </ul>
      </div>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[1999] md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}
    </>
  );
}
