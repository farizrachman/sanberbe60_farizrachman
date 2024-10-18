import mongoose, { Types } from "mongoose";

export interface Order {
  _id?: Types.ObjectId;
  grandTotal: Number;
  orderItems: [String];
  status: string;
  createdBy: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

const Schema = mongoose.Schema;

// const schema = new Schema({
//   email: { type: String, unique: true, required: true },
//   hash: { type: String, required: true },
//   createdDate: { type: Date, default: Date.now },
//   settings: {
//     favorites: [String],
//     cart: [
//       {
//         quantity: Number,
//         marketId: String
//       }
//     ],
//     states: {
//       favorites: { type: Boolean, default: true },
//       search: { type: Boolean, default: false },
//       category: { type: Schema.Types.Mixed, default: false }
//     }
//   }
// });

const OrderSchema = new Schema<Order>({
  grandTotal: {
    type: Number,
    required: true,
  },
  orderItems: {
    type: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        subTotal: {
          type: Number,
          required: true,
        },
        orderId: {
          type: Schema.Types.ObjectId,
          ref: "Orders",
          required: true,
        },
      },
    ],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},
  {
    timestamps: true,
  });

const OrdersModel = mongoose.model("Orders", OrderSchema);

export default OrdersModel;
