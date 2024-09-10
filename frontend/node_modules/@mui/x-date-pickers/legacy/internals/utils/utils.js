/* Use it instead of .includes method for IE support */
export function arrayIncludes(array, itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.every(function (item) {
      return array.indexOf(item) !== -1;
    });
  }
  return array.indexOf(itemOrItems) !== -1;
}
export var onSpaceOrEnter = function onSpaceOrEnter(innerFn, externalEvent) {
  return function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      innerFn(event);

      // prevent any side effects
      event.preventDefault();
      event.stopPropagation();
    }
    if (externalEvent) {
      externalEvent(event);
    }
  };
};
export var executeInTheNextEventLoopTick = function executeInTheNextEventLoopTick(fn) {
  setTimeout(fn, 0);
};

// https://www.abeautifulsite.net/posts/finding-the-active-element-in-a-shadow-root/
export var getActiveElement = function getActiveElement() {
  var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var activeEl = root.activeElement;
  if (!activeEl) {
    return null;
  }
  if (activeEl.shadowRoot) {
    return getActiveElement(activeEl.shadowRoot);
  }
  return activeEl;
};
export var DEFAULT_DESKTOP_MODE_MEDIA_QUERY = '@media (pointer: fine)';