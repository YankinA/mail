import type { TextareaComp } from './Textarea.d';
import styles from './Textarea.module.css';

const Textarea: TextareaComp = (props) => {

  return (
      <textarea
        value={props?.value ?? ''}
        onKeyPress={props.onKeyPress}
        onInput={props.onChange}
        class={styles.Textarea}
        classList={{
          ...props.classes,
          [styles.Textarea_bold]: props.bold,
          [styles.Textarea_italic]: props.italic,
          [styles.Textarea_underline]: props.underline,
          [styles.Textarea_strike]: props.strike,
          [styles.Textarea_underline_strike]: props.underline && props.strike,
        }}
        placeholder={props.placeholder}
        spellcheck={props.spellcheck}
      >
        {props.children}
        {props?.value ?? ''}
      </textarea>
  )
}

export default Textarea;