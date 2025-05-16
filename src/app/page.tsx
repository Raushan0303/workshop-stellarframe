"use client";
import React, { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [hasPaid, setHasPaid] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  useEffect(() => {
    // Countdown timer logic
    function updateCountdown() {
      const targetDate = new Date("May 24, 2025 19:00:00").getTime();
      const now = new Date().getTime();
      const timeLeft = targetDate - now;
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      if (document) {
        const d = document.getElementById("days");
        const h = document.getElementById("hours");
        const m = document.getElementById("minutes");
        const s = document.getElementById("seconds");
        if (d) d.innerText = days < 10 ? "0" + days : days.toString();
        if (h) h.innerText = hours < 10 ? "0" + hours : hours.toString();
        if (m) m.innerText = minutes < 10 ? "0" + minutes : minutes.toString();
        if (s) s.innerText = seconds < 10 ? "0" + seconds : seconds.toString();
      }
    }
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!hasPaid) {
      setMessage(
        "Please confirm you have paid for the workshop before submitting."
      );
      return;
    }
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, hasPaid }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(
          "Thank you for registering! Details have been submitted successfully."
        );
        setForm({ name: "", email: "", phone: "" });
        setHasPaid(false);
      } else {
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen text-white font-poppins relative overflow-x-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="fixed top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)] animate-spin-slow" />
      </div>
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Left Section */}
          <div className="w-full md:w-1/2 space-y-8 order-2 md:order-1">
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-700 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
                AI Video Magic
              </span>
            </div>
            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Master AI Video Creation <br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
                in Just 3 Hours
              </span>
            </h1>
            {/* Countdown Timer */}
            <div className="rounded-xl bg-black/40 border border-orange-700/30 shadow-lg p-4">
              <p className="text-sm text-orange-200 mb-2">Webinar Starts In:</p>
              <div className="flex justify-between gap-4">
                <div className="text-center">
                  <div id="days" className="text-3xl md:text-4xl font-bold">
                    00
                  </div>
                  <div className="text-xs text-orange-300">Days</div>
                </div>
                <div className="text-center">
                  <div id="hours" className="text-3xl md:text-4xl font-bold">
                    00
                  </div>
                  <div className="text-xs text-orange-300">Hours</div>
                </div>
                <div className="text-center">
                  <div id="minutes" className="text-3xl md:text-4xl font-bold">
                    00
                  </div>
                  <div className="text-xs text-orange-300">Minutes</div>
                </div>
                <div className="text-center">
                  <div id="seconds" className="text-3xl md:text-4xl font-bold">
                    00
                  </div>
                  <div className="text-xs text-orange-300">Seconds</div>
                </div>
              </div>
            </div>
            {/* Webinar Details */}
            <div className="rounded-xl bg-white/5 backdrop-blur border border-orange-700/20 p-5 shadow-lg">
              <div className="flex flex-wrap gap-3 mb-3">
                <span className="px-3 py-1 bg-orange-600 rounded-full text-sm font-medium">
                  ₹399
                </span>
                <span className="px-3 py-1 bg-orange-700 rounded-full text-sm font-medium">
                  3 Hours
                </span>
                <span className="px-3 py-1 bg-orange-800 rounded-full text-sm font-medium">
                  Live Online
                </span>
                <span className="px-3 py-1 bg-green-600 rounded-full text-sm font-medium">
                  24th May, 7 PM
                </span>
              </div>
              <p className="text-lg">
                No upsells. No fluff. Just pure, hands-on AI video magic.
              </p>
              <div className="mt-3 flex items-center text-orange-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No recording will be provided. Show up live.</span>
              </div>
            </div>
            {/* What You'll Get */}
            <div className="rounded-xl bg-white/5 backdrop-blur border border-orange-700/20 p-5 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                🧠 Why This Workshop Is Different
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-green-400 mr-2">✅</span>
                  <span>
                    No sales pitch for any ₹50K course (we don't have one)
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2">✅</span>
                  <span>No "let me tell you about my life story"</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2">✅</span>
                  <span>Just 3 hours of pure, unfiltered execution</span>
                </div>
              </div>
            </div>
            {/* CTA for Mobile */}
            <div className="md:hidden mt-6">
              <button className="w-full py-4 px-6 rounded-lg font-bold text-white bg-gradient-to-r from-orange-500 to-orange-700 shadow-lg animate-pulse">
                Book Your Seat — Limited Slots Only
              </button>
            </div>
          </div>
          {/* Right Section - Form */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="rounded-2xl bg-white/10 backdrop-blur border border-orange-700/20 shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-2 text-center">
                🚀 Book Your Seat Now
              </h2>
              <p className="text-center mb-6 text-orange-200">
                <span className="block">
                  Date: 24th May | Time: 7:00 PM | Price: ₹399
                </span>
                <span className="block text-orange-400 text-sm mt-1">
                  Live Only. No Recording Will Be Provided.
                </span>
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-orange-200 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-orange-700/30 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-orange-200"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-orange-200 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-orange-700/30 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-orange-200"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-orange-200 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-orange-700/30 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-orange-200"
                    placeholder="Your phone number"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasPaid"
                    checked={hasPaid}
                    onChange={(e) => setHasPaid(e.target.checked)}
                    className="accent-orange-500 w-5 h-5"
                  />
                  <label htmlFor="hasPaid" className="text-orange-200 text-sm">
                    Yes, I have paid for the workshop
                  </label>
                </div>
                <a
                  href="https://rzp.io/rzp/vFrcysR4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mb-2"
                >
                  <button
                    type="button"
                    className="w-full py-3 px-6 rounded-lg font-bold text-white bg-gradient-to-r from-orange-500 to-orange-700 shadow-lg hover:scale-105 transition-transform mb-2"
                  >
                    Pay Now
                  </button>
                </a>
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-lg font-bold text-white mt-2 bg-gradient-to-r from-orange-500 to-orange-700 shadow-lg hover:scale-105 transition-transform"
                  disabled={submitting}
                >
                  {submitting
                    ? "Submitting..."
                    : "Book Your Seat — Limited Slots Only"}
                </button>
                {message && (
                  <div
                    className={`mt-2 text-center text-sm ${
                      message.startsWith("Thank")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        {/* Bonus Section */}
        <div className="mt-16 px-4 text-white space-y-16">
          <div className="rounded-xl bg-white/5 backdrop-blur border border-orange-700/20 p-8 text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">
              🎁 Bonus for Live Attendees
            </h2>
            <p className="text-lg mb-4">
              Unlock my personal AI video tool stack—featuring both free and
              paid tools—plus a pre-built template pack that saves you 20+ hours
              of work. Get exclusive access to our creator chat group and the
              exact behind-the-scenes prompts I use to make my videos stand out.
            </p>
            <span className="inline-block mt-2 text-sm px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full font-medium">
              Only for live attendees — don't miss it!
            </span>
          </div>
          {/* Hook Section */}
          <div className="rounded-xl bg-white/5 backdrop-blur border border-orange-700/20 p-8 text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">
              🤯 Ever seen those crazy AI videos online and thought…
            </h2>
            <p className="text-lg italic max-w-3xl mx-auto mb-4">
              "How the hell do they make these?"
            </p>
            <p className="text-orange-200 max-w-3xl mx-auto">
              Here's the truth:
              <br />
              It's not rocket science. And no, you don't need a ₹49,999 course.
              <br />
              You just need the right tools, the right prompts, and someone
              who's done it all—without flexing or selling you more at the end.
            </p>
          </div>
          {/* Who It's For */}
          <div className="rounded-xl bg-white/5 backdrop-blur border border-orange-700/20 p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              ⚡ This Workshop Is For You If You're A:
            </h2>
            <ul className="space-y-2 text-orange-100">
              <li>🎨 Creator who wants to stop overpaying editors</li>
              <li>🧠 Marketer who wants scroll-stopping ad creatives</li>
              <li>📸 Editor looking to learn AI workflows</li>
              <li>🚀 Startup/Agency Owner tired of outsourcing</li>
              <li>🎓 Student exploring the future of content</li>
            </ul>
            <p className="text-green-400 mt-4">
              No prior experience needed. Just curiosity.
            </p>
          </div>
          {/* What You'll Learn */}
          <div className="rounded-xl bg-white/5 backdrop-blur border border-orange-700/20 p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              🔒 What You'll Learn (In 3 Hours Flat):
            </h2>
            <ul className="space-y-2 text-orange-100">
              <li>✅ How to brainstorm & write viral scripts using ChatGPT</li>
              <li>
                ✅ Create stunning visuals with Midjourney, Ideogram & Freepik.
              </li>
              <li>
                ✅ Animate your ideas using tools like Kling, Hailuo, Runway,
                Higgsfield
              </li>
              <li>✅ Generate AI voiceovers using Eleven Labs</li>
              <li>
                ✅ Stitch it all together into a polished video—without touching
                Premiere Pro
              </li>
            </ul>
          </div>
          {/* Bonuses */}
          <div className="rounded-xl bg-white/5 backdrop-blur border border-orange-700/20 p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              🎁 Bonus You Get When You Join
            </h2>
            <ul className="space-y-2 text-orange-100">
              <li>🧩 My personal AI video tool stack (free + paid tools)</li>
              <li>🎬 Pre-built template pack to save 20+ hours of work</li>
              <li>💬 Invite to our exclusive creator chat group</li>
              <li>
                💡 Access to behind-the-scenes prompts I use for my own videos
              </li>
            </ul>
            <p className="text-orange-400 mt-2 font-medium">
              ⚠️ Note: These bonuses are only for live attendees
            </p>
          </div>
          {/* Instructor */}
          <div className="rounded-xl bg-white/5 backdrop-blur border border-orange-700/20 p-8 text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-2">
              👋 About Your Instructor
            </h2>
            <p className="text-orange-200 max-w-3xl mx-auto">
              Hey, I'm Naman. I run multiple content businesses and generate
              videos using AI tools end-to-end—from writing to visuals, editing,
              and voice.
              <br />
              No team. No studio. Just systems.
              <br />
              I've helped creators go viral, built content pipelines for brands,
              and now I want to teach you how to do it too—without burning money
              or time.
              <br />
              <strong className="text-white">
                This isn't theory. You'll walk out with a real video.
              </strong>
            </p>
          </div>
          {/* FAQ */}
          <div className="rounded-xl bg-white/5 backdrop-blur border border-orange-700/20 p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">❓ FAQ</h2>
            <div className="space-y-4 text-orange-100">
              <div>
                <strong>Q. I'm a total beginner. Can I still join?</strong>
                <br />
                Absolutely. The session is designed for beginners. Everything
                will be explained live.
              </div>
              <div>
                <strong>Q. Will I get a recording?</strong>
                <br />❌ No recording will be shared. This is a LIVE-only
                workshop. Show up to get the value.
              </div>
              <div>
                <strong>Q. Will you be selling a course at the end?</strong>
                <br />
                Nope. No pitch. No funnel. Just a workshop.
              </div>
              <div>
                <strong>Q. What if I can't attend live?</strong>
                <br />
                Then this one's not for you. We want action-takers, not
                note-collectors.
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="mt-16 text-center text-orange-300 text-sm pb-8">
          © 2025 Stellar Frame. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
