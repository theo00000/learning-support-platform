const Enrollment = require("../models/Enrollment");
const Material = require("../models/Material");

exports.getMyProgress = async (req, res) => {
  try {
    const progress = await Enrollment.find({
      user: req.user.id,
    }).populate("material", "title subject difficulty duration");

    return res.json(progress);
  } catch (err) {
    console.error("Get progress error:", err.message);

    return res.status(500).json({
      msg: "Server error while fetching progress",
    });
  }
};

exports.markMaterialCompleted = async (req, res) => {
  try {
    const { materialId } = req.params;

    const material = await Material.findById(materialId);

    if (!material) {
      return res.status(404).json({
        msg: "Material not found",
      });
    }

    const progress = await Enrollment.findOneAndUpdate(
      {
        user: req.user.id,
        material: materialId,
      },
      {
        status: "completed",
        completedAt: new Date(),
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    ).populate("material", "title subject difficulty duration");

    return res.json({
      msg: "Material marked as completed",
      progress,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        msg: "Invalid material ID",
      });
    }

    console.error("Mark completed error:", err.message);

    return res.status(500).json({
      msg: "Server error while updating progress",
    });
  }
};

exports.resetMaterialProgress = async (req, res) => {
  try {
    const { materialId } = req.params;

    const progress = await Enrollment.findOneAndUpdate(
      {
        user: req.user.id,
        material: materialId,
      },
      {
        status: "not_started",
        completedAt: null,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    ).populate("material", "title subject difficulty duration");

    return res.json({
      msg: "Material progress reset",
      progress,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        msg: "Invalid material ID",
      });
    }

    console.error("Reset progress error:", err.message);

    return res.status(500).json({
      msg: "Server error while resetting progress",
    });
  }
};
