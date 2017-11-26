export const getInteger = (jsonldValue) => {
  const source = jsonldValue['@value'] !== undefined
    ? jsonldValue['@value']
    : jsonldValue;
  return parseInt(source, 10);
};

export const getString = (jsonldValue) => {
  if (jsonldValue === undefined) {
    return '';
  }
  if (typeof jsonldValue === 'object' && jsonldValue['@value'] !== undefined) {
    return String(jsonldValue['@value']);
  }
  return String(jsonldValue);
};

export const stringRenderer = ({ cellData }) => getString(cellData);
