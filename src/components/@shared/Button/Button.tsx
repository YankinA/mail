import type { BtnContentComp, ButtonComp } from './Button.d';
import styles from './Button.module.css';

const Button: ButtonComp = (props) => (
  <button
    onClick={props.onClick}
    class={styles.Button}
    classList={{
      [styles.Button_border]: props.border,
      [styles.Button_active]: props.active,
      [styles.Button_mini]: props.mini,
      [styles.Button_big]: props.big,
      [styles.Button_full]: props.full,
      [styles.Button_hide]: props.hide,
      [styles.Button_miniHide]: props.miniHide,
      [styles.Button_hideIcon]: props.hideIcon,
      ...props.classes
    }}
  >
    <BtnContent
      Icon={props.Icon}
      name={props.name}
      nameFirst={props.nameFirst}
    />
    {props.children}
  </ button>)

const BtnContent: BtnContentComp = (props) => (
  <>
    {props.nameFirst ?
      <>
        <span class={styles.Name}>{props.name}</span>
        <div class={styles.Icon}>{props.Icon}</ div>
      </>
      :
      <>
        <div class={styles.Icon}>{props.Icon}</ div>
        <span class={styles.Name}>{props.name}</span>
      </>}
  </>)

export default Button;