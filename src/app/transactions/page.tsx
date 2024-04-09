import { Button } from '@/components/ui/button'
import { TransactionsFilters } from './filters'

export default function Transactions() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>

        <Button size={'xs'}>New transaction</Button>
      </div>

      <div className="space-y-2.5">
        <TransactionsFilters />
      </div>
    </div>
  )
}
