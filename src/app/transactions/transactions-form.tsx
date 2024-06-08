import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CalendarIcon,
  Type,
} from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useCategories } from '@/hooks/categories'
import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'

const createTransactionFormSchema = z
  .object({
    date: z.date({ message: 'Please, select a date.' }),
    amount: z
      .number({ message: 'Please, provide a valid number.' })
      .min(0.01, { message: 'Please, provide the transaction amount.' }),
    status: z.enum(['income', 'outcome'], {
      message: 'Please, select a transaction status.',
    }),
    category: z
      .string({ message: 'Please, select a category.' })
      .min(1, { message: 'Please, select a category.' }),
    description: z
      .string()
      .max(32, { message: 'Maximum of 32 characters for description.' })
      .optional(),
  })
  .refine((data) => {
    const stringValue = String(data.amount)

    if (stringValue.includes(',')) {
      const newVal = stringValue.replace(',', '.')

      return {
        date: data.date,
        amount: parseFloat(newVal),
        status: data.status,
        category: data.category,
        description: data.description,
      }
    }

    return data
  })

export type CreateTransactionFormData = z.infer<
  typeof createTransactionFormSchema
>

export function NewTransactionForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateTransactionFormData>({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      date: new Date(),
      status: 'income',
    },
  })

  const date = watch('date')

  const categories = useCategories()

  const queryClient = useQueryClient()

  async function handleCreateNewTransaction(
    formData: CreateTransactionFormData,
  ) {
    try {
      const categoryId = categories?.find(
        (category) => category.value === formData.category,
      )?.id

      const response = await api.post('/transactions', {
        date: formData.date.toDateString(),
        amount: formData.amount,
        status: formData.status,
        categoryId,
        description: formData.description,
      })

      if (response.status === 201) {
        toast.success('Transaction created successfully.')

        queryClient.invalidateQueries({
          queryKey: ['transactions'],
        })

        reset({
          date: new Date(),
          amount: NaN,
          status: 'income',
          category: '',
          description: '',
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>New transaction</DialogTitle>
        <DialogDescription>Create a new transaction registry</DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(handleCreateNewTransaction)}
        className="space-y-6"
      >
        <div className="flex gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="date-picker" className="text-muted-foreground">
              Date
            </Label>
            <Controller
              control={control}
              name="date"
              render={({ field: { name, onChange, value, disabled } }) => {
                return (
                  <Popover>
                    <PopoverTrigger asChild id="date-picker">
                      <Button
                        variant={'outline'}
                        className={cn(
                          'h-8 w-[220px] justify-start text-left font-normal',
                          !date && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        id={name}
                        mode="single"
                        selected={value}
                        onSelect={onChange}
                        disabled={disabled}
                        required
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="amount" className="text-muted-foreground">
              Amount
            </Label>
            <div className="flex items-center">
              <span className="flex h-8 items-center rounded-l-md border px-3 text-sm text-muted-foreground">
                R$
              </span>
              <Input
                {...register('amount', {
                  valueAsNumber: true,
                })}
                placeholder="100.00"
                type="number"
                autoComplete="off"
                step="0.001"
                className="h-8 rounded-l-none border-l-0 text-end"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Label className="text-muted-foreground">Status</Label>
          <Controller
            control={control}
            name="status"
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <ToggleGroup
                  id={name}
                  onValueChange={onChange}
                  value={value}
                  disabled={disabled}
                  type="single"
                  className="grid w-full grid-cols-2 gap-3"
                >
                  <ToggleGroupItem
                    value="income"
                    size={'sm'}
                    variant={'outline'}
                    className={cn('data-[state=on]:bg-green-600')}
                  >
                    <ArrowUpCircle className="mr-2 size-4" />
                    Income
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="outcome"
                    size={'sm'}
                    variant={'outline'}
                    className={cn('data-[state=on]:bg-red-500')}
                  >
                    <ArrowDownCircle className="mr-2 size-4" />
                    Outcome
                  </ToggleGroupItem>
                </ToggleGroup>
              )
            }}
          />
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="category" className="text-muted-foreground">
              Category
            </Label>
            <Controller
              control={control}
              name="category"
              render={({ field: { name, onChange, value, disabled } }) => {
                return (
                  <Select
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                  >
                    <SelectTrigger className="h-8 w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description" className="text-muted-foreground">
              Description (optional)
            </Label>
            <div className="flex items-center">
              <span className="flex h-8 items-center rounded-l-md border px-3 text-sm text-muted-foreground">
                <Type className="size-4" />
              </span>
              <Input
                {...register('description')}
                autoComplete="off"
                placeholder="Transaction details"
                className="h-8 rounded-l-none border-l-0"
              />
            </div>
          </div>
        </div>

        <div>
          {errors.date ? (
            <span className="text-sm text-red-400">{errors.date.message}</span>
          ) : errors.amount ? (
            <span className="text-sm text-red-400">
              {errors.amount.message}
            </span>
          ) : errors.status ? (
            <span className="text-sm text-red-400">
              {errors.status.message}
            </span>
          ) : errors.category ? (
            <span className="text-sm text-red-400">
              {errors.category.message}
            </span>
          ) : errors.description ? (
            <span className="text-sm text-red-400">
              {errors.description.message}
            </span>
          ) : (
            <span className="text-sm">Please, inform all required data.</span>
          )}
        </div>

        <div className="flex gap-3">
          <DialogClose asChild>
            <Button
              size={'xs'}
              variant={'secondary'}
              type="reset"
              className="w-full"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            size={'xs'}
            disabled={isSubmitting}
            type="submit"
            className="w-full"
          >
            Register
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}
