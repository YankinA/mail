import type { Component } from 'solid-js';
import styles from './App.module.css';
import Mail from './pages/Mail';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Mail /> 
    </div>
  );
};

export default App;
