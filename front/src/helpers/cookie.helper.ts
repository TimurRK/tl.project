const cookie_domain = import.meta.env.VITE_APP_COOKIE_DOMAIN;

export function setCookie(key: string, value: string, expires?: string) {
  let cookie = `${key}=${value};path=/`;

  if (cookie_domain) {
    cookie += `;domain=${cookie_domain}`;
  }

  if (expires) {
    cookie += `;expires=${expires}`;
  }

  document.cookie = cookie;

  return document.cookie;
}

export function getCookie(key: string) {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const kv_pair = cookie.split("=");

    if (kv_pair[0].trim() === key) {
      return decodeURIComponent(kv_pair[1]);
    }
  }

  return "";
}

export function clearCookie() {
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const kv_pair = cookie.split("=");

    setCookie(kv_pair[0], "");
  }
}
