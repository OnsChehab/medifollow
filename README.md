# MediFollow — Post-discharge patient follow-up platform

MediFollow helps hospital teams follow patients after they leave the hospital. Patients report their vital signs and symptoms from home, and the care team (physicians, nurses, coordinators) monitors them, receives alerts and schedules follow-up appointments.

> Academic project (PI) — ESPRIT, 4th year engineering, 2025-2026, team of 5.
> This repository contains the **first version** of the platform (February 2026): an Angular front end and a NestJS REST API.

## Features

**Patients**
- Enter vital signs: temperature, blood pressure, heart rate, weight
- Report symptoms with a severity level (mild, moderate, severe, critical)
- Answer follow-up questionnaires

**Care team**
- Physicians: patient list, patient record, schedule and messages
- Nurses: book appointments with a physician
- Coordinators: follow-up dashboard

**Administration**
- Staff and patient management, hospital units
- Questionnaire builder
- Alert supervision
- Audit logs for the auditor role

**7 roles:** super admin, admin, physician, nurse, coordinator, patient, auditor — each with its own dashboard and routes.

## Tech stack

| Layer | Technologies |
|---|---|
| Front end | Angular 20, TypeScript, SCSS, route guards (authentication and role) |
| Back end | NestJS 11, TypeScript, REST API, class-validator |
| Database | MongoDB with TypeORM |
| API docs | Swagger (OpenAPI) |
| Tests | Jest (unit and e2e setup) |

## Architecture

```
medifollow_FE/   Angular application
  src/app/core/        auth service, guards, models, API services
  src/app/features/    one folder per role (patient, doctor, nurse, admin, ...)
  src/app/layouts/     shared layouts

medifollow_be/   NestJS API — one module per business domain
  users/              users and roles
  patients/           patient clinical records
  medical-data/       vital parameters and symptoms
  questionnaires/     templates and responses
  safety/             alerts and notifications
  doctor-schedule/    physician availability and exceptions
  appointments/       follow-up appointments
  hospital-services/  hospital units
```

Each back-end module follows the NestJS structure: entity, service (business logic and database access) and controller (REST endpoints). Input validation is global, with `ValidationPipe` (`whitelist` and `transform`).

## Getting started

**Requirements:** Node.js 20+, MongoDB running locally.

**Back end**

```bash
cd medifollow_be
npm install
```

Create a `.env` file:

```
DB_HOST=localhost
DB_PORT=27017
DB_NAME=medifollow
DB_SYNC=true
PORT=3000
```

```bash
npm run start:dev
```

The API runs on `http://localhost:3000` and the Swagger documentation on `http://localhost:3000/api/docs`.

**Front end**

```bash
cd medifollow_FE
npm install
npm start
```

The application runs on `http://localhost:4200`.

## Status and next steps

This is the first iteration of the project. The following parts were planned or developed later by the team:

- server-side authentication (JWT) and role checks on every API route (in this version, access control is done by Angular route guards only)
- automatic rule-based alerts when a patient's measurements exceed thresholds
- email verification and real-time notifications

## Author

Ons Chehab — computer engineering student at ESPRIT (TWIN track)
[LinkedIn](https://www.linkedin.com/in/ons-chehab-90b298294)
