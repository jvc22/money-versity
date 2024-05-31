import { Pencil, Search, X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { TransactionDetails } from './transactions-details'

export function TransactionsTableRow() {
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
      <TableCell className="font-medium">R$ 333,33</TableCell>
      <TableCell>Sunday, October 22th, 2023</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-green-500" />
          <span className="font-medium text-muted-foreground">Income</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={'secondary'}>Church</Badge>
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
