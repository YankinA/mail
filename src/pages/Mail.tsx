import type { Component } from 'solid-js';
import Header from '../components/Header/Header';
import Sidebar from '../components/SideBar/Sidebar';
import Letter from '../components/Letter/Letter';
import Footer from '../components/Footer/Footer';

export const Mail: Component = () => {
  return <>
    <Header />
    <Sidebar />
    <Letter />
    <Footer />
  </>
};

export default Mail;
