import type { Component } from 'solid-js';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Letter from '../components/Letter';
import Footer from '../components/Footer';

export const Mail: Component = () => {
  return <>
    <Header />
    <Sidebar />
    <Letter />
    <Footer />
  </>
};

export default Mail;
