const service = require('../services/orders');

const createOrder = async (req, res) => {
    const order = await service.createOrder(req.body);
    res.send(order);
};

const getOrders = async (req, res) => {
    const orders = await service.getOrders();
    res.send(orders);
};

const getOrder = async (req, res) => {
    const order = await service.getOrder(req.params.id);
    res.send(order);
};

const updateOrder = async (req, res) => {
    const order = await service.updateOrder(req.params.id, req.body);
    res.send(order);
};

const deleteOrder = async (req, res) => {
    const order = await service.deleteOrder(req.params.id);
    res.send(order);
};

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder
};