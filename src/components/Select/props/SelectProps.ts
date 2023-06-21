export interface SelectPropsDefault<T> {
    selected: T;
    options: string[];
    label?: string;
    placeholder?: string;
    onChange?: (selected: T) => void;
    onClose?: () => void;
    multiple?: false;
}

export interface SelectPropsMultiple<T> {
    selected: T[];
    options: string[];
    label?: string;
    placeholder?: string;
    onChange?: (selected: T) => void;
    onClose?: () => void;
    multiple: true;
}

export type SelectProps<T> = SelectPropsDefault<T> | SelectPropsMultiple<T>;