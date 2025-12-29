const API = "http://127.0.0.1:5000";

const countrySel = document.getElementById("country");
const purposeSel = document.getElementById("purpose");
const result = document.getElementById("result");

let meta = {};
let session = {};

window.onload = async () => {
  const r = await fetch(`${API}/metadata`);
  meta = await r.json();

  countrySel.innerHTML = `<option value="">Select Country</option>`;
  purposeSel.innerHTML = `<option value="">Select Purpose</option>`;

  Object.keys(meta).forEach(c => {
    countrySel.innerHTML += `<option value="${c}">${c}</option>`;
  });
};

countrySel.onchange = () => {
  purposeSel.innerHTML = `<option value="">Select Purpose</option>`;
  (meta[countrySel.value] || []).forEach(p => {
    purposeSel.innerHTML += `<option value="${p}">${p}</option>`;
  });
};

async function checkVisa() {
  result.classList.remove("hidden");
  result.innerHTML = `
    <div class="text-center py-6 text-gray-500 animate-pulse">
      🔍 Analyzing eligibility...
    </div>
  `;

  try {
    const base = await post("/check", {
      country: countrySel.value,
      purpose: purposeSel.value
    });

    session = base;

    const explain = await post("/explain", {
      country: base.country,
      visa: base.visa,
      score: base.score,
      rejections: base.rejections
    });

    const risk = await post("/risk-analysis", {
      country: base.country,
      visa: base.visa,
      score: base.score,
      rejections: base.rejections
    });

    const officer = await post("/officer-review", {
      country: base.country,
      visa: base.visa,
      score: base.score
    });

    const improve = await post("/improve-chances", {
      country: base.country,
      visa: base.visa,
      score: base.score,
      rejections: base.rejections
    });

    render(base, explain.text, risk.analysis, officer.review, improve.actions);

  } catch (err) {
    console.error(err);
    result.innerHTML = `<p class="text-red-600">Something went wrong.</p>`;
  }
}

async function post(url, data) {
  const res = await fetch(`${API}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

// ---------------- RENDER FUNCTION ----------------
function render(d, explain, riskText, officerText, improveText) {
  result.innerHTML = `
    <div class="space-y-6">

      <!-- Visa Card -->
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="text-xl font-bold">${d.visa}</h2>
        <p class="mt-2 font-semibold">Eligibility Score: ${d.score}%</p>
        <div class="h-3 bg-gray-200 rounded mt-2">
          <div class="h-3 bg-green-500 rounded" style="width:${d.score}%"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <h3 class="font-semibold">Required Documents</h3>
            <ul class="list-disc list-inside text-gray-700 mt-2">
              ${d.documents.map(doc => `<li>${doc}</li>`).join("")}
            </ul>
          </div>
          <div>
            <h3 class="font-semibold">Common Rejection Reasons</h3>
            <ul class="list-disc list-inside text-gray-700 mt-2">
              ${d.rejections.map(r => `<li>${r}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>

      <!-- AI Explanation -->
      <div class="bg-blue-50 p-5 rounded">
        <h3 class="font-bold">AI Explanation</h3>
        <p class="mt-2">${explain}</p>
      </div>

      <!-- Rejection Risk Analysis (RISK CARDS) -->
      <div class="grid md:grid-cols-3 gap-4">
        ${renderRiskCards(riskText)}
      </div>

      <!-- Case Officer Simulation -->
      <div class="bg-yellow-50 p-5 rounded">
        <h3 class="font-bold">Case Officer Simulation</h3>
        <pre class="mt-2 whitespace-pre-wrap">${officerText}</pre>
      </div>

      <!-- Improve My Chances -->
      <div class="bg-green-50 p-5 rounded">
        <h3 class="font-bold">Improve My Chances</h3>
        <pre class="mt-2 whitespace-pre-wrap">${improveText}</pre>
      </div>

    </div>
  `;
}

// ---------------- RENDER RISK CARDS ----------------
function renderRiskCards(text) {
  if (!text) return `<p class="text-gray-500">No risk data available.</p>`;

  const lines = text.split("\n").filter(l => l.trim() !== "");

  return lines.map(line => {
    let color = "bg-yellow-200";
    if (/high/i.test(line)) color = "bg-red-200";
    else if (/medium/i.test(line)) color = "bg-yellow-200";
    else if (/low/i.test(line)) color = "bg-green-200";

    return `
      <div class="bg-white p-4 rounded shadow border-l-4 ${color}">
        <p class="text-gray-800 text-sm">${line}</p>
      </div>
    `;
  }).join("");
}
