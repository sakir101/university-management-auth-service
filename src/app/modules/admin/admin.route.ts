import express from 'express'
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidation } from './admin.validation';
import { AdminController } from './admin.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';


const router = express.Router();

router.get(
    '/:id',
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    AdminController.getSingleAdmin
);

router.patch(
    '/:id',
    validateRequest(AdminValidation.updateAdmin),
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
    ),
    AdminController.updateAdmin
);

router.delete(
    '/:id',
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN
    ),
    AdminController.deleteAdmin
);

router.get(
    '/',
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    AdminController.getAllAdmins
);



export const AdminRoutes = router;