const pick = require('../utils/pick');
const asyncHandler = require('../utils/async');
const service = require('../services/orders');

const createOrder = asyncHandler(async (req, res) => {
    const order = await service.createOrder(req.body);
    res.send(order);
});

const getOrders = asyncHandler(async (req, res) => {
    const query = pick(req.query, 'items', 'total', 'status', 'userId');
    const orders = await service.getOrders(query);
    res.send(orders);
});

const getOrder = asyncHandler(async (req, res) => {
    const order = await service.getOrder(req.params.id);
    res.send(order);
});

const updateOrder = asyncHandler(async (req, res) => {
    const order = await service.getOrder(req.params.id);
    const updatedOrder = await service.updateOrder(order, req.body);
    res.send(updatedOrder);
});

const deleteOrder = asyncHandler(async (req, res) => {
    const order = await service.getOrder(req.params.id);
    const deletedOrder = await service.deleteOrder(order);
    res.send(deletedOrder);
});

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder
};