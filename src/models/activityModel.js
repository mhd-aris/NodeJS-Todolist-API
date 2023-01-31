const getActivityModel = (sequelize, { DataTypes }) => {
  const Activity = sequelize.define("activities", {
    title: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    createdAt: { type: DataTypes.DATE, field: "created_at" },
    updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    deletedAt: { type: DataTypes.DATE, field: "deleted_at" },
  });

  return Activity;
};

export default getActivityModel;
