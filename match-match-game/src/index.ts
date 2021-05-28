import './style.css';
import { App } from './app';

window.onload = () => {
  const appElement = document.getElementById('app');

  if (!appElement) throw Error('App root element not found');
  return new App(appElement);
};
