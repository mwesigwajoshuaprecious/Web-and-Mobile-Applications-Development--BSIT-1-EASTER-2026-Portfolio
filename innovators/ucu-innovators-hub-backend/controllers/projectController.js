const Project = require('../models/Project');
const Comment = require('../models/Comment');
const { sequelize } = require('../config/db');
const { QueryTypes } = require('sequelize');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.submitProject = [upload.single('document'), async (req, res) => {
  const { title, description, category, technologies, githubLink, faculty, department, year, teamMembers } = req.body;
  try {
    const project = await Project.create({
      title, description, category, technologies, githubLink,
      document: req.file ? req.file.path : null, faculty, department, year,
      teamMembers, creatorId: req.user.userId
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
}];

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({ where: { status: 'approved' } }); // Public view
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.approveProject = async (req, res) => {
  if (req.user.role !== 'supervisor' && req.user.role !== 'admin') return res.status(403).json({ msg: 'Unauthorized' });
  try {
    const project = await Project.update({ status: 'approved' }, { where: { id: req.params.id }, returning: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Add similar methods for reject, update
exports.getAnalytics = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Unauthorized' });
  try {
    const totalProjects = await Project.count();
    const projectsPerFaculty = await sequelize.query(
      'SELECT faculty, COUNT(*) as count FROM Projects GROUP BY faculty',
      { type: QueryTypes.SELECT }
    );
    // Add more analytics as needed
    res.json({ totalProjects, projectsPerFaculty });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create({ text: req.body.text, userId: req.user.userId, projectId: req.params.id });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};