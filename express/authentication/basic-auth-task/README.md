# Basic Auth Task

## Overview

This project demonstrates **HTTP Basic Authentication** using Express.  
It includes a simple server with public and protected routes. Protected routes require a valid username and password sent via the `Authorization` header.

---

## Features

- Public route (no authentication required)
- Protected routes using Basic Auth middleware
- Hardcoded list of users and items
- Custom middleware for authentication
- Proper HTTP status codes (200, 400,401)

---

## Why is Base64 not considered a security measure?

Base64 is not a security measure because it is an encoding scheme, not encryption. It simply translates data into a standard set of printable characters. Because the algorithm is completely public and requires no secret key, anyone can easily decode the string back into its original, readable format.

---

## What is the purpose of the WWW-Authenticate header?

WWW-Authenticate header is a server response header used in HTTP authentication. When a client requests access to a protected resource without valid credentials, the server uses this header (alongside a 401 Unauthorized status) to prompt the client, specifying the supported authentication methods and the realm.

---

## In what real-world situations is Basic Auth still acceptable?

Basic Auth is secure and should only be adopted in situations where it is used in conjunction with HTTPS/TLS encryption, or when other, more sophisticated methods are not possible.
