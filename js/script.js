/* ===== الإعدادات ===== 
 date: ميعاد الفرح (للعد التنازلي)
 map: لينك الخريطة
 wa: رقم واتساب لاستقبال تأكيدات الحضور بصيغة 20XXXXXXXXXX (اختياري)
*/
var C = {
  date: "2026-12-03T16:30:00+02:00",
  map: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("قصر الأمير طاز"),
  wa: ""
};

var $ = function (i) { return document.getElementById(i); };
if ($('map')) $('map').href = C.map;

// إنشاء بتلات الورد أو عناصر الخلفية
function pet() {
  for (var i = 0; i < 9; i++) {
    var p = document.createElement('i');
    p.className = 'pt';
    p.style.left = (5 + i * 11) + '%';
    p.style.animationDuration = (9 + (i % 4) * 3) + 's';
    p.style.animationDelay = (i * 1.3) + 's';
    document.body.appendChild(p);
  }
}

// التمرير التلقائي والموسيقى والبوابة
var A = $('bg'), AS = { on: false, acc: 0, last: 0 }, tm;

function loop(ts) {
  if (!AS.on) return;
  if (!AS.last) AS.last = ts;
  AS.acc += 42 * (ts - AS.last) / 1000;
  AS.last = ts;
  if (AS.acc >= 1) {
    var s = Math.floor(AS.acc);
    AS.acc -= s;
    window.scrollBy(0, s);
  }
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) {
    setAS(false);
    return;
  }
  requestAnimationFrame(loop);
}

function setAS(v) {
  AS.on = v;
  AS.last = 0;
  if ($('as')) $('as').textContent = v ? '⏸' : '▶';
  if (v) requestAnimationFrame(loop);
}

['touchstart', 'wheel', 'mousedown', 'keydown'].forEach(function (n) {
  addEventListener(n, function (e) {
    if (e.target.closest && e.target.closest('.ctl')) return;
    clearTimeout(tm);
    if (AS.on) setAS(false);
  }, { passive: true });
});

document.addEventListener('focusin', function () {
  if (AS.on) setAS(false);
});

if ($('as')) {
  $('as').onclick = function () {
    clearTimeout(tm);
    if (!AS.on && innerHeight + scrollY >= document.documentElement.scrollHeight - 2) scrollTo(0, 0);
    setAS(!AS.on);
  };
}

if ($('mu')) {
  $('mu').onclick = function () {
    if (!A) return;
    if (A.paused) {
      A.play();
      this.classList.remove('off');
    } else {
      A.pause();
      this.classList.add('off');
    }
  };
}

if ($('gate')) {
  $('gate').onclick = function () {
    var g = $('gate');
    if (g.classList.contains('open')) return;
    g.classList.add('open');
    if ($('main')) $('main').classList.add('go');
    document.body.classList.remove('lock');
    pet();
    document.body.classList.add('on');
    if (A) {
      A.volume = 0.55;
      A.play().catch(function () {});
    }
    tm = setTimeout(function () { setAS(true); }, 5500);
    setTimeout(function () { g.style.display = 'none'; }, 3200);
  };
}

// العداد التنازلي
function t() {
  var d = Math.max(0, new Date(C.date) - new Date());
  var v = [
    Math.floor(d / 864e5),
    Math.floor(d / 36e5) % 24,
    Math.floor(d / 6e4) % 60,
    Math.floor(d / 1e3) % 60
  ];
  v.forEach(function (x, i) {
    var el = $('c' + i);
    if (el) el.textContent = x.toLocaleString('ar-EG');
  });
}
t();
setInterval(t, 1000);

// ظهور العناصر عند التمرير
var io = new IntersectionObserver(function (es) {
  es.forEach(function (e) {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.s,.tx').forEach(function (s) {
  [].slice.call(s.children).forEach(function (c) {
    c.classList.add('rv');
    io.observe(c);
  });
});

// إرسال نموذج تأكيد الحضور (RSVP) مع تأثير الفرقعة (Fireworks)
const form = document.getElementById('f');
const okMsg = document.getElementById('ok');

if (okMsg) okMsg.style.display = 'none';

if (form) {
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameVal = document.getElementById('nm') ? document.getElementById('nm').value.trim() : '';
    const msgVal = document.getElementById('ms') ? document.getElementById('ms').value.trim() : '';
    const checkedRadio = form.querySelector('input[name="a"]:checked');
    const isAttending = checkedRadio ? checkedRadio.value === 'yes' : true;
    const attendanceText = isAttending ? 'سيحضر بكل سرور' : 'يعتذر عن الحضور';

    // 1. تفعيل تأثير الفرقعة (Fireworks / Confetti) فوراً للضيف
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      
      // فرقعة تانية سريعة بعدها بثواني عشان الشكل يكون أحلى
      setTimeout(function() {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
      }, 400);
      
      setTimeout(function() {
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 800);
    }

    // 2. إخفاء الزرار، عرض رسالة الشكر، وتصفير الفورم
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.display = 'none';
    }
    if (okMsg) okMsg.style.display = 'block';
    form.reset();

    // 3. إرسال البيانات في الخلفية إلى FormSubmit
    const formData = new FormData();
    formData.append('الاسم', nameVal);
    formData.append('الحضور', attendanceText);
    formData.append('الرسالة', msgVal);
    formData.append('_subject', 'رد جديد على دعوة الفرح 💍');
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');

    fetch('https://formsubmit.co/ajax/salmaelgammal307@gmail.com', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).catch(function (err) {
      console.log('Background send error:', err);
    });

    // 4. فتح واتساب إذا تم وضع رقم في الإعدادات
    if (C.wa) {
      const waText = (isAttending ? '✅ سأحضر: ' : '❌ أعتذر عن الحضور: ') + nameVal + (msgVal ? '\n' + msgVal : '');
      window.open('https://wa.me/' + C.wa + '?text=' + encodeURIComponent(waText), '_blank');
    }
  });
}