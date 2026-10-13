(function () {
  var root = document.documentElement;

  // Without GSAP the page stays a compact, fully visible document
  if (!window.gsap || !window.ScrollTrigger) {
    root.classList.remove('anim', 'intro-pending');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  var TURNS = 2;
  // Text fade timing, as fractions of the viewport height
  var FADE_IN_LEAD = 0.1;   // the next section starts to appear this far below the outgoing one
  var FADE_IN_REST = 0.04;  // and is fully visible this far before it comes to rest
  var FADE_OUT_SPAN = 0.3;  // scroll distance of the fade-out
  var FADE_OUT_CLEAR = 0.02; // the fade-out finishes this far before the section is released
  var SHIFT = 20;

  var steps = gsap.utils.toArray('.step');
  var sections = gsap.utils.toArray('.section');
  var introPlayed = false;

  function readTop() {
    return parseFloat(getComputedStyle(sections[0]).top) || 0;
  }

  // Title first, then the artwork wrapper. The red umbrella inside the
  // wrapper is left to the scroll-driven rotation.
  function playIntro() {
    gsap.set('.title', { opacity: 0, y: 16 });
    gsap.set('.umbrella-reveal', { opacity: 0, scale: 0.96 });
    root.classList.remove('intro-pending');

    return gsap.timeline({ defaults: { ease: 'power2.out' } })
      .to('.title', { opacity: 1, y: 0, duration: 0.6, clearProps: 'opacity,transform' })
      .to('.umbrella-reveal', { opacity: 1, scale: 1, duration: 0.8, clearProps: 'opacity,transform' }, 0.25);
  }

  // Each section rises into its resting place while it fades in, holds there
  // while its step scrolls past, then fades out before it is released.
  // The fade-in runs on the section and the fade-out on its inner wrapper,
  // so each has its own scroll range and they never fight over a property.
  function revealSection(step, index) {
    var section = sections[index];
    var body = section.firstElementChild;

    if (index > 0) {
      gsap.fromTo(section, { opacity: 0, y: SHIFT }, {
        opacity: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: step,
          start: function () {
            return 'top ' + (readTop() + sections[index - 1].offsetHeight + FADE_IN_LEAD * window.innerHeight) + 'px';
          },
          end: function () {
            return 'top ' + (readTop() + FADE_IN_REST * window.innerHeight) + 'px';
          },
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    }

    if (index < steps.length - 1) {
      gsap.fromTo(body, { opacity: 1, y: 0 }, {
        opacity: 0,
        y: -SHIFT,
        ease: 'none',
        scrollTrigger: {
          trigger: step,
          start: function () {
            return 'bottom ' + (readTop() + section.offsetHeight + (FADE_OUT_SPAN + FADE_OUT_CLEAR) * window.innerHeight) + 'px';
          },
          end: function () {
            return 'bottom ' + (readTop() + section.offsetHeight + FADE_OUT_CLEAR * window.innerHeight) + 'px';
          },
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    }
  }

  ScrollTrigger.matchMedia({
    '(prefers-reduced-motion: no-preference)': function () {
      var intro;

      root.classList.add('anim', 'spin');

      if (root.classList.contains('intro-pending') && !introPlayed) {
        intro = playIntro();
      }
      root.classList.remove('intro-pending');
      introPlayed = true;

      gsap.fromTo('.umbrella-red', {
        rotation: 0
      }, {
        rotation: 360 * TURNS,
        ease: 'none',
        scrollTrigger: {
          start: 0,
          end: 'max',
          scrub: 0.75,
          onUpdate: function (self) {
            root.classList.toggle('scrolled', self.progress > 0.02);
          }
        }
      });

      steps.forEach(revealSection);

      return function () {
        if (intro) intro.kill();
        root.classList.remove('anim', 'spin', 'scrolled');
        gsap.set('.title, .umbrella-reveal, .umbrella-red, .section, .section-body', { clearProps: 'opacity,transform' });
      };
    }
  });
})();
