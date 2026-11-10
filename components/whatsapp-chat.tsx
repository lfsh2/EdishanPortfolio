"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import portrait from "@/assets/people/headshot.jpg";
import { site } from "@/lib/site";

const number = site.phoneHref.replace(/\D/g, "");
const fallback = "Hi Edishan, I found your portfolio and I'd like to talk about a project.";

function WhatsAppIcon({ className }: { className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.48-8.41" />
    </svg>
  );
}

/** Floating chat panel. Sending opens WhatsApp with the visitor's message already typed. */
export function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const send = () => {
    const message = text.trim() || fallback;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setText("");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] right-[4vw] z-[55] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {open ? (
        <div
          id="whatsapp-chat"
          role="dialog"
          aria-label="Chat with Edishan on WhatsApp"
          className="w-[min(22rem,calc(100vw-8vw))] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_60px_-20px_rgb(18_33_63/0.45)]"
        >
          <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3.5 text-white">
            <span className="relative shrink-0">
              <Image src={portrait} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
              <span aria-hidden className="absolute bottom-0 right-0 size-2.5 rounded-full bg-[#25D366] ring-2 ring-[#075E54]" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.9375rem] font-medium leading-tight">{site.name}</span>
              <span className="block text-xs text-white/75">Usually replies on WhatsApp</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid size-9 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div className="bg-[#ECE5DD] px-4 py-5">
            <p className="max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[0.9rem] leading-snug text-[#111b21] shadow-sm">
              Hi! 👋 I&apos;m Edishan. Tell me about the automation, CRM or app you have in mind and I&apos;ll get back to you here.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-end gap-2 border-t border-line bg-surface p-3"
          >
            <label htmlFor="whatsapp-message" className="sr-only">
              Your message
            </label>
            <textarea
              id="whatsapp-message"
              ref={inputRef}
              rows={2}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Type a message…"
              className="min-h-11 flex-1 resize-none rounded-xl border border-line bg-canvas px-3 py-2.5 text-[0.9375rem] text-fg placeholder:text-faint focus:border-fg focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send on WhatsApp"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-[#25D366] text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="currentColor">
                <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z" />
              </svg>
            </button>
          </form>
        </div>
      ) : null}

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={open ? "whatsapp-chat" : undefined}
        aria-label={open ? "Close WhatsApp chat" : "Chat with Edishan on WhatsApp"}
        className="grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-10px_rgb(37_211_102/0.8)] transition-transform duration-200 hover:-translate-y-0.5"
      >
        {open ? (
          <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <WhatsAppIcon className="size-7" />
        )}
      </button>
    </div>
  );
}
