import Navbar from "@/components/layout/Navbar";

export default function Header() {
  // TODO: pass the real cart count once the cart store exists: <Navbar cartCount={count} />
  return (
    <div className="animate-enter-top">
      <Navbar />
    </div>
  );
}