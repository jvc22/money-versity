'use client'

import { format } from 'date-fns'
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CalendarIcon,
  Type,
} from 'lucide-react'
import { useState } from 'react'

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

        <div className="flex items-center gap-1.5">
          <Label className="text-muted-foreground">Status</Label>
          <div className="w-full flex gap-3">
            <Button
              variant={'outline'}
              size={'xs'}
              className={cn(
                'w-full',
                status === 'income' &&
                  'text-white bg-green-600 hover:bg-green-600 hover:text-white',
              )}
              onClick={() => setStatus('income')}
            >
              <ArrowUpCircle className="size-4 mr-2" />
              Income
            </Button>
            <Button
              variant={'outline'}
              size={'xs'}
              className={cn(
                'w-full',
                status === 'outcome' &&
                  'text-white bg-red-500 hover:bg-red-500 hover:text-white',
              )}
              onClick={() => setStatus('outcome')}
            >
              <ArrowDownCircle className="size-4 mr-2" />
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
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="church">Church</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description" className="text-muted-foreground">
              Description (optional)
            </Label>
            <div className="flex items-center">
              <span className="h-8 flex items-center px-3 text-sm text-muted-foreground border rounded-l-md">
                <Type className="size-4" />
              </span>
              <Input
                id="description"
                autoComplete="off"
                placeholder="Describe transaction"
                className="h-8 border-l-0 rounded-l-none"
              />
            </div>
          </div>
        </div>

        <div>
          <span className="text-sm">Please, inform all required data.</span>
        </div>

        <div className="flex gap-3">
          <DialogClose asChild>
            <Button size={'xs'} variant={'secondary'} className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button size={'xs'} className="w-full">
            Register
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}
