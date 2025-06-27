// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/mongodb';
// import Project from '@/models/Project';

// GET all projects
export async function GET() {
  await connectToDatabase();
  const projects = await Project.find().sort({ createdAt: -1 });
  return NextResponse.json(projects);
}

// // POST new project
// export async function POST(request: Request) {
//   try {
//     await connectToDatabase();
//     const body = await request.json();

//     const { title, description, imageUrl, liveDemoUrl, githubUrl, techStack } = body;

//     if (!title || !description || !imageUrl) {
//       return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
//     }

//     const newProject = await Project.create({
//       title,
//       description,
//       imageUrl,
//       liveDemoUrl,
//       githubUrl,
//       techStack,
//     });

//     return NextResponse.json(newProject, { status: 201 });
//   } catch (error) {
//     console.error('Error creating project:', error);
//     return NextResponse.json({ message: 'Server error.' }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/mongodb";
import Project from "@/models/Project";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { title, description, imageUrl, liveUrl, repoUrl, technology, techStack } = await req.json();

    if (!title || !description || !imageUrl) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newProject = await Project.create({
      title,
      description,
      imageUrl,
      liveDemoUrl: liveUrl,
      githubUrl: repoUrl,
      technology,
      techStack,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

