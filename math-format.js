/* Shared, offline LaTeX rendering. Original lesson text remains available for language switching. */
'use strict';
(function(){
const supers='⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿᵗᵐ', supValues='0123456789-+ntm';
const subs={'ₜ':'t','ᵥ':'v','₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','ₓ':'x','ᵧ':'y','ₙ':'n','ᵢ':'i'};
const greek={'Δ':'\\Delta','θ':'\\theta','β':'\\beta','α':'\\alpha','η':'\\eta','ρ':'\\rho','λ':'\\lambda','μ':'\\mu','π':'\\pi','τ':'\\tau','ω':'\\omega','γ':'\\gamma','Σ':'\\sum','∫':'\\int','∞':'\\infty','Θ':'\\Theta'};
const exact={
'd(xⁿ)/dx = nxⁿ⁻¹':'\\frac{d(x^n)}{dx}=nx^{n-1}',
'(fg)′ = f′g + fg′; (f/g)′ = (f′g − fg′)/g²':"(fg)'=f'g+fg';\\quad \\left(\\frac f g\\right)'=\\frac{f'g-fg'}{g^2}",
'v = dx/dt; a = d²x/dt²':'v=\\frac{dx}{dt};\\quad a=\\frac{d^2x}{dt^2}',
'∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C':'\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C',
'Δx = ∫ v(t) dt':'\\Delta x=\\int_{t_1}^{t_2}v(t)\\,dt',
'W = ∫ F(x) dx':'W=\\int_{x_1}^{x_2}F(x)\\,dx',
'∫ u dv = uv − ∫ v du':'\\int u\\,dv=uv-\\int v\\,du',
'Sₙ = a(1 − rⁿ)/(1 − r); S∞ = a/(1 − r)':'S_n=\\frac{a(1-r^n)}{1-r};\\quad S_{\\infty}=\\frac a{1-r}',
'1/(1 − x) = 1 + x + x² + …; |x| < 1':'\\frac1{1-x}=1+x+x^2+\\cdots;\\quad |x|<1',
'f(x) ≈ f(c) + f′(c)(x − c) + f″(c)(x − c)²/2':"f(x)\\approx f(c)+f'(c)(x-c)+\\frac{f''(c)(x-c)^2}{2}"
};
function toTex(raw){
 if(exact[raw.trim()])return exact[raw.trim()];
 let s=raw.trim().replace(/[{}]/g,'').replace(/e⁰·⁰²/g,'e^{0.02}').replace(/e⁻λᵗ/g,'e^{−λt}');
 s=s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿᵗᵐ]+/g,x=>'^{'+[...x].map(c=>supValues[supers.indexOf(c)]).join('')+'}');
 s=s.replace(/[ₜᵥ₀₁₂₃₄₅₆₇₈₉ₓᵧₙᵢ]+/g,x=>'_{'+[...x].map(c=>subs[c]).join('')+'}');
 s=s.replace(/\^([−-]?\d+|[a-z])/gi,'^{$1}').replace(/[−–]/g,'-');
 s=s.replace(/√\(([^()]*)\)/g,'\\sqrt{$1}').replace(/√([\d.]+|[A-Za-z](?:_\{[^}]*\}|\^\{[^}]*\})?)/g,'\\sqrt{$1}');
 s=s.replace(/[ΔθβαηρλμπτωγΣ∫∞Θ]/g,c=>greek[c]+' ');
 s=s.replace(/×/g,'\\times ').replace(/÷/g,'\\div ').replace(/·/g,'\\cdot ').replace(/±/g,'\\pm ').replace(/≈/g,'\\approx ').replace(/≠/g,'\\ne ').replace(/≤/g,'\\le ').replace(/≥/g,'\\ge ').replace(/→/g,'\\to ').replace(/…/g,'\\cdots ').replace(/′/g,"'").replace(/″/g,"''").replace(/°/g,'^{\\circ}').replace(/%/g,'\\%').replace(/½/g,'\\frac{1}{2}').replace(/⅓/g,'\\frac{1}{3}').replace(/¼/g,'\\frac{1}{4}');
 s=s.replace(/\b(sin|cos|tan|sec|csc|cot|ln|log|arctan|arccos|atan2)\b/g,'\\$1 ');
 s=s.replace(/\b(length|width|mass|acceleration|force|displacement|distance|time|volume|current|panjang|lebar|massa|percepatan|gaya|perpindahan|jarak|waktu|arus|luas|usaha|kelajuan|kecepatan|energi|daya|muatan)\b/g,'\\text{$1}');
 s=s.replace(/\b([AR])([xy])\b/g,'$1_{$2}');
 s=s.replace(/\bcosec\b/g,'\\csc ');
 s=s.replace(/\b(kg|cm|mm|km|nm|Hz|Pa|atm|rad|mol|cd|J|N|W|C|V)\b/g,'\\mathrm{$1}');
 // Stacked fractions for uncomplicated symbolic quotients; larger quotients are explicit in the formula map.
 s=s.replace(/(?<![\\\w}])([A-Za-z](?:_\{[^}]*\}|\^\{[^}]*\})?|\d+(?:\.\d+)?|\([^()]+\))\s*\/\s*([A-Za-z](?:_\{[^}]*\}|\^\{[^}]*\})?|\d+(?:\.\d+)?|\([^()]+\))/g,'\\frac{$1}{$2}');
 return s;
}
const word='(?:(?:sin|cos|tan|sec|cosec|csc|cot|ln|log|arctan|arccos|atan2|kg|cm|mm|km|nm|Hz|Pa|atm|rad|mol|cd|dx|dt|dv|du|df|ds|AB|ML|MT|MLT|It|ma|av|bv|Ca|nx|fg|ut|at|uv|Au|Fx|rv|xy|as|kA|np|dv|dt|ds|dx|Ba|dyn|mg|Ms|ms|jam|ℓ|½|⅓|¼|area|breadth|work|elapsed time|change in velocity|normal force|contact area|period|periode|selang waktu|bacaan akhir|bacaan awal|skala utama|skala terkecil|perpindahan|berat|tinggi|tekanan|massa jenis|rata-rata|[Aa]verage density|[Aa]verage pressure|[Cc]harge transferred|[Ee]lectric potential|[Ll]ength|[Ll]uas|[Pp]anjang|[Mm]assa jenis|[Pp]ercentage|[Pp]ersentase|[Pp]eriode|[Pp]eriod|[Hh]asil|[Pp]ercepat an|[Hh]eight|[Ss]peed|[Ff]requency|[Ff]rekuensi|[Vv]olume|[Bb]acaan|[Rr]eading|[Rr]esolusi|[Rr]esolution|[Kk]elajuan|[Kk]ecepatan rata-rata|[Dd]aya rata-rata|velocity|power|charge|energy|height|[Aa]rea|[Pp]ower|[Cc]harge|[Mm]uatan|[Dd]aya|[Aa]verage velocity|[Aa]verage acceleration|[Ff]ractional uncertainty|[Pp]ercentage uncertainty|[Kk]etidakpastian relatif|[Kk]etidakpastian persentase|[Kk]ecepatan rata-rata|length|width|mass|acceleration|force|displacement|distance|time|volume|current|panjang|lebar|massa|percepatan|gaya|perpindahan|jarak|waktu|arus|luas|usaha|kelajuan|kecepatan|energi|daya|muatan|[A-Z]{1,3}|[A-Za-z])(?![A-Za-z])|[½⅓¼ΔθβαηρλμπτωγΣ∫∞Θ])';
const atom='(?:'+word+'(?:[ₜᵥ₀₁₂₃₄₅₆₇₈₉ₓᵧₙᵢ⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿᵗᵐ′″]+|_[A-Za-z0-9]+|\\^[−-]?\\d+)?|[−-]?\\d+(?:[.,]\\d+)?(?:[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+)?|[√])';
const pattern=new RegExp('(?<![\\w])(?:[([|√∫Σ]+[ \\t]*)?'+atom+'(?:[ \\t]*(?:[=+−×÷/·±≈≠≤≥<>→^°%()|\\[\\]∫Σ-]|'+atom+'))*','g');
function mathMLTex(el){
 const tag=el.localName, kids=[...el.children].map(mathMLTex), txt=el.textContent.trim();
 if(tag==='mfrac')return `\\frac{${kids[0]}}{${kids[1]}}`;
 if(tag==='msup')return `{${kids[0]}}^{${kids[1]}}`;
 if(tag==='msub')return `{${kids[0]}}_{${kids[1]}}`;
 if(tag==='msubsup')return `{${kids[0]}}_{${kids[1]}}^{${kids[2]}}`;
 if(tag==='msqrt')return `\\sqrt{${kids.join(' ')}}`;
 if(tag==='mover')return `\\overline{${kids[0]}}`;
 if(tag==='munderover')return `${kids[0]}_{${kids[1]}}^{${kids[2]}}`;
 if(tag==='mtext')return '\\text{'+txt.replace(/[{}]/g,'')+'}';
 return kids.length?kids.join(' '):toTex(txt);
}
function renderToken(tex,display=false){const span=document.createElement('span');span.className='math-inline';span.dataset.latex=tex;katex.render(tex,span,{displayMode:display,throwOnError:false,strict:'ignore',trust:false});return span;}
function formatElement(el){
 const text=el.textContent;el.dataset.mathShown=text;
 const frag=document.createDocumentFragment();let cursor=0;
 const isFormula=el.dataset.mathDisplay==='true' && !/[a-z]{5}/i.test(text.replace(/sin|cos|cosec|arctan|arccos|acceleration|displacement/g,''));
 if(exact[text.trim()]||isFormula){frag.append(renderToken(toTex(text),true));el.replaceChildren(frag);return;}
 for(const m of text.matchAll(pattern)){
 let value=m[0].trimEnd();
 // A run must contain a real relation, operation, power, dimension or numerical unit.
 if(!/[=×÷/±≈≠≤≥∫Σ√⁰¹²³⁴⁵⁶⁷⁸⁹ₜᵥ₀₁₂₃₄₅₆₇₈₉ₓᵧₙᵢ^]/.test(value)&&!(/\d/.test(value)&&/\b(?:kg|m|s|cm|mm|km|N|J|Pa|W|C|rad)\b/.test(value)))continue;
 if(value.length<2||/[=+×÷/±≈-]$/.test(value))continue;
 // Do not absorb sentence punctuation or a trailing parenthesis belonging to prose.
 while(value.endsWith(')')&&[...value].filter(c=>c===')').length>[...value].filter(c=>c==='(').length)value=value.slice(0,-1).trimEnd();
 frag.append(document.createTextNode(text.slice(cursor,m.index)));frag.append(renderToken(toTex(value)));cursor=m.index+value.length;
 }
 if(cursor){frag.append(document.createTextNode(text.slice(cursor)));el.replaceChildren(frag);}
}
function scan(root=document.body){
 if(!window.katex)return;
 root.querySelectorAll('[data-tex]:not([data-rendered])').forEach(el=>{katex.render(el.dataset.tex,el,{displayMode:el.dataset.display==='block',throwOnError:false,strict:'ignore'});el.dataset.rendered='true'});
 root.querySelectorAll('p,li,td,th,h3,h4,.formula').forEach(el=>{if(!el.children.length||el.closest('[data-math-source],.katex')||!/[=√∫]/.test(el.textContent)||[...el.querySelectorAll('*')].some(c=>!['STRONG','EM','B','I','SUP','SUB','SPAN'].includes(c.tagName)))return;const walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),parts=[];let n;while(n=walk.nextNode()){const txt=n.nodeValue;parts.push({source:typeof originalText!=='undefined'?(originalText.get(n)?.source||txt):txt,shown:txt})}const span=document.createElement('span');span.className='math-source';span.dataset.mathSource=parts.map(p=>p.source).join('');span.dataset.mathSegments=JSON.stringify(parts.map(p=>p.source));span.dataset.mathDisplay=String(el.matches('.formula'));span.textContent=parts.map(p=>p.shown).join('');formatElement(span);if(span.querySelector('.katex'))el.replaceChildren(span)});
 root.querySelectorAll('math:not(.katex math)').forEach(el=>{if(el.closest('.katex'))return;const span=renderToken(mathMLTex(el),el.getAttribute('display')==='block');el.replaceWith(span)});
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT), nodes=[];let n;
 while(n=walker.nextNode())if(n.nodeValue.trim()&&!n.parentElement?.closest('script,style,textarea,input,select,svg,canvas,.katex,[data-math-source],[data-latex],[data-tex]'))nodes.push(n);
 nodes.forEach(node=>{pattern.lastIndex=0;const txt=node.nodeValue;if(!/[=×÷/±≈≠≤≥∫Σ√⁰¹²³⁴⁵⁶⁷⁸⁹ₜᵥ₀₁₂₃₄₅₆₇₈₉ₓᵧₙᵢ^]/.test(txt)&&!(/\d/.test(txt)&&/\b(?:kg|m|s|cm|mm|km|N|J|Pa|W|C|rad)\b/.test(txt)))return;
 const span=document.createElement('span');span.className='math-source';span.dataset.mathSource=typeof originalText!=='undefined'?(originalText.get(node)?.source||txt):txt;span.dataset.mathDisplay=String(!!node.parentElement?.matches('.formula,.math-line'));span.textContent=txt;formatElement(span);if(span.querySelector('.katex'))node.replaceWith(span);
 });
}
window.physicsToLatex=toTex;window.formatMathElement=formatElement;window.renderPhysicsMath=scan;
function start(){scan();let scheduled=false;const observer=new MutationObserver(records=>{if(records.every(r=>r.target.nodeType===1&&r.target.closest('[data-math-source],.katex,[data-latex]')))return;if(!scheduled){scheduled=true;queueMicrotask(()=>{scheduled=false;observer.disconnect();scan();observer.observe(document.body,{childList:true,subtree:true,characterData:true})})}});observer.observe(document.body,{childList:true,subtree:true,characterData:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
