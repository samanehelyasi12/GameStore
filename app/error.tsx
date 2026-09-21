"use client";

export default function RootError({ reset }: { reset: () => void }) {
  return (
    <div>
      <p>Something went wrong.</p>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}