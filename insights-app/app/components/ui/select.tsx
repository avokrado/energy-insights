import { cn } from "@/utils/cn";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectControlProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  ariaLabel?: string;
};

export function SelectControl({
  id,
  value,
  onChange,
  options,
  className,
  ariaLabel,
}: SelectControlProps) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn("rounded border border-gray-300 px-2 py-1", className)}
      aria-label={ariaLabel}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
