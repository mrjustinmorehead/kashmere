async function buy(id){
  const btns = document.querySelectorAll('button[data-buy]');
  btns.forEach(b => { b.disabled = true; b.dataset.prev = b.textContent; b.textContent = "Redirecting…"; });

  try{
    const res = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ id })
    });
    if(!res.ok) throw new Error(await res.text());
    const data = await res.json();
    if(!data.url) throw new Error("Missing Stripe URL");
    window.location.href = data.url;
  }catch(err){
    console.error(err);
    alert("Checkout error: " + err.message);
  }finally{
    btns.forEach(b => { b.disabled = false; b.textContent = b.dataset.prev || b.textContent; });
  }
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-buy]');
  if(!btn) return;
  buy(btn.getAttribute('data-buy'));
});

document.getElementById('year').textContent = new Date().getFullYear();
