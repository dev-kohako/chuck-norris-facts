import React from "react";

import { useFooter } from "./useFooter";

const Footer: React.FC = () => {
  const { currentYear } = useFooter();

  return (
    <footer
      className="fixed inset-x-0 bottom-0 z-40 flex h-[var(--footer-height)] items-center justify-center
                border-t border-zinc-400/50 bg-zinc-300/90 px-4 backdrop-blur
                dark:border-zinc-700 dark:bg-zinc-800/90"
      aria-label="Site footer"
    >
      <div className="text-center">
        <cite className="text-xs not-italic text-zinc-700 lg:text-sm dark:text-zinc-300">
          &copy; {currentYear} Chuck Norris Facts - All rights reserved by{" "}
          <a
            href="https://kwk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring rounded font-semibold transition-colors duration-200
                      hover:text-sky-600 dark:hover:text-sky-400"
            aria-label="Visit KWK website"
          >
            KWK
          </a>
        </cite>
        <p className="sr-only">
          Chuck Norris facts provided by Chuck Norris IO API
        </p>
      </div>
    </footer>
  );
};

export default Footer;
