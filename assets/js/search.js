async function loadIndex(){
  try{
    const res = await fetch('index.json'); // relatif ke root
    if(!res.ok) throw new Error('Gagal memuat index.json');
    return await res.json();
  }catch(err){
    console.error(err);
    return [];
  }
}

(function(){
  const input = document.getElementById('search-input');
  const inputMobile = document.getElementById('search-input-mobile');
  const box = document.getElementById('search-results');
  const list = document.getElementById('results');
  if(!box || !list) return;

  let data = [];
  loadIndex().then(idx=> data = idx);

  function openBox(){ box.classList.remove('hidden'); }
  function closeBox(){ box.classList.add('hidden'); list.innerHTML=''; }

  function render(items){
    list.innerHTML = '';
    if(items.length === 0){
      list.innerHTML = '<li class="py-2 text-slate-600">Tidak ada hasil.</li>';
      return;
    }
    for(const it of items){
      const li = document.createElement('li');
      li.className = 'py-3';
      li.innerHTML = `<a class="text-brand font-medium" href="${it.url}"><strong>${it.title}</strong></a><br><small class="text-slate-600">${it.content}</small>`;
      list.appendChild(li);
    }
  }

  function handle(q){
    const s = q.trim().toLowerCase();
    if(s.length < 2){ closeBox(); return; }
    const results = data.filter(it =>
      it.title.toLowerCase().includes(s) || it.content.toLowerCase().includes(s)
    );
    render(results);
    openBox();
  }

  if(input){ input.addEventListener('input', ()=> handle(input.value)); }
  if(inputMobile){ inputMobile.addEventListener('input', ()=> handle(inputMobile.value)); }
})();