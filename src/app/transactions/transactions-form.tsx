'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CalendarIcon,
  Type,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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
import { cn } from '@/lib/utils'

import { createTransaction, fetchCategories } from './actions'

interface Categories {
  id: number
  value: string
  label: string
}

const createTransactionFormSchema = z
  .object({
    amount: z
      .number({ message: 'Please, provide a valid number.' })
      .min(0.01, { message: 'Please, provide the transaction amount' }),
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
        amount: parseFloat(newVal),
        description: data.description,
      }
    }

    return data
  })

export type CreateTransactionFormData = z.infer<
  typeof createTransactionFormSchema
>

export function NewTransactionForm() {
  const [categories, setCategories] = useState<Categories[]>([])

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [status, setStatus] = useState('income')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTransactionFormData>({
    resolver: zodResolver(createTransactionFormSchema),
  })

  useEffect(() => {
    async function getCategories() {
      try {
        const data = await fetchCategories()

        setCategories(data)
      } catch (err) {
        console.error(err)
      }
    }

    getCategories()
  }, [])

  async function handleCreateNewTransaction(
    formData: CreateTransactionFormData,
  ) {
    try {
      const response = await createTransaction(formData)

      if (response.status === 201) {
        toast.success('Transaction created successfully.')

        reset({
          amount: 0,
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
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  required
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
                step="0.01"
                className="h-8 rounded-l-none border-l-0 text-end"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Label className="text-muted-foreground">Status</Label>
          <div className="flex w-full gap-3">
            <Button
              variant={'outline'}
              size={'xs'}
              className={cn(
                'w-full',
                status === 'income' &&
                  'bg-green-600 text-white hover:bg-green-600 hover:text-white',
              )}
              onClick={() => setStatus('income')}
            >
              <ArrowUpCircle className="mr-2 size-4" />
              Income
            </Button>
            <Button
              variant={'outline'}
              size={'xs'}
              className={cn(
                'w-full',
                status === 'outcome' &&
                  'bg-red-500 text-white hover:bg-red-500 hover:text-white',
              )}
              onClick={() => setStatus('outcome')}
            >
              <ArrowDownCircle className="mr-2 size-4" />
              Outcome
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="category" className="text-muted-foreground">
              Category
            </Label>
            <Select defaultValue="transport" required>
              <SelectTrigger id="category" className="h-8 w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          {errors.amount ? (
            <span className="text-sm text-red-400">
              {errors.amount.message}
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
