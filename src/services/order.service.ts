/**
 * src/services/order.service.ts
 */

import OrdersModel from "../models/orders.model";
import * as Yup from "yup";
import mongoose, { Types, ObjectId } from "mongoose";

export interface orderItems {
  name: String;
  productId: ObjectId;
  price: String;
  qty: Number;
  subTotal: Number;
  order: ObjectId;
  // createdAt: string;
  // updatedAt: string;
}

enum statusType {
  pending = "pending",
  completed = "completed",
  cancelled = "cancelled"
}

export interface IOrderPayload {
  grandTotal: number;
  orderItems: orderItems[];
  // status: 'pending' | 'completed' | 'cancelled';
  status: statusType;
  createdBy: ObjectId;
  createdAt: string;
  updatedAt: string;
}

// "pending", "completed", "cancelled"
const createValidationSchema = Yup.object().shape({
  grandTotal: Yup.number().required(),
  orderItems: Yup.array().of(Yup.string()).required(),
  // status: Yup.mixed<statusType>().oneOf(Object.values(statusType)).required(),
  status: Yup.string().required(),
  createBy: Yup.string().required(),
});

export const create = async (payload: IOrderPayload[]): Promise<string> => {
  await createValidationSchema.validate(payload);
  const result = await OrdersModel.create(payload);
  // console.log(result);
  return result;
};

export interface IFindAll {
  query?: unknown;
  limit: number;
  page: number;
}

export const findAll = async (
  query: any,
  limit: number = 10,
  page: number = 1
): Promise<string[]> => {
  const result = await OrdersModel.find(query)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 })
    .populate("orderItems.productId")
    .populate("createdBy");
  return result;
};
export const findOne = async (id: string): Promise<IOrderPayload | null> => {
  const result = await OrdersModel.findById(id);
  return result;
};
// export const historyOrder = async (
//   query: any,
//   limit: number = 10,
//   page: number = 1
// ): Promise<Order[]> => {
//   const result = await OrdersModel.find(query)
//     .limit(limit)
//     .skip((page - 1) * limit)
//     .sort({ createdAt: -1 })
//     .populate("createdBy");
//   return result;
// };
export const update = async (
  id: string,
  payload: IOrderPayload
): Promise<string | null> => {
  const result = await OrdersModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const remove = async (id: string): Promise<string | null> => {
  const result = await OrdersModel.findOneAndDelete({
    _id: id,
  });
  return result;
};
