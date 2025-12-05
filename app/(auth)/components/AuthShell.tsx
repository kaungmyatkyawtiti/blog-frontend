import { ReactNode } from "react";
import AuthWelcome from "./AuthWelcome";

interface AuthShellProps {
  title: string;
  children: ReactNode;
  welcomeTitle: string;
  welcomeSubtitle: string;
}

export default function AuthShell({
  title,
  children,
  welcomeTitle,
  welcomeSubtitle,
}: AuthShellProps) {
  return (
    <>
      {/* right form */}
      <div className="w-full flex flex-col items-center justify-center space-y-10 py-10 lg:py-0">
        <h2 className="text-4xl text-foreground font-semibold">{title}</h2>
        {children}
      </div>

      {/* left welcome */}
      <AuthWelcome
        title={welcomeTitle}
        subtitle={welcomeSubtitle}
      />
    </>
  );
}
