import { appConfig } from "@/config/app";

export function SupportFooter() {
  return (
    <p className="text-xs text-muted">
      Need help? Contact{" "}
      <a href={`mailto:${appConfig.emails.support}`} className="font-medium text-brand hover:underline">
        {appConfig.emails.support}
      </a>
    </p>
  );
}
