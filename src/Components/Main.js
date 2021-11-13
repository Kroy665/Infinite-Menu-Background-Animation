import React, { useEffect } from "react";
import "./Main.css";
import { preloadImages } from "./js/utils.js";
import { gsap } from "gsap";
function Main() {
  document.documentElement.className = "js";
  var supportsCssVars = function () {
    var e,
      t = document.createElement("style");
    return (
      (t.innerHTML = "root: { --tmp-var: bold; }"),
      document.head.appendChild(t),
      (e = !!(
        window.CSS &&
        window.CSS.supports &&
        window.CSS.supports("font-weight", "var(--tmp-var)")
      )),
      t.parentNode.removeChild(t),
      e
    );
  };
  supportsCssVars() ||
    alert(
      "Please view this demo in a modern browser that supports CSS Variables."
    );

  useEffect(() => {
    // preload images then remove loader (loading class)
    preloadImages(".tiles__line-img").then(() =>
      document.body.classList.remove("loading")
    );

    // frame element
    const frame = document.querySelector(".frame");

    // overlay (SVG path element)
    const overlayPath = document.querySelector(".overlay__path");

    // menu (wrap) element
    const menuWrap = document.querySelector(".menu-wrap");

    // menu items
    const menuItems = menuWrap.querySelectorAll(".menu__item");

    // open menu button
    const openMenuCtrl = document.querySelector("button.button-menu");

    // close menu button
    const closeMenuCtrl = menuWrap.querySelector(".button-close");

    // big title elements
    const title = {
      main: document.querySelector(".content__title-main"),
      sub: document.querySelector(".content__title-sub"),
    };

    let isAnimating = false;

    // opens the menu
    const openMenu = () => {
      if (isAnimating) return;
      isAnimating = true;
      gsap
        .timeline({
          onComplete: () => (isAnimating = false),
        })
        .set(overlayPath, {
          attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
        })
        .to(
          overlayPath,
          {
            duration: 0.8,
            ease: "power4.in",
            attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" },
          },
          0
        )
        .to(overlayPath, {
          duration: 0.3,
          ease: "power2",
          attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
          onComplete: () => {
            frame.classList.add("frame--menu-open");
            menuWrap.classList.add("menu-wrap--open");
          },
        })
        // title elements
        .to(
          [title.main, title.sub],
          {
            duration: 0.8,
            ease: "power3.in",
            y: -200,
            stagger: 0.05,
          },
          0.2
        )

        // now reveal
        .set(menuItems, {
          opacity: 0,
        })
        .set(overlayPath, {
          attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
        })
        .to(overlayPath, {
          duration: 0.3,
          ease: "power2.in",
          attr: { d: "M 0 0 V 50 Q 50 0 100 50 V 0 z" },
        })
        .to(overlayPath, {
          duration: 0.8,
          ease: "power4",
          attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
        })
        // menu items translate animation
        .to(
          menuItems,
          {
            duration: 1.1,
            ease: "power4",
            startAt: { y: 150 },
            y: 0,
            opacity: 1,
            stagger: 0.05,
          },
          ">-=1.1"
        );
    };

    // closes the menu
    const closeMenu = () => {
      if (isAnimating) return;
      isAnimating = true;
      gsap
        .timeline({
          onComplete: () => (isAnimating = false),
        })
        .set(overlayPath, {
          attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
        })
        .to(
          overlayPath,
          {
            duration: 0.8,
            ease: "power4.in",
            attr: { d: "M 0 0 V 50 Q 50 100 100 50 V 0 z" },
          },
          0
        )
        .to(overlayPath, {
          duration: 0.3,
          ease: "power2",
          attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
          onComplete: () => {
            frame.classList.remove("frame--menu-open");
            menuWrap.classList.remove("menu-wrap--open");
          },
        })
        // now reveal
        .set(overlayPath, {
          attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
        })
        .to(overlayPath, {
          duration: 0.3,
          ease: "power2.in",
          attr: { d: "M 0 100 V 50 Q 50 100 100 50 V 100 z" },
        })
        .to(overlayPath, {
          duration: 0.8,
          ease: "power4",
          attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
        })
        // title elements
        .to(
          [title.main, title.sub],
          {
            duration: 1.1,
            ease: "power4",
            y: 0,
            stagger: -0.05,
          },
          ">-=1.1"
        )
        // menu items translate animation
        .to(
          menuItems,
          {
            duration: 0.8,
            ease: "power2.in",
            y: 100,
            opacity: 0,
            stagger: -0.05,
          },
          0
        );
    };
    // click on menu button
    openMenuCtrl.addEventListener("click", openMenu);
    // click on close menu button
    closeMenuCtrl.addEventListener("click", closeMenu);
  }, []);

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Infinite Menu Background Animation | Codrops</title>
      <meta
        name="description"
        content="A page transition with an animated SVG path for a menu that has an infinite background animation."
      />
      <meta
        name="keywords"
        content="overlay, page transition, animation, svg"
      />
      <meta name="author" content="Codrops" />
      <link rel="shortcut icon" href="favicon.ico" />
      <link rel="stylesheet" href="https://use.typekit.net/iqd6ozy.css" />
      <link rel="stylesheet" type="text/css" href="Main.css" />
      <main>
        <div className="frame">
          <div className="frame__button">
            <button className="unbutton button-menu" aria-label="Open menu">
              <svg width={19} height={12} viewBox="0 0 19 12">
                <path d="m.742 3.26.485.874c.043-.024.13-.07.26-.136.22-.11.476-.233.765-.361A22.92 22.92 0 0 1 4.997 2.62c4.476-1.34 8.75-1.219 12.241 1.1.18.12.357.245.531.376l.6-.8a12.46 12.46 0 0 0-.578-.408C14.008.375 9.443.246 4.71 1.663c-1.037.31-2 .675-2.865 1.06a18.83 18.83 0 0 0-1.103.536Z" />
                <path d="m.742 6.748.485.874c.043-.023.13-.07.26-.135.22-.111.476-.233.765-.362A22.92 22.92 0 0 1 4.997 6.11c4.476-1.34 8.75-1.22 12.241 1.1.18.12.357.245.531.375l.6-.8a12.46 12.46 0 0 0-.578-.408C14.008 3.864 9.443 3.735 4.71 5.152c-1.037.31-2 .675-2.865 1.06a18.83 18.83 0 0 0-1.103.536Z" />
                <path d="m.742 10.237.485.874c.043-.024.13-.07.26-.136.22-.11.476-.232.765-.36a22.92 22.92 0 0 1 2.745-1.016c4.476-1.34 8.75-1.22 12.241 1.1.18.12.357.244.531.375l.6-.8a12.46 12.46 0 0 0-.578-.408C14.008 7.353 9.443 7.224 4.71 8.64c-1.037.31-2 .674-2.865 1.06a18.83 18.83 0 0 0-1.103.536Z" />
              </svg>
            </button>
          </div>
          <h1 className="frame__title">Infinite Menu Background Animation</h1>
          <nav className="frame__links">
            <a
              href="http://tympanus.net/Tutorials/GlassEffect/"
              className="hover-line"
            >
              Previous demo
            </a>
            <a
              href="https://tympanus.net/codrops/?p=57286"
              className="hover-line"
            >
              Article
            </a>
            <a
              href="https://github.com/codrops/Theodore/"
              className="hover-line"
            >
              GitHub
            </a>
          </nav>
          <div className="frame__author">
            <a href="https://twitter.com/codrops">@codrops</a>
          </div>
          <div className="frame__heading">
            <span className="frame__heading-main">London 2022</span>
            <span className="frame__heading-sub">
              spring / summer collection
            </span>
          </div>
        </div>
        <div className="content">
          <h2 className="content__title">
            <span className="content__title-main">Theodore</span>
            <span className="content__title-sub">Stravassos</span>
          </h2>
          <button
            className="unbutton button-enter"
            disabled
            aria-label="Enter the site"
          >
            <svg width={64} height={51} xmlns="http://www.w3.org/2000/svg">
              <g stroke="#000" fill="none" fillRule="evenodd">
                <path
                  strokeLinecap="square"
                  d="m55.766 32.528-5.125-1.865M52.677 36.938l3.1-4.618"
                />
                <path d="M8.773 10.587S-.693 49.485 56.13 32.3" />
              </g>
            </svg>
          </button>
        </div>
        <div className="menu-wrap">
          <div className="tiles">
            <div className="tiles__line">
              <a
                className="tiles__line-img tiles__line-img--large"
                style={{ backgroundImage: "url(img/vincent-cotro.jpg)" }}
                href="https://vincent-cotro.welovedevs.com/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
              <a
                className="tiles__line-img"
                style={{ backgroundImage: "url(img/online-cv.jpg)" }}
                href="https://online-cv.webjeda.com/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
              <a
                className="tiles__line-img"
                style={{ backgroundImage: "url(img/academic-demo.jpg)" }}
                href="https://academic-demo.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
              <a
                className="tiles__line-img tiles__line-img--large"
                style={{ backgroundImage: "url(img/vincent-cotro.jpg)" }}
                href="https://vincent-cotro.welovedevs.com/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
              <a
                className="tiles__line-img"
                style={{ backgroundImage: "url(img/online-cv.jpg)" }}
                href="https://online-cv.webjeda.com/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
              <a
                className="tiles__line-img"
                style={{ backgroundImage: "url(img/academic-demo.jpg)" }}
                href="https://academic-demo.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
            </div>
            <div className="tiles__line">
              <a
                className="tiles__line-img tiles__line-img--large"
                style={{ backgroundImage: "url(img/hydejack.jpg)" }}
                href="https://hydejack.com/resume/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
              <a
                className="tiles__line-img"
                style={{ backgroundImage: "url(img/elipapa.jpg)" }}
                href="http://elipapa.github.io/markdown-cv/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
              <a
                className="tiles__line-img"
                style={{ backgroundImage: "url(img/hijiangtao.jpg)" }}
                href="https://hijiangtao.github.io/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
              <a
                className="tiles__line-img tiles__line-img--large"
                style={{ backgroundImage: "url(img/hydejack.jpg)" }}
                href="https://hydejack.com/resume/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
              <a
                className="tiles__line-img"
                style={{ backgroundImage: "url(img/elipapa.jpg)" }}
                href="http://elipapa.github.io/markdown-cv/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
              <a
                className="tiles__line-img"
                style={{ backgroundImage: "url(img/hijiangtao.jpg)" }}
                href="https://hijiangtao.github.io/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
            </div>
            <div className="tiles__line">
              <a
                className="tiles__line-img tiles__line-img--large"
                style={{ backgroundImage: "url(img/resume-template.jpg)" }}
                href="http://resume-template.joelglovier.com/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
              <a
                className="tiles__line-img"
                style={{ backgroundImage: "url(img/sproogen.jpg)" }}
                href="https://sproogen.github.io/modern-resume-theme/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
              <a
                className="tiles__line-img"
                style={{ backgroundImage: "url(img/jarrekk.jpg)" }}
                href="https://jarrekk.github.io/Jalpc/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
              <a
                className="tiles__line-img tiles__line-img--large"
                style={{ backgroundImage: "url(img/resume-template.jpg)" }}
                href="http://resume-template.joelglovier.com/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
              <a
                className="tiles__line-img"
                style={{ backgroundImage: "url(img/sproogen.jpg)" }}
                href="https://sproogen.github.io/modern-resume-theme/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
              <a
                className="tiles__line-img"
                style={{ backgroundImage: "url(img/jarrekk.jpg)" }}
                href="https://jarrekk.github.io/Jalpc/"
                target="_blank"
                rel="noopener noreferrer"
              >{""}</a>
            </div>
          </div>
          <nav className="menu">
            <a href="/#" className="menu__item">
              <span className="menu__item-tiny">always</span>
              <span className="menu__item-text">bold</span>
            </a>
            <a href="/#" className="menu__item">
              <span className="menu__item-text">casual</span>
              <span className="menu__item-tiny">look</span>
            </a>
            <a href="/#" className="menu__item">
              <span className="menu__item-tiny">be</span>
              <span className="menu__item-text">funky</span>
            </a>
            <a href="/#" className="menu__item">
              <span className="menu__item-text">mad</span>
              <span className="menu__item-tiny">feelings</span>
            </a>
          </nav>
          <button className="unbutton button-close">
            <svg width={25} height={16} viewBox="0 0 25 16">
              <path d="M2.238 7.079h2.727M2.482 9.496l-.666-2.7" />
              <path d="M23.753 5.403s-1.87 16.88-22.03 1.785" />
            </svg>
          </button>
        </div>
        {/* From https://codepen.io/sebastien-gilbert/pen/VwLzvGV?editors=1010 */}
        {/* Edit the paths here: https://yqnn.github.io/svg-path-editor/ */}
        <svg
          className="overlay"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            className="overlay__path"
            vectorEffect="non-scaling-stroke"
            d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
          />
        </svg>
      </main>
    </div>
  );
}

export default Main;
