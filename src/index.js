import "./styles/main.scss";

// TABS
const startTabs = () => {
  const tabList = document.getElementById("js-tabs");
  const tabs = tabList.querySelectorAll("a");
  const panels = document.querySelectorAll('[role="tabpanel"]');

  tabs.forEach((tab) => {
    // Handle clicking of tabs for mouse users
    tab.addEventListener("click", (event) => {
      let currentTab = tabList.querySelector("[aria-selected]");
      if (event.currentTarget !== currentTab) {
        switchTab(currentTab, event.currentTarget);
      }
    });

    // Handle keydown events for keyboard users
    tab.addEventListener("keydown", (event) => {
      switch (event.which) {
        case 35:
          // End
          tabs[tabs.length - 1].click();
          break;
        case 36:
          // Home
          tabs[0].click();
          break;
        case 37:
        case 38:
        case 39:
        case 40:
          // Arrows
          changeTab(event.which === 37 || event.which === 38 ? -1 : 1);
          break;
        default:
          break;
      }
    });
  });

  panels.forEach((panel) => {
    // Handle keydown events for keyboard users
    panel.addEventListener("keydown", (event) => {
      switch (event.which) {
        case 35:
        case 36:
        case 39:
        case 40:
          event.stopPropagation();
          break;
        case 33:
          // Page up
          if (event.ctrlKey || event.metaKey) {
            changeTab(-1);
            event.stopPropagation();
          }
          break;
        case 34:
          //Page down
          if (event.ctrlKey || event.metaKey) {
            changeTab(1);
            event.stopPropagation();
          }
          break;
        case 37:
        case 38:
          // Up / Left arrows
          if (event.ctrlKey || event.metaKey) {
            changeTab(0);
          }
          event.stopPropagation();
          break;
        default:
          break;
      }
    });
  });

  window.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash;
    const currentTab = tabList.querySelector("[aria-selected]");
    const anchor = document.querySelector(`[href="${hash}"]`);
    let hashTab = null;

    if (anchor && anchor.getAttribute("role") === "tab") {
      hashTab = anchor;
    } else if (anchor) {
      const panel = anchor.closest('[role="tabpanel"]') || null;

      if (panel) {
        hashTab = document.getElementById(
          panel.getAttribute("aria-labelledby")
        );
      }
    }

    if (hashTab && hashTab !== currentTab) {
      switchTab(currentTab, hashTab);
    }
  });
};

const changeTab = (direction) => {
  const tabList = document.getElementById("js-tabs");
  const tabs = tabList.querySelectorAll("a");
  const tab = tabList.querySelector('[aria-selected="true"]');
  let index = Array.prototype.indexOf.call(tabs, tab);

  direction += index;

  // Switch to the new tab if it exists
  if (direction !== null) {
    event.preventDefault();

    let newIndex;
    if (tabs[direction]) {
      newIndex = direction;
    } else {
      newIndex = direction === index - 1 ? tabs.length - 1 : 0;
    }
    tabs[newIndex].click();
    tabs[newIndex].focus();
  }
};

// The tab switching function
const switchTab = (oldTab, newTab) => {
  newTab.focus();
  newTab.removeAttribute("tabindex");
  newTab.setAttribute("aria-selected", "true");

  oldTab.removeAttribute("aria-selected");
  oldTab.setAttribute("tabindex", "-1");

  let newPanel = document.querySelector(`[aria-labelledby="${newTab.id}"]`);
  let oldPanel = document.querySelector(`[aria-labelledby="${oldTab.id}"]`);
  newPanel.hidden = false;
  oldPanel.hidden = true;
};

const init = () => {
  startTabs();
};

init();
