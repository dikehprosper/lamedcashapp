import crypto from "crypto";
import CryptoJS from "crypto-js";

function getCurrentUTCTimestamp(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth() is zero-based
  const day = String(now.getUTCDate()).padStart(2, "0");
  const hours = String(now.getUTCHours()).padStart(2, "0");
  const minutes = String(now.getUTCMinutes()).padStart(2, "0");
  const seconds = String(now.getUTCSeconds()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

async function generateSHA256(string: string | undefined): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(string);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

function generateMD5(string: string): string {
  return CryptoJS.MD5(string).toString();
}

const cashierpass = process.env.MOBCASH_CASHIERPASS as string;
const hash = process.env.MOBCASH_HASH as string;
const lng = "fr";
const cashdeskid = process.env.MOBCASH_CASHDESKID as string;

async function generateSignatures(userid: string, amount: number) {
  const initialString = `hash=${hash}&lng=${lng}&userid=${userid}`;
  const sha256Initial = await generateSHA256(initialString);
  console.log("SHA256 Initial:", sha256Initial);

  const md5Params = generateMD5(
    `summa=${amount}&cashierpass=${cashierpass}&cashdeskid=${cashdeskid}`
  );
  console.log("MD5 Params:", md5Params);

  const finalSignature = await generateSHA256(sha256Initial + md5Params);
  console.log("Final Signature:", finalSignature);

  const confirm = generateMD5(`${userid}:${hash}`);
  console.log("Confirm:", confirm);

  return {finalSignature, confirm};
}

async function generateSignatures2(userid: string, code: string) {
  const initialString = `hash=${hash}&lng=${lng}&userid=${userid}`;
  const sha256Initial = await generateSHA256(initialString);
  console.log("SHA256 Initial:", sha256Initial);

  const md5Params = generateMD5(
    `code=${code}&cashierpass=${cashierpass}&cashdeskid=${cashdeskid}`
  );
  console.log("MD5 Params:", md5Params);

  const finalSignature = await generateSHA256(sha256Initial + md5Params);
  console.log("Final Signature:", finalSignature);

  const confirm = generateMD5(`${userid}:${hash}`);
  console.log("Confirm:", confirm);

  return {finalSignature, confirm};
}

async function rechargeAccount(userid: string, amount: number) {
  const {finalSignature, confirm} = await generateSignatures(userid, amount);

  const url = `https://partners.servcul.com/CashdeskBotAPI/Deposit/${userid}/Add`;
  const headers = {
    "Content-Type": "application/json",
    Sign: finalSignature,
  };
  const payload = JSON.stringify({
    cashdeskid: cashdeskid,
    lng: lng,
    summa: amount,
    confirm: confirm,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: payload,
  });

  const responseData = await response.json();
  console.log("Response:", responseData);
  return responseData;
}

async function withdrawFromAccount(userid: string, code: string) {
  const {finalSignature, confirm} = await generateSignatures2(userid, code);

  const url = `https://partners.servcul.com/CashdeskBotAPI/Deposit/${userid}/Payout`;
  const headers = {
    "Content-Type": "application/json",
    Sign: finalSignature,
  };
  const payload = JSON.stringify({
    cashdeskid: cashdeskid,
    lng: lng,
    code: code,
    confirm: confirm,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: payload,
  });

  const responseData = await response.json();
  return responseData;
}

async function generateSignaturesForBalance(dt: string) {
  const initialString = `hash=${hash}&cashdeskid=${cashdeskid}&dt=${dt}`;
  const sha256Initial = await generateSHA256(initialString);

  const md5Params = generateMD5(
    `dt=${dt}&cashierpass=${cashierpass}&cashdeskid=${cashdeskid}`
  );

  const finalSignature = await generateSHA256(sha256Initial + md5Params);

  const confirm = generateMD5(`${cashdeskid}:${hash}`);

  return {finalSignature, confirm};
}

async function checkBalance() {
  const dt = getCurrentUTCTimestamp();
  const {finalSignature, confirm} = await generateSignaturesForBalance(dt);
  const url = `https://partners.servcul.com/CashdeskBotAPI/Cashdesk/${cashdeskid}/Balance?confirm=${confirm}&dt=${dt}`;
  const headers = {
    "Content-Type": "application/json",
    Sign: finalSignature,
  };

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  const responseData = await response.json();
  console.log("Response:", responseData);
  return responseData;
}

export {
  getCurrentUTCTimestamp,
  generateSHA256,
  generateMD5,
  generateSignatures,
  generateSignatures2,
  rechargeAccount,
  withdrawFromAccount,
  generateSignaturesForBalance,
  checkBalance,
};
