
// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import { LogOut, PlusCircle, Home } from "lucide-react";
// import { useEffect, useState } from "react";
// import { TProject } from "@/components/Projects";
// import ProjectCard from "@/components/ProjectCard";

// export default function DashboardPage() {
//   const { data: session, status } = useSession();



//   const [projects, setProjects] = useState<TProject[]>([]);

   
  
//     useEffect(() => {
//       const fetchProjects = async () => {
//         const res = await fetch("/api/projects", { cache: "no-store" });
//         const data = await res.json();
//         setProjects(data);
//       };
//       fetchProjects();
//     }, []);

//      if (status === "loading" || projects.length == 0) return <p className="text-center mt-10 text-white">Loading dashboard...</p>;
//      if (status === "unauthenticated" || !session?.user) redirect("/login");

//      console.log('projects',projects)

//   return (
//     <div className="min-h-screen flex bg-gray-950 text-white">
      
//       {/* Sidebar */}
//       <aside className="hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 p-6 space-y-8 fixed inset-y-0">
//         <div>
//           <h2 className="text-2xl font-extrabold mb-6 tracking-wide">My Portfolio</h2>
//           <nav className="space-y-4">
//             <Link href="/dashboard" className="flex items-center gap-3 hover:text-blue-400">
//               <Home size={20} /> Home
//             </Link>
//             <Link href="/dashboard/add-project" className="flex items-center gap-3 hover:text-blue-400">
//               <PlusCircle size={20} /> Add Project
//             </Link>
//           </nav>
//         </div>
//         <button
//           onClick={() => signOut()}
//           className="flex items-center gap-3 text-red-500 hover:text-red-400"
//         >
//           <LogOut size={20} /> Logout
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 md:ml-64 p-6 space-y-8">
        
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-center">
//           <div>
//             <h1 className="text-4xl font-bold">Welcome back</h1>
//             <p className="text-gray-400 mt-1">Hello, {session?.user.email}</p>
//           </div>
//           <button
//             onClick={() => signOut()}
//             className="md:hidden mt-4 sm:mt-0 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Projects Grid */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//           {/* Sample Project Card */}
//           {projects.map((_, idx) => (
//            <ProjectCard project={projects[idx]} key={projects[idx]._id} index={idx} />
//           ))}
//         </section>

//       </main>
//     </div>
//   );
// }

// app/dashboard/page.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, PlusCircle, Home, ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

export type TProject = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  techStack: string[];
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<TProject[]>([]);
  const [editingProject, setEditingProject] = useState<TProject | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/projects", { cache: "no-store" });
      const data = await res.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This project will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (status === "loading") return <p className="text-center mt-10 text-white">Loading dashboard...</p>;
  if (status === "unauthenticated" || !session?.user) redirect("/login");

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">
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

      <main className="flex-1 md:ml-64 p-6 space-y-8">
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

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-blue-700/40 transition duration-500 group"
            >
              <div className="overflow-hidden">
                <Image
                  width={500}
                  height={300}
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 space-y-4">
                <h3 className="text-2xl font-bold text-white/90 group-hover:text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-4 flex-wrap">
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md transition"
                    >
                      <ExternalLink size={16} /> Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition"
                    >
                      <Github size={16} /> Code
                    </a>
                  )}
                  <button
                    onClick={() => setEditingProject(project)}
                    className="text-sm bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-sm bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {editingProject && (
          <EditProjectModal
            project={editingProject}
            onClose={() => setEditingProject(null)}
            onUpdate={(updated) =>
              setProjects((prev) =>
                prev.map((p) => (p._id === updated._id ? updated : p))
              )
            }
          />
        )}
      </main>
    </div>
  );
}

function EditProjectModal({
  project,
  onClose,
  onUpdate,
}: {
  project: TProject;
  onClose: () => void;
  onUpdate: (updated: TProject) => void;
}) {
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    imageUrl: project.imageUrl,
    liveDemoUrl: project.liveDemoUrl || "",
    githubUrl: project.githubUrl || "",
    techStack: project.techStack.join(", "),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/projects`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        id: project._id,
        techStack: formData.techStack.split(",").map((t) => t.trim()),
      }),
    });
    if (res.ok) {
      const updated = await res.json();
      onUpdate(updated);
      onClose();
    } else {
      alert("Failed to update project");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-bold">Edit Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
          {
            project.imageUrl && (
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={500}
                height={500}
                className="w-full h-auto"
              />
            )
          }
          <input
            name="liveDemoUrl"
            value={formData.liveDemoUrl}
            onChange={handleChange}
            placeholder="Live Demo URL"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
          <input
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
          <input
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="Tech Stack (comma-separated)"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
