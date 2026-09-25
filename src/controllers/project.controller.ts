import { Timestamp } from "firebase-admin/firestore";
import db from "../config/firebase.js";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/project.schema.js";

type CreateProjectBody = z.infer<typeof createProjectSchema>;
type UpdateProjectBody = z.infer<typeof updateProjectSchema>;

export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projectsSnapshot = await db
      .collection("projects")
      .where("userId", "==", req.user.id)
      .get();

    const projects = projectsSnapshot.docs.map((project) => ({
      id: project.id,
      ...project.data(),
    }));

    return res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

export const getProject = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const projectDoc = await db.collection("projects").doc(id).get();

    if (!projectDoc.exists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const projectData = projectDoc.data();

    if (!projectData) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (projectData.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const project = {
      id: projectDoc.id,
      ...projectData,
    };

    return res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export const createProject = async (
  req: Request<{}, {}, CreateProjectBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, status } = req.body;
    const createdAt = Timestamp.now();
    const updatedAt = createdAt;

    const projectRef = await db.collection("projects").add({
      title,
      description,
      status,
      userId: req.user.id,
      createdAt,
      updatedAt,
    });

    const project = {
      id: projectRef.id,
      title,
      description,
      status,
      userId: req.user.id,
      createdAt,
      updatedAt,
    };

    return res
      .status(201)
      .json({ message: "Project created successfully", project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: Request<{ id: string }, {}, UpdateProjectBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const projectRef = db.collection("projects").doc(id);

    const projectDoc = await projectRef.get();

    if (!projectDoc.exists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const projectData = projectDoc.data();

    if (!projectData) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (projectData.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await projectRef.update({
      ...req.body,
      updatedAt: Timestamp.now(),
    });

    const updatedProject = await projectRef.get();

    return res.status(200).json({
      message: "Project updated successfully",
      project: {
        id: updatedProject.id,
        ...updatedProject.data(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const projectRef = db.collection("projects").doc(id);

    const projectDoc = await projectRef.get();

    if (!projectDoc.exists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const projectData = projectDoc.data();

    if (!projectData) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (projectData.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await projectRef.delete();

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};
