const crypto = require("crypto");

const algorithm = "aes-256-cbc"; // AES algorithm
const key = crypto.randomBytes(32); // Secret key (must be 32 bytes for aes-256-cbc)
const iv = crypto.randomBytes(16); // Initialization vector (16 bytes)

// Encrypt Function
function encrypt(data) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { encryptedData: encrypted, iv: iv.toString("hex") };
}

// Decrypt Function
function decrypt(encryptedData, ivHex) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(ivHex, "hex")
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Usage Example
const data = "Sensitive user information";

// Encrypt the data
const { encryptedData, iv: div } = encrypt(data);
console.log("Encrypted:", encryptedData);


console.log(div, iv, key);

// Decrypt the data
const decryptedData = decrypt(encryptedData, div);
console.log("Decrypted:", decryptedData);
