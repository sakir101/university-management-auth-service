import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartement.validation'
import { AcademicDepartmentController } from './academicDepartement.controller'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'


const router = express.Router()

router.post('/create-department', validateRequest
    (AcademicDepartmentValidation.createAcademicDepartmentZodSchema),
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN
    ),
    AcademicDepartmentController.createDepartment
)

router.get('/:id',
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    AcademicDepartmentController.getSingleDepartment)

router.patch('/:id', validateRequest
    (AcademicDepartmentValidation.updateAcademicDepartmentZodSchema),
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN
    ),
    AcademicDepartmentController.updateAcademicDepartment)

router.delete('/:id',
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN
    ),
    AcademicDepartmentController.deleteAcademicDepartment)

router.get('/',
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    AcademicDepartmentController.getAllDepartments)

export const AcademicDepartmentRoutes = router