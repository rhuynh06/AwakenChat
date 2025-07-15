import { SignUp } from '@clerk/nextjs';
import { neobrutalism } from '@clerk/themes';

export default function SignInPage() {
  return (
    <SignUp
      appearance={{
        baseTheme: neobrutalism,
        elements: {
          logoBox: "w-20 h-20 mx-auto",
        },
      }}
    />
  );
}
