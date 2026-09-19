# ReplyWise AI

### Turn confusing messages into clear actions.

ReplyWise AI is an AI-powered message analysis application that converts unstructured messages, emails, notifications, and instructions into structured and actionable information.

Instead of manually reading a long message and identifying what needs to be done, ReplyWise analyzes the content and extracts:

* Summary
* Category
* Priority
* Deadline
* Action items
* Suggested reply

The application uses a **React frontend**, **Spring Boot backend**, and a **locally hosted LLM through Ollama**.

It is designed to run completely on a local machine without requiring a paid cloud AI API.

---

## Features

### 1. AI Message Analysis

Paste any message into ReplyWise and let the AI analyze it.

Example:

> Your interview is scheduled for Thursday at 11 AM. Please carry your ID proof and updated resume. Kindly confirm your availability.

ReplyWise can convert it into:

```text
Category: JOB

Summary:
Interview scheduled for Thursday at 11 AM.

Priority:
HIGH

Deadline:
Thursday 11:00 AM

Actions:
- Confirm availability
- Carry ID proof
- Carry updated resume

Suggested Reply:
Thank you for the information. I confirm my availability
for the interview.
```

---

### 2. Message Categorization

The AI categorizes messages into predefined categories:

* JOB
* BILL
* APPOINTMENT
* TRAVEL
* PERSONAL
* GENERAL

This helps users quickly understand the type of message they received.

---

### 3. Priority Detection

ReplyWise identifies the urgency of a message.

Supported priorities:

* HIGH
* MEDIUM
* LOW

For example, a payment due today or an interview requiring confirmation may be classified as `HIGH`.

---

### 4. Deadline Extraction

If a message contains a deadline, date, or time, ReplyWise extracts it.

Example:

```text
Please submit the assignment by Friday at 6 PM.
```

Result:

```text
Deadline:
Friday 6:00 PM
```

If no deadline exists:

```text
Deadline:
No deadline
```

---

### 5. Action Item Extraction

ReplyWise identifies tasks that the user needs to complete.

Example:

```text
Please upload your resume, submit your ID proof,
and confirm your interview availability.
```

Result:

```text
Actions:

- Upload resume
- Submit ID proof
- Confirm interview availability
```

---

### 6. Suggested Reply

ReplyWise can generate a short and professional response based on the original message.

This is useful for:

* Job-related messages
* Interview invitations
* Appointment confirmations
* Business communication
* General requests

---

### 7. Save Tasks

After analyzing a message, users can save the result using the **Save Task** button.

Saved information includes:

* Original message
* AI analysis
* Category
* Priority
* Deadline
* Actions
* Suggested reply
* Saved timestamp

Saved tasks are stored using the browser's **localStorage**.

No database is required for this feature.

---

### 8. Saved Tasks Page

Users can open the **Saved Tasks** page and view previously saved analyses.

Users can also delete saved tasks.

The current implementation uses browser localStorage, so saved tasks remain available in the same browser on the same device.

---

## Why ReplyWise AI?

Modern users receive a large number of messages every day from:

* Recruiters
* Companies
* Banks
* Colleges
* Travel services
* Hospitals
* Subscription services
* Friends and family
* Business communication

Important information such as deadlines and required actions is often hidden inside long messages.

ReplyWise AI reduces the manual effort required to understand these messages by converting unstructured text into structured information.

### Traditional approach

```text
Receive message
      ↓
Read entire message
      ↓
Find important information
      ↓
Identify deadline
      ↓
Identify required actions
      ↓
Decide priority
      ↓
Write a reply
```

### ReplyWise approach

```text
Paste message
      ↓
AI analyzes message
      ↓
Structured result
      ↓
Summary + Priority + Deadline
+ Actions + Suggested Reply
```

---

# System Architecture

ReplyWise follows a simple layered architecture.

```text
                    USER
                      │
                      ▼
              React Frontend
              localhost:5173
                      │
                      │ REST API
                      ▼
              Spring Boot Backend
              localhost:8080
                      │
                      ▼
                AI Service
                      │
                      ▼
               Ollama Client
                      │
                      │ HTTP
                      ▼
             Ollama LLM Server
             localhost:11434
                      │
                      ▼
                Local LLM
```

The frontend does not communicate directly with Ollama.

Instead:

```text
React
  ↓
Spring Boot
  ↓
Ollama
  ↓
LLM
  ↓
Spring Boot
  ↓
React
```

This keeps the AI integration behind the backend and makes the application easier to extend later.

---

# Technology Stack

## Frontend

* React.js
* JavaScript
* Vite
* Axios
* React Router
* CSS
* Browser localStorage

## Backend

* Java 21
* Spring Boot
* Spring MVC
* Spring Validation
* Spring Actuator
* Maven
* REST APIs
* Jackson

## AI

* Ollama
* Locally hosted LLM
* Structured JSON output
* Schema-based AI response validation

## Development Tools

* Git
* GitHub
* VS Code / IntelliJ IDEA
* Postman
* Chrome / Edge

---

# Project Structure

```text
replywise-ai/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── MessageInput.jsx
│   │   │   ├── AnalysisResult.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   ├── SaveTaskButton.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AnalyzerPage.jsx
│   │   │   └── SavedTasks.jsx
│   │   │
│   │   ├── services/
│   │   │   └── aiService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── replywise/
│   │   │   │           ├── ReplywiseApplication.java
│   │   │   │           │
│   │   │   │           ├── controller/
│   │   │   │           │   └── AIController.java
│   │   │   │           │
│   │   │   │           ├── service/
│   │   │   │           │   └── AIService.java
│   │   │   │           │
│   │   │   │           ├── client/
│   │   │   │           │   └── OllamaClient.java
│   │   │   │           │
│   │   │   │           ├── dto/
│   │   │   │           │   ├── AnalyzeRequest.java
│   │   │   │           │   └── AnalysisResponse.java
│   │   │   │           │
│   │   │   │           └── config/
│   │   │   │               └── WebConfig.java
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   ├── pom.xml
│   └── ...
│
├── .gitignore
└── README.md
```

---

# How the Application Works

## Step 1 — User enters a message

The user enters an email or message into the React interface.

Example:

```text
Your technical interview is scheduled for Monday at 10 AM.
Please bring your updated resume and a valid ID proof.
Please confirm your availability.
```

---

## Step 2 — React sends the message

The frontend sends a POST request to the Spring Boot backend.

```http
POST /api/ai/analyze
```

Request:

```json
{
  "message": "Your technical interview is scheduled for Monday at 10 AM. Please bring your updated resume and a valid ID proof. Please confirm your availability."
}
```

---

## Step 3 — Spring Boot processes the request

The request is received by:

```text
AIController
```

The controller passes the message to:

```text
AIService
```

The service delegates the AI processing to:

```text
OllamaClient
```

---

## Step 4 — Spring Boot communicates with Ollama

The backend sends the message to the local Ollama server.

```text
Spring Boot
     ↓
http://localhost:11434
     ↓
Ollama
     ↓
Selected LLM
```

The application uses structured output so that the AI response follows the expected format.

---

## Step 5 — LLM analyzes the message

The model identifies:

```text
Category
Summary
Priority
Deadline
Actions
Suggested Reply
```

---

## Step 6 — Structured response returns to Spring Boot

The backend validates and converts the AI response into:

```java
AnalysisResponse
```

The response is then returned to React.

---

## Step 7 — React displays the result

The frontend displays each result in a separate card.

```text
┌──────────────────────────────┐
│ Summary                      │
│ Interview scheduled...       │
└──────────────────────────────┘

┌──────────────────────────────┐
│ Priority                     │
│ HIGH                         │
└──────────────────────────────┘

┌──────────────────────────────┐
│ Deadline                     │
│ Monday 10:00 AM              │
└──────────────────────────────┘

┌──────────────────────────────┐
│ Actions                      │
│ • Carry resume               │
│ • Carry ID proof             │
│ • Confirm availability       │
└──────────────────────────────┘

┌──────────────────────────────┐
│ Suggested Reply              │
│ Thank you for the...         │
└──────────────────────────────┘

          🔖 Save Task
```

---

# Local Storage Architecture

Saved tasks are currently stored in the browser.

Storage key:

```text
replywise_saved_tasks
```

A saved task has the following structure:

```json
{
  "id": "unique-task-id",
  "originalMessage": "Original message...",
  "analysis": {
    "category": "JOB",
    "summary": "Interview scheduled...",
    "priority": "HIGH",
    "deadline": "Monday 10:00 AM",
    "actions": [
      "Carry ID proof",
      "Carry updated resume",
      "Confirm availability"
    ],
    "suggestedReply": "Thank you for the information..."
  },
  "savedAt": "2026-09-19T10:00:00.000Z"
}
```

This allows the application to persist saved tasks even after refreshing the page.

### Current limitation

Because localStorage is browser-specific:

* Data is stored only on the current browser/device.
* Clearing browser storage removes saved tasks.
* Saved tasks are not synchronized between devices.
* There is currently no user account or cloud database.

A future version can replace localStorage with PostgreSQL.

---

# Requirements

Before running the project, install:

### Required

* Java 21
* Maven
* Node.js
* npm
* Ollama
* Git

You can verify the installations:

```bash
java -version
```

```bash
mvn -version
```

```bash
node -v
```

```bash
npm -v
```

```bash
ollama --version
```

---

# Installing Ollama

Download and install Ollama on your operating system.

After installation, verify:

```bash
ollama --version
```

Make sure the Ollama service is running.

You can verify the server using:

```text
http://localhost:11434
```

---

# Downloading the AI Model

ReplyWise is configured to use:

```text
gemma3:4b
```

Download the model:

```bash
ollama pull gemma3:4b
```

You can verify the model:

```bash
ollama list
```

You should see the model in the list.

You can also test it directly:

```bash
ollama run gemma3:4b
```

---

# Running the Backend

Open a terminal and navigate to the backend:

```bash
cd backend
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend will start on:

```text
http://localhost:8080
```

The AI endpoint is:

```text
POST http://localhost:8080/api/ai/analyze
```

---

# Running the Frontend

Open another terminal.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

Open that URL in your browser.

---

# Complete Startup Process

Whenever you want to run ReplyWise AI locally:

### Terminal 1 — Ollama

Make sure Ollama is running.

Verify:

```bash
ollama list
```

---

### Terminal 2 — Backend

```bash
cd backend
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

---

### Terminal 3 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Then open:

```text
http://localhost:5173
```

---

# API Documentation

## Analyze Message

### Endpoint

```http
POST /api/ai/analyze
```

### URL

```text
http://localhost:8080/api/ai/analyze
```

### Request

```json
{
  "message": "Your interview is scheduled for Thursday at 11 AM. Please carry your ID proof and updated resume."
}
```

### Response

```json
{
  "category": "JOB",
  "summary": "Interview scheduled for Thursday at 11 AM.",
  "priority": "HIGH",
  "deadline": "Thursday 11:00 AM",
  "actions": [
    "Carry ID proof",
    "Carry updated resume"
  ],
  "suggestedReply": "Thank you for the information. I will be available for the interview."
}
```

---

# Testing the API with Postman

You can test the backend independently of React.

Create a new request in Postman.

Method:

```text
POST
```

URL:

```text
http://localhost:8080/api/ai/analyze
```

Headers:

```text
Content-Type: application/json
```

Body → raw → JSON:

```json
{
  "message": "Your interview is scheduled for Friday at 2 PM. Please confirm your availability and carry your updated resume."
}
```

Send the request.

The backend should return the structured AI analysis.

---

# Configuration

The backend uses:

```text
backend/src/main/resources/application.properties
```

Example configuration:

```properties
spring.application.name=replywise-backend

server.port=8080

ollama.base-url=http://localhost:11434
ollama.model=gemma3:4b

management.endpoints.web.exposure.include=health,info
management.endpoint.health.show-details=never

logging.level.com.replywise=INFO
logging.level.org.springframework.web=INFO
```

For GitHub, do not commit machine-specific or secret configuration.

A safe example configuration can be maintained as:

```text
application.example.properties
```

---

# Validation

The backend validates incoming messages.

The message:

* Cannot be empty
* Cannot exceed 5000 characters

Example invalid request:

```json
{
  "message": ""
}
```

The backend rejects the request instead of sending an invalid input to the AI model.

---

# Error Handling

The application handles several failure scenarios.

### Empty message

```text
Message cannot be empty
```

### Message too long

```text
Message cannot exceed 5000 characters
```

### Ollama unavailable

The backend returns an error when Ollama cannot be reached.

### Invalid AI response

The backend validates the AI response against the expected structured format.

This prevents the frontend from receiving an unexpected response structure.

---

# Design Decisions

## Why React?

React provides a component-based UI structure.

The application separates the UI into reusable components such as:

```text
MessageInput
AnalysisResult
ResultCard
SaveTaskButton
LoadingSpinner
```

---

## Why Spring Boot?

Spring Boot provides the backend API and acts as an integration layer between the frontend and local LLM.

This avoids coupling the React application directly to Ollama.

It also makes it easier to add future functionality such as:

* Authentication
* Database persistence
* File processing
* RAG
* Background jobs
* AI agents
* External APIs

---

## Why Ollama?

Ollama allows the application to run an LLM locally.

Benefits include:

* No paid AI API required for development
* Local inference
* No API key required
* Easy model switching
* Useful for experimenting with LLM applications

---

## Why Structured JSON Output?

A raw LLM response can contain natural language, formatting, or additional text.

ReplyWise requires predictable data for the UI.

Therefore, the application uses structured output with a defined schema:

```text
category
summary
priority
deadline
actions
suggestedReply
```

This makes the AI response easier for the backend to parse and the frontend to render.

---

# Security Considerations

The current project is designed primarily as a local development and portfolio application.

It currently does not implement:

* User authentication
* Role-based authorization
* Database encryption
* Cloud deployment security
* Rate limiting
* Production-grade secrets management

For production deployment, additional security measures should be implemented.

---

# Current Limitations

The current version intentionally keeps the architecture simple.

### 1. Local LLM

AI processing depends on the user's local machine and Ollama.

Performance depends on:

* CPU
* RAM
* GPU
* Selected model

### 2. Browser Storage

Saved tasks are stored in localStorage.

There is no cloud synchronization.

### 3. No Authentication

There are no user accounts.

### 4. No Database

The application currently does not use PostgreSQL or another database.

### 5. No File Upload

Users currently paste text manually.

---

# Future Roadmap

ReplyWise can be expanded into a more complete AI productivity platform.

## V1 — AI Message Analysis

Current version:

```text
Message
   ↓
LLM
   ↓
Structured Analysis
```

---

## V2 — Persistent Storage

Add:

```text
PostgreSQL
```

Store:

* Messages
* Tasks
* Deadlines
* User preferences
* Analysis history

Architecture:

```text
React
  ↓
Spring Boot
  ↓
PostgreSQL
```

---

## V3 — Document Processing

Allow users to upload:

* PDF
* TXT
* DOCX
* Emails

Pipeline:

```text
Document
   ↓
Text Extraction
   ↓
AI Analysis
   ↓
Structured Tasks
```

---

## V4 — RAG

Introduce Retrieval-Augmented Generation.

Potential technologies:

* PostgreSQL
* pgvector
* Embeddings

This would allow ReplyWise to retrieve relevant information from previously uploaded documents.

---

## V5 — Task and Deadline Management

Convert extracted actions into trackable tasks.

Example:

```text
Task:
Submit resume

Deadline:
Friday 6 PM

Status:
Pending
```

Possible statuses:

```text
PENDING
IN_PROGRESS
COMPLETED
```

---

## V6 — AI Agent

A future agentic version could allow the AI to perform actions using approved tools.

For example:

```text
Message
   ↓
AI Agent
   ↓
Identify task
   ↓
Check calendar
   ↓
Prepare response
   ↓
Ask user for approval
   ↓
Perform action
```

Human approval can be kept between the AI decision and external action.

---

## V7 — Event-Driven Architecture

For a larger-scale version, technologies such as:

* Redis
* Apache Kafka
* Background workers

could be introduced.

Example:

```text
Message Received
       ↓
Kafka Event
       ↓
AI Processing
       ↓
Task Created
       ↓
Notification Service
```

---

# Learning Outcomes

This project provides hands-on experience with:

### Backend Development

* REST API development
* Spring Boot
* DTOs
* Validation
* Service layer
* HTTP clients
* Exception handling
* Configuration management

### Frontend Development

* React components
* State management
* API integration
* React Router
* Loading states
* Error handling
* localStorage

### AI Engineering

* LLM integration
* Prompt engineering
* Structured output
* JSON schema
* Local LLM inference
* AI response validation

### Software Architecture

* Frontend/backend separation
* Layered architecture
* AI integration layer
* API design
* Future scalability planning

---

# Example Use Cases

## Job Search

```text
Recruiter message
       ↓
ReplyWise
       ↓
Interview date
Required documents
Deadline
Priority
Suggested response
```

---

## Bills

```text
Payment notification
       ↓
ReplyWise
       ↓
Bill category
Payment deadline
Priority
Required action
```

---

## Appointments

```text
Doctor appointment message
       ↓
ReplyWise
       ↓
Appointment date
Time
Required documents
Suggested response
```

---

## Travel

```text
Flight / Hotel message
       ↓
ReplyWise
       ↓
Travel category
Date/time
Required actions
Important information
```

---

# GitHub Setup

Clone the project:

```bash
git clone <your-github-repository-url>
```

Navigate into the project:

```bash
cd replywise-ai
```

Then follow the frontend, backend, and Ollama setup instructions above.

---

# Environment Requirements

Recommended development environment:

```text
Java       21+
Node.js    18+
npm        9+
Maven      3.9+
Ollama     Latest version
```

The LLM itself requires sufficient system resources. Larger models generally require more RAM and/or GPU resources.

---

# Troubleshooting

## Ollama connection error

If the backend cannot connect to Ollama, verify that Ollama is running.

Check:

```text
http://localhost:11434
```

Also verify:

```bash
ollama list
```

---

## Model not found

If the configured model does not exist:

```bash
ollama pull gemma3:4b
```

Then verify:

```bash
ollama list
```

---

## Frontend cannot connect to backend

Make sure the backend is running:

```text
http://localhost:8080
```

Also verify that the frontend API URL points to:

```text
http://localhost:8080/api/ai
```

---

## CORS error

The backend allows requests from:

```text
http://localhost:5173
```

If your Vite server uses a different port, update the CORS configuration in:

```text
WebConfig.java
```

---

## Saved tasks disappeared

Saved tasks are stored in browser localStorage.

If browser storage was cleared or a different browser/device is being used, the previous tasks will not be available.

---

# Project Status

```text
Frontend             ✅
Spring Boot API      ✅
Ollama Integration   ✅
Structured AI Output ✅
Message Analysis     ✅
Task Saving          ✅
Saved Tasks Page     ✅
localStorage         ✅
Authentication       🔜
Database             🔜
RAG                  🔜
AI Agent             🔜
Notifications        🔜
```

---

# Resume Description

### ReplyWise AI — AI Message-to-Action Assistant

**Technologies:** React.js, JavaScript, Java 21, Spring Boot, REST APIs, Ollama, Local LLM, HTML/CSS

* Built an AI-powered message analysis application that converts unstructured messages into structured summaries, priorities, deadlines, action items, and suggested replies using a locally hosted LLM.
* Implemented a Spring Boot AI integration layer with structured JSON output validation and a React-based interface for analyzing and managing AI-generated tasks.
* Added browser-based task persistence using localStorage, allowing users to save, view, and delete analyzed tasks without requiring a database.

---

# Author

**Akash**

Java Full Stack Developer | 

---

# License

This project is intended for learning, experimentation, and portfolio purposes.
