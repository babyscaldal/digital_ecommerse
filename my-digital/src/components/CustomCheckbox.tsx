import { Form } from "react-bootstrap"
import { Controller, useFormContext } from "react-hook-form"
import { IOption } from "../data/checkboxData"
import { useEffect } from "react"

interface ICustomCheckbox {
  options: IOption[]
  name: string
  quantity?: number
  onCheckboxChange?: (value: number[]) => void
}

export default function CustomCheckbox({
  options,
  name,
  quantity,
  onCheckboxChange,
}: ICustomCheckbox) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        useEffect(() => {
          onCheckboxChange && onCheckboxChange(value)
        }, [value])
        return (
          <>
            {options.map((option, index) => {
              const isHas = value.some((item: any) => item === option.value)
              return (
                <div key={option.value} className="d-flex">
                  <Form.Check
                    checked={isHas}
                    className="z-0"
                    id={option.label}
                    key={index}
                    type="checkbox"
                    label={option.label}
                    value={value}
                    onChange={() => {
                      if (!isHas) {
                        onChange([...value, option.value])
                      } else if (isHas) {
                        onChange(
                          value.filter((item: any) => item !== option.value),
                        )
                      }
                    }}
                  />
                  {quantity && (
                    <label htmlFor={option.label}>( {quantity})</label>
                  )}
                </div>
              )
            })}
          </>
        )
      }}
    />
  )
}
