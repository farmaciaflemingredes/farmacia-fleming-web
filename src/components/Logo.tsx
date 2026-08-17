import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Farmacia Fleming, ir al inicio"
    >
      <Image
        src="/brand/wordmark.png"
        alt="Farmacia Fleming"
        width={1188}
        height={755}
        priority
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
