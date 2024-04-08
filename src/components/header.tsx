import { Home, Wallet } from 'lucide-react'
import NavLink from './nav-link'
import { Separator } from './ui/separator'
import { ThemeToggle } from './theme/theme-toggle'

export default function Header() {
  return (
    <header className="flex items-center gap-5">
      <h1 className="text-lg font-bold">
        <span className="text-primary">money</span>.versity
      </h1>

      <Separator orientation="vertical" className="h-6" />

      <nav className="flex items-center gap-5">
        <NavLink href="/">
          <Home className="size-4" />
          Dashboard
        </NavLink>
        <NavLink href="/transactions">
          <Wallet className="size-4" />
          Transactions
        </NavLink>
      </nav>

      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  )
}
