import axios from 'axios'

import { SignUpFormSchema } from '@/app/(auth)/sign-up/page'
import { api } from '@/lib/axios'

export async function signUp(formData: SignUpFormSchema) {
  try {
    const response = await api.post('/auth/sign-up', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    })

    return response.status
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return err.response.status
    }

    return 500
  }
}
