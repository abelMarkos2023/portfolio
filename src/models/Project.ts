import  { Schema, models, model } from 'mongoose';

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String, // Cloudinary image URL
      required: true,
    },
    liveDemoUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    technology: {
      type: String,
    },
    techStack: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

// Prevent re-declaration error in Next.js hot reload
export default models.Project || model('Project', projectSchema);
