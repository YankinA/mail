import type { ModalComp } from './Modal.d';
import styles from './Modal.module.css';

const Modal: ModalComp = (props) => (
  <div
    ref={props.ref}
    style={props.style}
    onClick={props.onClick}
    class={styles.Modal}
    classList={props.classes}
  >
    {props.children}
  </ div>)



export default Modal;