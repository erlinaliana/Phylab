function normalizeIndonesianAnswer(s){
 s=s.toLowerCase().replace(/tidak akurat/g,'not accurate').replace(/tak berdimensi|tidak berdimensi/g,'dimensionless');
 const words={ya:'yes',tidak:'no',turunan:'derived',pokok:'base',besaran:'quantity',presisi:'precise',akurat:'accurate',panjang:'length',satuan:'unit',nilai:'value',angka:'number',tiga:'three',sekon:'second',detik:'second',meter:'metre'};
 s=s.replace(/\b(ya|tidak|turunan|pokok|besaran|presisi|akurat|panjang|satuan|nilai|angka|tiga|sekon|detik|meter)\b/g,w=>words[w]);
 if(!s.includes('10^')&&!s.includes('10⁻')&&!s.includes('10³'))s=s.replace(/(\d),(\d)/g,'$1.$2');
 return s.replace(/quantity derived/g,'derived quantity').replace(/quantity base/g,'base quantity');
}
const studentWork=new Map();
function normalizeAnswer(s){return normalizeIndonesianAnswer(s).toLowerCase().replace(/[−–]/g,'-').replace(/[⁻]/g,'-').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g,c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).replace(/\^/g,'').replace(/×|·/g,'*').replace(/\bmetres?\b|\bmeters?\b/g,'m').replace(/\bseconds?\b/g,'s').replace(/\bkilograms?\b/g,'kg').replace(/\s+/g,' ').trim()}
// Each rule specifies a short, assessable response rather than grading an essay.
const answerRules=[
 [/The viscous drag F between two liquid layers/, "Enter dimension; base SI unit, using powers. Format example: L T^-1; m s^-1.",[/^(?:m[ *]*l-1[ *]*t-1|m\s*\/\s*\(?l[ *]*t\)?)\s*[,;]\s*(?:kg[ *]*m-1[ *]*s-1|kg\s*\/\s*\(?m[ *]*s\)?)$/]],
 [/What two things/, 'Name the two required parts.',[/number|numerical|value/,/unit/]],
 [/Name the SI base units/, 'List the three unit names or symbols in length, mass, time order.',[/^(m|metre|meter)[,; /]+(kg|kilogram)[,; /]+(s|second)$/]],
 [/Is area a base/, 'Write base or derived.',[/^derived(?: quantity)?$/]],
 [/What do kilo and milli/, 'Write the two powers of ten in that order, e.g. 10^a, 10^b.',[/^103\s*[,; /]\s*10-3$/]],
 [/Identify quantity, value and unit|Identify the physical quantity/, 'Include the quantity, value and unit.',[/length/,/3\.20/,/m|metre/]],
 [/What is the dimension of velocity/, 'Use M, L and T; ^ is optional.',[/^l\s*(?:t-1|\/\s*t)$/]],
 [/absolute uncertainty\?/, 'Enter the uncertainty with its unit.',[/^0\.2(?:0)?\s*cm$/]],
 [/close together but far/, 'Write precise and/or accurate; use “not accurate” where needed.',[/precise/,/not accurate|inaccurate/]],
 [/Can averaging/, 'Answer yes or no.',[/^no[.!]?$/]],
 [/scientific notation\.$/, 'Enter coefficient × 10^exponent.',[/^4\.5\s*\*?\s*10-3$/]],
 [/How many significant/, 'Enter the number of significant figures.',[/^(3|three)$/]],
 [/Are 1 ms and 1 Ms/, 'Answer yes or no.',[/^no[.!]?$/]],
 [/Convert 250 cm/, 'Enter the converted value and unit.',[/^2\.5(?:0)?\s*m$/]],
 [/Convert 125 cm/, 'Enter the converted value and unit.',[/^1\.25\s*m$/]],
 [/Convert 4.2 km/, 'Enter the converted value and unit.',[/^(4200|4 200|4\.2\s*\*\s*103)\s*m$/]],
 [/Convert 2.5 km/, 'Enter the converted value and unit.',[/^(2500|2 500|2\.5\s*\*\s*103)\s*m$/]],
 [/Convert 36 mm/, 'Enter the converted value and unit.',[/^(0\.036|3\.6\s*\*\s*10-2)\s*m$/]],
 [/Convert 750 mg/, 'Enter the converted value and unit.',[/^(0\.000750?|7\.50?\s*\*\s*10-4)\s*kg$/]],
 [/Convert 8.0 μs/, 'Enter the converted value and unit.',[/^(0\.0000080?|8(?:\.0)?\s*\*\s*10-6)\s*s$/]],
 [/Convert 2.4 GHz/, 'Enter the converted value and unit.',[/^(2400000000|2\.4\s*\*\s*109)\s*hz$/]],
 [/Convert 0.000024/, 'Enter the converted value and unit (μs or us).',[/^24\s*(μs|µs|us)$/]],
 [/Convert 25 cm²/, 'Enter the converted value and unit.',[/^(0\.0025|2\.5\s*\*\s*10-3)\s*m2$/]],
 [/Convert 60 cm²/, 'Enter the converted value and unit.',[/^(0\.006|6\s*\*\s*10-3)\s*m2$/]],
 [/Convert 2 cm³/, 'Enter the converted value and unit.',[/^(0\.000002|2\s*\*\s*10-6)\s*m3$/]],
 [/object extends from/, 'Enter length and unit.',[/^5\.5\s*cm$/]],
 [/percentage uncertainty.*A\.|Find the approximate percentage uncertainty in A/, 'Enter a percentage.',[/^10\s*%$/]],
 [/have uncertainties 1% and 2%/, 'Enter a percentage.',[/^4\s*%$/]],
 [/A length is.*50.0/, 'Enter a percentage.',[/^1(?:\.0)?\s*%$/]],
 [/fractional uncertainty in xy/, 'Enter a fraction or a percentage.',[/^(0\.03|3\s*%)$/]],
 [/Find the dimension.*volume/, 'Enter the dimension only.',[/^l3$/]],
 [/Find the dimension.*density/, 'Enter the dimension only.',[/^m\s*l-3$|^m\s*\/\s*l3$/]],
 [/Derive the dimension of acceleration/, 'Enter the final dimension only.',[/^l\s*t-2$|^l\s*\/\s*t2$/]],
 [/Find the dimension.*pressure/, 'Enter the dimension only.',[/^m\s*l-1\s*t-2$/]],
 [/Find the dimension.*power/, 'Enter the dimension only.',[/^m\s*l2\s*t-3$/]],
 [/Find the dimension.*charge/, 'Enter the dimension only, using A for current.',[/^a\s*t$/]],
 [/Find the dimension of force/, 'Enter the dimension only.',[/^m\s*l\s*t-2$/]],
 [/P = av.*Find \[b\]/, 'Enter the dimension only.',[/^m\s*t-1$/]],
 [/Is s = ut/, 'Answer yes or no.',[/^yes[.!]?$/]],
 [/energy = mass × velocity/, 'Answer yes or no.',[/^no[.!]?$/]],
 [/Frequency is the reciprocal/, 'Enter the dimension only.',[/^t-1$|^1\s*\/\s*t$/]],
 [/Strain = extension/, 'Enter the dimension, or the word dimensionless.',[/^(1|dimensionless)$/]],
 [/A student writes v =/, 'Answer yes or no.',[/^no[.!]?$/]],
 [/Does dimensional consistency prove/, 'Answer yes or no.',[/^no[.!]?$/]],
 [/Express 0.000000245/, 'Enter the wavelength in nm.',[/^245\s*nm$/]],
 [/Express 0.000458/, 'Enter the energy in J.',[/^(0\.458|4\.58\s*\*\s*10-1)\s*j$/]],
 [/Report 12.347/, 'Enter value ± uncertainty, with unit.',[/^\(?12\.3\s*(±|\+\/-)\s*0\.3\)?\s*cm$/]],
 [/Calculate 12.34/, 'Enter value and unit.',[/^13\.5\s*cm$/]],
 [/external diameter D =/, 'Enter thickness ± uncertainty, with unit.',[/^\(?0\.20?\s*(±|\+\/-)\s*0\.05\)?\s*cm$/]],
 [/D = \(2.40/, 'Enter thickness ± uncertainty, with unit.',[/^\(?0\.30?\s*(±|\+\/-)\s*0\.02\)?\s*cm$/]],
 [/Find x − y/, 'Enter value ± uncertainty, with unit.',[/^\(?5(?:\.0)?\s*(±|\+\/-)\s*0\.2\)?\s*cm$/]],
];
function evaluateStudentAnswer(value,rule){if(!value.trim())return 'empty';if(!rule)return 'review';return rule[2].every(re=>re.test(normalizeAnswer(value)))?'correct':'incorrect'}
function setupStudentAnswers(){document.querySelectorAll('article.quizitem,article.worked-example,#dimension-practice .quizitem').forEach((card,index)=>{const solution=card.querySelector('details.answer-reveal');if(!solution||card.querySelector('.student-response'))return;const title=card.querySelector('h3')?.textContent||'';const prompt=Array.from(card.children).filter(el=>el!==solution).map(el=>el.textContent).join(' ');const rule=answerRules.find(r=>r[0].test(prompt));const key=title+'|'+prompt;const saved=studentWork.get(key)||{value:'',status:''};const panel=document.createElement('div');panel.className='student-response';const id='student-response-'+index;const label=document.createElement('label');label.htmlFor=id;label.textContent='Your answer';const hint=document.createElement('p');hint.className='hint';hint.textContent=rule?rule[1]:'Write your explanation or working. This open response needs teacher review; it will not be automatically marked wrong.';const field=document.createElement('textarea');field.id=id;field.rows=rule?2:3;field.value=saved.value;field.placeholder=rule?'Type your answer here…':'Explain your reasoning…';const button=document.createElement('button');button.type='button';button.textContent=rule?'Check answer':'Check response';const message=document.createElement('p');message.className='feedback';message.setAttribute('role','status');function report(status){message.className='feedback'+(status==='correct'?' correct':'');message.textContent={empty:'Enter an answer first.',correct:'✓ Correct. Open Show answer to see the working.',incorrect:'Not correct yet. Check the requested format and units, then try again. Click Show answer when you want the solution.',review:'Response saved for teacher review. Click Show answer to compare your reasoning.'}[status]||'';}report(saved.status);field.addEventListener('input',()=>{studentWork.set(key,{value:field.value,status:''});report('');solution.open=false});button.addEventListener('click',()=>{solution.open=false;const status=evaluateStudentAnswer(field.value,rule);studentWork.set(key,{value:field.value,status});report(status)});panel.append(label,hint,field,button,message);card.insertBefore(panel,solution)});}
