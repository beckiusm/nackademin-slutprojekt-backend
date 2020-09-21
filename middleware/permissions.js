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
    //console.log(orders[0].orderHistory[0])
    //const authOrders = orders.filter(order => order._id === order.orderHistory.find(id => id === order._id))
    const authOrders = orders.filter(order => order._id === order.orderHistory.find(id => id === order._id))
    for(order of orders) {
      //  console.log(order);
    }
    return orders
    //return authOrders
}

module.exports = {
    canCreateProduct,
    canUpdateProduct,
    canDeleteProduct,
    mapAuthorizedOrders
}