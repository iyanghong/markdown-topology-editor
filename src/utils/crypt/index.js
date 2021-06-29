/**
 * Created by yh on 2021/1/28
 */
import {Base64} from './base64.min.js'

const cryptCode = '2B0919F0FA32CF039A3653A590CD0CEA';

/**
 * 加密
 * @param {*} data 加密数据
 * @param {可选} key 加密秘钥
 */
function encrypt(data, key) {
    if (data == null) return null;
    if (!key) key = process.env.VUE_APP_CRYPT_KEY || cryptCode;
    let res = crypt(data, key);
    // var Base64 = new Base64();
    return Base64.encode(res);
}

/**
 * 解密
 * @param {string} data 解密密文
 * @param {string} key 解密秘钥
 */
function decrypt(data, key) {
    if (data == null) return null;
    if (!key) key = process.env.VUE_APP_CRYPT_KEY || cryptCode;
    // var Base64 = new Base64();
    data = Base64.decode(data);
    let res = crypt(data, key);

    return res;
}

function base64Encrypt(value) {
    return Base64.encode(value);
}

function base64Decrypt(value) {
    return Base64.decode(value);
}

/**
 * 加密主体
 * @param {string} data 加密明文
 * @param {string} key 加密秘钥
 */
function crypt(data, key) {
    let keyCrypt = [],
        boxCrypt = [],
        resCrypt = [],
        keyLength = key.length,
        dataLength = data.length;
    for (var i = 0; i < 256; i++) {
        keyCrypt[i] = key[i % keyLength].charCodeAt();
        boxCrypt[i] = i;
    }
    for (var j = i = 0; i < 256; i++) {
        j = (j + boxCrypt[i] + keyCrypt[i]) % 256;
        tmp = boxCrypt[i];
        boxCrypt[i] = boxCrypt[j];
        boxCrypt[j] = tmp;
    }

    for (var a = j = i = 0; i < dataLength; i++) {
        a = (a + 1) % 256;
        j = (j + boxCrypt[a]) % 256;
        var tmp = boxCrypt[a];
        boxCrypt[a] = boxCrypt[j];
        boxCrypt[j] = tmp;
        var k = boxCrypt[((boxCrypt[a] + boxCrypt[j]) % 256)];
        if (data[i]) resCrypt.push(String.fromCharCode(data[i].charCodeAt() ^ k));

    }

    return resCrypt.join('');
}


export default {
    encrypt,
    decrypt,
    base64Encrypt,
    base64Decrypt
}
