import { zodResolver } from '@hookform/resolvers/zod'
import { PopoverClose } from '@radix-ui/react-popover'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PopoverContent } from '@/components/ui/popover'
import { api } from '@/lib/axios'

const createCategoryFormSchema = z
  .object({
    label: z
      .string()
      .min(3, { message: 'Minimum of 3 digits.' })
      .max(16, { message: 'Maximum of 16 digits.' }),
  })
  .refine((value) => /^[A-Za-z-]+$/.test(value.label), {
    message: 'Categories must contain only letters and hyphens.',
    path: ['label'],
  })

type CreateCategoryFormData = z.infer<typeof createCategoryFormSchema>

export function TransactionsCategoryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategoryFormSchema),
  })

  async function handleCreateNewCategory(formData: CreateCategoryFormData) {
    try {
      const value = formData.label.toLocaleLowerCase()
      const createdAt = new Date().toDateString()

      const response = await api.post('/categories', {
        value,
        label: formData.label,
        createdAt,
      })

      if (response.status === 201) {
        toast.success('Category created successfully.')

        reset({
          label: '',
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  function handleCleanForm() {
    reset({
      label: '',
    })
  }

  return (
    <PopoverContent align="start">
      <form
        onSubmit={handleSubmit(handleCreateNewCategory)}
        className="space-y-3"
      >
        <h1 className="text-base font-medium">Create a new category</h1>

        <div className="flex flex-col gap-1.5">
          <Label>Label</Label>
          <Input
            {...register('label')}
            className="h-8"
            autoComplete="off"
            placeholder="Category label"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <PopoverClose asChild>
            <Button
              size={'xs'}
              variant={'outline'}
              type="reset"
              onClick={handleCleanForm}
            >
              Cancel
            </Button>
          </PopoverClose>
          <Button size={'xs'} type="submit" disabled={isSubmitting}>
            Create
          </Button>
        </div>

        <div>
          {errors.label && (
            <span className="text-sm text-red-400">{errors.label.message}</span>
          )}
        </div>
      </form>
    </PopoverContent>
  )
}
