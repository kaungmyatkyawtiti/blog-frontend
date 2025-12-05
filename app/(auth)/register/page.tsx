import AuthShell from "../components/AuthShell";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create Account"
      welcomeTitle="Hello There!"
      welcomeSubtitle="Start your journey by creating your account."
    >
      <RegisterForm />
    </AuthShell>
  )
}
