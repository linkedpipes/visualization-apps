const configuration = {
  language: 'en'
};

export const setLanguage = language => {
  configuration.language = language;
  console.log(`Data configuration:
  Language: ${language}`);
}

const getValueFromArray = jsonldArray => {
  const candidate = jsonldArray.find(
    entry => entry['@language'] === configuration.language
  );
  return candidate
    ? candidate
    : jsonldArray[0];
}

const getValue = jsonldValue => {
  if (Array.isArray(jsonldValue)) {
    jsonldValue = getValueFromArray(jsonldValue);
  }
  if (jsonldValue !== undefined && jsonldValue['@value'] !== undefined) {
    return jsonldValue['@value'];
  }
  return jsonldValue;
}

export const parseNumber = (parseFunction, jsonldValue) => {
  const source = getValue(jsonldValue)
  const result = parseFunction(source);
  if (isNaN(result)) {
    throw Error('A value is not a number');
  }
  return result;
}

export const getInteger = (jsonldValue) =>
  parseNumber(parseInt, jsonldValue);

export const getFloat = (jsonldValue) =>
  parseNumber(parseFloat, jsonldValue);

export const getString = (jsonldValue) => {
  const source = getValue(jsonldValue);
  if (source === undefined) {
    throw Error('A value is not a string');
  }
  return String(source);
};

export const stringRenderer = ({ cellData }) => {
  try {
    return getString(cellData);
  }
  catch (e) {
    return String();
  }
}
