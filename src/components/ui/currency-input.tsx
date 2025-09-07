import * as React from "react"
import { cn } from "@/lib/utils"

export interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: string) => void
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState("")

    const formatCurrency = (val: string) => {
      const numbers = val.replace(/\D/g, '')
      if (!numbers) return ''
      
      const amount = parseFloat(numbers) / 100
      return amount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      const numbers = inputValue.replace(/\D/g, '')
      
      if (!numbers) {
        setDisplayValue('')
        onChange?.('')
        return
      }
      
      const formatted = formatCurrency(inputValue)
      setDisplayValue(formatted)
      
      // Extract numeric value for parent component
      const amount = parseFloat(numbers) / 100
      onChange?.(amount.toFixed(2))
    }

    React.useEffect(() => {
      if (value) {
        const numericValue = value.toString().replace(/\D/g, '')
        setDisplayValue(formatCurrency(numericValue))
      } else {
        setDisplayValue('')
      }
    }, [value])

    return (
      <input
        type="text"
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        value={displayValue}
        onChange={handleChange}
        placeholder="R$ 0,00"
        ref={ref}
        {...props}
      />
    )
  }
)
CurrencyInput.displayName = "CurrencyInput"

export { CurrencyInput }