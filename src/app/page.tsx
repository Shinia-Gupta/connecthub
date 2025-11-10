"use server";

export default async function Home() {


  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">


      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to ConnectHub</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl">
          The platform where professionals connect, collaborate, and grow together.
        </p>

      </main>


    </div>
  );
}
