import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generate icremental id

  const id = await generateUserId()

  user.id = id
  //password

  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  const createUser = await User.create(user)
  if (!createUser) {
    throw new Error('Failed to create user!')
  }

  return createUser
}

export default {
  createUser,
}
