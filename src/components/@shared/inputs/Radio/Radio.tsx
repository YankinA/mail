import { For } from "solid-js"
import type { RadioComp } from './Radio.d';
import styles from './Radio.module.css';

const Radio: RadioComp = (props) => {

  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    props.onChange(target.value); 
  }

  return (
    <For each={props.options}>{(option) => (
      <div class={styles.Radio_wrap}>
        <input 
          class={styles.Radio_input}
          type="radio"
          name={props.name}
          value={option.value}
          checked={option.value === props.value}
          id={props.name + option.value}
          onChange={onChange}
        />
        <label class={styles.Radio_label} for={props.name + option.value} />
        <div class={styles.Radio_icon}>{option.Icon}</div>
        <div>{option.name}</div>
      </div>
    )}</For>
  )
}

export default Radio;