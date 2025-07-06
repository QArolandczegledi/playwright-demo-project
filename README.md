# Demo Test Automation Project for www.automationexercise.com

## 🧪 Introduction

This repository hosts a **demo test automation project** for the dummy webshop at [www.automationexercise.com](https://www.automationexercise.com).  
The project was created to showcase my test automation skills using modern tools and techniques in TypeScript and Playwright.

It includes three complete **end-to-end (E2E)** test cases:
- ✅ Registration flow (with a random generated user)
- ✅ Login (with an existing user)
- ✅ Full checkout process (with an existing user)

All tests interact with real web elements: forms, buttons, alerts, file downloads etc.

---

## 🛠️ Technologies Used

- TypeScript
- Playwright
- Faker (for random data generation)
- Node.js / npm

---

## 🎯 Objective

The main goal of the project is to **demonstrate proficiency** in:
- Page Object Model (POM) design pattern
- Dynamic data handling using Faker
- Targeting elements effectively with roles, data attributes, and CSS
- Form interactions and assertions
- File download and content validation
- Good code structure and readability
- Minimal but meaningful automation logging

---

## 🔐 Test User Information

Some tests (like login and checkout) use a **pre-registered user**.  
Please ensure the cart is **empty before running the test**, since there’s no API used to clear it beforehand.

Use the following credentials if manual login is needed:
- email: automationdemo@project.com
- password: alohomora


---

## ⚙️ Prerequisites

Make sure the following are installed on your machine:

- Node.js (v18 or higher recommended)
- npm (comes with Node)
- Git

▶️ Running the Tests

Run a specific test file:
- npx playwright test tests/registration.spec.ts
- npx playwright test tests/checkout.spec.ts
- npx playwright test tests/login.spec.ts

---

## 🔮 Future Improvements

This is a demo project focused on clean structure and basic E2E flows.  
In a next phase, the following features could be added:

- 📸 **Automatic screenshots** on test failure or after success
- 📝 **Detailed logging** using a custom logger (e.g., Winston)
- 📦 **CI/CD integration** (e.g., GitHub Actions, Jenkins)
- 📊 **Test reporting tools** like Allure or HTML report via Playwright
- 🔁 **API cleanup scripts** to reset test data
- 🌐 **Cross-browser** testing
- 🔐 **Environment configuration**
- ✅ **More test coverage** including edge cases, error flows, and performance assertions etc.



