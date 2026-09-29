"use client";

import { useEffect, useState } from "react";
import { formatCountdown, formatDateTime, parseUtc } from "@/lib/format";
import type { AuctionStatus } from "@/lib/api/types";

/**
 * Counts down to the end of a live auction (or the start of an upcoming one).
 * The API's times are the truth; this is decoration that keeps a page left
 * open honest. The server render shows the plain date, and the ticking starts
 * after mount, so there is no server/browser mismatch.
 */
export function Countdown({
  status,
  startsAt,
  endsAt,
  className,
}: {
  status: AuctionStatus;
  startsAt: string | null;
  endsAt: string | null;
  className?: string;
}) {
  const target = parseUtc(status === "upcoming" ? startsAt : endsAt);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (status === "ended" || !target) return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [status, target?.getTime()]); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === "ended") {
    const when = formatDateTime(endsAt);
    return <span className={className}>{when ? `Ended ${when}` : "Ended"}</span>;
  }
  if (!target) return <span className={className}>{status === "live" ? "Live now" : "Starts soon"}</span>;

  const iso = target.toISOString();
  if (now === null) {
    const when = formatDateTime(iso);
    return (
      <time dateTime={iso} className={className}>
        {status === "upcoming" ? "Starts" : "Ends"} {when}
      </time>
    );
  }

  const left = Math.floor((target.getTime() - now) / 1000);
  if (left <= 0) {
    return (
      <span className={className}>{status === "upcoming" ? "Starting now" : "Auction closing"}</span>
    );
  }
  const urgent = status === "live" && left < 3600;
  return (
    <time
      dateTime={iso}
      className={className}
      data-urgent={urgent || undefined}
      // A ticking number is read out once a second by a screen reader if it
      // is a live region; it is not one, so it reads as ordinary text.
    >
      {status === "upcoming" ? "Starts in " : "Ends in "}
      <strong>{formatCountdown(left)}</strong>
    </time>
  );
}
