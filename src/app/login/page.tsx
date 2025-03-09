import Login from "@/components/login";

export default function Signin () {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">Login</h1>
        <Login />
      </main>
    </div>
  );
}