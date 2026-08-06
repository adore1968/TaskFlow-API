export const getTasks = async (req, res) => {
  try {
    return res.json({ message: "Get tasks endpoint" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    return res.json({ message: "Create task endpoint" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    return res.json({ message: "Update task endpoint" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
