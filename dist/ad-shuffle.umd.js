(function(a){typeof define=="function"&&define.amd?define(a):a()})(function(){"use strict";var a="";document.addEventListener("DOMContentLoaded",()=>{const A=document.querySelectorAll(".rb-ads"),s=new Date;A.forEach(r=>{const d=r.querySelectorAll(".rb-random-ads"),o=[];let c=0;const b=r.getAttribute("data-auto-rotate")==="true",l=parseInt(r.getAttribute("data-interval")||"0",10)*1e3;if(d.forEach(t=>{const e=t.getAttribute("data-start-date")?new Date(t.getAttribute("data-start-date")):null,n=t.getAttribute("data-end-date")?new Date(t.getAttribute("data-end-date")):null;if(e&&s<e||n&&s>n)return;const i=parseInt(t.getAttribute("data-frequency"))||1;c+=i;for(let f=0;f<i;f++)o.push(t)}),o.length===0)return;const u=()=>{const t=Math.floor(Math.random()*c),e=o[t];d.forEach(n=>{n.style.display="none"}),e.style.display="block"};u(),b&&l>0&&setInterval(u,l)})})});
