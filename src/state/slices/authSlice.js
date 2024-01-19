import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    loginFailure(state) {
      state.user = null
      state.token = null
      state.status = 'idle'
      state.error = null
    },
    loginSuccess(state, action) {
      console.log(state, action)
      state.user = action.payload.user
      state.token = action.payload.token
      state.status = 'succeeded'
      state.error = null
    },
  },
  extraReducers: {},
})

export const { loginFailure, loginSuccess } = authSlice.actions

export default authSlice.reducer
