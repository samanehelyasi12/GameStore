import Link from "next/link";
import { siteName } from "@/lib/data";

export default function Footer() {
  return (
    <footer>
      <p>{siteName}</p>
      <nav>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </nav>
    </footer>
  );
}