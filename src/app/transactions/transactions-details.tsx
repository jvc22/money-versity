import { Badge } from '@/components/ui/badge'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export function TransactionDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-red-500" />
          Outcome
        </DialogTitle>
        <DialogDescription>Transaction details</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Date</TableCell>
              <TableCell className="flex justify-end">
                22th October 2023
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Amount</TableCell>
              <TableCell className="flex justify-end font-medium">
                R$ 333,33
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Type</TableCell>
              <TableCell className="flex justify-end">Debit</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Category</TableCell>
              <TableCell className="flex justify-end">
                <Badge variant={'secondary'}>Church</Badge>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Description
              </TableCell>
              <TableCell className="flex justify-end">
                Monthly tithe and offering.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
