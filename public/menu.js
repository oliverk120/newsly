export async function loadMenu() {
  const res = await fetch('/menu.html');
  const html = await res.text();
  const container = document.getElementById('menu');
  if (!container) return;
  container.innerHTML = html;
  const path = window.location.pathname === '/' ? '/' : window.location.pathname;
  container.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if ((path === '/' && href === '/') || path === href || (path === '/index.html' && href === '/')) {
      a.classList.add('font-semibold');
    } else {
      a.classList.add('text-blue-600', 'underline');
    }
  });
}
