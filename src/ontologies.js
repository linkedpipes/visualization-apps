export const RFD_PREFIX = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
export const SCHEMA_PREFIX = 'http://schema.org/';
export const DCT_PREFIX = 'http://purl.org/dc/terms/';

const uriBuilder = prefix => suffix => prefix + suffix;

export const rdf = uriBuilder(RFD_PREFIX);
export const schema = uriBuilder(SCHEMA_PREFIX);
export const dct = uriBuilder(DCT_PREFIX);
