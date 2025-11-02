import { useState } from "react";
import emailjs from "@emailjs/browser";
import type { EmailData } from "../types/types";

export function useSendMail() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const sendMail = async (data: EmailData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            const response = await emailjs.send(
                serviceId,
                templateId,
                {
                    name: data.name,
                    email: data.email,
                    subject: data.subject || "(No subject)",
                    message: data.message,
                    year: new Date().getFullYear(),
                },
                publicKey
            );

            if (response.status === 200) {
                setSuccess(true);
            } else {
                throw new Error("Failed to send mail via EmailJS");
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { sendMail, loading, error, success };
}
