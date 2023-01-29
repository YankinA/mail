import { For, Show } from 'solid-js';
import type { SelectComp, OptionsComp, Option, SelecteddNamesComp } from './Select.d';
import styles from './Select.module.css';
import ArrowDownIcon from './../../../assets/icons/arrowDown.svg';
import CheckIcon from './../../../assets/icons/check.svg';
import Modal from '../Modal/Modal';
import { useStore } from '../../../store';
import { createStore } from 'solid-js/store';

const Select: SelectComp = (props) => {

  const { getModal, setModal } = useStore();

  const [options, setOptions] = createStore(props.options);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setModal(prev => prev ? null : { type: 'select', id: props.name });
         
      }}
      style={props.style}
      class={styles.Select}
      classList={props.classes}
    >
      <SelecteddNames
        options={options}
        name={props.name}
      />
      <div class={styles.Select_icon}>
        <ArrowDownIcon />
      </div>
      {props.children}
      {getModal()?.id === props.name && (
        <Options
          onSelect={props.onSelect}
          options={options}
          setOptions={setOptions}
        />
      )}
    </ div>)
}

const SelecteddNames: SelecteddNamesComp = (props) => {

  return (
    <div class={styles.SelecteddNames}>
      <div>{props.name}</div>
      <div class={styles.SelecteddNames_icons}>
        <For each={Object.values(props.options)}>
          {(option) => {
            console.log(option);
            
            return (
              <div class={styles.SelecteddNames_icon}>
                {option.Icon}
              </div>
            )
          }}
        </For>
      </div>

    </div>
  )
}

const Options: OptionsComp = (props) => {

  const { settings, setModal } = useStore();

  const toggleOptions = (selectedOption: string) => {

    props.setOptions(selectedOption, (option) => ({
      ...option, selected: selectedOption === 'all' ? true : !option.selected
    }));

    if (selectedOption === 'all') {
      props.setOptions((options) => Object.keys(options).reduce((acc: typeof options, key) => {

        acc[key] = { ...options[key], selected: key === 'all' ? true : false };

        return acc;
      }, {}))
    } else {
      props.setOptions((options) => ({ ...options, all: { ...options.all, selected: false } }));
    }

    props.onSelect(props.options);
    setModal(null);
  }

  return (
    <Modal classes={{
      [styles.Optins]: true,
      [styles.Optins_theme_dark]: settings.theme.id === 'full1',
    }}>
      <For each={Object.values(props.options)}>
        {(option: Option) => (
          <div
            onClick={() => {
              toggleOptions(option.value);
            }}
            class={styles.Option}
          >
            <Show when={props.options[option.value]?.selected}>
              <div class={styles.Option_check}>
                <CheckIcon />
              </div>
            </Show>
            {props.options[option.value].selected && <div class={styles.Option_check}>
              <CheckIcon />
            </div>}
            {option.Icon && <div class={styles.Options_icon}>
              {option.Icon}
            </div>}
            <div
              class={styles.Options_name}
              classList={{ [styles.Options_name_no_icon]: !option.Icon }}
            >
              {option.name}
            </div>
          </div>
        )}
      </For>
    </Modal>
  )
}

export default Select;