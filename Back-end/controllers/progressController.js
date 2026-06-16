const mongoose = require("mongoose");
const Progress = require("../models/Progress");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const sanitizeProgressNumber = (value) => {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return 10;
  }

  return Math.min(Math.max(number, 0), 100);
};

exports.getMyProgress = async (req, res) => {
  try {
    const progressItems = await Progress.find({
      user: req.user.id,
    })
      .populate("material")
      .sort({ lastAccessedAt: -1, updatedAt: -1 });

    return res.json(progressItems);
  } catch (err) {
    console.error("Get progress error:", err.message);

    return res.status(500).json({
      msg: "Server error while fetching progress",
    });
  }
};

exports.startMaterial = async (req, res) => {
  try {
    const { materialId } = req.params;

    if (!isValidObjectId(materialId)) {
      return res.status(400).json({
        msg: "Invalid material id",
      });
    }

    const progressItem = await Progress.findOneAndUpdate(
      {
        user: req.user.id,
        material: materialId,
      },
      {
        $setOnInsert: {
          user: req.user.id,
          material: materialId,
          progress: 10,
          status: "in_progress",
          startedAt: new Date(),
        },
        $set: {
          lastAccessedAt: new Date(),
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    ).populate("material");

    return res.status(201).json({
      msg: "Material added to cabinet",
      progress: progressItem,
    });
  } catch (err) {
    console.error("Start material error:", err.message);

    return res.status(500).json({
      msg: "Server error while adding material to cabinet",
    });
  }
};

exports.updateMaterialProgress = async (req, res) => {
  try {
    const { materialId } = req.params;
    const { progress } = req.body;

    const progressNumber = Number(progress);

    if (Number.isNaN(progressNumber)) {
      return res.status(400).json({
        msg: "Progress must be a number",
      });
    }

    const safeProgress = Math.min(Math.max(progressNumber, 0), 100);

    const updatedProgress = await Progress.findOneAndUpdate(
      {
        user: req.user.id,
        material: materialId,
      },
      {
        user: req.user.id,
        material: materialId,
        progress: safeProgress,
        status: safeProgress >= 100 ? "completed" : "in_progress",
        completedAt: safeProgress >= 100 ? new Date() : null,
      },
      {
        new: true,
        upsert: true,
      },
    ).populate("material");

    return res.json(updatedProgress);
  } catch (err) {
    console.error("UPDATE PROGRESS ERROR:", err.message);

    return res.status(500).json({
      msg: "Failed to update progress",
      detail: err.message,
    });
  }
};

exports.completeMaterial = async (req, res) => {
  try {
    const { materialId } = req.params;

    if (!isValidObjectId(materialId)) {
      return res.status(400).json({
        msg: "Invalid material id",
      });
    }

    const progressItem = await Progress.findOneAndUpdate(
      {
        user: req.user.id,
        material: materialId,
      },
      {
        user: req.user.id,
        material: materialId,
        progress: 100,
        status: "completed",
        completedAt: new Date(),
        lastAccessedAt: new Date(),
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    ).populate("material");

    return res.json({
      msg: "Material completed",
      progress: progressItem,
    });
  } catch (err) {
    console.error("Complete progress error:", err.message);

    return res.status(500).json({
      msg: "Server error while completing material",
    });
  }
};

exports.removeProgress = async (req, res) => {
  try {
    const { materialId } = req.params;

    if (!isValidObjectId(materialId)) {
      return res.status(400).json({
        msg: "Invalid material id",
      });
    }

    await Progress.findOneAndDelete({
      user: req.user.id,
      material: materialId,
    });

    return res.json({
      msg: "Progress removed",
    });
  } catch (err) {
    console.error("Remove progress error:", err.message);

    return res.status(500).json({
      msg: "Server error while removing progress",
    });
  }
};
