// Toggle panel menu mobile
const btn = document.getElementById('nav-toggle');
const panel = document.getElementById('menu-panel');
if(btn && panel){
  btn.addEventListener('click', ()=>{
    const isHidden = panel.classList.contains('hidden');
    if(isHidden){ panel.classList.remove('hidden'); btn.setAttribute('aria-expanded','true'); }
    else{ panel.classList.add('hidden'); btn.setAttribute('aria-expanded','false'); }
  });
}

// Toggle submenu pada mobile (pakai data-submenu)
const toggles = document.querySelectorAll('[data-submenu]');
for(const t of toggles){
  t.addEventListener('click', ()=>{
    const id = t.getAttribute('data-submenu');
    const box = document.getElementById(id);
    if(!box) return;
    box.classList.toggle('hidden');
  });
}
