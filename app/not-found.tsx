import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center py-24">
          <p className="font-display text-9xl font-bold text-brand/20 mb-6" aria-hidden>
            404
          </p>
          <h1 className="font-display text-4xl font-bold text-cream mb-3">
            Page not found
          </h1>
          <p className="text-stone text-lg mb-10">
            The page you&apos;re looking for doesn&apos;t exist or was moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand hover:bg-flame text-cream font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-brand/20"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </Container>
    </section>
  );
}
