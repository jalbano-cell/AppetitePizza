"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error monitoring (e.g. Sentry) when integrated
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center py-24">
          <p className="font-display text-7xl font-bold text-brand/20 mb-6" aria-hidden>
            :(
          </p>
          <h1 className="font-display text-4xl font-bold text-cream mb-3">
            Something went wrong
          </h1>
          <p className="text-stone text-lg mb-10">
            We&apos;re sorry — an unexpected error occurred. Try refreshing the page.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-brand hover:bg-flame text-cream font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-brand/20"
          >
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      </Container>
    </section>
  );
}
