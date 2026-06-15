import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Importamos cn para estilos dinámicos si es necesario

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
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
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
          I&apos;m currently available for freelance work and open to full-time remote roles.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-lg space-y-4 text-left"
        >
          {/* Input Name */}
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
              autoComplete="name"
              placeholder="John Doe"
              className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
            />
          </div>

          {/* Input Email */}
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
              autoComplete="email"
              placeholder="john@example.com"
              className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
            />
          </div>

          {/* Textarea Message */}
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

          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={cn(
              "w-full gap-2 transition-all duration-300",
              status === "success" && "bg-green-600 hover:bg-green-600 text-white disabled:opacity-100", 
              status === "error" && "bg-destructive text-destructive-foreground"
            )}
          >
            {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            
            {status === "loading" && "Sending..."}
            {status === "success" && "Message sent!"}
            {status === "idle" && "Send message"}
            {status === "error" && "Try again"}
            
            {(status === "idle" || status === "error") && <Send className="h-4 w-4" />}
            {status === "success" && <CheckCircle className="h-4 w-4" />}
          </Button>

          {/* Feedback Banners */}
          <div aria-live="polite" className="mt-2">
            {status === "success" && (
              <div className="flex items-center gap-2 rounded-md border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400 animate-fade-in">
                <CheckCircle className="h-4 w-4 shrink-0" />
                Message sent successfully! I&apos;ll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 animate-fade-in">
                <XCircle className="h-4 w-4 shrink-0" />
                Something went wrong. Please try again or email me directly.
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}