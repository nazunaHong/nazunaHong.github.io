/* ============================================
   个人主页交互脚本 — 纯原生 JS，无依赖
   ============================================ */
(function () {
  'use strict';

  /* ---------- 移动端导航 ---------- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', '打开导航菜单');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- 滚动时给 header 加边框 ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 入场动画 ---------- */
  /* 重要：滚动入场元素默认隐藏，但必须保证任何情况下都不会永久不可见。
     这里用「已在视口内立即显示 + 观察器 + 兜底定时器」三重保险。 */
  var revealTargets = document.querySelectorAll(
    '.section-tag, .section-title, .section-sub, .about-text, .about-card, .project, .skill-col, .contact-card'
  );

  function show(el) { el.classList.add('in'); }

  revealTargets.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = Math.min(i % 6, 5) * 60 + 'ms';
    // 已经在视口内的元素直接显示，不等观察器回调
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      show(el);
    }
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          show(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(function (el) {
      if (!el.classList.contains('in')) io.observe(el);
    });
  }

  // 兜底：3 秒后仍未显示的元素强制显示，避免任何情况下出现空白区块
  setTimeout(function () {
    revealTargets.forEach(function (el) {
      if (!el.classList.contains('in')) show(el);
    });
  }, 3000);

  /* ---------- 页脚年份 ---------- */
  var year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  /* ---------- 视差光晕（仅桌面、且用户未开启减弱动效） ---------- */
  var heroBg = document.querySelector('.hero-bg');
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroBg && !reduceMotion && window.matchMedia('(min-width: 900px)').matches) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < 900) {
          heroBg.style.transform = 'translate3d(0,' + (y * 0.18) + 'px,0)';
        }
        ticking = false;
      });
    }, { passive: true });
  }
})();
