export interface iCategory {
  _id: string
  color: string
  description: string
  icon: string
  label: string
  name: string
}

export interface iTransaction {
  _id: string
  amount: number
  category: iCategory
  date: string
  description: string
  user: string
  transactionDate: string
}

interface User {
  _id: string
  email: string
  name: string
  role: string
}

export interface AuthState {
  user: User;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  // ... otras definiciones de estado si las hay
}

