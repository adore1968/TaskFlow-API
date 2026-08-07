import db from "../config/firebase.js";

export const getProjects = async (req, res) => {
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
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectDoc = await db.collection("projects").doc(id).get();

    if (!projectDoc.exists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const projectData = projectDoc.data();

    if (projectData.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const project = {
      id: projectDoc.id,
      ...projectData,
    };

    return res.status(200).json(project);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const createdAt = new Date();
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
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const projectRef = db.collection("projects").doc(id);

    const projectDoc = await projectRef.get();

    if (!projectDoc.exists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const projectData = projectDoc.data();

    if (projectData.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await projectRef.update({
      ...req.body,
      updatedAt: new Date(),
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
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectRef = db.collection("projects").doc(id);

    const projectDoc = await projectRef.get();

    if (!projectDoc.exists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const projectData = projectDoc.data();

    if (projectData.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await projectRef.delete();

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
