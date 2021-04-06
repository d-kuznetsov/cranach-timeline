// test comment

interface Options {
  path?: string;
  expires?: Date | string;
  [key: string]: any;
}

export default function (name: string, value: any, options?: Options) {
  options = {
    path: "/",
    ...(options || {}),
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(JSON.stringify(value));

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}
