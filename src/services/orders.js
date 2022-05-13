const { Order } = require('../models/order');

const createOrder = async (createBody) => {
    const order = await Order.create(createBody);
    return order;
};

const getOrders = async (query) => {
    const orders = await Order.find(query);
    return orders;
};

const getOrder = async (id) => {
    const order = await Order.findById(id);
    return order;
};

const updateOrder = async (order, updateBody) => {
    Object.assign(order, updateBody);
    await order.save();
    return order;
};

const deleteOrder = async (order) => {
    await order.remove();
    return order;
};

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder
};