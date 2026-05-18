# API Key Authentication Task

This project demonstrates API Key Authentication using Express.

## Features

- API key authentication using custom headers
- Permission-based authorization
- Public and protected routes
- Read and write permissions
- Proper HTTP status codes

---

## How is API key authentication different from Basic Auth?

Basic Auth uses a username and password encoded in Base64.  
API key authentication uses a unique key assigned to a client or application.

---

## Why is API key authentication usually a poor choice for user-facing applications?

API keys are static and can be exposed easily in browsers or frontend code.  
They are better suited for server-to-server communication.

---


## What strategies can be used to keep API keys safe and revoke them when leaked?

- Store keys in environment variables
- Rotate keys regularly
- Use HTTPS
- Revoke compromised keys immediately
- Limit permissions for each key

---