import { initDetailUI } from './components/Layout/Detail';
import { initHomeUI } from './components/Layout/Home';

function app() {
  // giao dien nguoi dung
  const pathName = window.location.pathname;

  if (
    pathName === '/' ||
    pathName === '/home/bao/Desktop/TuVanMuaXe/FrontEnd/build/index.html'
  )
    initHomeUI();
  else if (
    pathName === '/car' ||
    pathName === '/home/bao/Desktop/TuVanMuaXe/FrontEnd/build/car.html'
  )
    initDetailUI();

  // thuc hien chuc nang
}

app();
