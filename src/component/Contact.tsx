'use client';

export default function ContactForm() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <form
        action="https://formsubmit.co/info.drsk0@gmail.com"
        method="POST"
        className="w-full max-w-xl space-y-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-lg"
      >
        <h2 className="text-center text-2xl font-bold text-black">
          Contact Me
        </h2>

        {/* Name */}
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
            autoComplete="name"
            required
            placeholder="Your name"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder:text-gray-400 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Email */}
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
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder:text-gray-400 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
          />
          <p className="mt-1 text-xs text-gray-500">
            Please provide a valid email so I can respond to you.
          </p>
        </div>

        {/* Message */}
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
            autoComplete="off"
            required
            rows={5}
            placeholder="Write your message here..."
            className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder:text-gray-400 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Hidden config */}
        <input
          type="hidden"
          name="_subject"
          value="New message from Dr. SK website"
        />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}