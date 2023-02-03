import Button from "../@shared/Button/Button";
import MultiSelectTextInput from "../@shared/inputs/MultiSelectTextInput/MultiSelectTextInput";
import TextInput from "../@shared/inputs/TextInput/TextInput";
import Modal from "../@shared/Modal/Modal";
import styles from './NewMail.module.css'
import CloseIcon from './../../assets/icons/close.svg?component-solid';
import MinimizeIcon from './../../assets/icons/minimize.svg?component-solid';
import PenIcon from './../../assets/icons/pen.svg?component-solid';
import { useStore } from "../../store";
import Textarea from "../@shared/inputs/Textarea/Textarea";
import Submit from "../@shared/inputs/Submit/Submit";
import { createSignal, For, Show } from "solid-js";
import { getDraft, setDraft } from "../../store/MailsStore";


const NewMail = () => {

  const { getModal } = useStore();
  const onSubmit = (e: Event) => {
    console.log(e);

    e.preventDefault();
    // window.location.reload();
  };

  return (
    <>
      <Modal
        hide={getModal()?.id !== 'newMail'}
        classes={{ [styles.NewMail]: true }}
      >
        <form class={styles.NewMail_form} onSubmit={onSubmit}>
          <NewMailHeader />
          <TextEditor />
          <NewMailFooter />
        </form>
      </Modal>
      <NewMailDrafts />
    </>
  )
}

const NewMailHeader = () => {

  const { getModal, setModal } = useStore();

  const onMinimize = (e) => {
    setModal(null);
    e.stopPropagation();
    e.preventDefault();
  }

  const onClose = (e) => {
    const { draftIndex } = getModal();
    setModal(null);
    setDraft((prev) => prev.filter((_, i) => i !== draftIndex));
    e.stopPropagation();
    e.preventDefault();
  };

  const validOptions = (email: string) => {
    const matcher = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(matcher) ? true : false;
  }

  const onChangeTitle = (e) => {
    const { draftIndex } = getModal();

    const drafts = getDraft();
    drafts[draftIndex] = { ...drafts[draftIndex], title: e.target.value };
    setDraft(drafts);
  }


  const getDraftTitle = () => {
    if (getModal() && 'draftIndex' in getModal()) {
      return getDraft()[getModal()?.draftIndex].title;
    }
    return '';
  }

  const onChangeTo = (e) => {
    const { draftIndex } = getModal();

    const drafts = getDraft();
    drafts[draftIndex] = {
      ...drafts[draftIndex],
      to: e.value.split(' ').map((email: string) => ({ email })),
    };

    setDraft(drafts);
  }

  const getDraftTo = () => {

    if (getModal() && 'draftIndex' in getModal()) {
      return getDraft()[getModal().draftIndex].to.map(({ email }) => email);
    }
    return [];
  }

  return (
    <header class={styles.NewMailHeader}>
      <section class={styles.NewMailHeader_btns}>
        <Button
          onClick={onMinimize}
          Icon={<MinimizeIcon />}
          classes={{ [styles.NewMailHeader_btn]: true }}
          contentClasses={{ [styles.NewMailHeader_btn]: true }}
          mini
        />
        <Button
          onClick={onClose}
          Icon={<CloseIcon />}
          classes={{
            [styles.NewMailHeader_btn]: true,
            [styles.NewMailHeader_btn_close]: true
          }}
          contentClasses={{ [styles.NewMailHeader_btn]: true }}
          mini
        />
      </section>
      <section class={styles.NewMailHeader_to}>
        <MultiSelectTextInput
          name="Кому:"
          onChange={onChangeTo}
          options={getDraftTo()}
          validOptions={validOptions}
        />
      </section>
      <section class={styles.NewMailHeader_title}>
        <TextInput
          onChange={onChangeTitle}
          name="Тема:"
          value={getDraftTitle()}
        />
      </section>
    </header>);
}

const TextEditor = () => {

  const { getModal } = useStore();
  const defTextState = { bold: false, italic: false, underline: false, strike: false }
  const [getTextState, setTextState] = createSignal(defTextState);

  const toogleTextState = (text: keyof typeof defTextState) => {
    setTextState((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  const Icons = { bold: 'Ж', italic: 'K', underline: 'Ч', strike: 'Т' }

  for (let key in Icons) {
    Icons[key] = <span class={styles['TextEditor_toolBar_' + key]}>{Icons[key]}</span>
  }

  const onChange = (e) => {
    const { draftIndex } = getModal();
    const drafts = getDraft();
    drafts[draftIndex] = { ...drafts[draftIndex], text: e.target.value };
    setDraft(drafts);
  }

  const getDraftText = () => {
    if (getModal() && 'draftIndex' in getModal()) {
      return getDraft()[getModal().draftIndex].text;
    }
    return "";
  }

  return (<main class={styles.TextEditor}>
    <section class={styles.TextEditor_toolBar}>
      <For each={Object.keys(getTextState())}>
        {(text) => (
          <Button
            mini
            Icon={Icons[text]}
            active={getTextState()[text]}
            onClick={() => { toogleTextState(text) }}
          />
        )}
      </For>
    </section>
    <Textarea
      value={getDraftText()}
      onChange={onChange}
      bold={getTextState().bold}
      italic={getTextState().italic}
      underline={getTextState().underline}
      strike={getTextState().strike}
      placeholder='введите текст'
      spellcheck
    />
  </main>)
}


const NewMailFooter = () => {
  return (
    <footer class={styles.NewMailFooter}>
      <Submit
        name='Отправить'
        classes={{ [styles.NewMailFooter_Submit]: true }}
      />
    </footer>
  )
};

const NewMailDrafts = () => {

  const { getModal, setModal, setDraft } = useStore();

  const onOpen = (draftIndex: number) => (e) => {

    setModal(({ type: 'newMail', id: 'newMail', draftIndex }));
  }

  const onClose = (draftIndex: number) => (e) => {
    console.log('onClose');
    
    setDraft((prev) => prev.filter((_, i) => i !== draftIndex));
  };

  return (
    <section class={styles.NewMailDraft_wrapper}>
      <For each={getDraft()}>
        {(_, i) => (
          <Show when={!getModal() || getModal()?.draftIndex !== i()}>
            <div class={styles.NewMailDraft}>
              <Button
                full
                onClick={(e) => {
                  const onClick = onOpen(i());
                  onClick(e);
                }}
                classes={{ [styles.NewMailDraft_open]: true }}
                name={`Черновик ${i() + 1}`}
                Icon={<PenIcon />}
              />
              <Button
                mini
                onClick={(e) => {
                  const onClick = onClose(i());
                  onClick(e);
                }}
                Icon={<CloseIcon />}
                name="Close"
                classes={{ [styles.NewMailDraft_close]: true }}
              />
            </div>
          </Show>
        )}
      </For>
    </section>

  )
}

export default NewMail;