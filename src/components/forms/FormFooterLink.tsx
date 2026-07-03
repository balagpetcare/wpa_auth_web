import Link from "next/link";

export function FormFooterLink({
  prompt,
  label,
  href,
}: {
  prompt: string;
  label: string;
  href: string;
}) {
  return (
    <span>
      {prompt}{" "}
      <Link href={href} className="font-medium text-brand hover:underline">
        {label}
      </Link>
    </span>
  );
}
