import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Pencil, Search, X } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'
import { priceFormatter } from '@/utils/formatter'

import { TransactionDetails } from './transactions-details'
import { EditTransactionForm } from './transactions-edition'

interface TransactionsTableRowProps {
  id: string
  createdAt: Date
  amount: number
  status: 'income' | 'outcome'
  category: {
    id: number
    value: string
    label: string
  }
}

export function TransactionsTableRow({
  id,
  createdAt,
  amount,
  status,
  category,
}: TransactionsTableRowProps) {
  const queryClient = useQueryClient()

  async function handleDeleteTransaction() {
    try {
      const response = await api.delete(`/transactions/${id}`)

      if (response.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ['transactions'],
        })

        toast.success('Transaction deleted successfully.')
      }
    } catch (err) {
      console.error(err)
    }
  }

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

          <TransactionDetails id={id} />
        </Dialog>
      </TableCell>
      <TableCell className="font-medium">
        {priceFormatter.format(amount)}
      </TableCell>
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
        <Badge variant={'secondary'}>{category.label}</Badge>
      </TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'outline'} size={'xs'}>
              <Pencil className="mr-2 size-3" />
              Edit
            </Button>
          </DialogTrigger>

          <EditTransactionForm id={id} />
        </Dialog>
      </TableCell>
      <TableCell>
        <Button variant={'ghost'} size={'xs'} onClick={handleDeleteTransaction}>
          <X className="mr-2 size-3" />
          Delete
        </Button>
      </TableCell>
    </TableRow>
  )
}
