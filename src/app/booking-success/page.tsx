type BookingSuccessPageProps = {
    searchParams: Promise<{ session_id?: string }>;
  };
  
  export default async function BookingSuccessPage({
    searchParams,
  }: BookingSuccessPageProps) {
    const params = await searchParams;
    const sessionId = params.session_id;
  
    return (
      <main className="min-h-screen bg-black text-white">
        <section className="mx-auto max-w-3xl px-4 py-20 text-center">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur md:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600/20">
              <span className="text-3xl text-green-400">✓</span>
            </div>
  
            <h1 className="mt-6 text-3xl font-bold md:text-4xl">
              Payment Successful
            </h1>
  
            <p className="mt-4 text-base leading-8 text-gray-300">
              Thank you. Your session request has been received successfully.
              I will review your details and follow up with the next steps.
            </p>
  
            {sessionId ? (
              <p className="mt-4 text-sm text-gray-500">
                Reference: {sessionId}
              </p>
            ) : null}
          </div>
        </section>
      </main>
    );
  }