import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";

export default function SignInPage() {
  return (
    <div className="p-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>
      
      <AuthForm type="signin" />

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}