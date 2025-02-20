Wellness Tracker – Secure Web App\
Project Overview\
The Wellness Tracker is a web application that allows users to track their mindfulness practices, set wellness goals, and monitor their moods over time. This project focuses on implementing web security best practices, including SSL/TLS encryption, secure HTTP headers, and caching strategies. In the future I will be building more pieces of this app. I have chosen to build a Wellness Tracker app, as I think it would be cool to work on features for me to help track some of the health difficulties I am currently dealing with. I am hoping to build this app directly for manual health metrics, daily mood tracking, and goal setting.

------------------------------------------------------------------------------------

Setup Instructions
1. Clone this Repository

2. Install Dependencies\
You will need node package manager(npm) installed. If you do not have npm installed, you can go to this website to install it: https://nodejs.org/en/download/
With npm installed, type or copy in the terminal:

    "npm install"

3. Generate SSL Certificates\
This project uses OpenSSL to create a self-signed certificate.
Follow instructions for how to install OpenSSL on your computer: https://www.openssl.org/source/
Make sure that your terminal is in the project directory and input or copy this command:


    "openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes"

You will be asked to enter some information about your certificate. Enter whatever you like for the fields, although I recommend using "localhost" for the Common Name(CM)

4. Start the Server\
Use this command to start the server:

    "node server.js"

Open the app at https://localhost:3000 (accept security warning for self-signed cert).

------------------------------------------------------------------------------------

SSL Configuration\
This app is secured using OpenSSL with a self-signed certificate. This ensures encrypted HTTPS communication, preventing data interception.\
The certificate is configured using the following:

-x509 - Standard format for SSL/TLS certificates.\
-newkey rsa:2048 - RSA 2048-bit encryption	is industry standard for strong security and performance balance.\
-keyout key.pem - Stores the private key securely.\
-out cert.pem - Stores the self-signed SSL certificate.\
-days 365 - Keeps the certificate valid for testing over a 1-year period.\
-nodes - No password encryption for simplified local development, avoiding manual passphrase entry.\

------------------------------------------------------------------------------------

Secure HTTP Headers\
The implemented security headers use Helmet.js to protect against common vulnerabilities:

Content-Security-Policy - Prevents XSS and code injection.\
X-Frame-Options: DENY - Prevents clickjacking attacks.\
Strict-Transport-Security - Enforces HTTPS connections.\
X-Content-Type-Options: nosniff - Stops MIME-type sniffing.\
Referrer-Policy: strict-origin-when-cross-origin - Controls referrer information sharing.\

------------------------------------------------------------------------------------

Route and Caching Strategies\
These are the current implemented cache control strategies, with stale-while-revalidate for better performance and keeping fresh data. Some data is not cached, for security reasons.\
They are listed Route - Method - Purpose - Cache Control

/moods - GET - Fetch moods - max-age=300, stale-while-revalidate=300\
/moods - POST - Add mood - No caching\
/goals - GET - Fetch goals - max-age=600, stale-while-revalidate=600\
/goals - POST - Add goal - No caching\
/resources - GET - Fetch wellness resources - max-age=3600, stale-while-revalidate=3600\

------------------------------------------------------------------------------------

Lessons Learned & Challenges\
SSL Certificate Issues\
When I was trying to start my server I had issues finding my SSL certificate. I had accidentally generated the certificate in a different directory. I proceeded to fix the issue by generating a new certificate in the project directory.

Content Security Policy (CSP) Errors\
When I first started the project I had some errors in the console regarding CSP. I was able to fix these errors by adjusting the script-src and style-src policies to allow trusted sources.