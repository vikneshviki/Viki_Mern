const express = require("express");
const uniqid = require("uniqid");
const profileSchema = require("../Model/profileSchema.js");
const Router = express.Router();

// let data = [
//   { id: uniqid(), name: "viknesh", position: "fullstack" },
//   { id: uniqid(), name: "sonai", position: "frondend" },
//   { id: uniqid(), name: "lakshmanan", position: "backend" },
//   { id: uniqid(), name: "surendran", position: "backend" },
//   { id: uniqid(), name: "bhargav", position: "backend" },
// ];

Router.get("/getData", async (req, res) => {
  const data = await profileSchema.find();
  try {
    if (data.length > 0) {
      return res.status(200).json({ data });
    }
    res.status(400).json({ msg: "data fetch fails" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

Router.delete("/deleteone/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const profileDataCheck = await profileSchema.findById(id);
    console.log(profileDataCheck);
    if (profileDataCheck.id === id) {
      await profileSchema.findByIdAndDelete({ _id: id });
      return res.status(200).json({ msg: "Deleted the record" });
    }
    res.status(400).json({ msg: "Record Not Found" });
  } catch (err) {
    res.status(500).json({ err });
  }
});
Router.post("/createData", async (req, res) => {
  try {
    const { name, position } = req.body;
    if (!name || !position) {
      return res
        .status(400)
        .json({ msg: "please entry full detials of name and position" });
    }
    let newProfile = new profileSchema({
      name: req.body.name,
      position: req.body.position,
    });
    await newProfile.save();
    res.status(200).json({ msg: "Data updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

Router.patch("/updateData/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, position } = req.body;
    const updateDataCheck = await profileSchema.findById(id);
    if (updateDataCheck.id === id) {
      if (!name || !position) {
        return res
          .status(404)
          .json({ msg: "Update fails as required data is missing" });
      }
      await profileSchema.findByIdAndUpdate(id, { name, position });
      return res.status(200).json({ msg: "Data updated" });
    }
    res.status(404).json({ msg: "Data not found" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = Router;
