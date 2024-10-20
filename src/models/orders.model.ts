import mongoose, { Types, Document, ObjectId } from "mongoose";

// export interface Order {
//   _id?: Types.ObjectId;
//   grandTotal: Number;
//   orderItems: [String];
//   status: string;
//   createdBy: Types.ObjectId;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface orderDetail {
//   name: String;
//   productId: Types.ObjectId;
//   price: String;
//   qty: Number;
//   subTotal: Number;
//   order: Types.ObjectId;
// }

// export interface Order {
//   _id?: Types.ObjectId;
//   grandTotal: Number;
//   // orderItems: [Array];
//   // orderItems: { name: String; productId: String; price: String; qty: Number; subTotal: Number; order: Types.ObjectId }[];
//   // orderItems: Array<{ name: String; productId: Types.ObjectId; price: String; qty: Number; subTotal: Number; order: Types.ObjectId }> 
//   orderItems: Array<orderDetail>;
//   status: String;
//   createdBy: Types.ObjectId;
//   createdAt: String;
//   updatedAt: String;
// }

// export interface orderItems {
//   name: String;
//   productId: ObjectId;
//   price: String;
//   qty: Number;
//   subTotal: Number;
//   order: ObjectId;
//   // createdAt: string;
//   // updatedAt: string;
// }

// export interface Order {
//   grandTotal: number;
//   orderItems: orderItems[];
//   status: 'pending' | 'completed' | 'cancelled';
//   createdBy: ObjectId;
//   createdAt: string;
//   updatedAt: string;
// }

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  grandTotal: {
    type: Number,
    required: true,
  },
  orderItems: {
    type: [
      {
        name: {
          type: Schema.Types.String,
          ref: "Products",
          required: true,
        },
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        price: {
          type: Schema.Types.String,
          ref: "Products",
          required: true,
        },
        qty: {
          type: Schema.Types.Number,
          // ref: "Products",
          required: true,
          min: [1, "Minimal qty adalah 1"],
          max: [5, "Maximal qty adalah 5"],
        },
        subTotal: {
          type: Number,
          required: true,
        },
        order: {
          type: Schema.Types.ObjectId,
          ref: "Orders",
          // required: true,
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
  }
);

const OrdersModel = mongoose.model("Orders", OrderSchema);

export default OrdersModel;
