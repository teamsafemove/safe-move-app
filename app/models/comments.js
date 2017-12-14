module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("comments", {
        comment: {
            type: DataTypes.STRING,
            unique: true,
            len: [1, 4]
        },
    });
    return Post;
};