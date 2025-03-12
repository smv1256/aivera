import getServerSession from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Dashboard () {  
    const session = getServerSession(authOptions);
    console.log(session);

    if (!session) return <div>Not authenticated</div>

    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold">Dashboard</h1>
        </main>
      </div>
    );
  }
  