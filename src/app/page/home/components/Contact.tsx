import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Github, Instagram, Linkedin, Loader2, Send, XCircle } from "lucide-react";
import { useSendMail } from "../../../../hooks";
import type { EmailData } from "../../../../types/types";
import { Crest, Stamp } from "../../../components/passport";
import { Reveal, SectionHeading } from "../../../components/motion";

const empty: EmailData = { name: "", email: "", subject: "", message: "" };

const socialLinks = [
  { name: "GitHub", Icon: Github, url: "https://github.com/HaiNam1408" },
  { name: "LinkedIn", Icon: Linkedin, url: "https://www.linkedin.com/in/namphh" },
  { name: "Instagram", Icon: Instagram, url: "https://www.instagram.com/namphh_" },
];

type FieldName = keyof EmailData;
type Errors = Partial<Record<FieldName, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Field({
  id,
  label,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="relative">
        <label htmlFor={id} className="field-label pointer-events-none absolute left-4 top-2.5 z-10">
          {label}
        </label>
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.8125rem] font-medium text-stamp-red">
          {error}
        </p>
      )}
    </div>
  );
}

function Contact() {
  const { t } = useTranslation();
  const { sendMail, loading, error, success } = useSendMail();
  const [formData, setFormData] = useState<EmailData>(empty);
  const [sentAt, setSentAt] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (success) {
      setFormData(empty);
      setSentAt(
        new Date()
          .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
          .toUpperCase()
      );
    }
  }, [success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as FieldName;
    setFormData({ ...formData, [name]: e.target.value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const validate = (data: EmailData): Errors => {
    const next: Errors = {};
    if (!data.name.trim()) next.name = t("common.passport.errors.required");
    if (!data.email.trim()) next.email = t("common.passport.errors.required");
    else if (!EMAIL.test(data.email.trim())) next.email = t("common.passport.errors.email");
    if (!data.subject.trim()) next.subject = t("common.passport.errors.required");
    if (data.message.trim().length < 10) next.message = t("common.passport.errors.message");
    return next;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate(formData);
    setErrors(next);
    const first = (["name", "email", "subject", "message"] as FieldName[]).find((k) => next[k]);
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    setSentAt(null);
    sendMail(formData);
  };

  const invalid = (name: FieldName) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  const inputClass = (name: FieldName) => `doc-input ${errors[name] ? "!border-stamp-red" : ""}`;

  const contactInfo = [
    { label: t("common.passport.email"), text: "namphh.dev@gmail.com", href: "mailto:namphh.dev@gmail.com" },
    { label: t("common.passport.phone"), text: "+84 865 265 261", href: "tel:+84865265261" },
    { label: t("common.passport.location"), text: t("common.passport.baseValue"), href: null },
  ];

  return (
    <div className="py-24 lg:py-32">
      <SectionHeading title={t("common.contactSection.title")} subtitle={t("common.contactSection.subtitle")} />

      <Reveal y={32} className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
        <form
          noValidate
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-[10px] border border-rule/25 bg-raised shadow-[0_30px_60px_-40px_rgb(var(--burgundy-deep)/0.5)]"
        >
          <div className="leather flex items-center justify-between gap-4 px-6 py-4 text-on-burgundy">
            <h3 className="font-display text-xl font-bold">{t("common.contactSection.formTitle")}</h3>
            <Crest className="h-9 w-9 text-gold" />
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
            <Field id="name" label={t("common.contactSection.name")} error={errors.name}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                {...invalid("name")}
                className={inputClass("name")}
              />
            </Field>
            <Field id="email" label={t("common.contactSection.email")} error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                {...invalid("email")}
                className={inputClass("email")}
              />
            </Field>
            <Field id="subject" label={t("common.contactSection.subject")} error={errors.subject} className="sm:col-span-2">
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                {...invalid("subject")}
                className={inputClass("subject")}
              />
            </Field>
            <Field id="message" label={t("common.contactSection.message")} error={errors.message} className="sm:col-span-2">
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                {...invalid("message")}
                className={`${inputClass("message")} resize-none !pt-8`}
              />
            </Field>

            <div className="flex flex-col gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? (
                  <Loader2 size={17} className="animate-spin" aria-hidden="true" />
                ) : (
                  <Send size={17} strokeWidth={1.75} aria-hidden="true" />
                )}
                {loading ? t("common.contactSection.sending") : t("common.contactSection.send")}
              </button>

              <div role="status" aria-live="polite" className="text-[0.9375rem]">
                {success && <span className="font-medium text-stamp-green">{t("common.contactSection.success")}</span>}
                {error && (
                  <span className="flex items-center gap-2 font-medium text-stamp-red">
                    <XCircle size={18} aria-hidden="true" />
                    {t("common.contactSection.error")}
                  </span>
                )}
              </div>
            </div>
          </div>

          {success && sentAt && (
            <Stamp
              shape="circle"
              ink="green"
              lines={["MESSAGE", t("common.passport.received").toUpperCase(), sentAt]}
              rotate={-12}
              className="absolute bottom-6 right-6 w-28 sm:w-32"
            />
          )}
        </form>

        <aside>
          <h3 className="font-display text-[1.75rem] font-bold text-ink">{t("common.contactSection.or")}</h3>
          <dl className="mt-6 border-t border-rule/20">
            {contactInfo.map((info) => (
              <div key={info.label} className="flex flex-col gap-1 border-b border-rule/20 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <dt className="field-label">{info.label}</dt>
                <dd className="font-mono text-[0.9375rem] tracking-[0.03em] text-ink">
                  {info.href ? (
                    <a href={info.href} className="link-draw hover:text-burgundy dark:hover:text-gold">
                      {info.text}
                    </a>
                  ) : (
                    info.text
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-12 font-display text-[1.75rem] font-bold text-ink">{t("common.contactSection.socialTitle")}</h3>
          <ul className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map(({ name, Icon, url }) => (
              <li key={name}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="btn-secondary !px-4 !py-3">
                  <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </Reveal>
    </div>
  );
}

export default Contact;
