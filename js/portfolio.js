'use strict';
const dialog = document.querySelector('#video-dialog');
const player = document.querySelector('#video-player');
let trigger;
document.querySelectorAll('[data-video]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.showModal) return;
    event.preventDefault();
    trigger = link;
    document.querySelector('#video-title').textContent = link.dataset.title;
    document.querySelector('#video-error').hidden = true;
    document.querySelector('#video-direct').href = link.href;
    player.poster = link.querySelector('img').src;
    player.src = link.href;
    dialog.showModal();
    document.body.classList.add('modal-open');
    player.play().catch(() => {});
  });
});
document.querySelector('#close-video').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }
});
dialog.addEventListener('close', () => {
  player.pause(); player.removeAttribute('src'); player.load();
  document.body.classList.remove('modal-open');
  trigger?.focus();
});
player.addEventListener('error', () => { if (player.hasAttribute('src')) document.querySelector('#video-error').hidden = false; });
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('priyanshbishtt@gmail.com'); status.textContent = 'Email copied. Let’s build something.'; }
  catch { status.textContent = 'Email: priyanshbishtt@gmail.com — select the address to copy it.'; }
});
