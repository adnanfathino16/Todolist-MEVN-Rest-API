const db = require("../models");
const Post = db.posts;

exports.findAll = (req, res) => {
  Post.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving posts.",
      });
    });
};

exports.create = async (req, res) => {
  const { title, body, published } = req.body;

  const duplicate = await Post.findOne({ title: title });

  if (duplicate) {
    return res.status(400).json({
      success: false,
      message: "title sudah ada",
    });
  }

  const post = new Post({
    title: title,
    body: body,
    published: published ? published : false,
  });

  await post
    .save(post)
    .then((result) => {
      res.status(200).json({
        result,
        message: "post berhasil ditambahkan",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while create posts.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while show posts.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndUpdate(id, req.body)
    .then((result) => {
      res.send({
        message: "Post has updated",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while update posts.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Post not found",
        });
      }

      res.send({
        message: "Post has deleted",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while delete posts.",
      });
    });
};
