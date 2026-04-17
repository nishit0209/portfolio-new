gsap.registerPlugin(ScrollTrigger);

// Cursor only for desktop (pointer fine)
if(window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const cur = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e=>{mx=e.clientX;my=e.clientY});
  (function animCur(){
    rx+=(mx-rx)*.1; ry+=(my-ry)*.1;
    if(cur) cur.style.left=mx+'px'; if(cur) cur.style.top=my+'px';
    if(ring) ring.style.left=rx+'px'; if(ring) ring.style.top=ry+'px';
    requestAnimationFrame(animCur);
  })();
} else {
  const curDiv = document.getElementById('cur'); if(curDiv) curDiv.style.display='none';
  const ringDiv = document.getElementById('cur-ring'); if(ringDiv) ringDiv.style.display='none';
}

// Scroll progress bar
const prog = document.getElementById('scroll-prog');
window.addEventListener('scroll',()=>{ 
  const p = window.scrollY/(document.body.scrollHeight-window.innerHeight); 
  prog.style.transform = `scaleX(${p})`; 
});

// Nav on scroll
const navbar = document.getElementById('navbar');
ScrollTrigger.create({ 
  start:80,
  onEnter:()=>navbar.classList.add('scrolled'), 
  onLeaveBack:()=>navbar.classList.remove('scrolled') 
});

// Mobile menu
let mobOpen=false;
function toggleMob(){ 
  mobOpen=!mobOpen; 
  document.getElementById('mob-menu').classList.toggle('open',mobOpen); 
  const h=document.getElementById('hamburger'); 
  const spans=h.querySelectorAll('span'); 
  if(mobOpen){ 
    gsap.to(spans[0],{rotate:45,y:6.5,duration:.3}); 
    gsap.to(spans[1],{opacity:0,duration:.2}); 
    gsap.to(spans[2],{rotate:-45,y:-6.5,duration:.3}); 
  }else{ 
    gsap.to(spans,{rotate:0,y:0,opacity:1,duration:.3}); 
  } 
}
function closeMob(){ if(mobOpen) toggleMob(); }

// Split name into chars for hero animation
function splitChars(el){ 
  const text=el.textContent; 
  el.innerHTML=''; 
  [...text].forEach(c=>{ 
    const s=document.createElement('span'); 
    s.className='char'; 
    s.textContent=c===' '?'\u00a0':c; 
    el.appendChild(s); 
  }); 
  return el.querySelectorAll('.char'); 
}

const chars1=splitChars(document.getElementById('hw1')); 
const chars2=splitChars(document.getElementById('hw2'));

// Hero timeline animation
const heroTl = gsap.timeline({delay:.2});
heroTl
  .from('#h-tag',{y:20,opacity:0,duration:.6})
  .from(chars1,{y:80,opacity:0,rotationX:-60,duration:.7,stagger:.05,ease:'back.out(1.6)'}, '-=.2')
  .from(chars2,{y:80,opacity:0,rotationX:-60,duration:.7,stagger:.05,ease:'back.out(1.6)'}, '-=.5')
  .from('#h-role',{y:20,opacity:0,duration:.6}, '-=.3')
  .from('#h-desc',{y:20,opacity:0,duration:.6}, '-=.4')
  .from('#h-btns',{y:20,opacity:0,duration:.6}, '-=.4')
  .from('#h-stats > div',{y:20,opacity:0,duration:.5,stagger:.1}, '-=.3')
  .from('#h-right',{x:60,opacity:0,duration:.9,ease:'power2.out'}, '-=.8');

// 3D avatar tilt on mouse (desktop only)
const scene = document.getElementById('avatar-scene'); 
const card = document.getElementById('avatar-card');
if(scene && card && window.matchMedia("(hover: hover) and (pointer: fine)").matches){
  document.addEventListener('mousemove', e=>{ 
    const r=scene.getBoundingClientRect(); 
    const cx=r.left+r.width/2, cy=r.top+r.height/2; 
    const dx=(e.clientX-cx)/r.width; 
    const dy=(e.clientY-cy)/r.height; 
    gsap.to(card,{rotateY:dx*18,rotateX:-dy*18,transformPerspective:800,duration:.5,ease:'power2.out'}); 
  });
  scene.addEventListener('mouseleave',()=>{ 
    gsap.to(card,{rotateY:0,rotateX:0,duration:.8,ease:'elastic.out(1,.4)'}); 
  });
}

// 3D scroll panels reveal
gsap.utils.toArray('.panel-3d').forEach(el=>{ 
  gsap.to(el,{opacity:1,rotateX:0,y:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}); 
});

// About cards stagger
gsap.to('.about-card',{opacity:1,x:0,duration:.7,stagger:.15,ease:'power2.out',scrollTrigger:{trigger:'.about-right',start:'top 80%',once:true}});

// Skills 3D card flip in
gsap.utils.toArray('.skill-group').forEach((el,i)=>{ 
  gsap.to(el,{opacity:1,y:0,duration:.8,delay:i*.12,ease:'power3.out',scrollTrigger:{trigger:'#skills',start:'top 75%',once:true}}); 
});

// Project cards cinematic reveal
gsap.utils.toArray('.proj-card').forEach((el,i)=>{ 
  gsap.to(el,{opacity:1,y:0,rotateX:0,duration:1,delay:i*.2,ease:'power3.out',scrollTrigger:{trigger:'#projects .proj-grid',start:'top 80%',once:true}}); 
});

// Contact reveal
gsap.to('.ci-card',{opacity:1,x:0,duration:.7,stagger:.12,ease:'power2.out',scrollTrigger:{trigger:'.contact-info',start:'top 80%',once:true}});
gsap.to('.contact-form',{opacity:1,x:0,duration:.9,ease:'power2.out',scrollTrigger:{trigger:'.contact-form',start:'top 80%',once:true}});

// Footer reveal
gsap.to('#footer',{opacity:1,duration:1,ease:'power2.out',scrollTrigger:{trigger:'#footer',start:'top 90%',once:true}});

// Parallax hero mesh
gsap.to('.mc1',{y:120,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:1}});
gsap.to('.mc2',{y:-80,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:1.5}});

// Formspree handling
const form = document.getElementById('fs-form');
const statusDiv = document.getElementById('form-status');
if(form){
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusDiv.style.color = '#8b5cf6';
    statusDiv.textContent = 'Sending...';
    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
      if(response.ok) {
        statusDiv.style.color = '#4ade80';
        statusDiv.textContent = '✓ Message sent successfully! I\'ll get back soon.';
        form.reset();
      } else {
        statusDiv.style.color = '#f87171';
        statusDiv.textContent = '❌ Oops! Something went wrong. Please try again.';
      }
    } catch(err) {
      statusDiv.style.color = '#f87171';
      statusDiv.textContent = '❌ Network error. Check your connection.';
    }
    setTimeout(()=>{ statusDiv.textContent = ''; }, 5000);
  });
}

// Smooth nav active highlight on scroll
const sections=['hero','about','skills','projects','contact'];
sections.forEach(id=>{ 
  ScrollTrigger.create({
    trigger:'#'+id,
    start:'top center',
    end:'bottom center',
    onToggle:({isActive})=>{
      document.querySelectorAll('.nav-links a').forEach(a=>{
        if(a.getAttribute('href')==='#'+id){
          a.style.color=isActive?'var(--white)':'';
        }
      });
    }
  }); 
});