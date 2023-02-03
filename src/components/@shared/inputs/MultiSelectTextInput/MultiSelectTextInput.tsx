import { createEffect, createSignal, For, on } from 'solid-js';
import type { MultiSelectTextInputComp, MultiSelectOptionsComp, Option } from './MultiSelectTextInput.d';
import styles from './MultiSelectTextInput.module.css';
import Close from './../../../../assets/icons/close.svg?component-solid';
import TextInput from '../TextInput/TextInput';

const MultiSelectTextInput: MultiSelectTextInputComp = (props) => {
  const [getOptions, setOptions] = createSignal(props?.options);

  createEffect(() => {
    setOptions(props?.options);
  });

  const removeOption = (option: Option) => {
    setOptions(prev => prev.filter((prevOption) => prevOption !== option))
  }

  type InputEvent = KeyboardEvent & {
    currentTarget: HTMLInputElement;
    target: Element;
  }
  const onKeyPress = (e: InputEvent) => {
    
    const option = e.target.value;
    if (e.key === 'Enter' && option && option.trim()) {
      e.target.value = '';
      setOptions((prev) => [...prev, option])
      if (props.onChange) {
        props.onChange({ ...e, value: getOptions().join(' ') });
      }
      e.stopPropagation();
      e.preventDefault();
    }

  }

  return (
    <TextInput name={props.name} onKeyPress={onKeyPress}>
      <MultiSelectOptions
        removeOption={removeOption}
        options={getOptions()}
        validOptions={props.validOptions}
      />
    </ TextInput>
  )
}

const MultiSelectOptions: MultiSelectOptionsComp = (props) => {
  return (
    <ul class={styles.MultiSelectOptions}>
      <For each={props.options}>
        {(option) => (
          <li
            class={styles.MultiSelectOption}
            classList={{ [styles.MultiSelectOption_fail]: !props.validOptions(option) }}
          >
            <div class={styles.MultiSelectOption_texts} >{option}</div>
            <div
              class={styles.MultiSelectOption_icon}
              onClick={() => { props.removeOption(option); }}
            >
              <Close />
            </div>
          </ li>
        )}
      </For>
    </ul>)
}

export default MultiSelectTextInput;