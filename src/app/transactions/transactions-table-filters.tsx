'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Plus, Search, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'

import { TransactionsCategoryForm } from './transactions-category-form'

interface Categories {
  id: number
  value: string
  label: string
}

const filtersSchema = z.object({
  status: z.string().optional(),
  category: z.string().optional(),
  date: z.string().optional(),
})

type FiltersSchema = z.infer<typeof filtersSchema>

export function TransactionsFilters() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())
  const router = useRouter()

  const [categories, setCategories] = useState<Categories[]>([])

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await api.get('/categories')

        if (response.status === 200) {
          setCategories(response.data)
        }
      } catch (err) {
        console.error(err)
      }
    }

    getCategories()
  }, [])

  const status = params.get('status')
  const category = params.get('category')
  const date = params.get('date')

  const { handleSubmit, reset, control } = useForm<FiltersSchema>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      status: status ?? '',
      category: category ?? '',
      date: date ?? '',
    },
  })

  function handleFilter(formData: FiltersSchema) {
    const status = formData.status?.trim()
    const category = formData.category?.trim()
    const date = formData.date

    status ? params.set('status', status) : params.delete('status')
    category ? params.set('category', category) : params.delete('category')
    date ? params.set('date', date) : params.delete('date')

    router.push(`${pathname}?${params.toString()}`)
  }

  function handleCleanFilters() {
    params.delete('status')
    params.delete('category')
    params.delete('date')

    reset({
      status: '',
      category: '',
      date: '',
    })

    router.push(pathname)
  }

  const hasAnyFilter = !!status || !!category || !!date

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filters</span>

      <Controller
        name="date"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Popover>
              <PopoverTrigger asChild id="date-picker">
                <Button
                  variant={'outline'}
                  className={cn(
                    'h-8 w-[220px] justify-start text-left font-normal',
                    !value && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {value ? format(value, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  id={name}
                  mode="single"
                  selected={value ? new Date(value) : undefined}
                  onSelect={(value) => onChange(value?.toISOString())}
                  disabled={disabled}
                  numberOfMonths={2}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )
        }}
      />

      <Controller
        control={control}
        name="status"
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-green-500" />
                    <span>Income</span>
                  </div>
                </SelectItem>
                <SelectItem value="outcome">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-red-500" />
                    <span>Outcome</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <div className="flex items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button size={'xs'} variant={'outline'} className="rounded-e-none">
              <Plus className="size-4" />
            </Button>
          </PopoverTrigger>

          <TransactionsCategoryForm />
        </Popover>
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
                <SelectTrigger className="h-8 w-[160px] rounded-s-none border-s-0">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
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

      <div className="ml-auto flex gap-2">
        <Button type="submit" variant={'secondary'} size={'xs'}>
          <Search className="mr-2 size-4" />
          Filter results
        </Button>

        <Button
          type="button"
          onClick={handleCleanFilters}
          disabled={!hasAnyFilter}
          variant={'outline'}
          size={'xs'}
        >
          <X className="mr-2 size-4" />
          Clean filters
        </Button>
      </div>
    </form>
  )
}
