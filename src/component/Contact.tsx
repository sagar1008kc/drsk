'use client';

export default function ContactForm() {
  return (
    <div className="mt-10 flex justify-center px-4">
      <form
        action="https://formsubmit.co/info.drsk0@gmail.com"
        method="POST"
        className="w-full md:w-1/2 space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-black">
          Contact Me
        </h2>

        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder:text-gray-400 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Email
          </label>
          <input
            type="email"
            name="email"
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
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Message
          </label>
          <textarea
            name="message"
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

        {/* Optional success redirect */}
        {/* <input type="hidden" name="_next" value="https://yourdomain.com/thank-you" /> */}

        {/* Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full md:w-1/2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}