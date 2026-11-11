(function(){
  var d=document;
  // scroll reveal
  var els=d.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el,i){ el.style.transitionDelay=(el.closest('.hero')? i*90 : 0)+'ms'; io.observe(el); });
  } else { els.forEach(function(el){el.classList.add('in');}); }

  // nav + progress + to-top
  var nav=d.getElementById('nav'), bar=d.getElementById('progress'), top=d.getElementById('toTop');
  function onScroll(){
    var y=window.scrollY, h=d.documentElement.scrollHeight-window.innerHeight;
    nav.classList.toggle('scrolled', y>40);
    bar.style.width=(h>0? y/h*100:0)+'%';
    top.classList.toggle('show', y>600);
  }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  top.addEventListener('click',function(){ window.scrollTo({top:0,behavior:'smooth'}); });

  // rotating role text
  var words=['短剧内容运营','视频运营','内容包装','数据分析'], t=d.getElementById('typed'), wi=0, ci=words[0].length, del=true;
  if(t && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    (function tick(){
      var w=words[wi];
      if(del){ ci--; if(ci<=0){ del=false; wi=(wi+1)%words.length; } }
      else { ci++; if(ci>=words[wi].length){ del=true; t.textContent=words[wi]; return setTimeout(tick,2200);} }
      t.textContent=words[wi].slice(0,Math.max(ci,0));
      setTimeout(tick, del?70:140);
    })();
  }

  // copy email
  var c=d.getElementById('copy');
  if(c) c.addEventListener('click',function(){
    var e=c.getAttribute('data-email');
    function ok(){ c.textContent='已复制 ✓'; setTimeout(function(){c.textContent='复制邮箱';},1800); }
    if(navigator.clipboard){ navigator.clipboard.writeText(e).then(ok,function(){ prompt('邮箱：',e); }); }
    else { prompt('邮箱：',e); }
  });
  var y=d.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
})();
