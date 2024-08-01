module.exports = (sequelize, DataTypes) => {
    const Merchant = sequelize.define('Merchant', {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    });
    Merchant.associate = models => {
      Merchant.hasMany(models.Product, { foreignKey: 'merchantId' });
    };
    return Merchant;
  };
  