import { For, createSignal } from 'solid-js';
import type { SelectComp, Options } from './Select.d';
import styles from './Select.module.css';
import { Dynamic } from 'solid-js/web';

const Select: SelectComp = (props) => {

  const [selected, setSelected] = createSignal<Options>();

  return (
    <select
      value={selected()}
      onInput={e => setSelected(e.currentTarget.value)}
      style={props.style}
      class={styles.Select}
      classList={props.classes}
    >
      <For each={Object.keys(options)}>
        {color => <option value={color}>{color}</option>}
      </For>
      <Dynamic component={props.options[selected()]} />
      {props.children}

    </ select>)
}



export default Select;