// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { redirect } from "next/navigation";
// import Link from "next/link";

// export default function DashboardPage() {
//   const { data: session, status } = useSession();

//   if (status === "loading") return <p className="text-center mt-10">Loading...</p>;
//   if (status === "unauthenticated") redirect("/login");
//   if (!session?.user) redirect("/login");

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white">
//       {/* Sidebar */}
//       <aside className="w-full md:w-64 bg-gray-800 p-4 md:min-h-screen">
//         <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
//         <nav className="space-y-4">
//           <Link href="/dashboard" className="block hover:text-blue-400">Home</Link>
//           <Link href="/dashboard/add-project" className="block hover:text-blue-400">Add Project</Link>
//           <button 
//             onClick={() => signOut()}
//             className="block text-left w-full mt-8 text-red-500 hover:text-red-400"
//           >
//             Logout
//           </button>
//         </nav>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-6">
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
//           <h1 className="text-3xl font-bold">Welcome, {session?.user.email}</h1>
//           <button 
//             onClick={() => signOut()}
//             className="md:hidden mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Project management area */}
//         <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Placeholder card */}
//           <div className="bg-gray-800 p-4 rounded-lg shadow">
//             <h3 className="text-xl font-semibold mb-2">Project Title</h3>
//             <p className="text-gray-400 mb-4">Project description preview here.</p>
//             <div className="flex justify-between">
//               <button className="text-sm bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded">Edit</button>
//               <button className="text-sm bg-red-600 hover:bg-red-500 px-3 py-1 rounded">Delete</button>
//             </div>
//           </div>
//           {/* Add more cards dynamically later */}
//         </section>
//       </main>
//     </div>
//   );
// }

"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, PlusCircle, Home } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="text-center mt-10 text-white">Loading dashboard...</p>;
  if (status === "unauthenticated" || !session?.user) redirect("/login");

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">
      
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 p-6 space-y-8 fixed inset-y-0">
        <div>
          <h2 className="text-2xl font-extrabold mb-6 tracking-wide">My Portfolio</h2>
          <nav className="space-y-4">
            <Link href="/dashboard" className="flex items-center gap-3 hover:text-blue-400">
              <Home size={20} /> Home
            </Link>
            <Link href="/dashboard/add-project" className="flex items-center gap-3 hover:text-blue-400">
              <PlusCircle size={20} /> Add Project
            </Link>
          </nav>
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 text-red-500 hover:text-red-400"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Welcome back</h1>
            <p className="text-gray-400 mt-1">Hello, {session?.user.email}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="md:hidden mt-4 sm:mt-0 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Projects Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Sample Project Card */}
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-900/50 border border-gray-800 backdrop-blur-sm p-5 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">Project {idx + 1}</h3>
              <p className="text-gray-400 mb-4">Brief project description goes here for project {idx + 1}.</p>
              <div className="flex gap-3">
                <button className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-sm">Edit</button>
                <button className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm">Delete</button>
              </div>
            </div>
          ))}
        </section>

      </main>
    </div>
  );
}
