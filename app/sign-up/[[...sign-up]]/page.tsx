import { SignUp } from "@clerk/nextjs";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function Page() {
  return (
    <AuthLayout>
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
      />
    </AuthLayout>
  );
}
