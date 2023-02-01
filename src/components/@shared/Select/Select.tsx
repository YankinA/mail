import { For, Show } from 'solid-js';
import type { SelectComp, OptionsComp, Option, SelecteddNamesComp } from './Select.d';
import styles from './Select.module.css';
import ArrowDownIcon from './../../../assets/icons/arrowDown.svg';
import CheckIcon from './../../../assets/icons/check.svg';
import Modal from '../Modal/Modal';
import { useStore } from '../../../store';
import { createStore } from 'solid-js/store';

const Select: SelectComp = (props) => {

  const { settings, getModal, setModal } = useStore();

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
      <SelectedNames
        options={options}
        name={props.name}
      />
      <div 
        class={styles.Select_icon}
        classList={{[styles.Select_icon_whiteTheme]: settings.theme.id === 'full2' }}
      >
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

const SelectedNames: SelecteddNamesComp = (props) => {
  const { settings } = useStore();
  const getSelectedOptions = (options: typeof props.options) => Object.values(options)
    .filter(({value, selected }) => value !== 'all' && selected);
  return (
    <div class={styles.SelectedNames}
    classList={{[styles.SelectedNames_whiteTheme]: settings.theme.id === 'full2' }}
    >
      <For each={Object.values(props.options)}>
        {({ Icon, value }) => (
          <Show when={props.options[value]?.selected}>
            <div class={styles.SelecteddNames_icon}>
              {Icon}
            </div>
          </Show>
        )}
      </For>
      <div class={styles.SelecteddNames_name}>
        {getSelectedOptions(props.options).length === 1 
          ? getSelectedOptions(props.options)[0]?.name :  props.name
        }
      </div>

    </div>
  )
}

const Options: OptionsComp = (props) => {

  const { settings, setModal } = useStore();


  const toggleOptions = (selectedOption: string) => {

    if (selectedOption === 'all' || selectedOption === 'reset') {
      props.setOptions((options) => Object.keys(options).reduce((acc: typeof options, key) => {

        acc[key] = { ...options[key], selected: key === 'all' ? true : false };

        return acc;
      }, {}))
    } else {
      props.setOptions((options) => ({ ...options, all: { ...options.all, selected: false } }));

      props.setOptions(selectedOption, (option) => ({
        ...option, selected: !option.selected
      }));
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
        {({ value, Icon, name }: Option) => {


          return (
            <div
              onClick={() => {
                toggleOptions(value);
              }}
              class={styles.Option}
              classList={{
                [styles.Select_reset]: value === 'reset' && settings.theme.id !== 'full1',
                [styles.Select_reset_dark]: value === 'reset' && settings.theme.id === 'full1',
              }}
            >
              <Show when={props.options[value]?.selected}>
                <div class={styles.Option_check}>
                  <CheckIcon />
                </div>
              </Show>
              {props.options[value]?.selected && <div class={styles.Option_check}>
                <CheckIcon />
              </div>}
              {Icon && <div class={styles.Options_icon}>
                {Icon}
              </div>}
              <div
                class={styles.Options_name}
                classList={{ [styles.Options_name_no_icon]: !Icon }}
              >
                {name}
              </div>
            </div>
          )
        }}
      </For>
    </Modal>
  )
}

export default Select;