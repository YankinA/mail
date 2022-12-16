import type { Component } from 'solid-js';
import Header from '../components/Header/Header';
import Sidebar from '../components/SideBar/Sidebar';
import Mails from '../components/Mails/Mails';
import Footer from '../components/Footer/Footer';
import styles from './MailClient.module.css';

export const MailClient: Component = () => {
  return <>
    <Header />
    <main class={styles.Content}>
      <Sidebar />
      <Mails />
    </main>
    <Footer />
  </>
};

export default MailClient;