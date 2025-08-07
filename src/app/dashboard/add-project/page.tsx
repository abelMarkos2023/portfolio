
"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function AddProjectPage() {
  const { data: session, status } = useSession();
 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

   if (status === "loading") return <p className="text-white">Loading...</p>;
  if (status === "unauthenticated" || !session?.user) redirect("/login");
  const addTechToStack = () => {
    if (techStackInput.trim() && !techStack.includes(techStackInput.trim())) {
      setTechStack([...techStack, techStackInput.trim()]);
      setTechStackInput("");
    }
  };

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter((item) => item !== tech));
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImageUrl(data.secure_url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          liveUrl,
          repoUrl,
          techStack,
        }),
      });

      if (!res.ok) throw new Error("Failed to add project");

      setMessage("✅ Project added successfully!");
      setTitle("");
      setDescription("");
      setImageUrl("");
      setLiveUrl("");
      setRepoUrl("");
      setTechStack([]);
    } catch (err) {
        console.log(err)
      setMessage("❌ Failed to add project.");
    } finally {
      setLoading(false);
      redirect('/dashboard')
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-gray-900 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Project</h1>
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input type="text" className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700" value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
              className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
            />
            {imageUrl && <Image width={200} height={200} src={imageUrl} alt="preview" className="mt-3 rounded-lg border border-gray-700" />}
          </div>

          {/* Live URL */}
          <div>
            <label className="block text-sm mb-1">Live URL</label>
            <input type="text" className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} />
          </div>

          {/* Repo URL */}
          <div>
            <label className="block text-sm mb-1">Repo URL</label>
            <input type="text" className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700" value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm mb-1">Tech Stack</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700"
                placeholder="Add a technology..."
              />
              <button type="button" onClick={addTechToStack} className="px-4 bg-blue-600 rounded-lg">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="flex items-center gap-2 bg-blue-800/30 text-blue-300 px-3 py-1 rounded-full text-sm">
                  {tech}
                  <button type="button" onClick={() => removeTech(tech)}>&times;</button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className="w-full bg-blue-600 py-3 rounded-lg">
            {loading ? "Adding..." : "Add Project"}
          </button>

          {message && <p className="text-center mt-3">{message}</p>}
        </form>
      </div>
    </div>
  );
}
