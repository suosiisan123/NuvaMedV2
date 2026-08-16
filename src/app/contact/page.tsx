"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingSystem } from "@/components/floating/FloatingSystem";
import { Send, Bug, Sparkles, MessageSquare, CheckCircle2, Github, Disc as Discord, Mail } from "lucide-react";

export default function ContactPage() {
  const [formType, setFormType] = useState<'CONTACT' | 'BUG' | 'FEATURE'>("CONTACT");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setMessage("");
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-neutral-100 font-sans swiss-grid-bg">
      <Header />

      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 font-mono">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Form */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">Contact &amp; Support</h1>
              <p className="text-neutral-400 text-xs">
                Have questions about Shelby Protocol DICOM storage, custom PACS integration, or bug reports? Reach out directly.
              </p>
            </div>

            {/* Type Switcher */}
            <div className="flex space-x-2 border-b border-surface-border pb-3 text-xs font-bold">
              <button
                onClick={() => setFormType("CONTACT")}
                className={`px-3 py-1.5 transition ${
                  formType === "CONTACT" ? "bg-swiss-blue text-white" : "bg-surface text-neutral-400"
                }`}
              >
                GENERAL INQUIRY
              </button>
              <button
                onClick={() => setFormType("BUG")}
                className={`px-3 py-1.5 transition ${
                  formType === "BUG" ? "bg-swiss-red text-white" : "bg-surface text-neutral-400"
                }`}
              >
                BUG REPORT
              </button>
              <button
                onClick={() => setFormType("FEATURE")}
                className={`px-3 py-1.5 transition ${
                  formType === "FEATURE" ? "bg-swiss-teal text-black font-bold" : "bg-surface text-neutral-400"
                }`}
              >
                FEATURE REQUEST
              </button>
            </div>

            {/* Form */}
            {submitted ? (
              <div className="swiss-card p-6 border-l-4 border-l-emerald-500 space-y-3 text-xs">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>MESSAGE TRANSMITTED</span>
                </div>
                <p className="text-neutral-300">
                  Thank you! Your submission has been received by the NuvaMed team. We will respond to {email} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="swiss-card p-6 space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-neutral-300 font-bold">YOUR EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="doctor@hospital.org or researcher@ai-lab.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/60 border border-surface-border text-white p-3 outline-none focus:border-swiss-teal transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-300 font-bold">MESSAGE / DETAILS</label>
                  <textarea
                    required
                    rows={5}
                    placeholder={
                      formType === "BUG"
                        ? "Describe the issue, step-by-step reproduction, and browser console output..."
                        : formType === "FEATURE"
                        ? "Describe the proposed DICOM or Shelby integration feature..."
                        : "How can we help your medical network or research institution?"
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-black/60 border border-surface-border text-white p-3 outline-none focus:border-swiss-teal transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-swiss-blue hover:bg-blue-600 text-white font-bold uppercase tracking-wider transition flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>SUBMIT INQUIRY</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Community & Support Channels */}
          <div className="md:col-span-5 space-y-6 text-xs font-mono">
            <div className="swiss-card p-6 space-y-4">
              <h2 className="text-white font-bold text-sm uppercase tracking-wider">COMMUNITY CHANNELS</h2>
              <div className="space-y-3 text-neutral-300">
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-3 p-3 bg-surface hover:bg-white/10 border border-surface-border transition"
                >
                  <Discord className="w-5 h-5 text-indigo-400" />
                  <div>
                    <div className="font-bold text-white">DISCORD COMMUNITY</div>
                    <div className="text-[10px] text-neutral-400">Join developer &amp; researcher discussions</div>
                  </div>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-3 p-3 bg-surface hover:bg-white/10 border border-surface-border transition"
                >
                  <Github className="w-5 h-5 text-white" />
                  <div>
                    <div className="font-bold text-white">GITHUB REPOSITORY</div>
                    <div className="text-[10px] text-neutral-400">Open-source SDKs &amp; Move modules</div>
                  </div>
                </a>

                <a
                  href="mailto:support@nuvamed.io"
                  className="flex items-center space-x-3 p-3 bg-surface hover:bg-white/10 border border-surface-border transition"
                >
                  <Mail className="w-5 h-5 text-swiss-teal" />
                  <div>
                    <div className="font-bold text-white">DIRECT EMAIL SUPPORT</div>
                    <div className="text-[10px] text-neutral-400">support@nuvamed.io</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingSystem />
    </div>
  );
}
