const { Order } = require('../models/order');

const createOrder = async (createBody) => {
    try {
        const order = await Order.create(createBody);
        return order;
    } catch (error) {
        throw { code: 400, message: error.message };
    }
};

const getOrders = async (query) => {
    const orders = await Order.find(query);
    if (!orders.length) throw { code: 404, message: 'No orders found' };
    return orders;
};

const getOrder = async (id) => {
    const order = await Order.findById(id);
    if (!order) throw { code: 404, message: 'No order found with the given ID' };
    return order;
};

const updateOrder = async (order, updateBody) => {
    try {
        Object.assign(order, updateBody);
        await order.save();
        return order;
    } catch (error) {
        throw { code: 400, message: error.message };
    }
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