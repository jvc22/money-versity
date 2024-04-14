'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
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

import { ArrowDownCircle, ArrowUpCircle, CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'

import { useState } from 'react'

export function NewTransactionForm() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [status, setStatus] = useState('income')

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>New transaction</DialogTitle>
        <DialogDescription>Create a new transaction registry</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
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
              <span className="h-8 flex items-center px-3 text-sm text-muted-foreground border rounded-l-md">
                R$
              </span>
              <Input
                id="amount"
                placeholder="Insert a value"
                className="h-8 border-l-0 rounded-l-none"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant={'outline'}
            className={cn(
              'w-full',
              status === 'income' && 'bg-green-600 hover:bg-green-600',
            )}
            onClick={() => setStatus('income')}
          >
            <ArrowUpCircle className="size-4 mr-2" />
            Income
          </Button>
          <Button
            variant={'outline'}
            className={cn(
              'w-full',
              status === 'outcome' && 'bg-red-500 hover:bg-red-500',
            )}
            onClick={() => setStatus('outcome')}
          >
            <ArrowDownCircle className="size-4 mr-2" />
            Income
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}
