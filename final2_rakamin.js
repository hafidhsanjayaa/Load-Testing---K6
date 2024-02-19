import { group, sleep } from "k6";
import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
    vus: 1000,
    iterations: 3500,
    thresholds: {
        'http_req_duration': ['max<=2000'],
    },
};
export default function () {
    group('Performance Test POST', () => {
        const urlPost = 'https://reqres.in/api/users';
        const bodyPost = JSON.stringify({
            "name": "morpheus",
            "job": "leader"
        });
        const responsePost = http.post(urlPost, bodyPost);

        check(responsePost, {
            'POST response code is 201': (r) => r.status === 201,
            'POST response time is within 2 seconds': (r) => r.timings.duration < 2000,
        });
        sleep(1);
    });
    group('Performance Test PUT', () => {
        const urlPut = 'https://reqres.in/api/users/2';
        const bodyPut = JSON.stringify({
            "name": "morpheus",
            "job": "zion resident"
        });
        const responsePut = http.put(urlPut, bodyPut);
        check(responsePut, {
            'PUT response code is 200': (r) => r.status === 200,
            'PUT response time is within 2 seconds': (r) => r.timings.duration < 2000,
        });
        sleep(1);
    });
}
export function handleSummary(data) {
    return {
      "finalreport2.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }
