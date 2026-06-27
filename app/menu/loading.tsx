import { Container } from "@/components/ui/Container";

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-charcoal" aria-hidden>
      <div className="h-44 bg-white/3 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 rounded-lg bg-white/5 animate-pulse" />
        <div className="h-3 w-full rounded-lg bg-white/3 animate-pulse" />
        <div className="h-3 w-2/3 rounded-lg bg-white/3 animate-pulse" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-14 rounded-full bg-white/4 animate-pulse" />
          <div className="h-5 w-14 rounded-full bg-white/4 animate-pulse" />
        </div>
        <div className="h-9 w-full rounded-xl bg-white/4 animate-pulse mt-2" />
      </div>
    </div>
  );
}

export default function MenuLoading() {
  return (
    <section className="pt-28 pb-24 min-h-screen" aria-label="Loading menu">
      {/* Category filter skeleton */}
      <div className="sticky top-[79px] z-30 bg-black/90 backdrop-blur-lg border-b border-white/5 py-4">
        <Container>
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-9 rounded-full bg-white/5 animate-pulse flex-shrink-0"
                style={{ width: i === 0 ? 56 : 80 }}
              />
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
