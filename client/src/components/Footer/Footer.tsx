import React from "react";
import { useFooter } from "./useFooter";

const Footer: React.FC = () => {
  const { currentYear } = useFooter();

  return (
    <footer
      className="w-full fixed bottom-0 flex justify-center items-center 
                bg-zinc-300/95 dark:bg-zinc-800/95 backdrop-blur-sm
                border-t border-zinc-400/50 dark:border-zinc-700 
                shadow-lg py-2 z-40"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="text-center">
        <cite className="text-xs lg:text-sm dark:text-zinc-200/90">
          &copy; {currentYear} Chuck Norris Facts - All rights reserved by{" "}
          <a
            href="https://kwk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:text-sky-600 dark:hover:text-sky-400
                      focus:outline-none focus:ring-2 focus:ring-sky-500 rounded
                      transition-colors duration-200"
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
