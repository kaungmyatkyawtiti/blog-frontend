import { ArrowDown, ChevronDown } from "lucide-react";
import Image from "next/image";

interface AuthWelcomeProps {
  title: string;
  subtitle: string;
}

const AuthWelcome = ({
  title = "Welcome Back!",
  subtitle = "Your journey starts here — sign in to continue.",
}: AuthWelcomeProps) => {
  return (
    <div
      className="relative w-full flex flex-col lg:flex-col-reverse items-center justify-center lg:border-l border-dashed border-border py-10 lg:py-0 min-h-dvh"
    >
      <div className="py-5 text-center space-y-3">
        <h2 className="text-4xl font-semibold text-social-indigo">{title}</h2>
        <p className="text-md text-foreground/90">{subtitle}</p>
      </div>

      <div className="w-full max-w-xl h-[480px] relative">
        <Image
          src="/blog.png"
          alt="Illustration"
          fill
          sizes="auto-fit"
          className="object-cover"
          loading="eager"
          priority
        />
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-6 flex flex-col items-center animate-bounce lg:hidden text-white bg-social-indigo p-2 rounded-full z-50">
        <ArrowDown size={24} />
      </div>
    </div>
  );
};

export default AuthWelcome;
