import React from 'react'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

type Props = {
    label?: string,
    type?: string,
    id?: string,
    placeholder?: string,
    defaultValue?: string,
    className?: string,
    onChangeFunction?: React.Dispatch<React.SetStateAction<any>>,
    required?: boolean,
    disabled?: boolean
}

const FormInput = ({ label, type = "text", id, placeholder, defaultValue, className, onChangeFunction, required = true, disabled = false }: Props) => {
    return (
        <div className={cn("flex flex-col", className)}>
            {label && <label htmlFor={id} className="mb-1 ml-1 text-[0.9rem] text-foreground/80">{label}</label>}
            <Input
                type={type}
                id={id}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={(e) => onChangeFunction && onChangeFunction(e.target.value)}
                className="p-2 rounded text-foreground"
                required={required}
                disabled={disabled}
            />
        </div>
    )
}

export default FormInput