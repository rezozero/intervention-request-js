import { p as patchBrowser, b as bootstrapLazy } from './index-15ad1946.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["intervention-request",[[1,"intervention-request",{"src":[1],"alt":[1],"lazy":[4],"classes":[1],"strategy":[1],"baseUrl":[1,"base-url"],"formats":[1],"embed":[4]}]]],["intervention-request-iframe",[[1,"intervention-request-iframe",{"src":[1],"alt":[1],"formats":[16],"strategy":[1],"baseUrl":[1,"base-url"]}]]],["intervention-request-picture",[[1,"intervention-request-picture",{"src":[1],"alt":[1],"formats":[16],"strategy":[1],"baseUrl":[1,"base-url"]}]]]], options);
});
