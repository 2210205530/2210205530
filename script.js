
// script.js — Meseud Hadis Redi — 2210205530


// this makes sure all the HTML elements exist first

document.addEventListener("DOMContentLoaded", function() {


  // SECTION 1 — FADE-IN ON SCROLL

  var fadeElements = document.querySelectorAll(".fade-up");

  var fadeObserver = new IntersectionObserver(function(entries) {
    var i;
    for (i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add("visible");
        // once it has appeared I stop watching it
        fadeObserver.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.12 });

  var f;
  for (f = 0; f < fadeElements.length; f++) {
    fadeObserver.observe(fadeElements[f]);
  }


  // SECTION 2 — ANIMATED SKILL BARS

  var skillList = document.querySelector(".skill-list");

  var barObserver = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {

      // step a — animate each bar width
      var bars = document.querySelectorAll(".bar-fill");
      var b;
      for (b = 0; b < bars.length; b++) {
        var targetPct = bars[b].getAttribute("data-target");
        bars[b].style.width = targetPct + "%";
      }

      // step b — count each percentage label up from 0 to its value
      var pcts = document.querySelectorAll(".skill-pct");
      var p;
      for (p = 0; p < pcts.length; p++) {
        var endVal = parseInt(pcts[p].getAttribute("data-val"));
        var el     = pcts[p];

        (function(element, target) {
          var count = 0;
          var step  = Math.ceil(target / 60);
          var timer = setInterval(function() {
            count = count + step;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            element.textContent = count + "%";
          }, 20);
        })(el, endVal);
      }

      // only trigger once — no need to keep watching
      barObserver.unobserve(entries[0].target);
    }
  }, { threshold: 0.3 });

  if (skillList) {
    barObserver.observe(skillList);
  }


  // SECTION 3 — INTERNSHIP DURATION CALCULATOR
  //
  // It calculate how many months have passed since
  // June 2023 and write it into the .duration span
  // so it always shows the correct time automatically.

  var durationSpan = document.querySelector(".duration");

  if (durationSpan) {
    var startDate   = new Date("June 1, 2023");
    var today       = new Date();
    var diffMs      = today - startDate;
    var diffDays    = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    var totalMonths = Math.floor(diffDays / 30);
    var years       = Math.floor(totalMonths / 12);
    var leftover    = totalMonths % 12;

    var durationText = "";

    if (years > 0) {
      durationText = years + "y";
      if (leftover > 0) {
        durationText = durationText + " " + leftover + "mo";
      }
    } else {
      durationText = totalMonths + "mo";
    }

    durationSpan.textContent = durationText;
  }


  // SECTION 4 — FOOTER YEAR
  //
  // Puts the current year in the footer automatically
  // so I never have to update the HTML file manually.

  var yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // SECTION 5 — PHOTO HOVER circle

  var photo = document.getElementById("profilePhoto");

  if (photo) {
    photo.addEventListener("mouseenter", function() {
      photo.style.boxShadow = "0 14px 48px rgba(26, 111, 255, 0.4)";
    });

    photo.addEventListener("mouseleave", function() {
      photo.style.boxShadow = "0 8px 32px rgba(26, 111, 255, 0.15)";
    });
  }

  // SECTION 6 — CONTACT CHIP COLOUR FIX
  // keeps the hover inside the box 
  // from turning grey to blue when hovered since the link color changes.

  var chips = document.querySelectorAll("a.contact-chip");
  var c;
  for (c = 0; c < chips.length; c++) {
    chips[c].addEventListener("mouseenter", function() {
      var dot = this.querySelector(".chip-dot");
      if (dot) {
        dot.style.background = "var(--accent)";
      }
    });
  }

  // SECTION 7 — TIMELINE SLIDE-IN
  //
  // Each timeline item starts invisible and slides
  // into place with a small delay between them so
  // they appear one after the other.

  var timelineItems = document.querySelectorAll(".timeline-item");
  var t;

  for (t = 0; t < timelineItems.length; t++) {
    timelineItems[t].style.opacity   = "0";
    timelineItems[t].style.transform = "translateY(18px)";
    timelineItems[t].style.transition = "opacity 0.5s ease, transform 0.5s ease";

    // self-calling function keeps each item's delay value separate
    (function(item, index) {
      setTimeout(function() {
        item.style.opacity   = "1";
        item.style.transform = "translateY(0px)";
      }, 500 + index * 200);
    })(timelineItems[t], t);
  }

  // SECTION 8 — SOCIAL LINKS HOVER SLIDE
  //
  // Adds a small slide-right effect on the social
  // links (Instagram, GitHub) when hovered.
  // CSS handles the color change, JS handles
  // the transform because I wanted more control on the changes.

  var socialLinks = document.querySelectorAll(".social-link");
  var s;

  for (s = 0; s < socialLinks.length; s++) {
    socialLinks[s].addEventListener("mouseenter", function() {
      this.style.transform = "translateX(5px)";
    });

    socialLinks[s].addEventListener("mouseleave", function() {
      this.style.transform = "translateX(0px)";
    });
  }
  
});
