const ROLE = require('./Roles')

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
    return orders.filter(order => order._id === user.orderHistory.find(order._id))
}

module.exports = {
    canCreateProduct,
    canUpdateProduct,
    canDeleteProduct,
    mapAuthorizedOrders
}