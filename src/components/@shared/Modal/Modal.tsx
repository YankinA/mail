import type { ModalComp } from './Modal.d';
import styles from './Modal.module.css';

const Modal: ModalComp = (props) => (
  <div
    ref={props.ref}
    style={props.style}
    onClick={(e) => {
      if (props.onClick) {
        props.onClick(e);
      }
      e.stopPropagation();
    }}
    class={styles.Modal}
    classList={{
      [styles.Modal_hide]: props.hide,
      ...props.classes
    }}
  >
    {props.children}
  </ div>)



export default Modal;