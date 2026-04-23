import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, XCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("loading");

    try {
      await emailjs.sendForm(
        "service_lh7mh0i",
        "template_rgag8wo",
        formRef.current,
        "ll5gkf1eOwdGVYCv3"
      );
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" data-scroll-section className="my-64">
      <div
        data-scroll
        data-scroll-speed=".4"
        data-scroll-position="top"
        className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
      >
        <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
          Let&apos;s work{" "}
          <span className="text-gradient clash-grotesk">together</span>
        </h2>
        <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
          I&apos;m currently available for freelance work and open to
          discussing new projects.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-lg space-y-4 text-left"
        >
          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-xs tracking-widest text-muted-foreground uppercase"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="John Doe"
              className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs tracking-widest text-muted-foreground uppercase"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
            />
          </div>

          {/* Mensaje */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="message"
              className="text-xs tracking-widest text-muted-foreground uppercase"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell me about your project..."
              className="w-full resize-none rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full gap-2"
          >
            {status === "loading" && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {status === "loading" ? "Sending..." : "Send message"}
            {status === "idle" && <Send className="h-4 w-4" />}
          </Button>

          {/* Feedback */}
          {status === "success" && (
            <div className="flex items-center gap-2 rounded-md border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              <CheckCircle className="h-4 w-4 shrink-0" />
              Message sent! I&apos;ll get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <XCircle className="h-4 w-4 shrink-0" />
              Something went wrong. Try emailing me directly.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}