import styles from "../styles/styles.module.css"
import {SelectProps} from "../props/SelectProps";
import {useEffect, useRef, useState, useMemo} from "react";
import {ReactComponent as ArrowDown} from "../../../assets/down-arrow.svg";
import {Option} from "./Option";

export const Select = ({selected, onChange, label, options, placeholder, onClose, multiple}: SelectProps<any>) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const onSelectClick = () => {
        if (showOptions) {
            setShowOptions(false);
        } else {
            setShowOptions(true);
        }
    }

    const onOptionClick = (option: string) => {
        if (!multiple) {
            setShowOptions(false);
            onChange?.(option);
        }
        onChange?.(option);
    };

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const {target} = event;
            if (target instanceof Node && !rootRef.current?.contains(target)) {
                showOptions && onClose?.();
                setShowOptions(false);
            }
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        }
    }, []);

    const displaySelected = useMemo(() => {
        if (selected) {
            if (multiple) {
                return selected.length > 0 ? selected.join(', ') : placeholder;
            } else {
                return selected;
            }
        }
        return placeholder;
    }, [selected, multiple, placeholder]);

    return (
        <div>
            {label && <div className={styles.label}>{label}</div>}
            <div
                className={styles.selectWrapper}
                ref={rootRef}
                data-active={showOptions}
            >
                <div
                    className={styles.placeholder}
                    data-selected={typeof selected === 'object' && selected ? selected.length > 0 : !!selected}
                    role='button'
                    onClick={onSelectClick}
                >
                    <div className={styles.arrow}>
                        <ArrowDown/>
                    </div>
                    {displaySelected}
                </div>
                {showOptions && (
                    <ul className={styles.options}>
                        {options.map((option) => (
                            <Option
                                key={option}
                                option={option}
                                onClick={onOptionClick}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};