import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CowModelValidation } from './cowModel.validation'
import { CowModelController } from './cowModel.controller'

const router = express.Router()

router.post('/', validateRequest
    (CowModelValidation.createCowModelZodSchema),
    CowModelController.createCowModel
)

router.get('/:id', CowModelController.getSingleCowModel)

router.patch('/:id', validateRequest
    (CowModelValidation.updateCowModelZodSchema), CowModelController.updateCowModel)
router.delete('/:id', CowModelController.deleteCowModel)

router.get('/', CowModelController.getAllCowModels)

export const CowModelRoutes = router