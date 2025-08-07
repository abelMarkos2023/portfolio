import { Download } from "lucide-react";

export default function ResumeButton() {
  return (
    <div className="text-center">
      <a
        href="/resume.pdf"
        download
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-1 bg-transparent text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        <Download className="mr-2" size={12} />
        View / Download Résumé
      </a>
    </div>
  );
}
