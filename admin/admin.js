// Simple in-browser admin for adding artworks to the gallery
(() => {
  const LS_KEY = 'gallery_artworks'
  const listEl = document.getElementById('art-list')
  const titleEl = document.getElementById('title')
  const slugEl = document.getElementById('slug')
  const imageEl = document.getElementById('image')
  const dateEl = document.getElementById('date')
  const descEl = document.getElementById('description')

  function getArtworks(){
    const raw = localStorage.getItem(LS_KEY)
    try{ return raw ? JSON.parse(raw) : [] }catch(e){ return [] }
  }
  function saveArtworks(list){ localStorage.setItem(LS_KEY, JSON.stringify(list)) }
  function sanitizeSlug(s){ return (s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') }
  function renderList(){
    const items = getArtworks()
    listEl.innerHTML = ''
    if(!items.length){ listEl.innerHTML = '<li>No artworks yet. Add one above.</li>'; return }
    items.forEach((it,idx)=>{
      const li = document.createElement('li')
      li.style.display='flex';
      li.style.alignItems='center';
      li.style.gap='8px';
      li.style.marginBottom='6px'
      const a = document.createElement('a')
      a.href = `gallery/${it.slug||idx}.html`
      a.textContent = it.title
      const img = document.createElement('img')
      img.src = it.image
      img.style.height='40px'; img.style.objectFit='cover'; img.style.width='60px'; img.style.borderRadius='6px'
      const del = document.createElement('button')
      del.textContent = 'Delete'
      del.style.marginLeft='auto'
      del.onclick = () => {
        const arr = getArtworks().filter((_,i)=> i!==idx)
        saveArtworks(arr); renderList();
      }
      li.appendChild(img); li.appendChild(a); li.appendChild(del)
      listEl.appendChild(li)
    })
  }
  window.addArtwork = function(){
    const t = titleEl.value.trim()
    const slug = slugEl.value.trim() || sanitizeSlug(t)
    const image = imageEl.value.trim()
    const date = dateEl.value
    const desc = descEl.value.trim()
    if(!t || !image){ alert('Please provide a title and image URL.'); return }
    const arr = getArtworks()
    arr.push({ title: t, slug, image, date, description: desc })
    saveArtworks(arr)
    renderList()
    // clear form
    titleEl.value=''; slugEl.value=''; imageEl.value=''; dateEl.value=''; descEl.value=''
  }
  function addArtwork(){ window.addArtwork() }
  window.exportJSON = function(){
    const data = getArtworks()
    const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'})
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'gallery_artworks.json'
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
  }
  // Seed with any existing localStorage data if user has never used admin before
  renderList()
})()
