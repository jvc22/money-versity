import { format } from 'date-fns'
import { Pencil, Search, X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

import { TransactionDetails } from './transactions-details'

interface TransactionsTableRowProps {
  createdAt: string
  amount: number
  status: 'income' | 'outcome'
  category: string
}

export function TransactionsTableRow({
  createdAt,
  amount,
  status,
  category,
}: TransactionsTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'outline'} size={'xs'}>
              <Search className="size-3" />
              <span className="sr-only">Transaction details</span>
            </Button>
          </DialogTrigger>
          <TransactionDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-medium">R$ {amount}</TableCell>
      <TableCell>{format(new Date(createdAt), 'PPPP')}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'size-2 rounded-full',
              status === 'income' ? 'bg-green-500' : 'bg-red-500',
            )}
          />
          <span className="font-medium text-muted-foreground">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={'secondary'}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Badge>
      </TableCell>
      <TableCell>
        <Button variant={'ghost'} size={'xs'}>
          <Pencil className="mr-2 size-3" />
          Edit
        </Button>
      </TableCell>
      <TableCell>
        <Button variant={'ghost'} size={'xs'}>
          <X className="mr-2 size-3" />
          Delete
        </Button>
      </TableCell>
    </TableRow>
  )
}
