
let orders = [];

const placeOrder = (req, res) => {
  const order = {
    id: Date.now().toString(),
    products: req.body.products,
    total: req.body.total,
    user: req.body.user,
    paymentMethod: req.body.paymentMethod,
    status: 'Processing',
  };
  orders.push(order);
  res.json(order);
};

const getAllOrders = (req, res) => {
  res.json(orders);
};

module.exports = { placeOrder, getAllOrders };
