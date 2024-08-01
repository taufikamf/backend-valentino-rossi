const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const merchantRoutes = require('./routes/merchant');
const customerRoutes = require('./routes/customer');

const app = express();
app.use(bodyParser.json());

app.use('/merchant', merchantRoutes);
app.use('/customer', customerRoutes);

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
