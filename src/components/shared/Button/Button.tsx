import type { ButtonComp } from './Button.d';
import styles from './Button.module.css';

  const Button: ButtonComp = ({ Icon, name, classes }) => (
    <button class={`${styles.Button} ${classes || ""}`}>
      <div class={styles.Icon}>
       {Icon}
      </ div>
      <span class={styles.Name}>{name}</span>
    </ button>);
  
  export default Button;