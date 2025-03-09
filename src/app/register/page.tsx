import Register from "@/components/register";

export default function Signup () {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">Register</h1>
        <Register />
      </main>
    </div>
  );
}
