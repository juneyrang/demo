var mcsConfig = {
  "logLevel": mcs.LOG_LEVEL.NONE,
  "logHTTP": true,
  "oAuthTokenEndPoint": "https://idcs-1aaff7c8d68c47a3a497d753f2d29e49.identity.oraclecloud.com/oauth2/v1/token",
  "mobileBackend": {
    "name": "mDESM",
    "baseUrl": "https://81BBCFEF17F642AB93973D87DA8C3C58.mobile.ocp.oraclecloud.com:443",
    "authentication": {
      "type": mcs.AUTHENTICATION_TYPES.oauth,
      "basic": {
        "mobileBackendId": "858c7707-ea50-4189-96dc-10644638c46e",
        "anonymousKey": "ODFCQkNGRUYxN0Y2NDJBQjkzOTczRDg3REE4QzNDNThfTW9iaWxlQW5vbnltb3VzX0FQUElEOjQ3MDlkYWY3LWEzNTEtNGIyMi04YmYwLTAwZmZlYmZiNDVlNQ=="
      },
      "oauth": {
        "clientId": "30a7229ae0d5420c9adf5ffcf81c865f",
        "clientSecret": "466fc968-a063-42f2-bce7-844af31a645b"
      },
      "facebook":{
        "appId": "YOUR_FACEBOOK_APP_ID",
        "mobileBackendId": "YOUR_BACKEND_ID",
        "anonymousKey": "ANONYMOUS_KEY",
        "scopes": "public_profile,user_friends,email,user_location,user_birthday"
      },
      "token":{
        "mobileBackendId": "858c7707-ea50-4189-96dc-10644638c46e",
        "anonymousKey": "ODFCQkNGRUYxN0Y2NDJBQjkzOTczRDg3REE4QzNDNThfTW9iaWxlQW5vbnltb3VzX0FQUElEOjQ3MDlkYWY3LWEzNTEtNGIyMi04YmYwLTAwZmZlYmZiNDVlNQ==",
        "clientId": "30a7229ae0d5420c9adf5ffcf81c865f",
        "clientSecret": "466fc968-a063-42f2-bce7-844af31a645b"
      }
    }
  }
};
