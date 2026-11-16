// Results transcribed from Sanook Lotto Archive pages 1–2, accessed 16 Nov 2026.
// Keep lottery values as strings so leading zeroes are preserved.
const draws = [
  {date:'2026-11-16',first:'645654',front:['938','101'],back:['106','782'],last2:'06'},
  {date:'2026-11-01',first:'423224',front:['300','950'],back:['393','804'],last2:'85'},
  {date:'2026-10-16',first:'011781',front:['392','402'],back:['171','255'],last2:'48'},
  {date:'2026-10-01',first:'402701',front:['791','912'],back:['058','396'],last2:'70'},
  {date:'2026-09-16',first:'730640',front:['060','521'],back:['266','041'],last2:'64'},
  {date:'2026-09-01',first:'417212',front:['257','346'],back:['136','740'],last2:'04'},
  {date:'2026-08-16',first:'004615',front:['731','429'],back:['937','094'],last2:'53'},
  {date:'2026-08-01',first:'932479',front:['413','672'],back:['154','039'],last2:'69'},
  {date:'2026-07-16',first:'639214',front:['683','709'],back:['746','427'],last2:'71'},
  {date:'2026-07-01',first:'751495',front:['001','980'],back:['304','531'],last2:'62'},
  {date:'2026-06-16',first:'287184',front:['758','434'],back:['007','721'],last2:'48'},
  {date:'2026-06-01',first:'173770',front:['848','415'],back:['410','938'],last2:'95'},
  {date:'2026-05-16',first:'107387',front:['091','298'],back:['602','716'],last2:'08'},
  {date:'2026-05-02',first:'536077',front:['267','318'],back:['065','153'],last2:'43'},
  {date:'2026-04-16',first:'309612',front:['355','108'],back:['868','424'],last2:'77'},
  {date:'2026-04-01',first:'292514',front:['406','113'],back:['851','098'],last2:'47'},
  {date:'2026-03-16',first:'833009',front:['510','983'],back:['439','954'],last2:'64'},
  {date:'2026-03-01',first:'820866',front:['479','054'],back:['068','837'],last2:'06'},
  {date:'2026-02-16',first:'340563',front:['527','241'],back:['578','169'],last2:'07'},
  {date:'2026-02-01',first:'174629',front:['917','195'],back:['408','041'],last2:'48'},
  {date:'2026-01-17',first:'878972',front:['299','815'],back:['662','363'],last2:'02'},
  {date:'2026-01-02',first:'837706',front:['347','694'],back:['288','765'],last2:'16'},
  {date:'2025-12-16',first:'763895',front:['431','176'],back:['014','449'],last2:'52'},
  {date:'2025-12-01',first:'461252',front:['655','389'],back:['137','995'],last2:'22'},
  {date:'2025-11-16',first:'458145',front:['242','602'],back:['239','389'],last2:'37'},
  {date:'2025-11-01',first:'345898',front:['449','328'],back:['111','690'],last2:'87'},
  {date:'2025-10-16',first:'059696',front:['531','955'],back:['476','889'],last2:'61'},
  {date:'2025-10-01',first:'876978',front:['843','532'],back:['280','605'],last2:'77'},
  {date:'2025-09-16',first:'074646',front:['512','740'],back:['308','703'],last2:'58'},
  {date:'2025-09-01',first:'506356',front:['131','012'],back:['022','209'],last2:'31'},
  {date:'2025-08-16',first:'994865',front:['247','602'],back:['834','989'],last2:'63'},
  {date:'2025-08-01',first:'811852',front:['142','525'],back:['512','891'],last2:'50'},
  {date:'2025-07-16',first:'245324',front:['995','171'],back:['084','336'],last2:'26'},
  {date:'2025-07-01',first:'949246',front:['680','169'],back:['918','261'],last2:'91'},
  {date:'2025-06-16',first:'507392',front:['243','017'],back:['299','736'],last2:'06'},
  {date:'2025-06-01',first:'559352',front:['349','134'],back:['307','044'],last2:'20'},
  {date:'2025-05-16',first:'251309',front:['109','231'],back:['965','631'],last2:'87'},
  {date:'2025-05-02',first:'213388',front:['826','116'],back:['167','662'],last2:'06'},
  {date:'2025-04-16',first:'266227',front:['413','254'],back:['474','760'],last2:'85'},
  {date:'2025-04-01',first:'669687',front:['635','760'],back:['180','666'],last2:'36'},
  {date:'2025-03-16',first:'757563',front:['595','927'],back:['457','309'],last2:'32'}
];

const $ = (selector) => document.querySelector(selector);
const dateFormatter = new Intl.DateTimeFormat('th-TH-u-ca-buddhist', {day:'numeric',month:'short',year:'numeric'});
let activeKind = 'last2';
let selected = draws.slice(0, 40);

function fmtDate(iso) { return dateFormatter.format(new Date(`${iso}T12:00:00`)); }
function makeFreq(values) { const out = Object.fromEntries(Array.from({length:10},(_,i)=>[String(i),0])); values.forEach(v=>String(v).split('').forEach(d=>out[d]++)); return out; }
function render() {
  const count = Number($('#draw-range').value);
  selected = draws.slice(0, count);
  $('#draw-count').textContent = selected.length;
  $('#latest-date').textContent = fmtDate(selected[0].date);
  $('#table-count').textContent = `แสดง ${selected.length} งวด`;

  const pairFreq = Object.fromEntries(Array.from({length:100},(_,i)=>[String(i).padStart(2,'0'),0]));
  selected.forEach(d => pairFreq[d.last2]++);
  const ranked = Object.entries(pairFreq).sort((a,b)=>b[1]-a[1] || a[0].localeCompare(b[0]));
  const top = ranked[0];
  $('#top-pair').textContent = top[0];
  $('#top-pair-note').textContent = `พบ ${top[1]} ครั้ง จาก ${selected.length} งวด`;
  $('#missing-count').textContent = Object.values(pairFreq).filter(v=>v===0).length;

  const max = Math.max(1,...Object.values(pairFreq));
  $('#y-max').textContent = max;
  $('#y-mid').textContent = Math.ceil(max/2);
  $('#frequency-chart').innerHTML = Object.entries(pairFreq).map(([pair,n])=>`<div class="bar ${n===max&&n>0?'hot':''}" style="height:${Math.max(n?4:1,n/max*100)}%" data-tip="${pair} · ${n} ครั้ง" title="เลข ${pair}: ${n} ครั้ง"></div>`).join('');

  const values = activeKind === 'last2'
    ? selected.map(d=>d.last2)
    : selected.flatMap(d=>[d.first,...d.front,...d.back,d.last2]);
  const digitFreq = makeFreq(values), maxDigit = Math.max(1,...Object.values(digitFreq));
  $('#digit-list').innerHTML = Object.entries(digitFreq).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).map(([digit,n])=>`<div class="digit-row"><span>${digit}</span><div class="digit-track"><div class="digit-fill" style="width:${n/maxDigit*100}%"></div></div><span class="digit-count">${n}</span></div>`).join('');

  const frequent = ranked.filter(([,n])=>n>0).slice(0,5);
  $('#suggestion-list').innerHTML = frequent.map(([pair,n],i)=>`<div class="suggestion-card"><div class="suggestion-number">${pair}</div><div class="suggestion-meta"><strong>${n} ครั้ง</strong>สัดส่วนย้อนหลัง ${(selected.length ? (n/selected.length*100).toFixed(1) : '0.0')}% · อันดับ ${i+1}</div></div>`).join('') || '<p>ยังไม่มีข้อมูลให้แสดง</p>';
  $('#history-body').innerHTML = selected.map(d=>`<tr><td>${fmtDate(d.date)}</td><td class="prize1">${d.first}</td><td>${d.front.map(n=>`<span class="prize-pill">${n}</span>`).join('')}</td><td>${d.back.map(n=>`<span class="prize-pill">${n}</span>`).join('')}</td><td><span class="two-digit">${d.last2}</span></td></tr>`).join('');
}

$('#draw-range').addEventListener('change', render);
document.querySelectorAll('.segment').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.segment').forEach(b=>b.classList.toggle('active',b===button));
  activeKind = button.dataset.kind;
  render();
}));
$('#export-btn').addEventListener('click',()=>{
  const rows = [['date','first_prize','front_3_digits','back_3_digits','last_2_digits'],...selected.map(d=>[d.date,d.first,d.front.join(' '),d.back.join(' '),d.last2])];
  const csv = '\ufeff' + rows.map(row=>row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
  const a = document.createElement('a'); a.href=url; a.download='thai-lottery-history.csv'; a.click(); URL.revokeObjectURL(url);
});
render();

