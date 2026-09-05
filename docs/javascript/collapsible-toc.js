(function() {
  var manualState = {};
  var currentIds = [];
  var tocObserver = null;
  var scrollTicking = false;

  function getMarkedIds() {
    var ids = [];
    document.querySelectorAll(".collapse-subs[id]").forEach(function(h) {
      ids.push(h.getAttribute("id"));
    });
    return ids;
  }

  function isExpanded(id) {
    var link = document.querySelector(
      '.md-sidebar--secondary a[href="#' + CSS.escape(id) + '"]'
    );
    if(!link) return false;
    var item = link.closest(".md-nav__item");
    var nav = item ? item.querySelector(":scope > .md-nav") : null;
    if(!nav) return false;
    var mh = getComputedStyle(nav).maxHeight;
    return mh !== "0px";
  }

  function rebuildStyles() {
    ["toc-collapse-base", "toc-collapse-manual"].forEach(function(sid) {
      var el = document.getElementById(sid);
      if(el) el.remove();
    });

    var baseRules = [];
    var manualRules = [];

    currentIds.forEach(function(id) {
      var eid = CSS.escape(id);
      var sel = '.md-sidebar--secondary .md-nav__item:has(> a[href="#' + eid + '"])';

      // Collapsed by default
      baseRules.push(
        sel + " > .md-nav {"
        + " max-height: 0; overflow: hidden; opacity: 0;"
        + " transition: max-height 350ms ease, opacity 250ms ease;"
        + " }"
      );

      // Auto-expand when scrolled into section
      baseRules.push(
        sel + ":has(.md-nav__link--active) > .md-nav {"
        + " max-height: 1500px; opacity: 1;"
        + " }"
      );

      // Manual overrides
      if(manualState[id] === true) {
        manualRules.push(
          sel + " > .md-nav {"
          + " max-height: 1500px !important; opacity: 1 !important;"
          + " }"
        );
      } else if(manualState[id] === false) {
        manualRules.push(
          sel + " > .md-nav {"
          + " max-height: 0 !important; opacity: 0 !important;"
          + " overflow: hidden !important;"
          + " }"
        );
      }
    });

    var base = document.createElement("style");
    base.id = "toc-collapse-base";
    base.textContent = baseRules.join("\n");
    document.head.appendChild(base);

    var manual = document.createElement("style");
    manual.id = "toc-collapse-manual";
    manual.textContent = manualRules.join("\n");
    document.head.appendChild(manual);
  }

  function updateArrow(arrow, id) {
    var expanded = isExpanded(id);
    arrow.style.transform = expanded
      ? "rotate(90deg)"
      : "rotate(0deg)";
  }

  function updateAllArrows() {
    currentIds.forEach(function(id) {
      var link = document.querySelector(
        '.md-sidebar--secondary a[href="#' + CSS.escape(id) + '"]'
      );
      if(!link) return;
      var arrow = link.querySelector(":scope > .md-nav__icon");
      if(arrow) updateArrow(arrow, id);
    });
  }

  function injectArrows() {
    currentIds.forEach(function(id) {
      var eid = CSS.escape(id);
      var link = document.querySelector(
        '.md-sidebar--secondary a[href="#' + eid + '"]'
      );
      if(!link) return;

      var item = link.closest(".md-nav__item");
      if(!item || !item.querySelector(":scope > .md-nav")) return;
      if(link.querySelector(":scope > .md-nav__icon")) return;

      var arrow = document.createElement("span");
      arrow.className = "md-nav__icon md-icon";

      arrow.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        if(isExpanded(id)) {
          manualState[id] = false;
        } else {
          manualState[id] = true;
        }

        rebuildStyles();
        requestAnimationFrame(function() {
          updateAllArrows();
        });
      });

      link.appendChild(arrow);
      updateArrow(arrow, id);
    });
  }

  function updateArrow(arrow, id) {
    var expanded = isExpanded(id);
    arrow.style.transform = expanded ? "rotate(90deg)" : "rotate(0deg)";
  }

  function onScroll() {
    if(!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(function() {
        updateAllArrows();
        scrollTicking = false;
      });
    }
  }

  function init() {
    if(tocObserver) tocObserver.disconnect();

    currentIds = getMarkedIds();
    if(!currentIds.length) return;

    rebuildStyles();
    injectArrows();

    // Re-inject arrows when Material re-renders TOC
    var toc = document.querySelector(".md-nav--secondary");
    if(toc) {
      tocObserver = new MutationObserver(function() {
        injectArrows();
        updateAllArrows();
      });
      tocObserver.observe(toc, { childList: true, subtree: true });
    }

    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", init);

  var poll = setInterval(function() {
    if(typeof document$ !== "undefined") {
      clearInterval(poll);
      document$.subscribe(function() {
        manualState = {};
        init();
      });
    }
  }, 100);
})();