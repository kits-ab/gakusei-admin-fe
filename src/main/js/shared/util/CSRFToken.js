export default function getCSRF() {
  try {
    const cookies = document.cookie.split('; ');
    const keys = cookies.map(cookie => cookie.split('=')[0]);
    const csrfToken = cookies[keys.indexOf('XSRF-TOKEN')].split('=')[1];
    return csrfToken;
  } catch (exc) {
    return null;
  }
}
