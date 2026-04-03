'use client';

export default function ContactForm() {
  return (
    <div className="mt-8 flex justify-center">
      <form
        action="https://formsubmit.co/info.drsk0@gmail.com"
        method="POST"
        className="w-full max-w-sm space-y-4 rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
      >
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-black"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black placeholder:text-gray-400 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-black"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black placeholder:text-gray-400 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-semibold text-black"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Write your message here..."
            className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-black placeholder:text-gray-400 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
          />
        </div>

        <input type="hidden" name="_subject" value="New message from Dr. SK website" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />

        <button
          type="submit"
          className="w-full rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}