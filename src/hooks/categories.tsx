import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

interface Category {
  id: number
  value: string
  label: string
  createdAt: Date
}

export function useCategories() {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/categories')

      return response.data
    },
  })

  return categories || []
}
