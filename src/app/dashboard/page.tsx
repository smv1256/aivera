    import { auth } from "../../../auth";
    import { redirect } from "next/navigation";

    export default async function Dashboard() {
      const session = await auth();
    
      console.log("Session data:", session); // Debugging
    
      if (!session || !session.user) {
        redirect("/login");
        // return <div>Not authenticated</div>;
      }
    
      return (
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold">Dashboard</h1>
            <p>{session.user.name}</p>
          </main>
        </div>
      );
    }    