

// GET all projects

import { NextRequest, NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/mongodb";
import Project from "@/models/Project";

export const POST = async (req: Request) => {
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

export async function GET() {
  await connectToDatabase();
  const projects = await Project.find().sort({ createdAt: -1 });
  return NextResponse.json(projects);
}

// DELETE project by ID


// UPDATE project by ID
export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    console.log(body);

    const data = {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      liveDemoUrl: body.liveDemoUrl,
      githubUrl: body.githubUrl,
      technology: body.technology,
      techStack: body.techStack,
    };

    const updatedProject = await Project.findByIdAndUpdate(body.id, data, {
      new: true, // return the updated document
      runValidators: true,
    });

    if (!updatedProject) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update project" }, { status: 500 });
  }
}