
let RequestType = {
    get : 'GET',
    post : 'POST'
}
export function getProgramsList(programParams, onSuccess, onFailure) {
    callAPI(programParams, "", onSuccess, onFailure, RequestType.get);
}

export function getProgramsDetail(programParams, onSuccess, onFailure) {
    callAPI(programParams, "", onSuccess, onFailure, RequestType.get);
}

export function getSearchList(SearchParams, onSuccess, onFailure) {
    callAPI(SearchParams, "", onSuccess, onFailure, RequestType.get);
}

export async function callAPI(url, body, responseSuccess, responseErr, methodType) {

    var params =
        methodType === RequestType.post
            ? {
                method: methodType,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
            : {
                method: methodType,
                headers: { "Content-Type": "application/json" },
            }

    console.log('===== URL =====', url);
    console.log('===== Body =====', JSON.stringify(params));


    console.log("request", JSON.stringify(body));
    fetch(url, params)
        .then(errorHandler)
        .then(response => response.json())
        .then(json => {
            console.log('json respons call api:::', json, url);
                responseSuccess(json);
            
        })
        .catch(err => responseErr(err));
}

const errorHandler = response => {
    console.log("Response ==>", response);
    if (
        (response.status >= 200 && response.status < 300) ||
        response.status == 401 ||
        response.status == 400
    ) {
        if (response.status == 204) {
            response.body = { success: "Saved" };
        }
        return Promise.resolve(response);
    } else {

        var error = new Error(response.statusText || response.status);
        error.response = response;
        return Promise.reject(error);
    }
};