/* ===== الإعدادات ===== 
 date: ميعاد الفرح (للعد التنازلي)
 map: لينك الخريطة
 wa: رقم واتساب لاستقبال تأكيدات الحضور بصيغة 20XXXXXXXXXX
*/

var C={date:"2026-12-03T16:30:00+02:00",map:"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent("قصر الأمير طاز"),wa:""};
var $=function(i){return document.getElementById(i)};
$('map').href=C.map;
function pet(){for(var i=0;i<9;i++){var p=document.createElement('i');p.className='pt';p.style.left=(5+i*11)+'%';p.style.animationDuration=(9+i%4*3)+'s';p.style.animationDelay=(i*1.3)+'s';document.body.appendChild(p)}}
var A=$('bg'),AS={on:false,acc:0,last:0},tm;
function loop(ts){if(!AS.on)return;if(!AS.last)AS.last=ts;AS.acc+=42*(ts-AS.last)/1000;AS.last=ts;if(AS.acc>=1){var s=Math.floor(AS.acc);AS.acc-=s;window.scrollBy(0,s)}if(innerHeight+scrollY>=document.documentElement.scrollHeight-2){setAS(false);return}requestAnimationFrame(loop)}
function setAS(v){AS.on=v;AS.last=0;$('as').textContent=v?'⏸':'▶';if(v)requestAnimationFrame(loop)}
['touchstart','wheel','mousedown','keydown'].forEach(function(n){addEventListener(n,function(e){if(e.target.closest&&e.target.closest('.ctl'))return;clearTimeout(tm);if(AS.on)setAS(false)},{passive:true})});
document.addEventListener('focusin',function(){if(AS.on)setAS(false)});
$('as').onclick=function(){clearTimeout(tm);if(!AS.on&&innerHeight+scrollY>=document.documentElement.scrollHeight-2)scrollTo(0,0);setAS(!AS.on)};
$('mu').onclick=function(){if(A.paused){A.play();this.classList.remove('off')}else{A.pause();this.classList.add('off')}};
$('gate').onclick=function(){var g=$('gate');if(g.classList.contains('open'))return;g.classList.add('open');$('main').classList.add('go');document.body.classList.remove('lock');pet();document.body.classList.add('on');A.volume=.55;A.play().catch(function(){});tm=setTimeout(function(){setAS(true)},5500);setTimeout(function(){g.style.display='none'},3200)};
function t(){var d=Math.max(0,new Date(C.date)-new Date()),v=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60];v.forEach(function(x,i){$('c'+i).textContent=x.toLocaleString('ar-EG')})}
t();setInterval(t,1000);
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.s,.tx').forEach(function(s,i){[].slice.call(s.children).forEach(function(c){c.classList.add('rv');io.observe(c)});
});
$('f').onsubmit=async function(e){e.preventDefault();var yes=document.querySelector('input[name=a]:checked').value=='yes',n=$('nm').value.trim(),m=$('ms').value.trim();
try{var db=await claude.use('db');if(db)await db.collection('rsvps').doc(Date.now()+'').set({name:n,attending:yes,message:m,at:Date.now()})}catch(x){}
$('ok').style.display='block';
if(C.wa){window.open('https://wa.me/'+C.wa+'?text='+encodeURIComponent((yes?'✅ سأحضر: ':'❌ أعتذر عن الحضور: ')+n+(m?'\n'+m:'')),'_blank')}};



  const form = document.getElementById('f');
  const okMsg = document.getElementById('ok');
  const submitBtn = form.querySelector('button[type="submit"]');

  // بنخفي رسالة النجاح في الأول عشان تظهر بس بعد الإرسال
  okMsg.style.display = 'none';

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    submitBtn.disabled = true;
    submitBtn.innerText = 'جاري الإرسال...';

    // بنضيف الـ name attributes ديناميكياً من غير ما نغير شكل الـ HTML بتاعك
    const formData = new FormData();
    formData.append('الاسم', document.getElementById('nm').value);
    
    const attendanceVal = form.querySelector('input[name="a"]:checked').value;
    formData.append('الحضور', attendanceVal === 'yes' ? 'سيحضر بكل سرور' : 'يعتذر عن الحضور');
    
    formData.append('الرسالة', document.getElementById('ms').value);
    
    // إعدادات FormSubmit
    formData.append('_subject', 'رد جديد على دعوة الفرح 💍');
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');

    try {
      // حطي إيميل العروسة هنا بدل HER_EMAIL@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/mayaromer10@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        okMsg.style.display = 'block';
        submitBtn.style.display = 'none';
      } else {
        alert('حصلت مشكلة أثناء الإرسال، جرب تاني.');
        submitBtn.disabled = false;
        submitBtn.innerText = 'إرسال';
      }
    } catch (error) {
      alert('تأكد من اتصالك بالإنترنت وحاول مرة أخرى.');
      submitBtn.disabled = false;
      submitBtn.innerText = 'إرسال';
    }
  });
