/*
 * The page's motion, played by GSAP (public/vendor/gsap, copied from node_modules by
 * scripts/vendor.mjs). The page reads in full without it: nothing is hidden by CSS except
 * the hero intro, and only while <html> has the "hareket" class, which the inline script in
 * nuxt.config.ts adds when motion is allowed and removes if GSAP does not arrive.
 * Under prefers-reduced-motion nothing here runs.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  window.seansHareket = true;

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  var SplitText = window.SplitText;
  if (!gsap || !ScrollTrigger || !SplitText) {
    root.classList.remove('hareket');
    return;
  }
  gsap.registerPlugin(ScrollTrigger, SplitText);

  var $ = function (selector, scope) {
    return (scope || document).querySelector(selector);
  };
  var $$ = function (selector, scope) {
    return gsap.utils.toArray(selector, scope);
  };

  // SplitText measures lines, so it waits for Nunito: split with the fallback font, the
  // headline would show four lines on a first visit until the font arrives. At most 1.5 s;
  // the hero stays hidden meanwhile (the inline failsafe gives up at 2.5 s).
  var fontsReady =
    document.fonts && document.fonts.ready
      ? Promise.race([
          document.fonts.ready,
          new Promise(function (resolve) {
            setTimeout(resolve, 1500);
          }),
        ])
      : Promise.resolve();

  fontsReady.then(start);

  function start() {
    var mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: reduce)', function () {
      root.classList.remove('hareket');
    });

    mm.add('(prefers-reduced-motion: no-preference)', function () {
      heroIntro();
      heroDrift();
      reveals();
      imagesScaleAndFade();
      stackSteps();
      aboutPanel();
      nameBlocks();
    });

    // Pinning needs the two-column layout.
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', function () {
      pinFeaturesHead();
    });
  }

  /* Hero: the headline rises line by line from behind a mask, the mark's blocks come in one
     after another and the Bugün screen opens like a shutter. */
  function heroIntro() {
    var hero = $('.hero');
    if (!hero) return;
    var title = $('h1', hero);
    var split = SplitText.create(title, { type: 'lines', mask: 'lines', autoSplit: true });

    gsap.set([title, '.hero-lead', '.hero-note', '.hero-stage > *'].filter(Boolean), {
      visibility: 'visible',
    });
    root.classList.remove('hareket');

    var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from(split.lines, { yPercent: 110, duration: 1.2, stagger: 0.1 }, 0)
      .from(['.hero-lead', '.hero-note'], { y: 24, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.35)
      .from(
        '.hb',
        {
          y: '22vh',
          rotation: gsap.utils.wrap([-6, 4, 7, 0]),
          autoAlpha: 0,
          duration: 1.3,
          stagger: 0.09,
        },
        0.1,
      )
      .fromTo(
        '.hero-shot',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3,
          ease: 'expo.inOut',
          clearProps: 'clipPath',
        },
        0.45,
      )
      .from('.hero-shot img', { scale: 1.18, duration: 1.6 }, 0.45)
      .from('.hb-dot', { scale: 0, duration: 0.9, ease: 'back.out(2.2)' }, 1.1);
  }

  /* Leaving the hero, the blocks drift apart at different speeds (scrubbed). */
  function heroDrift() {
    var hero = $('.hero');
    if (!hero) return;
    var tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 },
    });
    tl.to('.hb-teal', { yPercent: -38 }, 0)
      .to('.hb-blue', { yPercent: -16 }, 0)
      .to('.hb-purple', { yPercent: 14 }, 0)
      .to('.hb-core', { yPercent: -6 }, 0)
      .to('.hero-shot', { yPercent: -12, scale: 0.94 }, 0)
      .to('.hb-dot', { yPercent: -160 }, 0);
  }

  /* Headings, text and pictures of each section rise in that order as they arrive. */
  function reveals() {
    var steps = { rise: 0, 'rise-2': 0.08, 'rise-3': 0.16 };
    Object.keys(steps).forEach(function (name) {
      $$('.' + name).forEach(function (el) {
        gsap.from(el, {
          y: 44,
          autoAlpha: 0,
          duration: 1,
          delay: steps[name],
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
    });

    $$('.meslek-switch label').forEach(function (label, index) {
      gsap.from(label, {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        delay: index * 0.07,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.meslek-switch', start: 'top 90%', once: true },
      });
    });
  }

  /* Screens start small and grow to full size as they come into view, then fade as they leave. */
  function imagesScaleAndFade() {
    $$('.tile-stage, .about-shot').forEach(function (stage) {
      var img = $('img', stage);
      if (!img) return;
      gsap.fromTo(
        img,
        { scale: 0.82, transformOrigin: '50% 100%' },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: stage, start: 'top bottom', end: 'top 40%', scrub: 0.5 },
        },
      );
      gsap.to(img, {
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: stage, start: 'bottom 30%', end: 'bottom top', scrub: 0.5 },
      });
    });
  }

  /* Nasıl çalışır: the cards are sticky (CSS), so they stack without script. GSAP pushes the
     card underneath back and darkens it while the next one covers it. */
  function stackSteps() {
    var cards = $$('.step');
    cards.forEach(function (card, index) {
      var next = cards[index + 1];
      if (!next) return;
      gsap.to(card, {
        scale: 0.95,
        filter: 'brightness(0.8)',
        ease: 'none',
        scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
      });
    });
  }

  /* Bilgilerin telefonunda: the panel opens out to its full size and the statement comes into
     focus word by word as it is read. */
  function aboutPanel() {
    var panel = $('.about-panel');
    if (!panel) return;
    gsap.fromTo(
      panel,
      { scale: 0.9, transformOrigin: '50% 0%' },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'top 20%', scrub: 0.5 },
      },
    );

    var statement = $('.about-statement');
    if (!statement) return;
    var split = SplitText.create(statement, { type: 'words' });
    gsap.fromTo(
      split.words,
      { opacity: 0.15 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.05,
        scrollTrigger: { trigger: statement, start: 'top 80%', end: 'bottom 45%', scrub: true },
      },
    );
  }

  /* Footer: the blocks of the name rise into place, one after another, with the scroll. */
  function nameBlocks() {
    var blocks = $$('.name-blocks g');
    if (blocks.length === 0) return;
    gsap.from(blocks, {
      y: 320,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: '.name-blocks',
        start: 'top bottom',
        end: 'bottom 80%',
        scrub: 0.8,
      },
    });
  }

  /* Neler yapar: the heading stays on the left while the tiles go past on the right. */
  function pinFeaturesHead() {
    var inner = $('.features-head-inner');
    var tiles = $('.tiles');
    if (!inner || !tiles) return;
    ScrollTrigger.create({
      trigger: inner,
      start: 'top 110px',
      endTrigger: tiles,
      end: function () {
        return 'bottom ' + (110 + inner.offsetHeight) + 'px';
      },
      pin: true,
      pinSpacing: false,
    });
  }

  // Fonts and lazy images change the layout after the first measure.
  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
  });
})();
