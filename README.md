# springboot-sample-app

## Requirements

## AES/CBC/PKCS5PADDING
var secretkey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456'; //Length 32

var key = CryptoJS.enc.Utf8.parse(secretkey);

var iv = CryptoJS.enc.Utf8.parse(secretkey.substring(0, 16));

/*-- Encryption --*/

var cipherText = CryptoJS.AES.encrypt("Testing AES/CBC/PKCS5PADDING stuff from Java and with JavaScript - some random text", key, {

iv: iv,

mode: CryptoJS.mode.CBC,

padding: CryptoJS.pad.Pkcs7

}).toString();

console.log(cipherText);

/*-- Decryption --*/

var decrypted = CryptoJS.AES.decrypt("RQ/SEoGFF9IHmiMNbo/vlPTHuPWCGgDeEK5ZZBZjk/Kh5AIdgmVEeD42gciaK7gDKMP9odpjjZB/PGjebwpYSLzvEONS2jUiDtGPj7C0iNexmK5v5Gw9C8jsvqJdlmVK", key, {

iv: iv,

mode: CryptoJS.mode.CBC,

padding: CryptoJS.pad.Pkcs7

});

console.log(decrypted.toString(CryptoJS.enc.Utf8));

## Copyright

Released under the Apache License 2.0. See the [LICENSE](https://github.com/codecentric/springboot-sample-app/blob/master/LICENSE) file.