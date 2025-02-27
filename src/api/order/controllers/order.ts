/**
 * order controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::order.order', ({strapi}) => ({
    confirmOrder: async (ctx) => {
        const id = ctx.params.id;
        const body = ctx.request.body;
        await strapi.entityService.update('api::order.order',
            id, 
            {
                data: {
                    confirmed: body.confirm,
                }
            }
        )
        const order = await strapi.entityService.findOne('api::order.order', id)

        return {
            data: order,
            message: 'Order confirmed'
        }
    },
    async create(ctx) {
        const user = ctx.state.user;
        ctx.request.body.data.user = user.id;
        const order = await strapi.entityService.create('api::order.order', {
            data: ctx.request.body.data,
        });

        return {
            data: order
        };
    },
    async delete(ctx) {
        const id = ctx.params.id;
        const order = await strapi.entityService.delete('api::order.order', id);

        return {
            data: order
        }
    }
}));
