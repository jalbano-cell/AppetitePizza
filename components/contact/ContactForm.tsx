"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const SUBJECTS = [
  "General Inquiry",
  "Catering Request",
  "Feedback",
  "Partnership",
  "Other",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-stone/80 uppercase tracking-widest mb-2 block">
        {label}
        {required && <span className="text-brand ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full bg-black/40 border border-white/8 rounded-xl px-4 py-3 text-cream text-sm placeholder:text-muted outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/20 transition-all";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-20 gap-5"
          >
            <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center">
              <CheckCircle size={28} className="text-brand" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-cream mb-2">Message Sent</h3>
              <p className="text-stone text-sm max-w-sm">
                Thanks for reaching out. We&apos;ll get back to you within 24 hours.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => { setSubmitted(false); setForm(EMPTY); }}
            >
              Send Another
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Full Name" required>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Jane Smith"
                  className={inputClass}
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                  placeholder="jane@example.com"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Phone (optional)">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="(555) 000-0000"
                  className={inputClass}
                />
              </Field>
              <Field label="Subject" required>
                <select
                  required
                  value={form.subject}
                  onChange={set("subject")}
                  className={cn(inputClass, "cursor-pointer")}
                >
                  <option value="" disabled>Select a topic</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Message" required>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={set("message")}
                placeholder="Tell us what's on your mind…"
                className={cn(inputClass, "resize-none leading-relaxed")}
              />
            </Field>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full justify-center"
            >
              {loading ? "Sending…" : "Send Message"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
