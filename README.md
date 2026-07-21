# IPS 360 Success Platform

A unified web platform designed for IPS Academy that addresses two core gaps in the institution's learning environment: the lack of early academic risk detection for students, and the absence of a structured, anonymous feedback mechanism for teaching quality improvement.

---

## Overview

IPS 360 operates on the principle that a student's academic outcome is shaped by two equally important factors — how effectively they study, and how effectively they are taught. Most institutional tools address only one side. This platform addresses both through two independent but interconnected engines running on a single system.

The Student Engine monitors academic indicators and generates a risk score that flags potential failure weeks before it becomes irreversible. It also tracks placement readiness based on skills and project history, giving students a concrete measure of their employability rather than a vague sense of where they stand.

The Teacher Engine collects anonymous feedback from students after each class, aggregates it into a performance trend visible only to the teacher and their department head, and surfaces patterns that would otherwise go unnoticed until semester evaluations. It is designed to support improvement, not assign blame.

---

## Features

### Student Dashboard
- Risk Score calculated from attendance percentage, internal marks, and assignment submission history
- Placement Readiness Score based on skills, certifications, and project portfolio
- Personalized action items generated from the student's current score profile
- AI-powered assistant that answers student questions about their scores and improvement path in plain language
- Live score update visualization that reflects changes as academic behavior improves

### Teacher Dashboard
- Anonymous class feedback collected from students after each lecture or unit
- Performance trend graph showing feedback scores over time, visible only to the individual teacher
- Private view with no cross-teacher comparison or public ranking

### HOD Dashboard
- Department-level overview of student risk distribution
- Class-level teaching quality trends aggregated anonymously
- Early intervention signals for both academic and instructional issues

---

## Technology Stack

| Layer | Technology |
|---|---|
| Backend | Flask (Python) |
| Frontend | HTML, CSS, Bootstrap |
| Database | SQLite |
| Scoring Logic | Rule-based formula engine |
| AI Assistant | Google Gemini API (free tier) |
| Score Animation | JavaScript |

---

## System Architecture

The application follows a standard MVC pattern built on Flask. SQLite handles all data persistence during the prototype phase. The scoring engine runs server-side on every dashboard load, recalculating scores from the latest available data. The Gemini API integration passes the student's current academic profile as context alongside each query, ensuring responses are personalized rather than generic.

Role-based authentication separates the three user types — Student, Teacher, and HOD — with each role restricted to its own set of views and data.

---

## Scoring Logic

**Risk Score**

Calculated as a weighted sum of three indicators:

- Attendance below 75 percent contributes to elevated risk
- Internal marks below a threshold relative to class average contribute proportionally
- Missed assignment submissions are weighted by recency

The output is a score from 0 to 100. Scores above 65 are flagged as high risk and displayed in red. Scores between 35 and 65 are medium risk. Below 35 is considered safe.

**Placement Readiness Score**

Calculated from the student's self-reported profile:

- Technical skills matched against a predefined industry requirements list
- Number and relevance of projects completed
- Certifications held

The output is a percentage from 0 to 100 representing estimated employability relative to typical entry-level industry expectations.

---

## Team

| Member | Role |
|---|---|
| Darshil Sharma | Team Lead, Backend Development, API Integration |
| Atharv | Frontend Development, Dashboard UI |
| Dhruv | Testing, Mock Data, Presentation |

---

## Project Context

This platform was developed as a submission for the Samadhanam Hackathon 2026, hosted by IPS Academy, Indore. The theme of the hackathon was solving real problems faced by the IPS Academy community through innovation. The problem this platform addresses was identified directly from the team's experience as students at the institution.

---

## Limitations and Future Scope

The current prototype uses mock student data and rule-based scoring. Integration with IPS Academy's actual academic records system would require institutional API access, which is outside the scope of this prototype.

Mode 2, which involves scanning handwritten answer copies to detect AI-assisted writing through character recognition and writing pattern analysis, has been scoped and designed but not implemented in this version due to the machine learning training requirements involved. It remains the primary direction for the next development phase.

---

## License

This project was built for academic and demonstration purposes as part of the Samadhanam Hackathon 2026. All rights reserved by Team APX GP.
