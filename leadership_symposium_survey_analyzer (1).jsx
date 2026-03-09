<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Leadership Symposium Survey Analyzer</title>
  <style>
    :root{
      --bg:#f4f6f8;
      --card:#ffffff;
      --line:#d8dee6;
      --text:#1f2937;
      --muted:#6b7280;
      --accent:#1f5faa;
      --accent-soft:#eaf2fb;
      --good:#1f7a4d;
      --warn:#8a6d1d;
      --bad:#9f2d2d;
    }
    *{box-sizing:border-box}
    body{
      margin:0;
      font-family:Arial, Helvetica, sans-serif;
      background:var(--bg);
      color:var(--text);
    }
    .wrap{
      max-width:1200px;
      margin:0 auto;
      padding:24px;
    }
    h1,h2,h3{margin:0 0 12px}
    p{margin:0 0 10px}
    .subtle{color:var(--muted); font-size:14px}
    .card{
      background:var(--card);
      border:1px solid var(--line);
      border-radius:16px;
      padding:20px;
      margin-bottom:20px;
      box-shadow:0 2px 10px rgba(0,0,0,.04);
    }
    .grid{
      display:grid;
      gap:14px;
    }
    .grid-2{grid-template-columns:repeat(2,minmax(0,1fr))}
    .grid-3{grid-template-columns:repeat(3,minmax(0,1fr))}
    .grid-4{grid-template-columns:repeat(4,minmax(0,1fr))}
    @media (max-width:900px){
      .grid-2,.grid-3,.grid-4{grid-template-columns:1fr}
    }
    label{
      display:block;
      font-weight:700;
      margin-bottom:6px;
      font-size:14px;
    }
    input, select, textarea{
      width:100%;
      padding:11px 12px;
      border:1px solid var(--line);
      border-radius:10px;
      font-size:14px;
      background:#fff;
    }
    textarea{
      min-height:92px;
      resize:vertical;
    }
    .btn-row{
      display:flex;
      flex-wrap:wrap;
      gap:10px;
      margin-top:14px;
    }
    button{
      border:none;
      border-radius:10px;
      padding:11px 16px;
      font-size:14px;
      cursor:pointer;
      background:var(--accent);
      color:#fff;
    }
    button.secondary{background:#5f6b7a}
    button.danger{background:#b03a3a}
    button.light{
      background:var(--accent-soft);
      color:var(--accent);
      border:1px solid #cfe0f5;
    }
    .stats{
      display:grid;
      gap:14px;
      grid-template-columns:repeat(4,minmax(0,1fr));
      margin-top:8px;
    }
    @media (max-width:900px){
      .stats{grid-template-columns:repeat(2,minmax(0,1fr))}
    }
    @media (max-width:600px){
      .stats{grid-template-columns:1fr}
    }
    .stat{
      background:linear-gradient(180deg,#ffffff 0%, #f8fbff 100%);
      border:1px solid var(--line);
      border-radius:14px;
      padding:16px;
    }
    .stat .label{
      font-size:13px;
      color:var(--muted);
      margin-bottom:8px;
    }
    .stat .value{
      font-size:30px;
      font-weight:700;
    }
    .columns{
      display:grid;
      grid-template-columns:1.2fr .8fr;
      gap:20px;
    }
    @media (max-width:1000px){
      .columns{grid-template-columns:1fr}
    }
    .mini-grid{
      display:grid;
      gap:14px;
      grid-template-columns:repeat(2,minmax(0,1fr));
    }
    @media (max-width:700px){
      .mini-grid{grid-template-columns:1fr}
    }
    .bar-box{
      border:1px solid var(--line);
      border-radius:14px;
      padding:14px;
      background:#fff;
    }
    .bar-row{margin-bottom:12px}
    .bar-label{
      display:flex;
      justify-content:space-between;
      gap:12px;
      font-size:14px;
      margin-bottom:6px;
    }
    .bar-track{
      width:100%;
      height:14px;
      background:#edf1f5;
      border-radius:999px;
      overflow:hidden;
    }
    .bar-fill{
      height:100%;
      background:var(--accent);
      border-radius:999px;
    }
    .pill-list{
      display:flex;
      flex-wrap:wrap;
      gap:8px;
    }
    .pill{
      padding:8px 10px;
      border-radius:999px;
      background:#f2f5f8;
      border:1px solid var(--line);
      font-size:13px;
    }
    .note-good{color:var(--good)}
    .note-warn{color:var(--warn)}
    .note-bad{color:var(--bad)}
    table{
      width:100%;
      border-collapse:collapse;
      margin-top:8px;
      font-size:14px;
    }
    th,td{
      border:1px solid var(--line);
      padding:8px;
      text-align:left;
      vertical-align:top;
    }
    th{
      background:#f4f8fc;
      position:sticky;
      top:0;
    }
    .table-wrap{
      overflow:auto;
      max-height:420px;
      border:1px solid var(--line);
      border-radius:12px;
    }
    .section-title{
      margin:18px 0 10px;
      padding-bottom:6px;
      border-bottom:1px solid var(--line);
    }
    ul{margin:8px 0 0 18px}
    .print-area{
      background:#fcfdff;
      border:1px dashed #bfd1e7;
      border-radius:14px;
      padding:16px;
    }
    @media print{
      body{background:#fff}
      .no-print{display:none !important}
      .card{box-shadow:none; border:1px solid #bbb}
      .wrap{max-width:none; padding:0}
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h1>Leadership Symposium Survey Analyzer</h1>
      <p class="subtle">Enter one youth survey at a time. Data stays saved in this browser on this device unless you clear it.</p>
    </div>

    <div class="columns">
      <div class="card">
        <h2>Enter a Survey Response</h2>

        <div class="section-title"><strong>Participant Information</strong></div>
        <div class="grid grid-3">
          <div>
            <label for="age">Age</label>
            <select id="age">
              <option value="">Select</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
            </select>
          </div>
          <div>
            <label for="role">Leadership Role</label>
            <input id="role" placeholder="e.g., Patrol Leader">
          </div>
          <div>
            <label for="overall">Overall Rating</label>
            <select id="overall">
              <option value="">Select</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Average</option>
              <option>Needs Improvement</option>
            </select>
          </div>
        </div>

        <div class="section-title"><strong>Learning and Experience</strong></div>
        <div class="grid grid-2">
          <div>
            <label for="q4">I learned new leadership skills today</label>
            <select id="q4">
              <option value="">Select</option>
              <option>Strongly Agree</option>
              <option>Agree</option>
              <option>Neutral</option>
              <option>Disagree</option>
            </select>
          </div>
          <div>
            <label for="q5">I feel more confident being a leader after this symposium</label>
            <select id="q5">
              <option value="">Select</option>
              <option>Strongly Agree</option>
              <option>Agree</option>
              <option>Neutral</option>
              <option>Disagree</option>
            </select>
          </div>
          <div>
            <label for="q6">The topics were easy to understand</label>
            <select id="q6">
              <option value="">Select</option>
              <option>Strongly Agree</option>
              <option>Agree</option>
              <option>Neutral</option>
              <option>Disagree</option>
            </select>
          </div>
          <div>
            <label for="q7">The guest speakers were interesting and helpful</label>
            <select id="q7">
              <option value="">Select</option>
              <option>Strongly Agree</option>
              <option>Agree</option>
              <option>Neutral</option>
              <option>Disagree</option>
            </select>
          </div>
          <div>
            <label for="q8">The activities helped me understand leadership better</label>
            <select id="q8">
              <option value="">Select</option>
              <option>Strongly Agree</option>
              <option>Agree</option>
              <option>Neutral</option>
              <option>Disagree</option>
            </select>
          </div>
          <div>
            <label for="q9">After attending today, I feel ready to</label>
            <select id="q9">
              <option value="">Select</option>
              <option>Lead my patrol or group better</option>
              <option>Help other Scouts succeed</option>
              <option>Take on a leadership position</option>
              <option>Try new leadership skills</option>
              <option>I'm not sure yet</option>
            </select>
          </div>
          <div>
            <label for="q14">Would recommend to another Scout</label>
            <select id="q14">
              <option value="">Select</option>
              <option>Yes</option>
              <option>Maybe</option>
              <option>No</option>
            </select>
          </div>
        </div>

        <div class="section-title"><strong>Written Feedback</strong></div>
        <div class="grid grid-2">
          <div>
            <label for="q10">Leadership skill to try in the next month</label>
            <textarea id="q10"></textarea>
          </div>
          <div>
            <label for="q11">Favorite part of the symposium</label>
            <textarea id="q11"></textarea>
          </div>
          <div>
            <label for="q12">One thing learned to use in the troop</label>
            <textarea id="q12"></textarea>
          </div>
          <div>
            <label for="q13">One thing to improve for next year</label>
            <textarea id="q13"></textarea>
          </div>
        </div>

        <div class="btn-row no-print">
          <button onclick="addResponse()">Add Response</button>
          <button class="secondary" onclick="clearForm()">Clear Form</button>
          <button class="light" onclick="exportCSV()">Export CSV</button>
          <button class="danger" onclick="clearAllData()">Delete All Saved Data</button>
        </div>
      </div>

      <div>
        <div class="card">
          <h2>Dashboard</h2>
          <div class="stats">
            <div class="stat">
              <div class="label">Responses</div>
              <div class="value" id="statCount">0</div>
            </div>
            <div class="stat">
              <div class="label">Overall Rating</div>
              <div class="value" id="statOverall">—</div>
            </div>
            <div class="stat">
              <div class="label">Learning Score</div>
              <div class="value" id="statLearning">—</div>
            </div>
            <div class="stat">
              <div class="label">Recommendation</div>
              <div class="value" id="statRecommend">—</div>
            </div>
          </div>
        </div>

        <div class="card">
          <h2>Auto Analysis</h2>
          <h3>Strengths</h3>
          <ul id="strengths"></ul>

          <h3 style="margin-top:14px;">Improvement Areas</h3>
          <ul id="improvements"></ul>

          <h3 style="margin-top:14px;">Most Common Written Themes</h3>
          <div class="pill-list" id="keywords"></div>
        </div>

        <div class="card print-area">
          <h2>Printable Summary</h2>
          <p id="summaryNarrative" class="subtle">Add responses to generate a summary.</p>
          <div class="btn-row no-print">
            <button class="light" onclick="window.print()">Print Summary</button>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>Breakdowns</h2>
      <div class="mini-grid">
        <div class="bar-box">
          <h3>Overall Rating Breakdown</h3>
          <div id="overallBars"></div>
        </div>
        <div class="bar-box">
          <h3>Recommendation Breakdown</h3>
          <div id="recommendBars"></div>
        </div>
        <div class="bar-box">
          <h3>Ready To...</h3>
          <div id="readyBars"></div>
        </div>
        <div class="bar-box">
          <h3>Age Breakdown</h3>
          <div id="ageBars"></div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>Entered Responses</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Age</th>
              <th>Role</th>
              <th>Overall</th>
              <th>Ready To</th>
              <th>Recommend</th>
              <th>Skill to Try</th>
              <th>Favorite Part</th>
              <th>Learned</th>
              <th>Improve</th>
              <th class="no-print">Delete</th>
            </tr>
          </thead>
          <tbody id="responsesBody"></tbody>
        </table>
      </div>
    </div>
  </div>

  <script>
    const STORAGE_KEY = "leadership_symposium_responses_v2";

    function getResponses() {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    }

    function saveResponses(data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function val(id) {
      return document.getElementById(id).value.trim();
    }

    function scoreLikert(v) {
      return {
        "Strongly Agree": 4,
        "Agree": 3,
        "Neutral": 2,
        "Disagree": 1
      }[v] || 0;
    }

    function scoreOverall(v) {
      return {
        "Excellent": 4,
        "Good": 3,
        "Average": 2,
        "Needs Improvement": 1
      }[v] || 0;
    }

    function scoreRecommend(v) {
      return {
        "Yes": 3,
        "Maybe": 2,
        "No": 1
      }[v] || 0;
    }

    function average(arr) {
      const valid = arr.filter(n => n > 0);
      if (!valid.length) return 0;
      return valid.reduce((a,b) => a + b, 0) / valid.length;
    }

    function countBy(items, key) {
      const out = {};
      items.forEach(item => {
        const v = item[key] || "Blank";
        out[v] = (out[v] || 0) + 1;
      });
      return out;
    }

    function topWords(responses) {
      const ignore = new Set([
        "that","this","with","from","they","have","will","your","what","would","could","about","them","more",
        "next","year","symposium","leadership","scouts","scout","today","after","attending","feel","ready",
        "helped","understand","better","interesting","helpful","thing","learned","favorite","part"
      ]);
      const map = {};
      ["q10","q11","q12","q13"].forEach(field => {
        responses.forEach(r => {
          (r[field] || "")
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, " ")
            .split(/\s+/)
            .filter(w => w.length > 3 && !ignore.has(w))
            .forEach(w => map[w] = (map[w] || 0) + 1);
        });
      });
      return Object.entries(map)
        .sort((a,b) => b[1] - a[1])
        .slice(0,10);
    }

    function addResponse() {
      const response = {
        age: val("age"),
        role: val("role"),
        overall: val("overall"),
        q4: val("q4"),
        q5: val("q5"),
        q6: val("q6"),
        q7: val("q7"),
        q8: val("q8"),
        q9: val("q9"),
        q10: val("q10"),
        q11: val("q11"),
        q12: val("q12"),
        q13: val("q13"),
        q14: val("q14")
      };

      if (!response.age && !response.overall && !response.q10 && !response.q11 && !response.q12 && !response.q13) {
        alert("Please enter at least some survey information before adding a response.");
        return;
      }

      const responses = getResponses();
      responses.push(response);
      saveResponses(responses);
      clearForm(false);
      render();
      alert("Response added.");
    }

    function clearForm(showMessage = false) {
      ["age","role","overall","q4","q5","q6","q7","q8","q9","q10","q11","q12","q13","q14"].forEach(id => {
        document.getElementById(id).value = "";
      });
      if (showMessage) alert("Form cleared.");
    }

    function deleteResponse(index) {
      const responses = getResponses();
      responses.splice(index, 1);
      saveResponses(responses);
      render();
    }

    function clearAllData() {
      if (!confirm("Delete all saved survey responses from this browser?")) return;
      localStorage.removeItem(STORAGE_KEY);
      render();
    }

    function exportCSV() {
      const responses = getResponses();
      if (!responses.length) {
        alert("No responses to export yet.");
        return;
      }

      const headers = ["age","role","overall","q4","q5","q6","q7","q8","q9","q10","q11","q12","q13","q14"];
      const rows = [
        headers.join(","),
        ...responses.map(r => headers.map(h => `"${String(r[h] || "").replace(/"/g, '""')}"`).join(","))
      ];

      const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "leadership_symposium_survey_responses.csv";
      a.click();
      URL.revokeObjectURL(url);
    }

    function renderBars(targetId, counts, orderedLabels = null) {
      const container = document.getElementById(targetId);
      const entries = orderedLabels
        ? orderedLabels.map(label => [label, counts[label] || 0])
        : Object.entries(counts).sort((a,b) => b[1] - a[1]);

      const max = Math.max(1, ...entries.map(x => x[1]));
      container.innerHTML = entries.map(([label, value]) => {
        const pct = (value / max) * 100;
        return `
          <div class="bar-row">
            <div class="bar-label">
              <span>${label}</span>
              <strong>${value}</strong>
            </div>
            <div class="bar-track">
              <div class="bar-fill" style="width:${pct}%"></div>
            </div>
          </div>
        `;
      }).join("");
    }

    function render() {
      const responses = getResponses();

      const overallAvg = average(responses.map(r => scoreOverall(r.overall)));
      const learningAvg = average(responses.flatMap(r => [
        scoreLikert(r.q4),
        scoreLikert(r.q5),
        scoreLikert(r.q6)
      ]));
      const recommendAvg = average(responses.map(r => scoreRecommend(r.q14)));
      const engagementAvg = average(responses.flatMap(r => [
        scoreLikert(r.q7),
        scoreLikert(r.q8)
      ]));

      document.getElementById("statCount").textContent = responses.length;
      document.getElementById("statOverall").textContent = overallAvg ? overallAvg.toFixed(1) + "/4" : "—";
      document.getElementById("statLearning").textContent = learningAvg ? learningAvg.toFixed(1) + "/4" : "—";
      document.getElementById("statRecommend").textContent = recommendAvg ? recommendAvg.toFixed(1) + "/3" : "—";

      const strengths = [];
      const improvements = [];

      if (overallAvg >= 3.4) strengths.push("Participants rated the overall symposium very highly.");
      else if (overallAvg && overallAvg < 2.5) improvements.push("Overall event satisfaction is lower than desired.");

      if (learningAvg >= 3.2) strengths.push("Youth reported strong learning and leadership confidence gains.");
      else if (learningAvg && learningAvg < 2.5) improvements.push("Learning outcomes may need clearer teaching or stronger activities.");

      if (engagementAvg >= 3.2) strengths.push("Speakers and activities were engaging.");
      else if (engagementAvg && engagementAvg < 2.5) improvements.push("Speaker delivery or activity design may need improvement.");

      if (recommendAvg >= 2.6) strengths.push("Most youth would recommend the symposium to others.");
      else if (recommendAvg && recommendAvg < 2.2) improvements.push("Recommendation intent suggests the experience needs refinement.");

      if (!responses.length) {
        strengths.push("Add responses to generate strengths.");
        improvements.push("Add responses to identify improvement areas.");
      }

      document.getElementById("strengths").innerHTML = strengths.map(s => `<li>${s}</li>`).join("");
      document.getElementById("improvements").innerHTML = improvements.map(s => `<li>${s}</li>`).join("");

      const keywords = topWords(responses);
      document.getElementById("keywords").innerHTML = keywords.length
        ? keywords.map(([word,count]) => `<span class="pill">${word} (${count})</span>`).join("")
        : `<span class="subtle">Written themes will appear here.</span>`;

      renderBars("overallBars", countBy(responses, "overall"), ["Excellent","Good","Average","Needs Improvement"]);
      renderBars("recommendBars", countBy(responses, "q14"), ["Yes","Maybe","No"]);
      renderBars("readyBars", countBy(responses, "q9"), [
        "Lead my patrol or group better",
        "Help other Scouts succeed",
        "Take on a leadership position",
        "Try new leadership skills",
        "I'm not sure yet"
      ]);
      renderBars("ageBars", countBy(responses, "age"), ["12","13","14","15","16"]);

      const tbody = document.getElementById("responsesBody");
      tbody.innerHTML = responses.length ? responses.map((r, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${escapeHtml(r.age)}</td>
          <td>${escapeHtml(r.role)}</td>
          <td>${escapeHtml(r.overall)}</td>
          <td>${escapeHtml(r.q9)}</td>
          <td>${escapeHtml(r.q14)}</td>
          <td>${escapeHtml(r.q10)}</td>
          <td>${escapeHtml(r.q11)}</td>
          <td>${escapeHtml(r.q12)}</td>
          <td>${escapeHtml(r.q13)}</td>
          <td class="no-print"><button class="danger" onclick="deleteResponse(${i})">Delete</button></td>
        </tr>
      `).join("") : `<tr><td colspan="11">No responses entered yet.</td></tr>`;

      document.getElementById("summaryNarrative").innerHTML = buildNarrative({
        count: responses.length,
        overallAvg,
        learningAvg,
        engagementAvg,
        recommendAvg,
        countsReady: countBy(responses, "q9")
      });
    }

    function buildNarrative(data) {
      if (!data.count) return "Add responses to generate a summary.";

      const readyCounts = Object.entries(data.countsReady).sort((a,b) => b[1]-a[1]);
      const topReady = readyCounts.length ? readyCounts[0][0] : "N/A";

      let tone = `<span class="note-good">strong</span>`;
      if (data.overallAvg < 3.0) tone = `<span class="note-warn">mixed</span>`;
      if (data.overallAvg < 2.5) tone = `<span class="note-bad">concerning</span>`;

      return `
        Based on <strong>${data.count}</strong> response(s), the overall participant experience appears ${tone}.
        The average overall rating is <strong>${data.overallAvg ? data.overallAvg.toFixed(1) : "—"}/4</strong>,
        the average learning score is <strong>${data.learningAvg ? data.learningAvg.toFixed(1) : "—"}/4</strong>,
        speaker and activity engagement is <strong>${data.engagementAvg ? data.engagementAvg.toFixed(1) : "—"}/4</strong>,
        and recommendation intent is <strong>${data.recommendAvg ? data.recommendAvg.toFixed(1) : "—"}/3</strong>.
        The most common action youth felt ready to take was <strong>${escapeHtml(topReady)}</strong>.
      `;
    }

    function escapeHtml(str) {
      return String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    render();
  </script>
</body>
</html>
