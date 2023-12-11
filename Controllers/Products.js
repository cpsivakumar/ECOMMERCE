const Product = require("../Models/Product");

const getAllproductsStatic = async (req, res) => {
  const products = await Product.find({}).select("name price").limit(5).skip(2);

  res.status(200).json({ products, nbHits: products.length });
};

const getAllproducts = async (req, res) => {
  const { featured, company, name, sort , fields } = req.query;

  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    console.log(sortList);
    result = result.sort(sortList);
  }

  if (fields) {
    const fieldsList = fields.split(",").join("");
    console.log(fieldsList);
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.page) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  let products = await result;

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllproducts,
  getAllproductsStatic,
};
