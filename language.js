Object.assign(indonesianText,{
 'Quantities & SI units':'Besaran & satuan SI','Dimensions':'Dimensi','Measurement tools':'Alat ukur','Uncertainty':'Ketidakpastian','Precision':'Presisi','Chapter challenge':'Tantangan bab',
 'Your answer':'Jawabanmu','Check answer':'Periksa jawaban','Check response':'Periksa tanggapan','Type your answer here…':'Ketik jawabanmu di sini…','Explain your reasoning…':'Jelaskan alasanmu…',
 'Name the two required parts.':'Sebutkan dua bagian yang diperlukan.',
 'List the three unit names or symbols in length, mass, time order.':'Tuliskan tiga nama atau simbol satuan dengan urutan panjang, massa, waktu.',
 'Write base or derived.':'Tuliskan pokok atau turunan.',
 'Write the two powers of ten in that order, e.g. 10^a, 10^b.':'Tuliskan dua pangkat sepuluh sesuai urutan, misalnya 10^a, 10^b.',
 'Include the quantity, value and unit.':'Sertakan besaran, nilai, dan satuan.',
 'Use M, L and T; ^ is optional.':'Gunakan M, L, dan T; tanda ^ boleh digunakan.',
 'Enter the uncertainty with its unit.':'Tuliskan ketidakpastian beserta satuannya.',
 'Write precise and/or accurate; use “not accurate” where needed.':'Tuliskan presisi dan/atau akurat; gunakan “tidak akurat” bila perlu.',
 'Answer yes or no.':'Jawab ya atau tidak.',
 'Enter coefficient × 10^exponent.':'Tuliskan koefisien × 10^pangkat.',
 'Enter the number of significant figures.':'Tuliskan jumlah angka penting.',
 'Enter the converted value and unit.':'Tuliskan nilai hasil konversi beserta satuannya.',
 'Enter the converted value and unit (μs or us).':'Tuliskan nilai hasil konversi dan satuannya (μs atau us).',
 'Enter length and unit.':'Tuliskan panjang beserta satuannya.',
 'Enter a percentage.':'Tuliskan persentasenya.',
 'Enter a fraction or a percentage.':'Tuliskan nilai relatif atau persentasenya.',
 'Enter the dimension only.':'Tuliskan dimensinya saja.',
 'Enter the final dimension only.':'Tuliskan dimensi akhirnya saja.',
 'Enter the dimension only, using A for current.':'Tuliskan dimensinya saja, menggunakan A untuk arus.',
 'Enter the dimension, or the word dimensionless.':'Tuliskan dimensinya, atau kata “tak berdimensi”.',
 'Enter the wavelength in nm.':'Tuliskan panjang gelombang dalam nm.',
 'Enter the energy in J.':'Tuliskan energi dalam J.',
 'Enter value ± uncertainty, with unit.':'Tuliskan nilai ± ketidakpastian, beserta satuan.',
 'Enter value and unit.':'Tuliskan nilai dan satuannya.',
 'Enter thickness ± uncertainty, with unit.':'Tuliskan ketebalan ± ketidakpastian, beserta satuan.',
 'Write your explanation or working. This open response needs teacher review; it will not be automatically marked wrong.':'Tuliskan penjelasan atau langkah pengerjaanmu. Jawaban terbuka ini perlu diperiksa guru dan tidak akan otomatis dinyatakan salah.',
 'Enter an answer first.':'Isi jawaban terlebih dahulu.',
 'Enter a value first.':'Isi nilainya terlebih dahulu.',
 '✓ Correct. Open Show answer to see the working.':'✓ Benar. Klik Tampilkan jawaban untuk melihat pembahasan.',
 'Not correct yet. Check the requested format and units, then try again. Click Show answer when you want the solution.':'Belum benar. Periksa format dan satuan yang diminta, lalu coba lagi. Klik Tampilkan jawaban jika ingin melihat penyelesaiannya.',
 'Response saved for teacher review. Click Show answer to compare your reasoning.':'Tanggapan tersimpan untuk diperiksa guru. Klik Tampilkan jawaban untuk membandingkan alasanmu.',
 'Correct.':'Benar.','✓ Correct.':'✓ Benar.',
 'Correct. Open Show answer to see the explanation.':'Benar. Klik Tampilkan jawaban untuk melihat penjelasannya.',
 '✓ Correct. Open Show answer to see the explanation.':'✓ Benar. Klik Tampilkan jawaban untuk melihat penjelasannya.',
 'Not correct yet. Try again, or click Show answer.':'Belum benar. Coba lagi, atau klik Tampilkan jawaban.',
 'Not correct yet. Try again or click Show answer.':'Belum benar. Coba lagi atau klik Tampilkan jawaban.',
 'Reducing uncertainty makes the interval narrower.':'Mengurangi ketidakpastian membuat interval lebih sempit.',
 'reference':'acuan',
 'Module completed. Explain one thing you learned about the limits of a measurement.':'Modul selesai. Jelaskan satu hal yang kamu pelajari tentang keterbatasan pengukuran.',
 'Lessons':'Bagian pembelajaran',
 'Rounded value':'Nilai setelah pembulatan',
 'Open the base and derived quantities illustration at full size':'Buka ilustrasi besaran pokok dan turunan ukuran penuh',
 'Repeated measurements compared with a reference of 10 centimetres':'Pengukuran berulang dibandingkan dengan acuan 10 sentimeter',
 'Object begins at 1.2 centimetres on a ruler':'Benda dimulai pada 1.2 sentimeter di penggaris'
});
let moduleLanguage='en';try{moduleLanguage=localStorage.getItem('physics-module-language')==='id'?'id':'en'}catch{}
const originalText=new WeakMap(),originalAttributes=new WeakMap();
let languageObserver;
function translateModuleText(text){const clean=text.trim();if(Object.hasOwn(indonesianText,clean))return text.replace(clean,indonesianText[clean]);
 if(/^\d+ of 6 sections completed$/.test(clean))return clean.replace(' of 6 sections completed',' dari 6 bagian selesai');
 if(clean.startsWith('Indicated interval: '))return clean.replace('Indicated interval: ','Interval yang ditunjukkan: ').replace(' to ',' hingga ');
 if(clean.startsWith('Object starts at 1.2 cm and ends at '))return clean.replace('Object starts at 1.2 cm and ends at ','Benda dimulai pada 1.2 cm dan berakhir pada ').replace('; ruler divisions are 0.1 cm','; skala terkecil penggaris 0.1 cm');
 if(clean.includes('Readings: ')){return clean.replace('Small spread and near the reference: relatively precise and accurate.','Sebaran kecil dan dekat acuan: relatif presisi dan akurat.').replace('Small spread, but about 1 cm too high: relatively precise but inaccurate.','Sebaran kecil, tetapi sekitar 1 cm terlalu tinggi: relatif presisi tetapi tidak akurat.').replace('Large spread: lower precision. The mean is 10.0 cm, but the individual readings vary substantially.','Sebaran besar: presisi lebih rendah. Rata-ratanya 10.0 cm, tetapi bacaan individual sangat bervariasi.').replace('Readings: ','Bacaan: ')}
 return text;
}
function applyModuleLanguage(){languageObserver?.disconnect();
 // Explicit option values prevent translating a label from changing its logical value.
 document.querySelectorAll('option:not([value])').forEach(o=>o.setAttribute('value',o.value));
 document.querySelectorAll('[data-math-source]').forEach(el=>{const source=el.dataset.mathSource;const chunks=el.dataset.mathSegments?JSON.parse(el.dataset.mathSegments):[source];const shown=chunks.map(t=>moduleLanguage==='id'?translateModuleText(t):t).join('');if(el.dataset.mathShown!==shown){el.textContent=shown;el.dataset.mathShown=shown;if(window.formatMathElement)window.formatMathElement(el)}});
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
 while(node=walker.nextNode()){if(node.parentElement?.closest('script,style,textarea,[data-language-control],[data-quantity-visual],[data-math-source],.katex'))continue;const record=originalText.get(node);const source=record&&node.nodeValue===record.shown?record.source:node.nodeValue;const shown=moduleLanguage==='id'?translateModuleText(source):source;if(node.nodeValue!==shown)node.nodeValue=shown;originalText.set(node,{source,shown});}
 document.querySelectorAll('[placeholder],[aria-label],[alt]').forEach(el=>{if(el.closest('[data-quantity-visual]'))return;const data=originalAttributes.get(el)||{};for(const attr of ['placeholder','aria-label','alt']){if(!el.hasAttribute(attr))continue;const value=el.getAttribute(attr),old=data[attr];const source=old&&old.shown===value?old.source:value;const shown=moduleLanguage==='id'?translateModuleText(source):source;el.setAttribute(attr,shown);data[attr]={source,shown};}originalAttributes.set(el,data)});
 document.documentElement.lang=moduleLanguage;document.title=moduleLanguage==='id'?'PHY-LAB EDU | Besaran & Pengukuran':'PHY-LAB EDU | Quantities & Measurements';
 const selector=document.getElementById('module-language');if(selector)selector.value=moduleLanguage;
 document.querySelectorAll('.lesson-figure').forEach(figure=>{const english=figure.querySelector('a'),caption=figure.querySelector('figcaption');if(english)english.hidden=moduleLanguage==='id';if(caption)caption.hidden=moduleLanguage==='id';let diagram=figure.querySelector('.indonesian-figure');if(!diagram){diagram=document.createElement('div');diagram.className='indonesian-figure card';diagram.innerHTML='<h3>Besaran pokok dan turunan</h3><div class="cards"><div><h3>Besaran pokok</h3><p>Panjang → meter (m)<br>Massa → kilogram (kg)<br>Waktu → sekon (s)</p></div><div><h3>Besaran turunan</h3><p>Luas = panjang × lebar → m²<br>Kelajuan = jarak ÷ waktu → m/s<br>Massa jenis = massa ÷ volume → kg/m³</p></div></div><p>Besaran turunan dibentuk dari hubungan antarbesaran pokok.</p>';figure.appendChild(diagram)}diagram.hidden=moduleLanguage!=='id';});
 languageObserver?.observe(document.body,{subtree:true,childList:true,characterData:true});
}
function setModuleLanguage(value){if(!['en','id'].includes(value))return;moduleLanguage=value;try{localStorage.setItem('physics-module-language',value)}catch{}if(window.redrawQuantityVisual)window.redrawQuantityVisual();applyModuleLanguage()}
function initializeModuleLanguage(){languageObserver=new MutationObserver(()=>applyModuleLanguage());applyModuleLanguage()}
