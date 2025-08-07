export default function ContactPage() {
  return (
    <section className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p className="mb-6">
        Have questions about your order or customization options? Reach out
        below.
      </p>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Name" className="border rounded p-2" />
        <input
          type="email"
          placeholder="Email"
          className="border rounded p-2"
        />
        <textarea
          placeholder="Message"
          rows={5}
          className="border rounded p-2"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
