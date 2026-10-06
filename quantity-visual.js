const quantityArtwork={"area": [["Area", "Luas"], [27, 218, 308, 158], ["Floor tiles: the area tells how much surface needs covering.", "Ubin lantai: luas menyatakan seberapa besar permukaan yang perlu ditutup."], "m²"], "volume": [["Volume", "Volume"], [365, 223, 301, 151], ["Water tank: volume tells how much space the water occupies.", "Tangki air: volume menyatakan ruang yang ditempati air."], "m³"], "velocity": [["Velocity", "Kecepatan"], [701, 224, 291, 145], ["A moving motorcycle has a speed and a direction.", "Motor yang bergerak memiliki kelajuan dan arah."], "m s⁻¹"], "acceleration": [["Acceleration", "Percepatan"], [23, 560, 305, 145], ["A motorcycle pulling away changes its velocity over time.", "Motor yang mulai melaju mengalami perubahan kecepatan terhadap waktu."], "m s⁻²"], "force": [["Force", "Gaya"], [363, 550, 300, 165], ["Pushing a trolley applies a force. Its motion changes when the resultant force is nonzero.", "Mendorong troli memberikan gaya. Geraknya berubah jika resultan gayanya tidak nol."], "N = kg m s⁻²"], "work": [["Energy / work", "Energi / usaha"], [700, 551, 302, 168], ["Lifting a bag does work and increases the gravitational potential energy of the bag–Earth system.", "Mengangkat tas melakukan usaha dan menambah energi potensial gravitasi sistem tas–Bumi."], "J = kg m² s⁻²"], "power": [["Power", "Daya"], [29, 855, 300, 190], ["Lifting equal loads through the same height in less time requires greater average power.", "Mengangkat beban sama setinggi yang sama dalam waktu lebih singkat memerlukan daya rata-rata lebih besar."], "W = kg m² s⁻³"], "density": [["Density", "Massa jenis"], [371, 864, 294, 172], ["A block floats if its average density is lower than water; it sinks if its density is higher.", "Balok mengapung jika massa jenis rata-ratanya lebih kecil daripada air; balok tenggelam jika lebih besar."], "kg m⁻³"], "pressure": [["Pressure", "Tekanan"], [701, 862, 287, 180], ["Air inside a tyre exerts force on its inner surface. Pressure is normal force per unit area.", "Udara di dalam ban memberikan gaya pada permukaan dalamnya. Tekanan adalah gaya normal per satuan luas."], "Pa = kg m⁻¹ s⁻²"], "frequency": [["Frequency", "Frekuensi"], [27, 1193, 303, 169], ["A vibrating guitar string repeats its motion. Frequency counts the cycles each second.", "Senar gitar yang bergetar mengulangi gerakannya. Frekuensi menyatakan jumlah getaran tiap sekon."], "Hz = s⁻¹"], "charge": [["Electric charge", "Muatan listrik"], [371, 1200, 292, 169], ["During charging, current measures the charge passing through the wire per second. Charge and energy are different quantities.", "Saat pengisian baterai, arus menyatakan muatan yang melewati kawat tiap sekon. Muatan dan energi adalah besaran yang berbeda."], "C = A s"]};
function quantityVisual(){return "<section class=\"activity\"><h3>Explore quantities and dimensions</h3><p>Select a quantity to see an everyday example. Where a slider is available, move it to explore. Try explaining the dimension before revealing it.</p><div id=\"physics-dimensions-visual\" data-quantity-visual>\n  <div class=\"viz-controls\">\n    <label class=\"form-label\" for=\"quantity-choice\">Besaran\n      <select class=\"form-select\" id=\"quantity-choice\">\n        <option value=\"area\">Area</option><option value=\"volume\">Volume</option><option value=\"velocity\">Velocity</option><option value=\"acceleration\">Acceleration</option><option value=\"force\">Force</option><option value=\"work\">Energy / work</option><option value=\"power\">Power</option><option value=\"density\">Density</option><option value=\"pressure\">Pressure</option><option value=\"frequency\">Frequency</option><option value=\"charge\">Electric charge</option></select>\n    </label>\n  </div>\n  <figure class=\"quantity-art\"><div class=\"quantity-art-window\"><img id=\"quantity-art-image\" src=\"derived-quantities-real-life.png\" alt=\"\" width=\"1024\" height=\"1536\"></div><figcaption id=\"quantity-art-caption\"></figcaption><p id=\"quantity-art-unit\"></p></figure><div id=\"quantity-scene\" role=\"img\" aria-label=\"Ilustrasi besaran fisika\"></div>\n  <label class=\"form-label\" for=\"quantity-slider\" id=\"quantity-slider-label\">Panjang: 3 m</label>\n  <input class=\"form-range\" type=\"range\" id=\"quantity-slider\" min=\"1\" max=\"5\" value=\"3\" step=\"1\">\n  <div id=\"motorcycle-controls\" hidden><button type=\"button\" id=\"motorcycle-play\"></button> <button type=\"button\" id=\"motorcycle-reset\" class=\"secondary\"></button></div><div id=\"quantity-result\" class=\"viz-row tabular-nums\" aria-live=\"polite\"></div>\n<details class=\"answer-reveal\"><summary id=\"dimension-toggle\"></summary><div class=\"answer-body\"><p id=\"dimension-relation\"></p><div class=\"formula\" id=\"dimension-formula\"></div><p id=\"dimension-explanation\"></p></div></details></div></section>"}

function motorcycleState(time){return {constantPosition:4*time,constantVelocity:4,acceleratingPosition:time*time,acceleratingVelocity:2*time};}
function initializeQuantityVisual(){
if(window.stopQuantityAnimation)window.stopQuantityAnimation();
if(window.quantityVisualObserver)window.quantityVisualObserver.disconnect();
const root=document.getElementById('physics-dimensions-visual');if(!root){window.redrawQuantityVisual=null;return;}
const t=(en,id)=>typeof moduleLanguage!=='undefined'&&moduleLanguage==='id'?id:en;
const choice=root.querySelector('#quantity-choice'),slider=root.querySelector('#quantity-slider'),label=root.querySelector('#quantity-slider-label'),scene=root.querySelector('#quantity-scene'),result=root.querySelector('#quantity-result');
let animationFrame=null,playing=false;
const controls=root.querySelector('#motorcycle-controls'),play=root.querySelector('#motorcycle-play'),reset=root.querySelector('#motorcycle-reset');
function stop(){playing=false;if(animationFrame!==null)cancelAnimationFrame(animationFrame);animationFrame=null;result.setAttribute('aria-live','polite');}
window.stopQuantityAnimation=stop;
const ink='#163b3b',neutral='#cedcde',color='#147d88';
const text=(x,y,s,anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;
const line=(x,y,x2,y2,c=neutral)=>`<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="2"/>`;
const arrow=(x,y,x2,y2)=>line(x,y,x2,y2,color)+`<path d="M${x2-7},${y2-5} L${x2},${y2} L${x2-7},${y2+5}" fill="none" stroke="${color}" stroke-width="2"/>`;
const dot=(x,y,r=6)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
function draw(){
choice.querySelectorAll('option').forEach(o=>o.textContent=t(...quantityArtwork[o.value][0]));
const art=quantityArtwork[choice.value],crop=art[1],artImage=root.querySelector('#quantity-art-image');
root.querySelector('.quantity-art-window').style.aspectRatio=crop[2]+'/'+crop[3];
artImage.style.width=(1024/crop[2]*100)+'%';artImage.style.left=(-crop[0]/crop[2]*100)+'%';artImage.style.top=(-crop[1]/crop[3]*100)+'%';
artImage.alt=t(...art[2]);root.querySelector('#quantity-art-caption').textContent=t(...art[2]);root.querySelector('#quantity-art-unit').textContent=t('SI unit: ','Satuan SI: ')+art[3];
root.querySelector('label[for="quantity-choice"]').firstChild.textContent=t('Quantity','Besaran');
root.querySelector('#dimension-toggle').textContent=t('Show / hide dimension','Tampilkan / sembunyikan dimensi');
const relations={"volume":["Volume of a rectangular tank = length × width × height", "Volume tangki balok = panjang × lebar × tinggi", "[volume] = L × L × L = L³", "[volume] = L × L × L = L³", "Three lengths contribute three factors of L.", "Tiga ukuran panjang menyumbang tiga faktor L."],"force":["Resultant force = mass × acceleration", "Resultan gaya = massa × percepatan", "[force] = M × LT⁻² = MLT⁻²", "[gaya] = M × LT⁻² = MLT⁻²", "Use the resultant force when applying Newton’s second law to constant mass.", "Gunakan resultan gaya saat menerapkan hukum kedua Newton untuk massa tetap."],"power":["Average power = work ÷ elapsed time", "Daya rata-rata = usaha ÷ selang waktu", "[power] = ML²T⁻² / T = ML²T⁻³", "[daya] = ML²T⁻² / T = ML²T⁻³", "Power describes how quickly energy is transferred.", "Daya menyatakan seberapa cepat energi ditransfer."],"density":["Average density = mass ÷ volume", "Massa jenis rata-rata = massa ÷ volume", "[density] = M / L³ = ML⁻³", "[massa jenis] = M / L³ = ML⁻³", "Compare masses for equal volumes.", "Bandingkan massa pada volume yang sama."],"pressure":["Average pressure = normal force ÷ area", "Tekanan rata-rata = gaya normal ÷ luas", "[pressure] = MLT⁻² / L² = ML⁻¹T⁻²", "[tekanan] = MLT⁻² / L² = ML⁻¹T⁻²", "For the same normal force, a smaller contact area gives a larger average pressure.", "Untuk gaya normal yang sama, luas kontak yang lebih kecil menghasilkan tekanan rata-rata lebih besar."],"frequency":["Frequency = number of cycles ÷ elapsed time", "Frekuensi = jumlah getaran ÷ selang waktu", "[frequency] = 1 / T = T⁻¹", "[frekuensi] = 1 / T = T⁻¹", "Counting cycles is dimensionless. One hertz means one cycle per second.", "Jumlah getaran tidak berdimensi. Satu hertz berarti satu getaran per sekon."],
area:['Area = length × width','Luas = panjang × lebar','[area] = L × L = L²','[luas] = L × L = L²','Each length contributes one L. Changing the size changes the area value, but its dimension remains L².','Setiap panjang menyumbang satu L. Ukuran mengubah nilai luas, tetapi dimensinya tetap L².'],
velocity:['Average velocity = displacement ÷ elapsed time','Kecepatan rata-rata = perpindahan ÷ selang waktu','[velocity] = L / T = LT⁻¹','[kecepatan] = L / T = LT⁻¹','Here velocity is constant. T⁻¹ means divided by time, not negative time.','Di sini kecepatan tetap. T⁻¹ berarti dibagi waktu, bukan waktu negatif.'],
acceleration:['Average acceleration = change in velocity ÷ elapsed time','Percepatan rata-rata = perubahan kecepatan ÷ selang waktu','[acceleration] = (LT⁻¹) / T = LT⁻²','[percepatan] = (LT⁻¹) / T = LT⁻²','Both motorcycles start at the same position on straight roads. Motorcycle A has v = 4 m/s and a = 0. Motorcycle B starts from rest with a = 2 m/s², so v = 2t and displacement = t². Dots mark positions each second: equal spacing for A, increasing spacing for B.','Kedua motor mulai dari posisi yang sama di jalan lurus. Motor A memiliki v = 4 m/s dan a = 0. Motor B mulai dari diam dengan a = 2 m/s², sehingga v = 2t dan perpindahan = t². Titik menandai posisi tiap sekon: jaraknya tetap untuk A, makin besar untuk B.'],
work:['Work = force × displacement, for constant force along displacement','Usaha = gaya × perpindahan, untuk gaya konstan searah perpindahan','[work] = [force] L = (MLT⁻²)L = ML²T⁻²','[usaha] = [gaya] L = (MLT⁻²)L = ML²T⁻²','Force has dimension MLT⁻² from force = mass × acceleration. Work transfers energy, so both have the same dimension.','Dimensi gaya adalah MLT⁻² dari gaya = massa × percepatan. Usaha mentransfer energi, sehingga keduanya memiliki dimensi yang sama.'],
charge:['Charge = current × time, for constant current','Muatan = arus × waktu, untuk arus konstan','[charge] = A × T = AT','[muatan] = A × T = AT','A denotes the dimension of electric current here. The dots represent accumulated charge, not individual electrons.','A menyatakan dimensi arus listrik di sini. Titik mewakili muatan yang terkumpul, bukan elektron individual.']
};
const r=relations[choice.value];root.querySelector('#dimension-relation').textContent=t(r[0],r[1]);root.querySelector('#dimension-formula').textContent=t(r[2],r[3]);root.querySelector('#dimension-explanation').textContent=t(r[4],r[5]);

const hasSimulation=['area','velocity','acceleration','work','charge'].includes(choice.value);
scene.hidden=!hasSimulation;slider.hidden=!hasSimulation;label.hidden=!hasSimulation;result.hidden=!hasSimulation;
if(!hasSimulation){controls.hidden=true;scene.innerHTML='';result.textContent='';return;}
const width=Math.max(280,Math.floor(scene.getBoundingClientRect().width)),n=Number(slider.value),k=choice.value;
const left=32,right=width-32,span=right-left;
let marks='',title='',out='',height=250;
controls.hidden=k!=='acceleration';
play.textContent=playing?t('Pause','Jeda'):t('Play motion','Jalankan gerak');reset.textContent=t('Restart','Ulangi');
if(k==='area'){
 const unit=Math.min((width-86)/5,60),x=43,y=68;
 title=t("One-square-metre tiles","Petak persegi satu meter persegi");
 marks+=text(width/2,24,t("Each tile: 1 m\u00b2","Setiap petak: 1 m²"));
 for(let i=0;i<n;i++)for(let j=0;j<2;j++)marks+=`<rect x="${x+i*unit}" y="${y+j*unit}" width="${unit-2}" height="${unit-2}" fill="${color}" opacity="0.25"/>`;
 marks+=line(x,y-10,x+n*unit,y-10,ink)+text(x+n*unit/2,y-22,n+' m');
 marks+=text(x-9,y+unit,'2 m','end');
 label.textContent=t("Length: ","Panjang: ")+n+' m';out=t("Area: ","Luas: ")+(2*n)+t(" m\u00b2 \u00b7 Fixed width: 2 m"," m² · Lebar tetap: 2 m");
}else if(k==='velocity'){
 title=t("Straight-line motion at a constant two metres per second","Gerak lurus dengan kecepatan tetap dua meter per sekon");
 marks+=text(width/2,24,t("Straight-line motion \u00b7 2 m/s","Gerak lurus · 2 m/s"));
 marks+=line(left,150,right,150);
 for(let t=0;t<=5;t++){const x=left+span*t/5;marks+=line(x,145,x,155)+text(x,181,(2*t)+' m');if(t<=n)marks+=dot(x,125,t===n?9:4);}
 const x=left+span*n/5; marks+=text(width/2,65,t("Position at each 1 s interval","Posisi pada tiap selang 1 s"));if(x<right-15)marks+=arrow(x,95,Math.min(right,x+30),95);
 label.textContent=t("Time: ","Waktu: ")+n+' s';out=t("Displacement: ","Perpindahan: ")+(2*n)+t(" m \u00b7 Constant velocity: 2 m/s"," m · Kecepatan tetap: 2 m/s");
 }else if(k==='acceleration'){
 height=350;
 title=t('Two motorcycles: constant velocity and constant acceleration','Dua motor: kecepatan konstan dan percepatan konstan');
 const state=motorcycleState(n),roadLeft=26,roadRight=width-26,roadSpan=roadRight-roadLeft;
 const position=x=>roadLeft+roadSpan*x/25;
 for(let row=0;row<2;row++){
  const y=95+row*155,x=row?state.acceleratingPosition:state.constantPosition,v=row?state.acceleratingVelocity:state.constantVelocity;
  marks+=text(roadLeft,y-65,row?t('B · Constant acceleration','B · Percepatan konstan'):t('A · Constant velocity','A · Kecepatan konstan'),'start');
  marks+=text(roadLeft,y-42,row?'a = 2 m/s² · v₀ = 0':'a = 0 · v = 4 m/s','start');
  marks+=`<rect x="${roadLeft-15}" y="${y-17}" width="${roadSpan+30}" height="38" fill="#e1eaec"/>`;
  marks+=`<line x1="${roadLeft-15}" y1="${y+9}" x2="${roadRight+15}" y2="${y+9}" stroke="#788f93" stroke-width="2" stroke-dasharray="10 10"/>`;
  for(let second=0;second<=Math.floor(n);second++)marks+=`<circle cx="${position(row?second*second:4*second)}" cy="${y-4}" r="3" fill="${row?'#ba6526':color}"/>`;
  marks+=`<text class="motorcycle-icon" x="${position(x)}" y="${y+3}" text-anchor="middle" aria-hidden="true">🏍️</text>`;
  for(let m=0;m<=25;m+=5)marks+=line(position(m),y+23,position(m),y+29)+text(position(m),y+47,String(m));
  marks+=text(roadLeft,y+72,'x = '+x.toFixed(1)+' m','start')+text(roadRight,y+72,'v = '+v.toFixed(1)+' m/s','end');
 }
 marks+=text(width/2,345,t('Position (m) → · Dots: each 1 s','Posisi (m) → · Titik: tiap 1 s'));
 label.textContent=t('Shared time: ','Waktu bersama: ')+n.toFixed(1)+' s';
 out=t('A: equal distances each second. B: increasing distances each second.','A: jarak tiap sekon sama. B: jarak tiap sekon makin besar.');
}else if(k==='work'){
 title=t("A constant four-newton force moves an object along the force","Gaya konstan empat newton memindahkan benda searah gaya");
 marks+=text(width/2,24,t("Constant force \u00b7 along displacement","Gaya konstan · searah perpindahan"));
 const x=left+span*n/6,y=135;
 marks+=line(left,160,right,160);
 marks+=`<rect x="${x-13}" y="${y-13}" width="26" height="26" fill="${color}" opacity="0.4"/>`;
 marks+=arrow(x+16,y,x+53,y)+text(x,99,'4 N');
 marks+=line(left,195,x,195,ink)+text((left+x)/2,220,n+' m');
 marks+=line(left,150,left,170,ink);
 label.textContent=t("Displacement: ","Perpindahan: ")+n+' m';out=t("Work done by the force: ","Usaha oleh gaya: ")+4*n+t(" J \u00b7 Energy transferred to the object"," J · Energi ditransfer ke benda");
}else{
 title=t("Charge crossing a section with a constant two-ampere current","Muatan yang melintasi penampang dengan arus konstan dua ampere");
 marks+=text(width/2,24,t("Constant current \u00b7 2 A","Arus konstan · 2 A"));
 const gate=left+span*0.28;
 marks+=line(left,83,right,83)+line(left,153,right,153)+line(gate,65,gate,170,ink);
 marks+=text(gate,195,t("Cross-section","Penampang"));
 for(let i=0;i<2*n;i++){
 const col=i%5,row=Math.floor(i/5),x=gate+22+(span*0.60)*col/5,y=104+row*27;
 marks+=dot(x,y,7);
 }
 marks+=arrow(left,118,gate-10,118);
 marks+=text(width/2,230,t("1 dot represents 1 C, not 1 electron","1 titik mewakili 1 C, bukan 1 elektron"));
 label.textContent=t("Current duration: ","Lama arus mengalir: ")+n+' s';out=t("Charge passed: ","Muatan telah melintas: ")+2*n+' C';
}
scene.setAttribute('aria-label',title);scene.innerHTML=`<svg class="scene-svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img"><title>${title}</title>${marks}</svg>`;
result.textContent=out;
}
choice.addEventListener('change',()=>{stop();const motion=choice.value==='acceleration';slider.min=motion?'0':'1';slider.step=motion?'0.1':'1';slider.value=motion?'0':'3';root.querySelector('details').open=false;draw()});
slider.addEventListener('input',()=>{stop();draw()});
reset.addEventListener('click',()=>{stop();slider.value='0';draw()});
play.addEventListener('click',()=>{
 if(playing){stop();draw();return;}
 if(Number(slider.value)>=5)slider.value='0';
 const initial=Number(slider.value),start=performance.now();let last=-1;
 playing=true;result.setAttribute('aria-live','off');draw();
 function frame(now){
  if(!root.isConnected||choice.value!=='acceleration'){stop();return;}
  const value=Math.min(5,initial+(now-start)/1000),tick=Math.round(value*10);
  if(tick!==last){slider.value=(tick/10).toFixed(1);draw();last=tick;}
  if(value>=5){stop();draw();return;}
  animationFrame=requestAnimationFrame(frame);
 }
 animationFrame=requestAnimationFrame(frame);
});
window.redrawQuantityVisual=draw;window.quantityVisualObserver=new ResizeObserver(draw);window.quantityVisualObserver.observe(scene);draw();
}
