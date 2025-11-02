import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, Send, Github, Linkedin, Instagram, MapPin, Phone, CheckCircle2, MessageSquare, Sparkles, XCircle } from "lucide-react";
import { useSendMail } from "../../../../hooks";
import type { EmailData } from "../../../../types/types";

function Contact() {
  const { t } = useTranslation();
  const { sendMail, loading, error, success } = useSendMail();
  const [formData, setFormData] = useState<EmailData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendMail(formData);
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github size={24} />,
      url: "https://github.com/HaiNam1408",
      color: "hover:text-gray-400",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={24} />,
      url: "https://www.linkedin.com/in/namphh",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      icon: <Instagram size={24} />,
      url: "https://www.instagram.com/namphh_",
      color: "hover:text-pink-400",
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      text: "namphh.dev@gmail.com",
      href: "mailto:namphh.dev@gmail.com",
    },
    {
      icon: <Phone size={20} />,
      text: "+84 865 256 261",
      href: "tel:+84865265261",
    },
    {
      icon: <MapPin size={20} />,
      text: "Da Nang City, Vietnam",
      href: null,
    },
  ];

  return (
    <section id="contact" className="min-h-screen w-full py-20 px-4 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-amber-100 dark:bg-primary/10 border border-amber-300 dark:border-primary/30 text-amber-800 dark:text-primary font-semibold text-sm flex items-center gap-2 w-fit mx-auto">
              <MessageSquare size={16} />
              {t("common.contactSection.badge")}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white"
          >
            {t("common.contactSection.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 dark:text-gray-400"
          >
            {t("common.contactSection.subtitle")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative gradient behind form */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-3xl blur-2xl opacity-30 -z-10" />
            
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-300 dark:border-white/10 px-8 py-7 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-amber-600 dark:text-primary" size={24} />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t("common.contactSection.formTitle")}</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-300">
                  {t("common.contactSection.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border-2 border-gray-300 dark:border-white/10 focus:border-amber-500 dark:focus:border-primary focus:ring-2 focus:ring-amber-500/20 dark:focus:ring-primary/20 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-300">
                  {t("common.contactSection.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border-2 border-gray-300 dark:border-white/10 focus:border-amber-500 dark:focus:border-primary focus:ring-2 focus:ring-amber-500/20 dark:focus:ring-primary/20 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-300">
                  {t("common.contactSection.subject")}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border-2 border-gray-300 dark:border-white/10 focus:border-amber-500 dark:focus:border-primary focus:ring-2 focus:ring-amber-500/20 dark:focus:ring-primary/20 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-500"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-300">
                  {t("common.contactSection.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border-2 border-gray-300 dark:border-white/10 focus:border-amber-500 dark:focus:border-primary focus:ring-2 focus:ring-amber-500/20 dark:focus:ring-primary/20 outline-none transition-all resize-none text-gray-900 dark:text-white placeholder:text-gray-500"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base shadow-lg transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary to-amber-400 text-black hover:shadow-xl hover:shadow-primary/30"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    {t("common.contactSection.sending")}
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {t("common.contactSection.send")}
                  </>
                )}
              </motion.button>

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-green-500/10 border border-green-500/50 text-green-600 dark:text-green-400 text-center font-semibold flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  {t("common.contactSection.success")}
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-600 dark:text-red-400 text-center font-semibold flex items-center justify-center gap-2"
                >
                  <XCircle size={20} />
                  {t("common.contactSection.error")}
                </motion.div>
              )}
            </form>
            </div>
          </motion.div>

          {/* Right: Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6">
                {t("common.contactSection.or")}
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {info.icon}
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-300 hover:text-primary transition-colors"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-gray-300">{info.text}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-primary/10 dark:via-purple-500/10 dark:to-blue-500/10 border border-amber-200 dark:border-primary/20 shadow-lg">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-300/30 dark:bg-primary/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  {t("common.contactSection.socialTitle")}
                </h3>
                <Mail className="my-5 mx-auto text-primary" size={80}/>
                <p className="text-lg text-gray-700 dark:text-gray-400 mb-6">
                  {t("common.contactSection.amazingText")}
                </p>
                <div className="flex gap-4 justify-center">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.15, rotate: index % 2 === 0 ? 5 : -5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-4 rounded-xl bg-white dark:bg-white/10 border-2 border-gray-300 dark:border-white/20 hover:border-amber-500 dark:hover:border-primary hover:bg-amber-50 dark:hover:bg-primary/10 transition-all shadow-md hover:shadow-xl ${social.color}`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
