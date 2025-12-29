from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from llama_cpp import Llama

# -------------------- APP SETUP --------------------
app = Flask(__name__)
CORS(app)

# -------------------- LOAD VISA RULES --------------------
with open("visa_rules.json", "r", encoding="utf-8") as f:
    VISA_RULES = json.load(f)

# -------------------- LOAD LLAMA MODEL --------------------
print("🔄 Loading LLaMA model...")
print("🔥 Loaded countries:", list(VISA_RULES.keys()))

llm = Llama(
    model_path="models/Llama-3.2-3B-Instruct-Q4_K_M.gguf",
    n_ctx=1024,
    n_threads=4,
    verbose=False
)

print("✅ LLaMA model loaded")

# -------------------- HOME --------------------
@app.route("/")
def home():
    return jsonify({"message": "VisaVerse Copilot Backend running"})

# -------------------- METADATA --------------------
@app.route("/metadata", methods=["GET"])
def metadata():
    return jsonify({c: list(p.keys()) for c, p in VISA_RULES.items()})

# -------------------- ELIGIBILITY CHECK --------------------
@app.route("/check", methods=["POST"])
def check_visa():
    data = request.json
    country = data.get("country")
    purpose = data.get("purpose")

    if not country or not purpose:
        return jsonify({"error": "Missing country or purpose"}), 400

    visa_block = VISA_RULES.get(country, {}).get(purpose)
    if not visa_block:
        return jsonify({"error": "Unsupported selection"}), 404

    visa_name = list(visa_block.keys())[0]
    visa_info = visa_block[visa_name]

    return jsonify({
        "country": country,
        "purpose": purpose,
        "visa": visa_name,
        "score": visa_info["eligibility_score"],
        "documents": visa_info["documents"],
        "rejections": visa_info["common_rejections"]  # standardized field
    })

# -------------------- AI EXPLANATION --------------------
@app.route("/explain", methods=["POST"])
def explain():
    d = request.json
    prompt = f"""
You are an immigration consultant.

Country: {d['country']}
Visa: {d['visa']}
Eligibility Score: {d['score']}%
Common Rejection Reasons: {', '.join(d['rejections'])}

Explain clearly in 3–4 sentences:
• What this visa is
• What the score means
• One strength
• One concern

Strictly stay within {d['country']} immigration context.
"""
    try:
        out = llm(prompt, max_tokens=180, temperature=0.45)
        return jsonify({"text": out["choices"][0]["text"].strip()})
    except:
        return jsonify({"text": "Explanation unavailable."})

# -------------------- RISK ANALYSIS --------------------
@app.route("/risk-analysis", methods=["POST"])
def risk_analysis():
    d = request.json
    prompt = f"""
You are a senior immigration risk officer.

Country: {d['country']}
Visa: {d['visa']}
Eligibility Score: {d['score']}%
Known Risks: {', '.join(d['rejections'])}

List TOP 3 rejection risks.
For each:
• Severity (Low/Medium/High)
• One-line explanation
• One improvement action
"""
    try:
        out = llm(prompt, max_tokens=320, temperature=0.4)
        return jsonify({"analysis": out["choices"][0]["text"].strip()})
    except:
        return jsonify({"analysis": "Risk analysis unavailable."})

# -------------------- CASE OFFICER SIMULATION --------------------
@app.route("/officer-review", methods=["POST"])
def officer_review():
    d = request.json
    prompt = f"""
You are a government visa case officer.

Country: {d['country']}
Visa Type: {d['visa']}
Eligibility Score: {d['score']}%

Write an internal assessment:
• Decision: APPROVE / REQUEST INFO / REFUSE
• Exactly 3 reasons
• Confidence level (Low/Medium/High)

No advice. No other countries.
"""
    try:
        out = llm(prompt, max_tokens=280, temperature=0.35)
        return jsonify({"review": out["choices"][0]["text"].strip()})
    except:
        return jsonify({"review": "Officer review unavailable."})

# -------------------- IMPROVE MY CHANCES --------------------
@app.route("/improve-chances", methods=["POST"])
def improve_chances():
    d = request.json
    rejections = d.get("rejections", [])  # standardized field
    prompt = f"""
You are a senior immigration consultant.

Country: {d['country']}
Visa: {d['visa']}
Eligibility Score: {d['score']}%
Risk Factors: {', '.join(rejections)}

Give exactly 5 concrete actions
ranked High → Low impact
that improve approval chances
before submission.
"""
    try:
        out = llm(prompt, max_tokens=350, temperature=0.5)
        return jsonify({"actions": out["choices"][0]["text"].strip()})
    except:
        return jsonify({"actions": "Suggestions unavailable."})

# -------------------- RUN --------------------
if __name__ == "__main__":
    app.run(debug=True)
