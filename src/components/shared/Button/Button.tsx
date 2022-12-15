import type { ButtonComp } from './Button.d';
import styles from './Button.module.css';

const Button: ButtonComp = (props) => {
  const { onClick, classes, Icon, name, children } = props;

  return (
    <button
      onClick={onClick}
      class={styles.Button}
      classList={{ 
        [styles.Button_border]: props.border, 
        [styles.Button_active]: props.active,
        [styles.Button_light]: props.light,
        [styles.Button_mini]: props.mini,
        [styles.Button_full]: props.full,
        [styles.Button_hide]: props.hide,
        [styles.Button_miniHide]: props.miniHide,
        [styles.Button_hideIcon]: props.hideIcon,
        ...classes 
      }}
    >
      <div class={styles.Icon}>
        {Icon}
      </ div>
      <span class={styles.Name}>{name}</span>
      {children}
    </ button>)
};

export default Button;