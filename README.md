# Spinning Umbrella

A small GSAP scroll experiment. A red umbrella sits on top of a group of navy umbrellas and turns as the page scrolls.

## Running it

There is no build step. Serve the folder with any static file server and open it in a browser, for example:

```
npx serve .
```

or

```
python -m http.server 8000
```

Opening `index.html` directly also works. GSAP and the Poppins font load from CDNs, so the page needs an internet connection.

## Technologies

- HTML and CSS (grid and `position: sticky`). No CSS framework.
- [GSAP](https://gsap.com/) 3.6.1 with the ScrollTrigger plugin, loaded from cdnjs.
- Poppins from Google Fonts (400 and 800 italic).

## Scroll behavior

- The page uses normal document scrolling, so the mouse wheel, touch, and keyboard all work as usual.
- The rotation is mapped to the full scroll range of the page. It is 0 degrees at the top and 720 degrees (two turns) at the bottom. Scrolling up reverses it. The range is recalculated when the window is resized.
- At 992px wide and above, the title and text are on the left and the umbrella stays in view on the right. Below that, the title and the umbrella sit in a compact sticky area above the text.
- Each of the three text sections has its own step, one screen tall, which is what gives the page its scroll distance. A section fades in as it rises to the reading position, stays there at full opacity while its step scrolls past, and fades out before it is released. The next section starts to appear just as the previous one finishes fading. A section is fully invisible before it moves under the title or the umbrella.
- On load, the title fades in and moves up slightly, then the artwork fades and scales in. The entrance animates a wrapper around the artwork, so it does not touch the rotation of the red umbrella.

## Reduced motion and fallback

- With `prefers-reduced-motion: reduce`, there is no entrance, rotation, or paragraph animation, and the "Scroll to spin" cue is hidden. The page responds if the setting changes while it is open.
- If JavaScript is off or GSAP does not load, the title, artwork, and text are all visible as a plain page.
- In both cases the tall steps are not used, so the text sits in a compact layout, and nothing is sticky on small screens.

## Files

- `index.html`, `style.css`, `script.js`: the page.
- `umbrella-red.webp`, `umbrellas-navy.webp`, `background.webp`: the images the page uses. They are optimized copies made from `q01.png`, `q02.png`, and `Background-Options.jpg`.
- `favicon.svg`: the favicon.
