module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    });
    return Customer;
  };
  