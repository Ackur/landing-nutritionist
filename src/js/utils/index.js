export function closestElement(selector, el = this) {
  return (
    (el && el != document && el != window && el.closest(selector)) ||
    (el && closestElement(selector, el.getRootNode().host))
  );
}

export const asyncSleep = (ms = 300) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export function createReactiveStore(initState = {}) {
  const listeners = new Map();

  const value = new Proxy(initState, {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {
      target[prop] = value;

      if (listeners.has(prop)) {
        for (const callback of listeners.get(prop)) {
          callback(value);
        }
      }

      return true;
    }
  });

  function subscribe(key, callback) {
    if (!listeners.has(key)) {
      listeners.set(key, []);
    }
    listeners.get(key).push(callback);
  }

  return {
    value,
    subscribe
  };
}

export class MyCustomEvent {
  detail = { value: '' };
  event = null;

  constructor(eventName, owner = window.document) {
    this.owner = owner;
    this.event = new CustomEvent(eventName, { detail: this.detail });
  }

  dispatch = (value) => {
    this.detail.value = value;

    this.owner.dispatchEvent(this.event);
  };
}

const isValidDate = (value) => {
  const dateWrapper = new Date(value);
  return !isNaN(dateWrapper.getDate());
};

export const sortArrayObjects = ({ column, dir }) => {
  const sortedTypes = { ASC: 'asc', DESC: 'desc' };
  return (a, b) => {
    let valA = a[column];
    let valB = b[column];
    if (isValidDate(a[column])) {
      valA = new Date(a[column]);
      valB = new Date(b[column]);
    }
    if (dir !== sortedTypes.ASC) {
      return valA < valB ? -1 : 1;
    }
    return valB > valA ? 1 : -1;
  };
};
