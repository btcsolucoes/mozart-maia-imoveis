'use strict';
const serviceData={
 comprar:{index:'01 / 03',title:'O imóvel certo<br>para o seu momento.',description:'Conte o que você procura. Localização, rotina e planos para o futuro são o ponto de partida para uma busca com mais sentido.',points:['Escuta do seu perfil e das suas prioridades','Orientação sobre localização e valor','Acompanhamento da negociação'],cta:'Conversar sobre minha busca'},
 vender:{index:'02 / 03',title:'O seu imóvel.<br>O valor que ele merece.',description:'Uma venda começa com uma boa leitura do mercado. Converse sobre seu imóvel e construa um caminho de negociação alinhado aos seus objetivos.',points:['Análise das características do seu imóvel','Orientação para posicionamento de valor','Atendimento próximo durante a negociação'],cta:'Conversar sobre minha venda'},
 avaliar:{index:'03 / 03',title:'Clareza sobre o valor.<br>Segurança para decidir.',description:'A experiência em avaliação imobiliária ajuda a entender o valor de mercado com atenção às características do imóvel e ao contexto de cada demanda.',points:['Avaliação para diferentes finalidades','Pesquisa e análise de mercado','Atuação registrada no CNAI 5829'],cta:'Conversar sobre avaliação'}
};
const tabs=[...document.querySelectorAll('[data-tab]')];
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused=reduced.matches;
let currentIntent='comprar';
function setIntent(intent){const radio=document.querySelector(`input[name="objetivo"][value="${intent}"]`);if(radio)radio.checked=true;}
function chooseService(intent,updateUrl=true){
 if(!serviceData[intent])return;
 currentIntent=intent;const data=serviceData[intent];
 tabs.forEach(tab=>{const active=tab.dataset.tab===intent;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
 const panel=document.getElementById('service-panel');panel.setAttribute('aria-labelledby',`tab-${intent}`);
 document.querySelector('.service-index').textContent=data.index;
 document.getElementById('service-title').innerHTML=data.title;
 document.getElementById('service-description').textContent=data.description;
 document.getElementById('service-points').replaceChildren(...data.points.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
 const cta=document.getElementById('service-cta');cta.replaceChildren(document.createTextNode(data.cta+' '));const plus=document.createElement('span');plus.className='small-circle';plus.textContent='+';plus.setAttribute('aria-hidden','true');cta.append(plus);cta.dataset.contactIntent=intent;
 setIntent(intent);
 if(!motionPaused)panel.animate([{opacity:.35,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'cubic-bezier(.23,1,.32,1)'});
 if(updateUrl){const url=new URL(location.href);url.searchParams.set('objetivo',intent);history.replaceState(null,'',url);}
}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>chooseService(tab.dataset.tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(index+1)%tabs.length;if(e.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();tabs[next].focus();chooseService(tabs[next].dataset.tab);}});});
document.querySelectorAll('[data-intent]').forEach(a=>a.addEventListener('click',()=>chooseService(a.dataset.intent)));
document.addEventListener('click',e=>{const a=e.target.closest('[data-contact-intent]');if(a)setIntent(a.dataset.contactIntent);});
const initialIntent=new URL(location.href).searchParams.get('objetivo');if(serviceData[initialIntent])chooseService(initialIntent,false);
const header=document.querySelector('.site-header');const menuButton=document.querySelector('.menu-toggle');const menu=document.getElementById('mobile-nav');
function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');header.classList.remove('menu-open');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menu.hidden=open;menuButton.setAttribute('aria-expanded',String(!open));menuButton.setAttribute('aria-label',open?'Abrir menu':'Fechar menu');header.classList.toggle('menu-open',!open);});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){closeMenu();menuButton.focus();}});
window.matchMedia('(min-width: 801px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const hero=document.querySelector('.hero');const heroPhoto=document.querySelector('.hero-photo');let ticking=false;
function updateScroll(){const y=window.scrollY;header.classList.toggle('scrolled',y>70);if(!motionPaused&&y<hero.offsetHeight)heroPhoto.style.transform=`translate3d(0,${Math.min(y*.18,130)}px,0)`;ticking=false;}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true;}},{passive:true});updateScroll();
const motionToggle=document.getElementById('motion-toggle');
function updateMotion(){document.documentElement.classList.toggle('motion-off',motionPaused);motionToggle.setAttribute('aria-pressed',String(motionPaused));motionToggle.querySelector('.motion-label').textContent=motionPaused?'Ativar movimento':'Pausar movimento';motionToggle.firstElementChild.textContent=motionPaused?'▷':'Ⅱ';if(motionPaused){heroPhoto.style.transform='none';document.getAnimations().forEach(a=>{if(Number.isFinite(a.effect.getComputedTiming().endTime))a.finish();else a.cancel();});}}
motionToggle.addEventListener('click',()=>{motionPaused=!motionPaused;updateMotion();document.dispatchEvent(new Event('mozart:motionchange'));});reduced.addEventListener('change',e=>{motionPaused=e.matches;updateMotion();});updateMotion();
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){if(!motionPaused)entry.target.classList.add('entered');observer.unobserve(entry.target);}});},{threshold:.13});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const form=document.getElementById('contact-form');const nameInput=document.getElementById('nome');const nameError=document.getElementById('nome-error');
nameInput.addEventListener('input',()=>{nameInput.removeAttribute('aria-invalid');nameError.textContent='';});
form.addEventListener('submit',e=>{
 e.preventDefault();const name=nameInput.value.trim();if(!name){nameInput.setAttribute('aria-invalid','true');nameError.textContent='Digite seu nome para preparar a mensagem.';nameInput.focus();return;}
 const intent=new FormData(form).get('objetivo');const labels={comprar:'comprar um imóvel',vender:'vender meu imóvel',avaliar:'solicitar uma avaliação imobiliária',pericia:'conversar sobre perícia imobiliária'};
 const extra=document.getElementById('mensagem').value.trim();const message=`Olá, Mozart! Meu nome é ${name}. Gostaria de ${labels[intent]}.${extra?'\n\n'+extra:''}`;
 const url='https://wa.me/5581999712940?text='+encodeURIComponent(message);
 window.open(url,'_blank','noopener,noreferrer');
 const status=document.getElementById('form-status');status.textContent='Sua mensagem está pronta. Se o WhatsApp não abriu, ';const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.textContent='abra por este link';status.append(link,document.createTextNode('.'));
});
document.getElementById('year').textContent=new Date().getFullYear();

form.querySelector('button[type=submit]').disabled=false;
