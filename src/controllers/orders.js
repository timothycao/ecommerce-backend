const pick = require('../utils/pick');
const service = require('../services/orders');

const createOrder = async (req, res) => {
    const order = await service.createOrder(req.body);
    res.send(order);
};

const getOrders = async (req, res) => {
    const query = pick(req.query, 'products', 'total', 'status', 'userId');
    const orders = await service.getOrders(query);
    res.send(orders);
};

const getOrder = async (req, res) => {
    const order = await service.getOrder(req.params.id);
    res.send(order);
};

const updateOrder = async (req, res) => {
    const order = await service.getOrder(req.params.id);
    const updatedOrder = await service.updateOrder(order, req.body);
    res.send(updatedOrder);
};

const deleteOrder = async (req, res) => {
    const order = await service.getOrder(req.params.id);
    const deletedOrder = await service.deleteOrder(order);
    res.send(deletedOrder);
};

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder
};