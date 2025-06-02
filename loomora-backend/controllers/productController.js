
const products = [
  {
    id: '1',
    name: 'Demo Product',
    price: 500,
    description: 'This is a demo product',
    stock: 10
  }
];

const getAllProducts = (req, res) => {
  res.json(products);
};

const getProductById = (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  res.json(product);
};

module.exports = { getAllProducts, getProductById };
