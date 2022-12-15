import type { Component } from 'solid-js';
import styles from './App.module.css';
import MailClient from './pages/MailClient';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <MailClient /> 
    </div>
  );
};

export default App;
