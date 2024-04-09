import { Button } from '@/components/ui/button'
import { TransactionsFilters } from './filters'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TransactionsTableRow } from './table-row'

export default function Transactions() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>

        <Button size={'xs'}>New transaction</Button>
      </div>

      <div className="space-y-2.5">
        <TransactionsFilters />

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[200px]">Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[200px]">Status</TableHead>
                <TableHead className="w-[200px]">Category</TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 12 }).map((_, index) => (
                <TransactionsTableRow key={index} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
