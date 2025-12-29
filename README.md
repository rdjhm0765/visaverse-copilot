VisaVerse Copilot

AI-Powered Global Mobility & Visa Decision Assistant

Overview

VisaVerse Copilot is an AI-driven assistant that helps users understand, prepare, and improve their visa applications. It simulates case officer reasoning, analyzes application risk, and provides actionable improvement guidance, reducing common rejection causes like incomplete documentation or misunderstandings.

Built for the VisaVerse AI Hackathon, it promotes global mobility, borderless collaboration, and accessible international opportunities.

Problem

Visa processes are complex and opaque. Applicants often struggle to:

Understand eligibility requirements

Identify weak points in their application

Know improvements to increase approval chances

Solution

VisaVerse Copilot acts as a virtual visa advisor:

AI Visa Explanation: Breaks down visa rules in simple, human-readable language

Case Officer Simulation: Shows how applications are evaluated and highlights concerns

Risk Analysis Card: Estimates approval risk and explains reasoning

Improvement Suggestions: Provides priority-based actionable guidance

Technology Stack

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

Installation & Run
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

Team

1.Harish Madhavan S – Full-Stack & AI Developer
sharishmadhavanhm@gmail.com
2.Hari Venkatanarayanan V

Disclaimer

Informational tool only; does not replace official immigration portals or legal advice.
