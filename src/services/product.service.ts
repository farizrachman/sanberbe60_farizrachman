/**
 * src/services/product.service.ts
 */

import ProductsModel, { Product } from "../models/products.model";
import * as Yup from "yup";

const createValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  price: Yup.number().required(),
  categoryId: Yup.string().required(),
  description: Yup.string().required(),
  images: Yup.array().of(Yup.string()).required().min(1),
  qty: Yup.number().required().min(1),
});

export const create = async (payload: Product): Promise<Product> => {
  await createValidationSchema.validate(payload);
  const result = await ProductsModel.create(payload);
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
): Promise<Product[]> => {
  const result = await ProductsModel.find(query)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 })
    .populate("categoryId");
  return result;
};
export const findOne = async (id: string): Promise<Product | null> => {
  const result = await ProductsModel.findById(id);
  return result;
};
export const update = async (
  id: string,
  payload: Product
): Promise<Product | null> => {
  const result = await ProductsModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const remove = async (id: string): Promise<Product | null> => {
  const result = await ProductsModel.findOneAndDelete({
    _id: id,
  });
  return result;
};
