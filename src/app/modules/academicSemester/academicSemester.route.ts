import express from 'express'
// import { UserController } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'


const router = express.Router()

router.post('/create-semester', validateRequest
    (AcademicSemesterValidation.createAcademicSemesterZodSchema),
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN
    ),
    AcademicSemesterController.createSemester
)

router.get('/:id',
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    AcademicSemesterController.getSingleSemester
)

router.patch('/:id', validateRequest
    (AcademicSemesterValidation.updateAcademicSemesterZodSchema),
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
    ),
    AcademicSemesterController.updateSemester
)
router.delete('/:id',
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN
    ),
    AcademicSemesterController.deleteSemester)

router.get('/',
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    AcademicSemesterController.getAllSemesters)



export const AcademicSemesterRoutes = router
