import type { Component } from 'solid-js';
import styles from './Button.module.css';

interface Button {
    Icon?: Element,
    name: string,
  };
  
  const Button: Component<Button> = ({ Icon, name }) => (
    <button class={styles.Button}>
      <div class={styles.Icon}>{Icon}</div>
      <span>{name}</span>
    </ button>);
  
  export default Button;