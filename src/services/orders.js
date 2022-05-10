const { Order } = require('../models/order');

const createOrder = async (createBody) => {
    const order = await Order.create(createBody);
    return order;
};

const getOrders = async () => {
    const orders = await Order.find();
    return orders;
};

const getOrder = async (id) => {
    const order = await Order.findById(id);
    return order;
};

const updateOrder = async (id, updateBody) => {
    const order = await getOrder(id);
    Object.assign(order, updateBody);
    await order.save();
    return order;
};

const deleteOrder = async (id) => {
    const order = await getOrder(id);
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