🌟 HotDevJobs — Job Portal Web Application

HotDevJobs is a modern Job Portal Web Application designed for smooth hiring interaction between job seekers (candidates) and recruiters.

It is built with:

✔ Java Spring Boot — Backend
✔ React.js — Frontend

🔥 Features
👩‍💼 For Candidates

✔ Create and update profile
✔ Upload profile photo
✔ Add multiple skills (Skill Name, Years of Experience, Experience Level)
✔ Search jobs with smart filters:

Job Title

Location

Employment Type (Full-time / Part-time)

Remote / Office / Hybrid

Date Posted

✔ View job details
✔ Save jobs to shortlist
✔ Apply for jobs
✔ Track application status:

Pending

Accepted

Rejected

✔ View saved & applied jobs list

🧑‍💼 For Recruiters

✔ Create and update profile
✔ Upload profile photo
✔ Post new job openings
✔ Edit posted jobs
✔ Delete job posts
✔ View all jobs posted
✔ View list of candidates who applied
✔ Accept or reject candidate applications
✔ Dashboard view with job insights

🛠️ Technologies Used
Frontend

React.js
TailwindCSS
Axios
React Router DOM
LocalStorage Authentication

Backend
Spring Boot
Spring Validation
Spring Data JPA (Hibernate)
MySQL
REST API Architecture

⚙️ Running the Project Locally

Follow the steps below to run the application on your system 🔽
✔ Prerequisites

Install:
Node.js (v16+)
JDK 17
Maven
MySQL Server

🔹 1. Clone the Repository
git clone https://github.com/your-username/hotdevjobs.git
cd hotdevjobs

🔹 2. Backend Setup
Navigate to backend folder:

cd backend


Steps:

Open project in IntelliJ IDEA / VS Code / Eclipse / STS

Install Maven dependencies

Create a MySQL database e.g.:
JobPortalApi


Open application.properties and update DB username & password

Run backend:
mvn spring-boot:run


Backend runs on:

👉 http://localhost:8080


🔹 3. Frontend Setup

Navigate to frontend folder:

cd frontend
npm install
Run frontend:
npm run dev


Frontend runs on:

👉 http://localhost:5173