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

<<<<<<< HEAD
function mapAuthorizedOrders(user, orders) {
    if(user.role === ROLE.ADMIN) return orders

    const authOrders = orders.filter(order => order._id == user.orderHistory.find(id => id == order._id))
    return authOrders
=======
function canReadAllOrders(user) {
    return user.role === ROLE.ADMIN
>>>>>>> newTtest
}

module.exports = {
    canCreateProduct,
    canUpdateProduct,
    canDeleteProduct,
    canReadAllOrders
}