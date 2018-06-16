export const buildAction = (type, payload) => ({ type, payload });

export const isLocalhost = () => document.location.href.startsWith('http://localhost');

export const log = value => { console.log(value); return value; }

export const filterUndefined = value =>
  value.filter(entry => entry !== undefined);

export const filterClasses = (data, classes) => {
  return data.filter(item => {
    for (let type of item['@type']) {
      if (classes.indexOf(type) >= 0) {
        return true;
      }
    }
    return false;
  })
}

