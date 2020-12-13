import lax from 'lax.js';

export function scrollEffect() {
  lax.setup();

  const updateLax = () => {
    lax.update(window.scrollY);
    window.requestAnimationFrame(updateLax);
  };

  window.requestAnimationFrame(updateLax);
}
