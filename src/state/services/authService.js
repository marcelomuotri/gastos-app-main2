import { loginSuccess, loginFailure } from '../slices/authSlice'
import { useDispatch } from 'react-redux'
import { useAddEntityMutation } from '../api'

export const useAuthService = () => {
  const dispatch = useDispatch()
  const [login] = useAddEntityMutation()

  const loginUser = async (entity) => {
    try {
      const userData = await login({
        entity,
        endpoint: 'users/login',
      })
      dispatch(loginSuccess(userData.data))
      return true
    } catch (err) {
      dispatch(loginFailure(err))
      return false
    }
  }

  const createUser = async (credentials) => {
    try {
      const userData = await login(credentials).unwrap()
      dispatch(loginSuccess(userData))
      return true
    } catch (err) {
      dispatch(loginFailure(err))
      return false
    }
  }

  const logoutUser = async () => {
    dispatch(loginFailure())
  }

  return { loginUser, createUser, logoutUser }
}
