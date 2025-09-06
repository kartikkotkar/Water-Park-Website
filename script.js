const pricing = {
  'Thunder Slide': 350,
  'Lazy River': 150,
  'Wave Pool': 200,
  'Kids Cove': 100,
  'Splash Tower': 120,
  'Family Rapids': 300
};

function formatINR(n){ return '₹' + Number(n).toLocaleString('en-IN'); }

const modal = document.getElementById('modal');
const openTickets = document.getElementById('openTickets');
const closeModal = document.getElementById('closeModal');

function openBooking(prefill = {}){
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('attraction').value = prefill.attraction || '';
  document.getElementById('date').value = prefill.date || '';
  document.getElementById('numAdult').value = prefill.adult || 0;
  document.getElementById('numChild').value = prefill.child || 0;
  document.getElementById('numInfant').value = prefill.infant || 0;
  updateSummary();
  document.getElementById('attraction').focus();
}
function closeBooking(){
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

openTickets.addEventListener('click', ()=> openBooking());
closeModal.addEventListener('click', closeBooking);
document.getElementById('cancelBtn').addEventListener('click', closeBooking);

// Card buttons
document.querySelectorAll('.btn-small[data-attraction]').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const a = e.currentTarget.dataset.attraction;
    openBooking({ attraction: a, adult:1, child:0, infant:0 });
  })
})

// Quick calc
document.getElementById('calcBtn').addEventListener('click', ()=>{
  const a = Number(document.getElementById('adult').value) || 0;
  const c = Number(document.getElementById('child').value) || 0;
  const i = Number(document.getElementById('infant').value) || 0;
  // default prices (fallback to Thunder Slide if unknown)
  const total = a * 350 + c * 150 + i * 0;
  document.getElementById('calcResult').textContent = 'Total: ' + formatINR(total);
});

document.getElementById('openFromCalc').addEventListener('click', ()=>{
  const a = Number(document.getElementById('adult').value) || 0;
  const c = Number(document.getElementById('child').value) || 0;
  const i = Number(document.getElementById('infant').value) || 0;
  openBooking({ adult:a, child:c, infant:i });
});

function updateSummary(){
  const a = Number(document.getElementById('numAdult').value) || 0;
  const c = Number(document.getElementById('numChild').value) || 0;
  const i = Number(document.getElementById('numInfant').value) || 0;
  const atr = document.getElementById('attraction').value || '';
  const baseAdult = pricing[atr] || 350;
  const childPrice = Math.round(baseAdult * 0.45);
  const infantPrice = 0;
  const total = a*baseAdult + c*childPrice + i*infantPrice;
  const tickets = a + c + i;
  document.getElementById('summaryText').textContent = `${tickets} tickets — Total ${formatINR(total)}`;
}

['numAdult','numChild','numInfant','attraction'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener('input', updateSummary);
});

// Confirm
document.getElementById('confirmBtn').addEventListener('click', ()=>{
  const atr = document.getElementById('attraction').value;
  const date = document.getElementById('date').value;
  const a = Number(document.getElementById('numAdult').value) || 0;
  const c = Number(document.getElementById('numChild').value) || 0;
  const i = Number(document.getElementById('numInfant').value) || 0;
  const text = `${a+c+i} tickets for ${atr} on ${date || 'selected date'} — Thank you!`;
  alert(text);
  closeBooking();
});