/**
 * Created by yh on 2021/7/16
 */
export function loadJs(url,type = 'text/javascript') {
    return new Promise((resolve, reject) => {
        let checkScript = document.querySelector('script[src="' + url + '"]');
        if (checkScript) {
            resolve();
            return;
        }
        let script = document.createElement('script')
        script.type = type;
        script.src = url;
        script.onload = () => {
            resolve();
        }
        script.onerror = () => {
            reject();
        }
        document.body.appendChild(script);

    })
}

export function loadCss(url) {
    return new Promise((resolve, reject) => {
        let hasCss = document.querySelector('link[rel="stylesheet"][type="text/css"][href="' + url + '"]');
        if (hasCss) {
            resolve();
            return;
        }
        let css = document.createElement('link');
        css.href = url;
        css.rel = 'stylesheet';
        css.type = 'text/css';
        css.onload = () => {
            resolve();
        }
        css.onerror = () => {
            reject();
        }
        document.head.appendChild(css);
    });
}
