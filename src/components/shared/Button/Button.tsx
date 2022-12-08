import type { ButtonComp } from './Button.d';
import styles from './Button.module.css';

  const Button: ButtonComp = ({ Icon, name, classes, mini }) => (
    <button class={`${styles.Button} ${classes || ""} ${mini && styles.Button_minu}`}>
      <div class={styles.Icon}>
       {Icon}
      </ div>
      {mini ? null : <span>{name}</span>}
    </ button>);
  
  export default Button;