import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function DELETE(req:Request, { params }: {params:Promise<{ id: string }>} ){

   
     console.log(params)
     try {
         const {id} =  await params;

        console.log('deleting project', id);
        await connectToDatabase();
    
        const deletedProject = await Project.findByIdAndDelete(id);
    
        if (!deletedProject) {
          return NextResponse.json({ message: "Project not found" }, { status: 404 });
        }
    
        return NextResponse.json({ message: "Project deleted successfully" });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
      }
}