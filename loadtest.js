import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 100 },  // ramp to 100
    { duration: '30s', target: 300 },  // ramp to 300
    { duration: '30s', target: 300 },  // stay at 300
    { duration: '20s', target: 0 },    // ramp down
  ],
};

export default function () {
  const res = http.get(
    'https://kuncika-backend.onrender.com/kuncika/v1/service/'
  );

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}