const Material = require("../models/Material");

exports.getAllMaterials = async (req, res) => {
  try {
    const { subject, search } = req.query;
    const query = {};

    if (subject && subject !== "all") {
      query.subject = subject;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const materials = await Material.find(query).sort({
      subject: 1,
      difficulty: 1,
      title: 1,
    });

    return res.json(materials);
  } catch (err) {
    console.error("Get materials error:", err.message);

    return res.status(500).json({
      msg: "Server error while fetching materials",
    });
  }
};

exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({
        msg: "Material not found",
      });
    }

    return res.json(material);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        msg: "Invalid material ID",
      });
    }

    console.error("Get material detail error:", err.message);

    return res.status(500).json({
      msg: "Server error while fetching material detail",
    });
  }
};
