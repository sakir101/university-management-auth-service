import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { CowModelRoutes } from '../modules/cowModel/cowModel.route';
import { OrderHistoryRoutes } from '../modules/orderHistory/orderHistory.route';





const router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: UserRoutes
    },
    {
        path: '/cows',
        route: CowModelRoutes
    },
    {
        path: '/orders',
        route: OrderHistoryRoutes
    },


]
moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;

