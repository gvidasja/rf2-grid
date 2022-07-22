import { spawn } from "child_process";
import fs from "fs";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const pkg = require("../package.json");

// write .debug.env
const envContent = Object.entries(pkg.env).map(([key, val]) => `${key}=${val}`);
fs.writeFileSync(path.join(__dirname, ".debug.env"), envContent.join("\n"));

// bootstrap
spawn(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "dev"], {
  stdio: "inherit",
});
