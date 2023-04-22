export const restoreCSRF = async () => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    return response;
}

export const storeCSRFToken = (response) => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

export const csrfFetch = async (url, options={}) => {
    options.headers ||= {};
    options.method ||= "GET";
    if (options.method.toUpperCase() !== "GET") {
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
        options.headers['Content-Type'] ||= 'application/json';
    }
    const res = await fetch(url, options)

    if (res.status >= 400) throw res;

    return res;
}