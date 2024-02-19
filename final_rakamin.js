import { group } from "k6"
import http from "k6/http"
import { check } from "k6"
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export default function() {

    group("Reqres POST User", ()=>  {
        let url = "https://reqres.in/api/users"
        let body = JSON.stringify({
            "name": "morpheus",
            "job": "leader"
    })
    let response1 = http.post(url, body)
    console.log(JSON.stringify(response1.body))
    check(response1, {
        'response code is 201': (r) => r.status === 201,
    });
    })
    group("Reqres PUT User", ()=>  {
        let url = "https://reqres.in/api/users/2"
        let body = JSON.stringify({
            "name": "morpheus",
            "job": "zion resident"
        })
        let response2 = http.put(url, body)
        console.log(JSON.stringify(response2.body))
        check(response2, {
            'response code is 200': (r) => r.status === 200,
        });
    })
}
export function handleSummary(data) {
    return {
      "finalreport.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }