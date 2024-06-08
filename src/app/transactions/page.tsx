'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { api } from '@/lib/axios'
import { createUrlWithParams } from '@/utils/url-params'

import { NewTransactionForm } from './transactions-form'
import { TransactionsFilters } from './transactions-table-filters'
import { TransactionsTableRow } from './transactions-table-row'

interface Transaction {
  id: string
  createdAtTz: Date
  amount: number
  status: 'income' | 'outcome'
  category: {
    id: number
    value: string
    label: string
  }
  description: string
}

export default function Transactions() {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const status = params.get('status')
  const category = params.get('category')
  const date = params.get('date')

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ['transactions', date, status, category],
    queryFn: async () => {
      const params = {
        date,
        status,
        category,
      }
      const urlWithParams = createUrlWithParams('/transactions', params)

      const response = await api.get(urlWithParams)

      return response.data
    },
    placeholderData: keepPreviousData,
  })

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
