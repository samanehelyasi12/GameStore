"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { User } from "@/lib/types/auth";

/**
 * =====================================================================
 * AuthProvider — «نشست کاربر»
 * ---------------------------------------------------------------------
 * الان یک دمو است: ورود هر اطلاعاتی را می‌پذیرد و کاربر را در
 * localStorage همان مرورگر نگه می‌دارد. هیچ رمزی ذخیره نمی‌شود.
 *
 * چرا این‌طوری نوشته شده تا بعداً بک‌اند بدون درد وصل شود:
 *  - رابط کاربری فقط `useAuth()` را صدا می‌زند و هیچ‌چیز درباره‌ی
 *    localStorage نمی‌داند.
 *  - شکل `User` دقیقاً همان چیزی است که یک endpoint ‎/me برمی‌گرداند.
 * بنابراین کافی است دو تابع `login` و `logout` را با fetch واقعی
 * جایگزین کنید؛ بقیه‌ی پنل بدون تغییر کار می‌کند.
 *
 * TODO(backend): جایگزینی `signIn` با درخواست واقعی به API احراز هویت.
 * =====================================================================
 */

const STORAGE_KEY = "gamestore.session.v1";

type AuthContextValue = {
  user: User | null;
  /** false تا وقتی localStorage خوانده نشده — برای پرهیز از flash ورود. */
  ready: boolean;
  signIn: (input: { name: string; email: string; phone?: string }) => Promise<User>;
  signOut: () => void;
  /** Test hook for the demo — clears the stored session. */
  reset: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readSession(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as User;
    return parsed?.email ? parsed : null;
  } catch {
    return null;
  }
}

function writeSession(user: User | null) {
  try {
    if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore quota errors — the demo keeps working in memory */
  }
}

/**
 * Builds a display name from whatever the user typed. Accepts a full name
 * ("آرش محمدی") or an email ("arash@example.com" → "Arash").
 */
function displayNameFrom(nameOrEmail: string): string {
  const value = nameOrEmail.trim();
  if (!value) return "کاربر گیم‌استور";

  if (value.includes("@")) {
    return value
      .split("@")[0]
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }
  return value;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  // Read the stored session after mount. Deliberately NOT wrapped in
  // requestAnimationFrame: rAF is throttled (or skipped entirely) while the
  // window is not painting, which would leave the navbar stuck on its
  // "checking session" placeholder.
  useEffect(() => {
    setUser(readSession());
    setReady(true);
  }, []);

  const signIn = useCallback<AuthContextValue["signIn"]>(async (input) => {
    const email = input.email.trim().toLowerCase();
    const given = input.name.trim();

    // The login form only collects one identifier, so `name` is often the
    // email itself — prettify that instead of showing the raw address.
    const name = !given || given.includes("@") ? displayNameFrom(given || email) : given;

    // A real backend would await the network here and could reject.
    const next: User = {
      id: email || `demo-${Date.now()}`,
      name,
      email,
      phone: input.phone?.trim() ?? "",
      createdAt: new Date().toISOString(),
    };

    setUser(next);
    writeSession(next);
    return next;
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    writeSession(null);
  }, []);

  const reset = useCallback(() => {
    setUser(null);
    writeSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, ready, signIn, signOut, reset }),
    [user, ready, signIn, signOut, reset],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
