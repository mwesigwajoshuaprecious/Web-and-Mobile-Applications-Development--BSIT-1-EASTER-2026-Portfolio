const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const projectController = require('../controllers/projectController');

router.post('/submit', auth, projectController.submitProject);
router.get('/', projectController.getProjects); // Public
router.put('/approve/:id', auth, projectController.approveProject);
router.get('/analytics', auth, projectController.getAnalytics);
router.post('/comment/:id', auth, projectController.addComment);
router.get('/my', auth, async (req, res) => {
  const projects = await Project.findAll({
    where: { submittedBy: req.user.id }
  });
  res.json(projects);
});
module.exports = router;