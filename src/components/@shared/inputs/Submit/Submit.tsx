import type { SubmitComp } from './Submit.d';
import styles from './Submit.module.css';

const Submit: SubmitComp = (props) => (
  <input
    class={styles.Submit}
    classList={{...props.classes}}
    type='submit'
    value={props.name}
  />
)

export default Submit;