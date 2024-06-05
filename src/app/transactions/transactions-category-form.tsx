import { PopoverClose } from '@radix-ui/react-popover'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PopoverContent } from '@/components/ui/popover'

export function TransactionsCategoryForm() {
  return (
    <PopoverContent align="start" className="space-y-3">
      <h1 className="text-base font-medium">Create a new category</h1>

      <div className="flex flex-col gap-1.5">
        <Label>Label</Label>
        <Input
          className="h-8"
          autoComplete="off"
          placeholder="Category label"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <PopoverClose asChild>
          <Button size={'xs'} variant={'outline'}>
            Cancel
          </Button>
        </PopoverClose>
        <Button size={'xs'}>Create</Button>
      </div>
    </PopoverContent>
  )
}
