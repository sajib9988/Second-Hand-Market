import { Router } from 'express';
import { OrderController } from './order.controller';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.interface';

const router = Router();

// Define routes
router.get(
    '/my-sell-orders',
    auth(UserRole.USER),
    OrderController.getMySellOrders // Update function name too!
);


router.get(
    '/my-orders',
    auth(UserRole.USER),
    OrderController.getMyOrders
);

router.get(
    '/:orderId',
    auth(UserRole.USER),
    OrderController.getOrderDetails
);

router.post(
    '/',
    auth(UserRole.USER),
    OrderController.createOrder
)

router.patch(
    '/:orderId/status',
    auth(UserRole.USER),
    OrderController.changeOrderStatus
)

export const OrderRoutes = router;
