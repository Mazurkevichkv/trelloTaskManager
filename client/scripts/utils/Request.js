class Request {
    constructor(url, method, headers) {
        this.method = method || "GET";
        this.url = url || window.location.href;
        this.headers = headers || {};
    }

    send(data) {
        return new Promise((resolve, reject) => {
            let xhr, tid;
            data = data || {};

            try {
                xhr = Request.makeXhr();
            } catch (e) {
                reject(Request.ENOXHR);
            }


            let queryString = Request.encode(data);

            let url = this.url;
            
            if (this.method === "GET" && queryString) {
                url += '?' + queryString;
                queryString = null;
            }

            xhr.open(this.method, url);

            let contentType = "application/x-www-form-urlencoded";
            
            for (let item in this.headers) {
                if (!this.headers.hasOwnProperty(item)) continue;
                
                if (item.toLowerCase() === "content-type") {
                    contentType = this.headers[item];
                }
                
                xhr.setRequestHeader(item, this.headers[item]);
            }

            if (Request.timeout) {
                let tid = setTimeout(() => {
                    xhr.abort();
                    reject(Request.ETIMEOUT, xhr);
                }, Request.timeout);
            }

            xhr.onreadystatechange = function() {
                
                if (Request.timeout) {
                    clearTimeout(tid);
                }
                
                if (xhr.readyState === 4) {
                    if(!xhr.status || (xhr.status < 200 || xhr.status >= 300) && xhr.status !== 304) {
                        reject(xhr.responseText, xhr);
                    }
                    
                    try {
                        resolve(JSON.parse(xhr.responseText), xhr);
                        return;
                    }
                    catch (e) {
                        
                    }

                    resolve(xhr.responseText, xhr);
                }
                
            };

            if(contentType === "application-json") {
                xhr.send(JSON.stringify(data));
            }
            else {
                xhr.send(queryString);
            }
        });
    }

    static encode(data) {
        if (typeof data === "string") {
            return data;
        }

        let params = [];

        for (let key in data) {
            if (!data.hasOwnProperty(key)) continue;

            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }

        return params.join('&')
    }

    static makeXhr() {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        return xhr;
    }
}

Request.ENOXHR = 1;
Request.ETIMEOUT = 2;
Request.timeout = 0;

export {Request};
    