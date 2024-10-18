import { Request, Response } from "express";
import OrdersModel from "../models/orders.model";

export default {
    async create(req: Request, res: Response) {
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
            res.status(201).json({
                data: result,
                message: "Success create category",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed create category",
            });
        }
    },
    async findAll(req: Request, res: Response) {
        /**
        #swagger.tags = ['Orders']
        */
        try {
            const search = req.query.search;
            const page = req.query.page;
            const limit = req.query.limit;

            const result = await OrdersModel.find();
            res.status(200).json({
                data: result,
                message: "Success get all categories",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed get all categories",
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
                message: "Success get one category",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed get one category",
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
                message: "Success update category",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed update category",
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
                message: "Success delete category",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed delete category",
            });
        }
    },
};
