import models from "../models/index.js";
const { Activity } = models;

let activityAttributes = [
  "id",
  "email",
  "title",
  "created_at",
  "updated_at",
  "deleted_at",
];

// Get all Activitys
const getActivity = (req, res) => {
  Activity.findAll({
    attributes: activityAttributes,
  })
    .then((data) => {
      return res.json({
        status: "Success",
        message: "Success",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      return res
        .json(400)
        .json({ status: "Failed", message: "Data not found!", data: {} });
    });
};

//Get single Activity
const getSingleActivity = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Bad Request",
      message: "title cannot be null",
      data: {},
    });
  }
  Activity.findOne({
    attributes: activityAttributes,
    where: {
      id: id,
    },
  })
    .then((data) => {
      if (data == null) {
        return res.status(404).json({
          status: "Not Found",
          message: `Activity with ID ${id} Not Found`,
          data: {},
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Success",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${id} Not Found`,
        data: {},
      });
    });
};

// Create Activity
const createActivity = (req, res) => {
  const { title, email } = req.body;
  if (!title) {
    return res.status(400).json({
      status: "Bad Request",
      message: "title cannot be null",
      data: {},
    });
  }
  Activity.create(
    {
      email: email,
      title: title,
    },
    {
      attributes: activityAttributes,
    }
  )
    .then((data) => {
      return res.status(201).json({
        status: "Success",
        message: "Success",
        data: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "Internal Server Error",
        message: "Please try again later",
        data: {},
      });
    });
};

// Update Activity
const updateActivity = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      status: "Bad Request",
      message: "title cannot be null",
      data: {},
    });
  }
  if (!id) {
    return res.status(400).json({
      status: "Bad Request",
      message: "id cannot be null",
      data: {},
    });
  }
  // try {
  //   let activity = await Activity.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  //   console.log(activity, title);
  //   activity.title = title;
  //   await activity.save();
  //   return res.status(200).json({
  //     status: "Success",
  //     message: "Success",
  //     data: activity,
  //   });
  // } catch (err) {
  //   console.log(err);
  //   return res.status(404).json({
  //     status: "Not Found",
  //     message: `Activity with ID ${id} Not Found`,
  //     data: {},
  //   });
  // }
  Activity.findOne({ where: { id }, attributes: activityAttributes })
    .then((activity) => {
      if (activity == null) {
        return res.status(404).json({
          status: "Not Found",
          message: `Activity with ID ${id} Not Found`,
          data: {},
        });
      }
      activity.title = title;
      activity
        .save()
        .then((result) => {
          res.status(200).json({
            status: "Success",
            message: "Success",
            data: activity,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(404).json({
            status: "Not Found",
            message: `Activity with ID ${id} Not Found`,
            data: {},
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${id} Not Found`,
        data: {},
      });
    });
};

// Delete Activity
const deleteActivity = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Bad Request",
      message: `id cannot be null`,
    });
  }
  Activity.destroy({
    where: {
      id,
    },
  })
    .then((data) => {
      res.status(200).json({
        status: "Success",
        message: "Success",
        data: {},
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${id} Not Found`,
        data: {},
      });
    });
};

export default {
  getActivity,
  getSingleActivity,
  createActivity,
  updateActivity,
  deleteActivity,
};
