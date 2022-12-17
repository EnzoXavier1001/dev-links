import './style.css'

type InputProps = {
    placeholder: string;
    type?: string;
    value?: string;
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ placeholder, type, value, handleInputChange }: InputProps) {
    return (
        <input 
            className='form-input'
            placeholder={placeholder} 
            type={type}
            value={value}
            onChange={handleInputChange}
        />
    )
} 