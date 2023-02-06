import { createEffect } from 'solid-js';
import type { TextInputComp } from './TextInput.d';
import styles from './TextInput.module.css';

const TextInput: TextInputComp = (props) => {

  return (
    <div class={styles.TextInput_container}>
      <div class={styles.TextInput_name}>
        {props.name}
      </div>
      {props.children}
      <input
        onKeyPress={(e) => {

          if (e.code === 'Enter') {
            e.preventDefault();
          }

          if (props.onKeyPress) {
            props.onKeyPress(e);
          }


        }}
        onInput={props.onChange}
        class={styles.TextInput}
        type='text'
        value={props?.value ?? ""}
      />
    </div>
  )
}

export default TextInput;