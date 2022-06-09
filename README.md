# driver-license-verification
[![github workflow](https://github.com/stevejkang/driver-license-verification/actions/workflows/healthCheck.yml/badge.svg)](https://github.com/stevejkang/driver-license-verification/actions/workflows/healthCheck.yml)
[![github workflow safedriving](https://github.com/stevejkang/driver-license-verification/actions/workflows/unitSafeDriving.yml/badge.svg)](https://github.com/stevejkang/driver-license-verification/actions/workflows/unitSafeDriving.yml)
[![github workflow efine](https://github.com/stevejkang/driver-license-verification/actions/workflows/unitEfine.yml/badge.svg)](https://github.com/stevejkang/driver-license-verification/actions/workflows/unitEfine.yml)
[![Build Status](https://app.travis-ci.com/stevejkang/driver-license-verification.svg?branch=main)](https://travis-ci.com/stevejkang/driver-license-verification)
[![codecov](https://codecov.io/gh/stevejkang/driver-license-verification/branch/main/graph/badge.svg?token=BSN9FS9WXU)](https://codecov.io/gh/stevejkang/driver-license-verification)
[![CodeQL](https://github.com/stevejkang/driver-license-verification/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/stevejkang/driver-license-verification/actions/workflows/codeql-analysis.yml)
[![CodeFactor](https://www.codefactor.io/repository/github/stevejkang/driver-license-verification/badge/main)](https://www.codefactor.io/repository/github/stevejkang/driver-license-verification/overview/main)

> An unofficial driver license verification crawler API service. (data from www.safedriving.or.kr and www.efine.go.kr)

## Requirements
- Node.js >= 15.14.0

## Installation
```bash
git clone https://github.com/stevejkang/driver-license-verification.git && cd driver-license-verification
npm install
npm run start:dev
# visit http://localhost:3000/docs
```

---

## Api Specification
### Request
`POST /verification`

    curl -i --location --request POST 'http://localhost:3000/verification' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "driverName": "홍길동",
      "driverBirthday": "2001-12-08",
      "licenseNumber": "11-90-623000-00",
      "serialNumber": "XXXXXX"
    }'

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: application/json
    Content-Length: 49
    HTTP/1.1 200 OK

    {"isSuccess": true,"verificationResult": "INVALID"}
