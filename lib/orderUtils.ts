import type { PickupDate, PickupTime } from "@/types/order";

const OPEN_HOUR = 11;
const CLOSE_HOUR = 22;
const SLOT_INTERVAL_MINS = 15;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toLabel(d: Date): string {
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${h}:${pad(m)} ${ampm}`;
}

function toValue(d: Date): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function roundUpTo15(d: Date): Date {
  const rem = SLOT_INTERVAL_MINS - (d.getMinutes() % SLOT_INTERVAL_MINS);
  const next = new Date(d.getTime() + rem * 60_000);
  next.setSeconds(0, 0);
  return next;
}

export function generatePickupDates(): PickupDate[] {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const weekday = d.toLocaleDateString("en-CA", { weekday: "short" });
    const monthDay = d.toLocaleDateString("en-CA", { month: "short", day: "numeric" });
    return {
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : `${weekday}, ${monthDay}`,
      shortLabel: i === 0 ? "Today" : i === 1 ? "Tomorrow" : weekday,
      value: d.toISOString().split("T")[0],
      isToday: i === 0,
    };
  });
}

export function generatePickupTimes(isToday: boolean): PickupTime[] {
  const times: PickupTime[] = [];

  if (isToday) {
    const now = new Date();
    times.push({ label: "ASAP (~20 min)", value: "asap", isASAP: true });

    for (const min of [15, 30, 45, 60]) {
      const t = new Date(now.getTime() + min * 60_000);
      if (t.getHours() < CLOSE_HOUR) {
        times.push({
          label: min < 60 ? `${min} minutes` : "1 hour",
          value: toValue(t),
        });
      }
    }

    const slotStart = roundUpTo15(new Date(now.getTime() + 75 * 60_000));
    let cursor = new Date(slotStart);
    const seen = new Set(times.map((t) => t.value));

    while (cursor.getHours() < CLOSE_HOUR) {
      const v = toValue(cursor);
      if (!seen.has(v)) {
        times.push({ label: toLabel(cursor), value: v });
        seen.add(v);
      }
      cursor = new Date(cursor.getTime() + SLOT_INTERVAL_MINS * 60_000);
    }
  } else {
    const base = new Date();
    base.setHours(OPEN_HOUR, 0, 0, 0);
    let cursor = new Date(base);
    while (cursor.getHours() < CLOSE_HOUR) {
      times.push({ label: toLabel(cursor), value: toValue(cursor) });
      cursor = new Date(cursor.getTime() + SLOT_INTERVAL_MINS * 60_000);
    }
  }

  return times;
}

export function generateOrderNumber(): string {
  return `APT-${Math.floor(10000 + Math.random() * 90000)}`;
}

export function pickupDisplayLabel(date: PickupDate, time: PickupTime): string {
  if (time.isASAP) return `${date.label} · ASAP (~20 min)`;
  return `${date.label} · ${time.label}`;
}

export function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function formatCardNumber(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

export function formatExpiry(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}
