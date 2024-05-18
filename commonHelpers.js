import{a as g,i as u,S as m}from"./assets/vendor-6e0bf343.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const p of a.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const y="https://pixabay.com/api/",L="43800208-301c21487611dae4b6f535cf2",h=async(s="pug",e=1)=>{const o=new URLSearchParams({key:L,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}),i=await g.get(`${y}?${o}`);try{return i.data}catch(t){throw new Error(t.response.statusText)}},f=s=>s.map(e=>`
<li class='gallery-item'>
<a class='gallery-item-link' href='${e.largeImageURL}'>
    <img
    src='${e.webformatURL}'
    alt='${e.tags}'>
</a>
<div class='stats'>
<span>
<p class='stat-name'>Likes</p>
<p class='stat-value'>${e.likes}</p>
</span>
<span>
<p class='stat-name'>Views</p>
<p class='stat-value'>${e.views}</p>
</span>
<span>
<p class='stat-name'>Comments</p>
<p class='stat-value'>${e.comments}</p>
</span>
<span>
<p class='stat-name'>Downloads</p>
<p class='stat-value'>${e.downloads}</p>
</span>
</div>
</li>
`).join(""),n=document.querySelector(".gallery"),b=document.querySelector(".search-form"),l=document.querySelector(".loader"),d=document.querySelector(".load-more-btn");let c="",r=1;async function w(s){if(s.preventDefault(),c=s.target.elements.searchQuery.value.trim(),c===""){n.innerHTML="",s.target.reset(),u.warning({position:"topRight",transitionIn:"bounceInLeft",message:"input field cannot be empty",messageSize:16,timeout:3e3});return}n.innerHTML="",r=1,d.classList.add("is-hidden"),l.classList.remove("is-hidden");try{const e=await h(c,r);e.total===0?(s.target.reset(),u.error({position:"topRight",transitionIn:"bounceInLeft",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:16,timeout:3e3})):(n.innerHTML=f(e.hits),new m(".gallery a",{captionsData:"alt",captionDelay:250}).refresh(),e.totalHits>r*15&&d.classList.remove("is-hidden"))}catch(e){console.log(e)}finally{s.target.reset(),l.classList.add("is-hidden")}}async function S(){r+=1,l.classList.remove("is-hidden");try{const s=n.firstElementChild.getBoundingClientRect().height,e=await h(c,r);n.insertAdjacentHTML("beforeend",f(e.hits)),new m(".gallery a",{captionsData:"alt",captionDelay:250}).refresh(),window.scrollBy({top:s*2,behavior:"smooth"}),e.totalHits<=r*15&&(d.classList.add("is-hidden"),u.info({position:"topRight",transitionIn:"bounceInLeft",message:"We're sorry, but you've reached the end of search results.",messageSize:16,timeout:3e3}))}catch(s){console.log(s)}finally{l.classList.add("is-hidden")}}b.addEventListener("submit",w);d.addEventListener("click",S);
//# sourceMappingURL=commonHelpers.js.map
