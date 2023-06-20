export interface SelectProps<T> {
    selected: T;
    options: string[];
    label?: string;
    placeholder?: string;
    onChange?: (selected: T) => void;
    onClose?: () => void;
}
