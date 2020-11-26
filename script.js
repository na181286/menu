const menuLinks = JSON.parse(data);

function addEventHandler(element, eventtype, func) {
  if (!element) return;

  if (window.addEventListener) {
    element.addEventListener(eventtype, func, false);
  } else {
    element.attachEvent("on" + eventtype, func);
  }
}

function hasClass(element, className) {
  if (element)
    return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
}

function removeClass(element, classname) {
  if (element) element.className = element.className.replace(classname, "");
}

function addClass(element, classname) {
  if (element) {
    element.className += " " + classname;
  }
}

function toggleNavBar() {
  if (!hasClass(document.getElementById("nav"), "visible"))
    addClass(document.getElementById("nav"), "visible");
  else {
    removeClass(document.getElementById("nav"), "visible");
  }
}

function openSub(e, par) {
  if (hasClass(par.querySelectorAll("ul")[0], "opened")) {
    removeClass(par.querySelectorAll("ul")[0], "opened");

    if (hasClass(e.target, "opened")) {
      removeClass(e.target, "opened");
    }
  } else {
    if (!hasClass(par.querySelectorAll("ul")[0], "opened")) {
      addClass(par.querySelectorAll("ul")[0], "opened");
    }

    if (!hasClass(e.target, "opened")) {
      addClass(e.target, "opened");
    }
  }
}

function createSubs(subs, par) {
  for (let i = 0; i < subs.length; i++) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = subs[i].link;
    a.innerHTML = subs[i].name;
    li.appendChild(a);

    if (subs[i].sub) {
      let arrow = document.createElement("div");
      arrow.className = "arrow";
      li.appendChild(arrow);
      addEventHandler(arrow, "click", (e) => openSub(e, li));

      let ul = document.createElement("ul");
      li.appendChild(ul);
      createSubs(subs[i].sub, ul);
    }
    par.appendChild(li);
  }
}

window.addEventListener("DOMContentLoaded", function () {
  let menu = menuLinks.menu;
  let menuContainer = document.getElementById("nav-links");
  for (let i = 0; i < menu.length; i++) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = menu[i].link;
    a.innerHTML = menu[i].name;
    li.appendChild(a);

    if (menu[i].sub) {
      let arrow = document.createElement("div");
      arrow.className = "arrow";
      li.appendChild(arrow);
      addEventHandler(arrow, "click", (e) => openSub(e, li));

      let ul = document.createElement("ul");
      li.appendChild(ul);
      createSubs(menu[i].sub, ul);
    }

    menuContainer.appendChild(li);
  }

  addEventHandler(document.querySelector("#nav-toggle"), "click", toggleNavBar);

  addEventHandler(document.querySelector("#close"), "click", toggleNavBar);
});
