'use client'

import { format } from 'date-fns'
import { CalendarIcon, Search, X } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

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
import { cn } from '@/lib/utils'

export function TransactionsFilters() {
  const [date, setDate] = useState<DateRange | undefined>()

  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filters</span>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'h-8 w-[320px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={new Date()}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Select name="status" defaultValue="all">
        <SelectTrigger className="h-8 w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="outcome">Outcome</SelectItem>
        </SelectContent>
      </Select>

      <Select name="category" defaultValue="all">
        <SelectTrigger className="h-8 w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          <SelectItem value="food">Food</SelectItem>
          <SelectItem value="groceries">Groceries</SelectItem>
          <SelectItem value="transport">Transport</SelectItem>
          <SelectItem value="salary">Salary</SelectItem>
        </SelectContent>
      </Select>

      <div className="ml-auto flex gap-2">
        <Button type="submit" variant={'secondary'} size={'xs'}>
          <Search className="size-4 mr-2" />
          Filter results
        </Button>

        <Button type="button" variant={'outline'} size={'xs'}>
          <X className="size-4 mr-2" />
          Clean filters
        </Button>
      </div>
    </form>
  )
}
