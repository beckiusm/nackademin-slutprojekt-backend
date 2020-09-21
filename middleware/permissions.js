const ROLE = require('./roles')

function canCreateProduct(user) {
    return user.role === ROLE.ADMIN
}

function canUpdateProduct(user) {
    return user.role === ROLE.ADMIN
}

function canDeleteProduct(user) {
    return user.role === ROLE.ADMIN
}

function mapAuthorizedOrders(user, orders) {
    if(user.role === ROLE.ADMIN) return orders

    const authOrders = orders.filter(order => order._id == user.orderHistory.find(id => id == order._id))
    return authOrders
}

module.exports = {
    canCreateProduct,
    canUpdateProduct,
    canDeleteProduct,
    mapAuthorizedOrders
}