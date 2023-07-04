import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { OrderHistoryValidation } from './orderHistory.validation'
import { OrderHistoryController } from './orderHistory.controller'

const router = express.Router()

router.post('/', validateRequest(OrderHistoryValidation.createOrderHistoryZodSchema), OrderHistoryController.createOrderHistory)

router.get('/', OrderHistoryController.getAllOrderHistories)

export const OrderHistoryRoutes = router