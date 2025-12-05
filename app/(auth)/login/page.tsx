import AuthShell from "../components/AuthShell";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell
      title="Sign In"
      welcomeTitle="Welcome Back!"
      welcomeSubtitle="Your journey starts here — sign in to continue."
    >
      <LoginForm />
    </AuthShell>
  )
}
