const header=document.getElementById("siteHeader");
const menu=document.getElementById("mobileMenu");
const mobileNav=document.getElementById("mobileNav");

window.addEventListener("scroll",()=>header.classList.toggle("scrolled",window.scrollY>35),{passive:true});

menu.addEventListener("click",()=>{
  const open=mobileNav.classList.toggle("open");
  menu.setAttribute("aria-expanded",open);
  menu.classList.toggle("active",open);
});
mobileNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  mobileNav.classList.remove("open");
  menu.setAttribute("aria-expanded","false");
  menu.classList.remove("active");
}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{
  glow.style.left=e.clientX+"px";
  glow.style.top=e.clientY+"px";
},{passive:true});

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",e=>{
    const target=document.querySelector(link.getAttribute("href"));
    if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});}
  });
});
document.getElementById("year").textContent=new Date().getFullYear();
