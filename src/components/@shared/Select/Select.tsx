import { createSignal, For } from 'solid-js';
import type { SelectComp, OptionsComp } from './Select.d';
import styles from './Select.module.css';
import ArrowDownIcon from './../../../assets/icons/arrowDown.svg';
import CheckIcon from './../../../assets/icons/check.svg';
import Modal from '../Modal/Modal';
import { style } from 'solid-js/web';
import { useStore } from '../../../store';

const Select: SelectComp = (props) => {

  const [isShow, setShow] = createSignal<boolean>(false);

  return (
    <div
      onClick={() => { setShow(prev => !prev) }}
      style={props.style}
      class={styles.Select}
      classList={props.classes}
    >
      <div class={styles.Select_name}>
        {props.name}
      </div>
      <div class={styles.Select_icon}>
        <ArrowDownIcon />
      </div>
      {props.children}
      {isShow() && <Options 
        options={props.options} 
        selected={props.selected} 
        onSelect={props.onSelect}
      />}
    </ div>)
}

const Options: OptionsComp = (props) => {

  const { settings } = useStore();
  return (
    <Modal classes={{
      [styles.Optins]: true,
      [styles.Optins_theme_dark]: settings.theme.id === 'full1',
       }}>
      <For each={Object.keys(props.options)}>
        {option => (
          <div 
            onClick={() => { props.onSelect({ [option]: !props.selected[option] }) }}
            class={styles.Option}
          >
            {props.selected[option] && <div class={styles.Option_check}>
              <CheckIcon />
            </div>}
            {props.options[option].Icon && <div class={styles.Options_icon}>
              {props.options[option].Icon}
            </div>}
            <div 
              class={styles.Options_name}
              classList={{[styles.Options_name_no_icon]: !props.options[option].Icon }}
            >
              {props.options[option].name}
            </div>
          </div>
        )}
      </For>
    </Modal>
  )
}



export default Select;