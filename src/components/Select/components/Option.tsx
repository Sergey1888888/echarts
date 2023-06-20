import styles from "../styles/styles.module.css"
import {OptionProps} from "../props/OptionProps";
import {MouseEventHandler} from "react";

export const Option = ({option, onClick}: OptionProps) => {
    const onOptionClick = (option: string): MouseEventHandler<HTMLLIElement> => () => {
        onClick(option);
    }

    return (
        <li
            className={styles.option}
            value={option}
            onClick={onOptionClick(option)}
        >
            {option}
        </li>
    );
};