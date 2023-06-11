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
    const { userData, items, totalPrice } = req.body;
    console.log(userData, items, totalPrice);

    // Extract an array of dollIds from the items array
    const dollIds = items.map((item) => item.id);

    // Create an array of items with doll references
    const itemRefs = dollIds.map((dollId) => ({ doll: dollId }));

    // Create a new order instance
    const newOrder = new OrderModel({
      user: userData._id,
      items: itemRefs,
      total: totalPrice,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Populate the 'items' field with the referenced 'Doll' model
    const populatedOrder = await OrderModel.populate(savedOrder, populate);

    res.json(populatedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Can't save order!",
    });
  }
};

export const getOrders = async (req, res) => {
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
