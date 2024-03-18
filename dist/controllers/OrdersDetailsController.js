"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrdersDetailsModel_1 = __importDefault(require("../models/OrdersDetailsModel"));
const OrdersDetailsController = {
    getAllOrderDetails: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ordersDetails = yield OrdersDetailsModel_1.default.getAllOrdersDetails();
            res.json(ordersDetails);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error reading the details' });
        }
    }),
    getOrderDetail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ordersDetailsId = req.params.id;
            const ordersDetails = yield OrdersDetailsModel_1.default.getOrderDetail(ordersDetailsId);
            if (!ordersDetails) {
                res.status(404).json({ message: `The detail with id ${ordersDetailsId} has not found` });
                return;
            }
            res.json(ordersDetails);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error reading the detail' });
        }
    }),
    addOrderDetail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { order_id, products_id, price, quantity } = req.body;
            if (!order_id || !products_id || !price || !quantity) {
                res.status(400).json({ message: 'Please enter the information' });
                return;
            }
            yield OrdersDetailsModel_1.default.createOrderDetail(req.body);
            res.status(201).json({ message: 'Detail created correctly!' });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error creating this detail' });
        }
    }),
    updateOrderDetail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const { order_id, products_id, price, quantity } = req.body;
            if (!order_id || !products_id || !price || !quantity) {
                res.status(400).json({ message: 'Please enter all information' });
                return;
            }
            yield OrdersDetailsModel_1.default.updateOrderDetail(id, req.body);
            res.status(200).json({ message: 'detail up to date!' });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error while Updating the detail' });
        }
    }),
    deleteOrderDetail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            yield OrdersDetailsModel_1.default.deleteOrderDetail(id);
            res.status(200).json({ message: 'Detail successfully deleted' });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error deleting the detail' });
        }
    }),
};
exports.default = OrdersDetailsController;
