const fs = require("fs");
const https = require("https");
const express = require("express");
const helmet = require("helmet");

const app = express();

// Load SSL certificate and key
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

// Helmet security headers - notes on why each header is included
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // Only allow content from this domain
        scriptSrc: ["'self'", "https://talson.dev"], // Allow scripts from self and trusted CDN
        objectSrc: ["'none'"], // Block <object>, <embed>, <applet>
        upgradeInsecureRequests: [], // Upgrade HTTP requests to HTTPS
      },
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    frameguard: { action: "deny" }, // Prevent clickjacking attacks
    xssFilter: true, // Prevent cross-site scripting attacks
    noSniff: true, // Prevent MIME type sniffing
  })
);

// Middleware to set Cache-Control headers - stale-while-revalidate is used to prevent caching of stale data
const cacheControl = (duration) => (req, res, next) => {
  res.set("Cache-Control", `public, max-age=${duration}, stale-while-revalidate=${duration}`);
  next();
};

// Sample data for testing
const moods = [{ id: 1, mood: "Happy", date: "2025-02-20" }];
const goals = [{ id: 1, goal: "Meditate daily", progress: "In Progress" }];
const resources = [{ id: 1, title: "Mindfulness Guide", link: "null" }];

// Routes with caching

    // Moods route
    app.get("/moods", cacheControl(300), (req, res) => res.json(moods)); // Cache for 5 min
    app.post("/moods", (req, res) => {
    moods.push(req.body);
    res.status(201).send("Mood logged!");
    });

    // Goals route
    app.get("/goals", cacheControl(600), (req, res) => res.json(goals)); // Cache for 10 min
    app.post("/goals", (req, res) => {
    goals.push(req.body);
    res.status(201).send("Goal added!");
    });

    // Resources route
    app.get("/resources", cacheControl(3600), (req, res) => res.json(resources)); // Cache for 1 hour

// Create HTTPS server
https.createServer(options, app).listen(3000, () => {
  console.log("Server running at https://localhost:3000");
});

