export function getChromeVersion() {
  const userAgent = navigator.userAgent;
  let chromeVersion = '';
  const match = userAgent.match(/(Chrome)\/(\d+\.\d+)/);

  if (match) {
    chromeVersion = match[2];
  }

  return chromeVersion
}