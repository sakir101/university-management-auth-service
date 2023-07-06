import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { facultyValidation } from './faculty.validation'
import { FacultyController } from './faculty.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.get('/:id',
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    FacultyController.getSingleFaculty
)
router.patch('/:id', validateRequest
    (facultyValidation.facultyUpdateZodSchema),
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
    ),
    FacultyController.updateFaculty
)
router.delete('/:id',
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN
    ),
    FacultyController.deleteFaculty
)
router.get('/',
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    FacultyController.getAllFaculties
)


export const FacultyRoutes = router