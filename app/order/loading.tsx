import { Container } from "@/components/ui/Container";

export default function OrderLoading() {
  return (
    <section className="pt-32 pb-24 min-h-screen" aria-label="Loading order form">
      <Container>
        {/* Page title skeleton */}
        <div className="mb-10 space-y-2">
          <div className="h-3 w-28 rounded-full bg-white/5 animate-pulse" />
          <div className="h-9 w-48 rounded-xl bg-white/7 animate-pulse" />
        </div>

        {/* Step indicator skeleton */}
        <div className="flex items-center gap-0 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="w-7 h-7 rounded-full bg-white/8 animate-pulse" />
              {i < 4 && <div className="flex-1 mx-2 h-px bg-white/5" />}
            </div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="space-y-4 max-w-lg">
          <div className="h-7 w-56 rounded-xl bg-white/7 animate-pulse" />
          <div className="h-4 w-40 rounded-lg bg-white/4 animate-pulse" />
          <div className="h-14 w-full rounded-2xl bg-white/4 animate-pulse mt-6" />
          <div className="h-14 w-full rounded-2xl bg-white/4 animate-pulse" />
          <div className="h-14 w-full rounded-2xl bg-white/4 animate-pulse" />
          <div className="h-14 w-full rounded-2xl bg-brand/10 animate-pulse mt-4" />
        </div>
      </Container>
    </section>
  );
}
