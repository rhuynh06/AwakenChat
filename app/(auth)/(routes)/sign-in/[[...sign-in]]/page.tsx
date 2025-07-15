import { SignIn } from '@clerk/nextjs';
import { neobrutalism } from '@clerk/themes';

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        baseTheme: neobrutalism,
        elements: {
          logoBox: "w-20 h-20 mx-auto",
        },
      }}
    />
  );
}
