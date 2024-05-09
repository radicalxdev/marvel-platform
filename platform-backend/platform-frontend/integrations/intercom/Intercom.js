// Set your APP_ID
export const APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

const load = () => {
  const loaderFunction = () => {
    const w = window;
    const ic = w.Intercom;
    if (typeof ic === 'function') {
      ic('reattach_activator');
      ic('update', w.intercomSettings);
    } else {
      const d = document;

      const i = function intercomFunction(...args) {
        i.c(args);
      };
      i.q = [];
      i.c = function queueFunction(args) {
        i.q.push(args);
      };
      w.Intercom = i;
      const l = function scriptLoader() {
        const s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = `https://widget.intercom.io/widget/${APP_ID}`;
        const x = d.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      };
      if (document.readyState === 'complete') {
        l();
      } else if (w.attachEvent) {
        w.attachEvent('onload', l);
      } else {
        w.addEventListener('load', l, false);
      }
    }
  };

  loaderFunction();
};

// Initializes Intercom
const boot = (options = {}) => {
  if (window && window.Intercom) {
    window.Intercom('boot', {
      app_id: APP_ID,
      alignment: 'right',
      vertical_padding: 100,
      horizontal_padding: 50,
      ...options,
    });
  }
};

const update = () => {
  if (window && window.Intercom) {
    window.Intercom('update');
  }
};

export { load, boot, update };
