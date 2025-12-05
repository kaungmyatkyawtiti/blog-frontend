export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-screen">
      {children}
    </div>
  )
}
