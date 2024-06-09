'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTransactions } from '@/hooks/transactions'

import { NewTransactionForm } from './transactions-form'
import { TransactionsFilters } from './transactions-table-filters'
import { TransactionsTableRow } from './transactions-table-row'

export default function Transactions() {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const date = params.get('date') ?? ''
  const status = params.get('status') ?? ''
  const category = params.get('category') ?? ''

  const [pageIndex, setPageIndex] = useState(0)

  const paramsObject = {
    date,
    status,
    category,
    offset: String(pageIndex),
  }

  const { transactions, totalCount } = useTransactions({
    params: paramsObject,
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size={'xs'}>New transaction</Button>
          </DialogTrigger>

          {isDialogOpen && <NewTransactionForm />}
        </Dialog>
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
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead className="w-[200px]">Category</TableHead>
                <TableHead className="w-[110px]"></TableHead>
                <TableHead className="w-[110px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((transaction) => (
                <TransactionsTableRow
                  key={transaction.id}
                  id={transaction.id}
                  createdAt={transaction.createdAtTz}
                  amount={transaction.amount}
                  status={transaction.status}
                  category={transaction.category}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination
          pageIndex={pageIndex}
          onPageChange={setPageIndex}
          currentCount={transactions?.length || 0}
          totalCount={totalCount || 0}
          perPage={10}
        />
      </div>
    </div>
  )
}
