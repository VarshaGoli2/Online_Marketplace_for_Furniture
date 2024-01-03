const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

  product_ids: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  seller_id: {
    type: String,
    required: true,
  },
  buyer_id: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  shipped_address: {
    street: String,
    city: String,
    state: String,
    zipCode: Number,
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
