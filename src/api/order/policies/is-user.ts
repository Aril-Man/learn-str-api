/**
 * is-user policy
 */

import  utils  from "@strapi/utils";
const policiesError = utils.errors;
 
export default async (policyContext, config, { strapi }) => {
    // Add your own logic here.
    strapi.log.info('In is-user policy.');

    const id = policyContext.request.params.id;
    const user = policyContext.state.user;

    const order = await strapi.entityService.findOne('api::order.order', id, {
      populate : 'user'
    });

    if (order.user.id !== user.id) {
      throw new policiesError.NotFoundError('You are not the owner of this order');
    }

    return true;
};
