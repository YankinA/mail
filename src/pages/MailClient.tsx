import Header from '../components/Header/Header';
import Sidebar from '../components/SideBar/Sidebar';
import Mails from '../components/Mails/Mails';
import styles from './MailClient.module.css';
import Settings from '../components/Settings/Settings';
import { useStore } from '../store';

export const MailClient = () => {
  const { settings, getModal, setModal } = useStore();
  return <>
    <div
      onClick={(e) => {
        console.log(e.target);
        if (getModal() !== null) {
          setModal(null);
        }
        
      }}
      class={styles.MailClient}
      classList={{
        [styles.MailClient_scale]: settings.open
      }}>
      <Header />
      <main class={styles.Content}>
        <Sidebar />
        <Mails />
      </main>
    </div>
    <Settings />
  </>
};

export default MailClient;
