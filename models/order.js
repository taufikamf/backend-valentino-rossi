module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      totalPrice: DataTypes.FLOAT,
      discount: DataTypes.FLOAT,
      finalPrice: DataTypes.FLOAT,
    });

    Order.associate = function(models) {
        Order.belongsTo(models.Product, { foreignKey: 'productId' });
        Order.belongsTo(models.Customer, { foreignKey: 'customerId' });
      };

    return Order;
  };
  