import { format } from 'date-fns'

import { Badge } from '@/components/ui/badge'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useTransaction } from '@/hooks/transactions'
import { cn } from '@/lib/utils'
import { priceFormatter } from '@/utils/formatter'

interface TransactionDetailsProps {
  id: string
}

export function TransactionDetails({ id }: TransactionDetailsProps) {
  const transaction = useTransaction({
    id,
  })

  if (!transaction) {
    return null
  }

  return (
    <DialogContent onOpenAutoFocus={(ev) => ev.preventDefault()}>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <span
            className={cn(
              'size-2 rounded-full',
              transaction.status === 'income' ? 'bg-green-500' : 'bg-red-500',
            )}
          />
          {transaction.status.charAt(0).toUpperCase() +
            transaction.status.slice(1)}
        </DialogTitle>
        <DialogDescription>Transaction details</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Date</TableCell>
              <TableCell className="flex justify-end">
                {format(new Date(transaction.createdAtTz), 'PPPP')}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Amount</TableCell>
              <TableCell className="flex justify-end font-medium">
                {priceFormatter.format(transaction?.amount)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Category</TableCell>
              <TableCell className="flex justify-end">
                <Badge variant={'secondary'}>
                  {transaction.category.label}
                </Badge>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Description
              </TableCell>
              <TableCell className="flex justify-end">
                {transaction.description}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
