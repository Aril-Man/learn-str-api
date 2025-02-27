module.exports = {
    routes : [
        {
            method: 'POST',
            path: '/order/confirm/:id',
            handler: 'order.confirmOrder',
            config : {
                policies: ["api::order.is-user"]
            }
        }
    ]
}