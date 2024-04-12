import { Button } from '@/components/ui/button'
import { TransactionsFilters } from './filters'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TransactionsTableRow } from './row'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

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
                <TableHead className="w-[160px]">Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[180px]">Status</TableHead>
                <TableHead className="w-[180px]">Category</TableHead>
                <TableHead className="w-[132px]"></TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TransactionsTableRow key={index} />
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Total of {120} item(s)
          </span>

          <div className="flex items-center gap-6 lg:gap-8">
            <div className="text-sm font-medium">
              Page {0 + 1} of {12}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="size-8 p-0" disabled>
                <ChevronsLeft className="size-4" />
                <span className="sr-only">Primeira página</span>
              </Button>
              <Button variant="outline" className="size-8 p-0" disabled>
                <ChevronLeft className="size-4" />
                <span className="sr-only">Página anterior</span>
              </Button>
              <Button variant="outline" className="size-8 p-0">
                <ChevronRight className="size-4" />
                <span className="sr-only">Próxima página</span>
              </Button>
              <Button variant="outline" className="size-8 p-0">
                <ChevronsRight className="size-4" />
                <span className="sr-only">Última página</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
