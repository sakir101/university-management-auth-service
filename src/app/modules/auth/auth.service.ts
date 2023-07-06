import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../users/user.model";
import bcrypt from 'bcrypt'
import jwt, { Secret } from "jsonwebtoken";
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelper";


const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
    const { id, password } = payload;
    //creating instance of user
    // const user = new User()
    //check user exist
    // const isUserExist = await user.isUserExist(id)

    const isUserExist = await User.isUserExist(id)

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User does not exist")
    }

    // Match password

    if (
        isUserExist.password &&
        !await User.isPasswordMatched(password, isUserExist.password)
    ) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
    }

    // create access token and refresh token
    const { id: userId, role, needPasswordChange } = isUserExist
    const accessToken = jwtHelpers.createToken(
        { userId, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    )

    const refreshToken = jwtHelpers.createToken(
        { userId, role },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    )


    return {
        accessToken,
        refreshToken,
        needPasswordChange
    }

}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
    let verifiedToken = null
    try {
        verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret as Secret);

    } catch (err) {
        throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token")
    }

    const { userId } = verifiedToken;

    const isUserExist = await User.isUserExist(userId)

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
    }

    const newAccessToken = jwtHelpers.createToken(
        {
            id: isUserExist.id,
            role: isUserExist.role
        },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    )

    return {
        accessToken: newAccessToken
    }
}


export const AuthService = {
    loginUser,
    refreshToken
}