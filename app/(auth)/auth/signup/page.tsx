import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";

export default function SignUpPage() {
  return (
    <div className="p-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to get started
        </p>
      </div>
      
      <AuthForm type="signup" />

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}