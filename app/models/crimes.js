module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("crimes", {
        City: {
            type: DataTypes.STRING,
            // prevent doubling the field;
            unique: true,
        },
        Population: {
            type: DataTypes.STRING,
        },
        violent_crimes: {
            type: DataTypes.DOUBLE
        },
        property_crimes: {
            type: DataTypes.DOUBLE
        }
    });
    return Post;
};