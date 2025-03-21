/** "use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert(result.error);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
} **/

  "use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  console.log("rendered");

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // alert(1)
    e.preventDefault();
    // console.log("form submitted");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(email, password);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    // console.log(result);
    // alert(result);

    if (result?.error) {
      console.log(result.error);
      setError(result.error);
      // setError("Invalid email or password");
      // alert(result.error);
    } else {
      router.push(callbackUrl);
      // router.push("/dashboard");
    }
  }; 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="">Login</h1>
      {/* <form onSubmit={() => alert(1)}>
        <button type="submit">Submit</button>
      </form> */}
      {error && <p className="">{error}</p>} 
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
        <input type="email" name="email" placeholder="Email" required className="border p-2" />
        <input type="password" name="password" placeholder="Password" required className="border p-2" />
        <button type="submit" className="">Login</button>
      </form>
    </div>
  );
}
