## VisaVerse Copilot

AI-Powered Global Mobility & Visa Decision Assistant

## Overview

VisaVerse Copilot is an AI-driven assistant that helps users understand, prepare, and improve their visa applications. It simulates case officer reasoning, analyzes application risk, and provides actionable improvement guidance, reducing common rejection causes like incomplete documentation or misunderstandings.

Built for the VisaVerse AI Hackathon, it promotes global mobility, borderless collaboration, and accessible international opportunities.

## Problem

Visa processes are complex and opaque. Applicants often struggle to:

Understand eligibility requirements

Identify weak points in their application

Know improvements to increase approval chances

## Solution

VisaVerse Copilot acts as a virtual visa advisor:

AI Visa Explanation: Breaks down visa rules in simple, human-readable language

Case Officer Simulation: Shows how applications are evaluated and highlights concerns

Risk Analysis Card: Estimates approval risk and explains reasoning

Improvement Suggestions: Provides priority-based actionable guidance

## Technology Stack

Frontend: HTML, CSS, JavaScript

Backend: Python (Flask)

AI/ML: LLaMA-based model (local), rule-based checks, risk scoring algorithms

Database: JSON rules

Architecture
Frontend (UI) → Backend API → AI Engine
                        ├─ Eligibility Rules
                        ├─ Case Officer Simulation
                        └─ Risk Analysis & Explanation

Model Setup

Note: Model file not included due to GitHub limits.

Download a compatible .gguf model (e.g., Llama-3.2-3B-Instruct)

Place it in backend/models/

Update the path in app.py if needed

## Output:
<img width="1360" height="612" alt="Screenshot (202)" src="https://github.com/user-attachments/assets/99c9ca4a-3c42-4dbf-8880-0209784ceaac" />
<img width="1360" height="606" alt="Screenshot (203)" src="https://github.com/user-attachments/assets/81b618d4-617f-4bd2-b54a-200dc532ab8e" />
<img width="1360" height="612" alt="Screenshot (204)" src="https://github.com/user-attachments/assets/f11a0442-ac65-4a9d-bf82-b3c671350a5a" />
<img width="1360" height="610" alt="Screenshot (206)" src="https://github.com/user-attachments/assets/f7db2d84-3d7c-4988-bf8f-62edece4ec3e" />
<img width="1360" height="597" alt="Screenshot (207)" src="https://github.com/user-attachments/assets/963b3e50-c39c-4197-ba33-7182d804e744" />


## Installation & Run
# Clone the repo
git clone https://github.com/rdjhm0765/visaverse-copilot

# Create & activate virtual environment
python -m venv venv
venv\Scripts\activate   # Windows
source venv/bin/activate # Linux/Mac

# Install dependencies
pip install -r backend/requirements.txt

# Run backend
python backend/app.py


Open frontend/index.html in a browser to interact with the Copilot.

Use Cases & Impact

Students applying for international education

Professionals seeking work visas

Tourists and first-time applicants needing guidance

Future Enhancements

OCR-based document verification

Multilingual support

Live immigration policy updates

Accessibility for low-bandwidth regions

## Team

1.Harish Madhavan S – Full-Stack & AI Developer
sharishmadhavanhm@gmail.com


## Disclaimer

Informational tool only; does not replace official immigration portals or legal advice.
