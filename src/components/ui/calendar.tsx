import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"
import { cn } from "./utils"

interface CalendarBaseProps {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
}

export type CalendarProps = CalendarBaseProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>

export function Calendar({
  className,
  mode = "single",
  selected,
  onSelect,
  disabled,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  const getCalendarDays = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (Date | null)[] = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const isDateSelected = (date: Date | null) => {
    if (!selected || !date) return false
    return date.toDateString() === selected.toDateString()
  }

  const handleDayClick = (date: Date) => {
    if (disabled?.(date)) return
    onSelect?.(date)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const days = getCalendarDays(currentMonth)
  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className={cn("p-3 border rounded-md", className)} {...props}>
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-sm">{monthName}</h2>
          <div className="space-x-1">
            <Button
              variant="outline"
              className="h-7 w-7 p-0"
              onClick={handlePrevMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-7 w-7 p-0"
              onClick={handleNextMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs font-semibold py-2">
              {day.slice(0, 1)}
            </div>
          ))}
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => day && handleDayClick(day)}
              disabled={!day || (day && disabled?.(day))}
              className={cn(
                "h-8 w-8 text-sm rounded-md hover:bg-primary/10 transition-colors",
                !day && "invisible",
                day && disabled?.(day) && "opacity-50 cursor-not-allowed",
                isDateSelected(day!) && "bg-primary text-primary-foreground"
              )}
            >
              {day?.getDate()}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
