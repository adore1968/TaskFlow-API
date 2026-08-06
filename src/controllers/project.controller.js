export const getProjects = async (req, res) => {
  try {
    return res.json({ message: "Get projects endpoint" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    return res.json({ message: "Create project endpoint" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    return res.json({ message: "Update project endpoint" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
