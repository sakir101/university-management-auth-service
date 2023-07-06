import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({
    role: 'student'
  }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined
}

export const generateStudentId = async (academicSemester: IAcademicSemester): Promise<string> => {
  const currentId = (await findLastStudentId()) || (0).toString().padStart(5, '0')

  // incrementId
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementId = `${academicSemester.year.substring(2)}${academicSemester.code}${incrementId}`

  return incrementId
}

export const findLastFaculty = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean()
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined
}

export const generateFacultyId = async (): Promise<string> => {
  const currentId = (await findLastFaculty()) || (0).toString().padStart(5, '0')
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementId = `F-${incrementId}`
  return incrementId
}

export const findLastAdmin = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean()
  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined
}

export const generateAdminId = async (): Promise<string> => {
  const currentId = (await findLastAdmin()) || (0).toString().padStart(5, '0')
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementId = `A-${incrementId}`
  return incrementId
}
