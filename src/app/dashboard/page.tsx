import { DashboardBugetCard } from './dashboard-budget-card'
import { DashboardMonthIncomeCard } from './dashboard-month-income-card'
import { DashboardMonthOutcomeCard } from './dashboard-month-outcome-card'
import { DashboardMonthTransactionsAmountCard } from './dashboard-month-transactions-amount-card'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <DashboardBugetCard />
        <DashboardMonthTransactionsAmountCard />
        <DashboardMonthOutcomeCard />
        <DashboardMonthIncomeCard />
      </div>

      <div className="grid grid-cols-9 gap-4"></div>
    </div>
  )
}
