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
const OrdersModel_1 = __importDefault(require("../models/OrdersModel"));
const OrdersController = {
    getAllOrders: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const orders = yield OrdersModel_1.default.getAllOrders();
            res.json(orders);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error reading the order' });
        }
    }),
    getOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ordersId = req.params.id;
            const orders = yield OrdersModel_1.default.getOrder(ordersId);
            if (!orders) {
                res.status(404).json({ message: `The order with id  ${ordersId} has not found` });
                return;
            }
            res.json(orders);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error reading the order' });
        }
    }),
    addOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { amount, user_id, order_details } = req.body;
            if (!amount || !user_id || !order_details || order_details.length === 0) {
                res.status(400).json({ message: 'Please enter the order information' });
                return;
            }
            yield OrdersModel_1.default.createOrder(req.body);
            res.status(201).json({ message: 'order created correctly!' });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error creating this order' });
        }
    }),
    updateOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const { amount, description } = req.body;
            if (!amount || !description) {
                res.status(400).json({ message: 'Please enter all order information' });
                return;
            }
            yield OrdersModel_1.default.updateOrder(id, req.body);
            res.status(200).json({ message: 'Order up to date!' });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error while Updating the order' });
        }
    }),
    deleteOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            yield OrdersModel_1.default.deleteOrder(id);
            res.status(200).json({ message: 'Order successfully deleted' });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error deleting the order' });
        }
    }),
};
exports.default = OrdersController;
