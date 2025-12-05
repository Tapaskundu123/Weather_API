import express from 'express';
const router = express.Router();


router.get("/", (req, res) => {
  res.json({
    message: "List of users",
    users: []
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    message: `User details for ID: ${id}`,
    user: {}
  });
});

export default router;