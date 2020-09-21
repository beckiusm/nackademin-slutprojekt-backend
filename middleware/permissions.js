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

module.exports = {
    canCreateProduct,
    canUpdateProduct,
    canDeleteProduct
}