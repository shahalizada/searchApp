const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const Search = require("../Models/searchSchema");
//Search data...
router.post(
  "/search",
  [body("unID", "Please Provide Your ID...").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { unID } = req.body;
    try {
      const user = await Search.findOne({ unID });
      if (!user) {
        return res.status(404).json({
          errors: [
            {
              msg: "We are so sorry we couldn't fine any associated user!",
            },
          ],
        });
      }
      res.json({ user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "There is an error Search route" });
    }
  }
);

//Add data...
router.post(
  "/add",
  [
    body("unID", "The UN ID is a required field").not().isEmpty(),
    body("firstName", "First Name is a required field").not().isEmpty(),
    body("lastName", "Last Name is a required field").not().isEmpty(),
    body("fatherName", "Father Name is a required field").not().isEmpty(),
    body("status", "Status is a required field").not().isEmpty(),
    body("process", "Process is a required field").not().isEmpty(),
    body("phone", "Phone is a required field").not().isEmpty(),
    body("email", "Email is a required field").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      unID,
      firstName,
      lastName,
      fatherName,
      location,
      entryDate,
      nationality,
      birthday,
      email,
      phone,
      status,
      process,
    } = req.body;
    try {
      let user = await Search.findOne({ unID });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "This ID was already being submitted!" }] });
      }
      user = new Search({
        unID,
        firstName,
        lastName,
        fatherName,
        location,
        entryDate,
        nationality,
        birthday,
        email,
        phone,
        status,
        process,
      });
      user.save();
      res.json({ user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "There is an error on Add route" });
    }
  }
);
module.exports = router;
