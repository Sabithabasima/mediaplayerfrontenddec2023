

// step1: import axios library

import axios from "axios";


// define common request function

export const commonRequest = async (method, url, body) => {

    // api request config.     is a common format

    let reqConfig = {
        method,
        url,
        data: body,
        headers: {
            "content-type": "application/json"
            // file upload:"content-type":"multipart/formdata"
        }
    }

    // api call using axios

    return await axios(reqConfig).then((response) => {
        return response
    }).catch((err) => {
        return err
    })

}