const validateFeed = (req, res, next) => {
  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    res.status(400);
    throw new Error('Title is required and cannot be empty');
  }

  if (!description || description.trim() === '') {
    res.status(400);
    throw new Error('Description is required and cannot be empty');
  }

  next();
};

module.exports = {
  validateFeed,
};
