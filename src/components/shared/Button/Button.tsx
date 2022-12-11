import type { ButtonComp } from './Button.d';
import styles from './Button.module.css';

const Button: ButtonComp = (props) => {
  const { onClick, classes, Icon, name, children } = props;

  return (
    <button
      onClick={onClick}
      class={styles.Button}
      classList={{ [styles.Button_active]: props.active, ...classes }}
      
    >
      <div class={styles.Icon}>
        {Icon}
      </ div>
      <span class={styles.Name}>{name}</span>
      {children}
    </ button>)
};

export default Button;