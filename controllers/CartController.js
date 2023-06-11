import OrderModel from "../models/Order.js";

const populate = {
  path: "items",
  populate: {
    path: "doll",
    model: "Doll",
    select: ["dollName", "imageUrl", "price"],
  },
};
export const saveOrder = async (req, res) => {
  try {
    const { user, items, total } = req.body;

    // Create a new cart instance
    const cart = new OrderModel({
      user,
      items,
      total,
    });

    // Save the cart to the database
    const savedCart = await cart.save();

    res.json(savedCart);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Can't save order!",
    });
  }
};

export const getOrders = async (req, res) => {
  console.log(req.params.id);
  try {
    const orders = await OrderModel.find({ user: req.params.id })
      .populate(populate)
      .exec();
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Can`t get orders!",
    });
  }
};

export const getOneOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await OrderModel.findOne({
      _id: orderId,
    }).populate(populate);
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Can't get order!",
    });
  }
};
