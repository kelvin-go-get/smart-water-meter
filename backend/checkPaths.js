import { fileURLToPath } from "url";
import { dirname } from "path";

// Resolve the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("Current Directory:", __dirname);
console.log(
  "Customer Controller Path:",
  new URL("./controllers/customerController.js", import.meta.url).pathname
);
