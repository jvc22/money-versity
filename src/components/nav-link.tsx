import { ComponentProps, ReactNode } from 'react'

interface NavLinkProps extends ComponentProps<'a'> {
  children: ReactNode
}

export default function NavLink(props: NavLinkProps) {
  return (
    <a {...props} className="flex items-center gap-2 font-medium text-sm">
      {props.children}
    </a>
  )
}
