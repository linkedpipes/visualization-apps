import { call, select, takeEvery, put } from 'redux-saga/effects';
import { LOCATION_CHANGED } from 'redux-little-router';

import { fetchRDF, buildAction } from './utils';
import { getService } from './selectors';

function* fetchServiceConfig(service) {
  const contextSpec = {
    sd: 'http://www.w3.org/ns/sparql-service-description#',
    endpoint: { '@id': 'http://www.w3.org/ns/sparql-service-description#endpoint', '@type': '@id' },
    resultFormat: { '@id': 'http://www.w3.org/ns/sparql-service-description#resultFormat', '@type': '@id' },
    supportedLanguage: { '@id': 'http://www.w3.org/ns/sparql-service-description#supportedLanguage', '@type': '@id' },
    defaultDataset: { '@id': 'http://www.w3.org/ns/sparql-service-description#defaultDataset', '@type': '@id' },
    name: { '@id': 'http://www.w3.org/ns/sparql-service-description#name', '@type': '@id' },
    namedGraph: { '@id': 'http://www.w3.org/ns/sparql-service-description#namedGraph', '@type': '@id' }
  };

  const frame = {
    '@context': contextSpec,
    '@type': 'http://www.w3.org/ns/sparql-service-description#Service'
  };

  const context = {
    '@context': contextSpec
  };

  return yield call(fetchRDF, service, context, frame);
}

function* loadConfig() {
  yield put(buildAction('APP_LOADED', false));

  console.log('Loading Config');
  const service = yield select(getService);

  if (service) {
    const serviceConfig = yield call(fetchServiceConfig, service);
    yield put(buildAction('SET_CONFIG', serviceConfig));
  } else {
    console.log('Service spec not found');
  }

  yield put(buildAction('APP_LOADED', true));
}

export default function* saga() {
  yield call(loadConfig);

  yield takeEvery(LOCATION_CHANGED, loadConfig);
}

