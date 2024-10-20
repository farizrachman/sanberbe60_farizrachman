import { Request, Response } from "express";
import OrdersModel from "../models/orders.model";
import ProductsModel from "../models/products.model";
import * as Yup from "yup";
import mongoose, { Types, ObjectId } from "mongoose";
import { IPaginationQuery } from "../utils/interfaces";
import mail from "../utils/mail";

enum statusType {
    pending = "pending",
    completed = "completed",
    cancelled = "cancelled"
}
const createValidationSchema = Yup.object().shape({
    grandTotal: Yup.number().required(),
    orderItems: Yup.array().of(Yup.string()).required(),
    status: Yup.mixed<statusType>().oneOf(Object.values(statusType)).required(),
    createBy: Yup.string().required(),
});

// export interface IFindAll {
//     query?: unknown;
//     limit: number;
//     page: number;
//     search: string;
// }

export default {
    // 1. Membuat Order Baru
    async create(req: Request, res: Response, doc: any) {
        /**
        #swagger.tags = ['Orders']
        #swagger.security = [{
        "bearerAuth": []
        }]
        #swagger.requestBody = {
        required: true,
        schema: {
            $ref: "#/components/schemas/OrderCreateRequest"
        }
        }
        */
        try {
            const result = await OrdersModel.create(req.body);
            // const product = await ProductsModel.findByIdAndUpdate(
            //     { _id: req.body.orderId},
            //     {
            //         $push: { courses: req.body },
            //         $inc: {
            //             quantity: 1,
            //         },
            //     },
            //     { new: true }
            // )
            // const filter = { _id: req.body.orderItems.productId };
            // const updateQty = {
            //     // $set: {
            //     //     qty: req.body.orderItems.productId.qty - req.body.orderItems.qty,
            //     // },
            //     $inc: {
            //         // total: parseInt(req.body.price),
            //         qty: req.body.orderItems.productId.qty - req.body.orderItems.qty,
            //     },
            // };
            // let options = { status: "completed" };
            // const product = await ProductsModel.findByIdAndUpdate('orderItems.productId', { qty: qtyUpdate }, options);
            // ProductsModel.findOneAndUpdate(filter, updateQty);
            // console.log(product);

            // for (const item of order.orderItems) {
            //     const product = await ProductsModel.findById(item.productId);
            //     product.qty -= item.qty;
            //     // await product.save();
            // }

            for (const item of req.body.orderItems) {
                const product = await ProductsModel.findOne({ _id: item.productId });
                if (item.qty > product!.qty) {
                    return res.status(400).json({
                        message: `quantity di product tidak cukup ambil order, dengan name product: ${product!.name}`,
                    });
                }
                await ProductsModel.findByIdAndUpdate(item.productId, {
                    $inc: { qty: -item.qty },
                });
            }
            const order = doc;

            // console.log("Send Email to", order.email);

            const content = await mail.render('invoice.ejs', {
                // tampilkan list product di dalam email sesuai dengan data orderItems, apabila orderItems 5 maka tampil 5, apabila orderItems 10 maka tampil 10 dst.
                grandTotal: order.grandTotal,
                orderItems: order.orderItems,
                status: order.status,
                createdBy: order.createdBy,
            });

            await mail.send({
                // to: order.createdBy.username,
                to: "farizrachman91@gmail.com",
                subject: "Berhasil pesan order",
                content,
            });

            res.status(201).json({
                // data: [result, product],
                data: result,
                message: "Success create order",
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                res.status(400).json({
                    data: error.errors,
                    message: "Failed create order",
                });
                return;
            }

            console.log(error);

            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed create order",
            });
        }
    },
    async findAll(req: Request, res: Response,) {
        /**
        #swagger.tags = ['Orders']
        */
        try {
            // const {
            //     limit = 10,
            //     page = 1,
            //     search,
            // } = req.query;

            const {
                limit = 10,
                page = 1,
                search,
            } = req.query as unknown as IPaginationQuery;
            // const query = {
            //     limit: 10,
            //     page: 1,
            // };
            // const query: Record<string, any> = {};
            const query = {};
            if (search) {
                Object.assign(query, {
                    status: { $regex: search, $options: "i" },
                });
            }

            // const result = await OrdersModel.find(query)
            //     .limit(limit)
            //     .skip((page - 1) * limit)
            //     .sort({ createdAt: -1 })
            //     .populate("productId")
            //     .populate("createBy")
            //     .exec();
            // console.log(req.query);
            const result = await OrdersModel.find(query)
                .limit(limit)
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 })
                .populate("orderItems.productId")
                .populate("createdBy")
                .exec();
            // console.log(result);

            res.status(200).json({
                data: result,
                message: "Success get all orders",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed get all orders",
            });
        }
    },
    async findOne(req: Request, res: Response) {
        /**
        #swagger.tags = ['Orders']
        */
        try {
            const result = await OrdersModel.findOne({
                _id: req.params.id,
            });
            res.status(200).json({
                data: result,
                message: "Success get one order",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed get one order",
            });
        }
    },
    // 2. Menampilkan Riwayat Order berdasarkan Pengguna (User)
    async historyOrder(req: Request, res: Response,) {
        /**
        #swagger.tags = ['Orders']
        */
        try {

            const {
                limit = 10,
                page = 1,
                search,
            } = req.query as unknown as IPaginationQuery;
            // const query: Record<string, any> = {};
            const query = {};
            if (search) {
                Object.assign(query, {
                    status: { $regex: search, $options: "i" },
                });
            }

            const result = await OrdersModel.find(query)
                .limit(limit)
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 })
                .populate("createdBy")
                .exec();
            // console.log(result);

            res.status(200).json({
                data: result,
                message: "Success get all orders",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed get all orders",
            });
        }
    },
    async update(req: Request, res: Response) {
        /**
        #swagger.tags = ['Orders']
        #swagger.security = [{
        "bearerAuth": []
        }]
        #swagger.requestBody = {
        required: true,
        schema: {
            $ref: "#/components/schemas/OrderCreateRequest"
        }
        }
        */
        try {
            const result = await OrdersModel.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                {
                    new: true,
                }
            );

            res.status(200).json({
                data: result,
                message: "Success update order",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed update order",
            });
        }
    },
    async delete(req: Request, res: Response) {
        /**
        #swagger.tags = ['Orders']
        #swagger.security = [{
        "bearerAuth": []
        }]
        */
        try {
            const result = await OrdersModel.findOneAndDelete({
                _id: req.params.id,
            });

            res.status(200).json({
                data: result,
                message: "Success delete order",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed delete order",
            });
        }
    },
};