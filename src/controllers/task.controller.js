import db from "../config/firebase.js";

export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const projectRef = db.collection("projects").doc(projectId);

    const projectDoc = await projectRef.get();

    if (!projectDoc.exists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const projectData = projectDoc.data();

    if (projectData.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const tasksSnapshot = await db
      .collection("tasks")
      .where("projectId", "==", projectId)
      .get();

    const tasks = tasksSnapshot.docs.map((task) => ({
      id: task.id,
      ...task.data(),
    }));

    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const taskDoc = await db.collection("tasks").doc(id).get();

    if (!taskDoc.exists) {
      return res.status(404).json({ message: "Task not found" });
    }

    const taskData = taskDoc.data();

    const projectDoc = await db
      .collection("projects")
      .doc(taskData.projectId)
      .get();

    if (!projectDoc.exists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const projectData = projectDoc.data();

    if (projectData.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const task = {
      id: taskDoc.id,
      ...taskData,
    };

    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, projectId } = req.body;

    const projectRef = db.collection("projects").doc(projectId);

    const projectDoc = await projectRef.get();

    if (!projectDoc.exists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const projectData = projectDoc.data();

    if (projectData.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const taskRef = await db.collection("tasks").add({
      title,
      description,
      status,
      priority,
      projectId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const task = {
      id: taskRef.id,
      title,
      description,
      status,
      priority,
      projectId,
    };

    return res.status(201).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const taskRef = db.collection("tasks").doc(id);

    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) {
      return res.status(404).json({ message: "Task not found" });
    }

    const taskData = taskDoc.data();

    const projectDoc = await db
      .collection("projects")
      .doc(taskData.projectId)
      .get();

    if (!projectDoc.exists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const projectData = projectDoc.data();

    if (projectData.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await taskRef.update({ ...req.body, updatedAt: new Date() });

    const updatedTask = await taskRef.get();

    return res.status(200).json({
      message: "Task updated successfully",
      task: { id: updatedTask.id, ...updatedTask.data() },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const taskRef = db.collection("tasks").doc(id);

    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) {
      return res.status(404).json({ message: "Task not found" });
    }

    const taskData = taskDoc.data();

    const projectDoc = await db
      .collection("projects")
      .doc(taskData.projectId)
      .get();

    if (!projectDoc.exists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const projectData = projectDoc.data();

    if (projectData.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await taskRef.delete();

    return res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
