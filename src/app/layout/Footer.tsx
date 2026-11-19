import { Github, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Mrz, mrz } from "../components/passport";

const links = [
  { name: "GitHub", Icon: Github, url: "https://github.com/HaiNam1408" },
  { name: "LinkedIn", Icon: Linkedin, url: "https://www.linkedin.com/in/namphh" },
  { name: "Instagram", Icon: Instagram, url: "https://www.instagram.com/namphh_" },
];

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="leather relative pb-[76px] text-on-burgundy md:pb-0">
      <div className="mx-auto max-w-[1240px] px-5 py-10 md:px-10">
        <Mrz
          className="block w-full max-w-[880px] text-on-burgundy/55"
          lines={[mrz("P", "VNMPHAM", "", "HAI", "NAM"), mrz("HAINAM1408", "VNM", "DANANG", "OPEN", "TO", "WORK")]}
        />
        <div className="mt-8 flex flex-col-reverse gap-6 border-t border-on-burgundy/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-on-burgundy/85">
            © {new Date().getFullYear()} Phạm Hải Nam. {t("common.passport.rights")}
          </p>
          <ul className="flex gap-2">
            {links.map(({ name, Icon, url }) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-11 w-11 items-center justify-center rounded-[4px] text-on-burgundy/85 transition-colors hover:bg-black/15 hover:text-on-burgundy"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
