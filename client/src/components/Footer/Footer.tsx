import { useTranslation } from "react-i18next";

import { useFooter } from "./useFooter";

const Footer = () => {
  const { currentYear } = useFooter();
  const { t } = useTranslation();

  return (
    <footer
      className="bg-background/80 fixed inset-x-0 bottom-0 z-40 flex
                h-[var(--footer-height)] items-center justify-center border-t
                px-4 backdrop-blur-md"
      aria-label={t("footer.label")}
    >
      <p className="text-muted-foreground text-center text-[0.7rem] leading-none sm:text-xs">
        {t("footer.rights", { year: currentYear })}{" "}
        <a
          href="https://kwk.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground focus-visible:ring-ring rounded font-semibold
                    underline-offset-4 outline-none transition-colors hover:underline
                    focus-visible:ring-2"
          aria-label={t("footer.kwkAria")}
        >
          KWK
        </a>
      </p>
      <span className="sr-only">{t("footer.credit")}</span>
    </footer>
  );
};

export default Footer;
