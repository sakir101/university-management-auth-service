import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import { AcademicFacultyController } from './academicFaculty.controller'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/create-faculty', validateRequest
    (AcademicFacultyValidation.createAcademicFacultyZodSchema),
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN
    ),
    AcademicFacultyController.createFaculty
)

router.get('/:id',
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    AcademicFacultyController.getSingleFaculty)

router.patch('/:id', validateRequest
    (AcademicFacultyValidation.updateAcademicFacultyZodSchema),
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY
    ),
    AcademicFacultyController.updateAcademicFaculty)

router.delete('/:id',
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN
    ),
    AcademicFacultyController.deleteAcademicFaculty)

router.get('/',
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    AcademicFacultyController.getAllAcademicFaculties)

export const AcademicFacultyRoutes = router