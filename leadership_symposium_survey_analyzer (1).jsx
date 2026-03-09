import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Download, BarChart3, Users, MessageSquare, PlusCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const likertOptions = ["Strongly Agree", "Agree", "Neutral", "Disagree"];
const overallOptions = ["Excellent", "Good", "Average", "Needs Improvement"];
const readyOptions = [
  "Lead my patrol or group better",
  "Help other Scouts succeed",
  "Take on a leadership position",
  "Try new leadership skills",
  "I'm not sure yet",
];
const recommendOptions = ["Yes", "Maybe", "No"];
const ageOptions = ["12", "13", "14", "15", "16"];

const emptyResponse = {
  age: "",
  role: "",
  overall: "",
  q4: "",
  q5: "",
  q6: "",
  q7: "",
  q8: "",
  q9: "",
  q10: "",
  q11: "",
  q12: "",
  q13: "",
  q14: "",
};

const scoreLikert = (v) => ({
  "Strongly Agree": 4,
  "Agree": 3,
  "Neutral": 2,
  "Disagree": 1,
}[v] || 0);

const scoreOverall = (v) => ({
  "Excellent": 4,
  "Good": 3,
  "Average": 2,
  "Needs Improvement": 1,
}[v] || 0);

const scoreRecommend = (v) => ({
  "Yes": 3,
  "Maybe": 2,
  "No": 1,
}[v] || 0);

function countBy(list, key) {
  const counts = {};
  list.forEach((item) => {
    const value = item[key] || "Blank";
    counts[value] = (counts[value] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

function average(nums) {
  const valid = nums.filter((n) => n > 0);
  if (!valid.length) return 0;
  return valid.reduce((a, b) => a + b, 0) / valid.length;
}

function downloadCsv(rows) {
  const headers = Object.keys(emptyResponse);
  const esc = (v) => `"${String(v ?? "").replaceAll('"', '""')}"`;
  const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "leadership_symposium_survey_responses.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function LeadershipSymposiumSurveyAnalyzer() {
  const [current, setCurrent] = useState(emptyResponse);
  const [responses, setResponses] = useState([]);

  const setField = (field, value) => setCurrent((prev) => ({ ...prev, [field]: value }));

  const addResponse = () => {
    setResponses((prev) => [...prev, { ...current }]);
    setCurrent(emptyResponse);
  };

  const removeResponse = (index) => {
    setResponses((prev) => prev.filter((_, i) => i !== index));
  };

  const stats = useMemo(() => {
    const n = responses.length;
    const learning = average(responses.flatMap((r) => [scoreLikert(r.q4), scoreLikert(r.q5), scoreLikert(r.q6)]));
    const engagement = average(responses.flatMap((r) => [scoreLikert(r.q7), scoreLikert(r.q8)]));
    const overall = average(responses.map((r) => scoreOverall(r.overall)));
    const recommendation = average(responses.map((r) => scoreRecommend(r.q14)));

    const allText = ["q10", "q11", "q12", "q13"];
    const keywords = {};
    responses.forEach((r) => {
      allText.forEach((field) => {
        String(r[field] || "")
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, " ")
          .split(/\s+/)
          .filter((w) => w.length > 3)
          .filter((w) => !["that", "this", "with", "from", "they", "have", "will", "your", "what", "would", "could", "about", "them", "more", "next", "year", "symposium", "leadership", "scouts", "scout"].includes(w))
          .forEach((w) => {
            keywords[w] = (keywords[w] || 0) + 1;
          });
      });
    });

    const topKeywords = Object.entries(keywords)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));

    const strengths = [];
    const improvements = [];
    if (overall >= 3.4) strengths.push("Participants rated the overall symposium very highly.");
    else if (overall && overall < 2.5) improvements.push("Overall event satisfaction is lower than desired.");

    if (learning >= 3.2) strengths.push("Youth reported strong learning and leadership confidence gains.");
    else if (learning && learning < 2.5) improvements.push("Learning outcomes may need clearer teaching or stronger activities.");

    if (engagement >= 3.2) strengths.push("Speakers and activities were engaging.");
    else if (engagement && engagement < 2.5) improvements.push("Speaker delivery or activity design may need improvement.");

    if (recommendation >= 2.6) strengths.push("Most youth would recommend the symposium to others.");
    else if (recommendation && recommendation < 2.2) improvements.push("Recommendation intent suggests the experience needs refinement.");

    return {
      n,
      learning,
      engagement,
      overall,
      recommendation,
      ages: countBy(responses, "age"),
      overallBreakdown: countBy(responses, "overall"),
      readyBreakdown: countBy(responses, "q9"),
      recommendBreakdown: countBy(responses, "q14"),
      topKeywords,
      strengths,
      improvements,
    };
  }, [responses]);

  const FieldSelect = ({ label, value, onChange, options }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>{option}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <Users className="h-8 w-8" />
              <div>
                <div className="text-sm text-slate-500">Responses Entered</div>
                <div className="text-3xl font-bold">{stats.n}</div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <BarChart3 className="h-8 w-8" />
              <div>
                <div className="text-sm text-slate-500">Learning Score</div>
                <div className="text-3xl font-bold">{stats.learning ? stats.learning.toFixed(1) : "—"}/4</div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <MessageSquare className="h-8 w-8" />
              <div>
                <div className="text-sm text-slate-500">Recommendation Score</div>
                <div className="text-3xl font-bold">{stats.recommendation ? stats.recommendation.toFixed(1) : "—"}/3</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Enter a Survey Response</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FieldSelect label="Age" value={current.age} onChange={(v) => setField("age", v)} options={ageOptions} />
                <div className="space-y-2">
                  <Label>Leadership Role</Label>
                  <Input value={current.role} onChange={(e) => setField("role", e.target.value)} placeholder="e.g., Patrol Leader" />
                </div>
              </div>

              <FieldSelect label="Overall rating" value={current.overall} onChange={(v) => setField("overall", v)} options={overallOptions} />
              <FieldSelect label="I learned new leadership skills today" value={current.q4} onChange={(v) => setField("q4", v)} options={likertOptions} />
              <FieldSelect label="I feel more confident being a leader after this symposium" value={current.q5} onChange={(v) => setField("q5", v)} options={likertOptions} />
              <FieldSelect label="The topics were easy to understand" value={current.q6} onChange={(v) => setField("q6", v)} options={likertOptions} />
              <FieldSelect label="The guest speakers were interesting and helpful" value={current.q7} onChange={(v) => setField("q7", v)} options={likertOptions} />
              <FieldSelect label="The activities helped me understand leadership better" value={current.q8} onChange={(v) => setField("q8", v)} options={likertOptions} />
              <FieldSelect label="After attending today, I feel ready to" value={current.q9} onChange={(v) => setField("q9", v)} options={readyOptions} />
              <Textarea value={current.q10} onChange={(e) => setField("q10", e.target.value)} placeholder="Leadership skill to try next month" />
              <Textarea value={current.q11} onChange={(e) => setField("q11", e.target.value)} placeholder="Favorite part of the symposium" />
              <Textarea value={current.q12} onChange={(e) => setField("q12", e.target.value)} placeholder="One thing learned to use in troop" />
              <Textarea value={current.q13} onChange={(e) => setField("q13", e.target.value)} placeholder="One thing to improve for next year" />
              <FieldSelect label="Would recommend to another Scout" value={current.q14} onChange={(v) => setField("q14", v)} options={recommendOptions} />

              <div className="flex flex-wrap gap-3">
                <Button onClick={addResponse} className="rounded-2xl"><PlusCircle className="mr-2 h-4 w-4" />Add Response</Button>
                <Button variant="outline" onClick={() => downloadCsv(responses)} className="rounded-2xl"><Download className="mr-2 h-4 w-4" />Export CSV</Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Quick Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Strengths</div>
                  <div className="flex flex-wrap gap-2">
                    {stats.strengths.length ? stats.strengths.map((s) => <Badge key={s} variant="secondary" className="rounded-xl px-3 py-1">{s}</Badge>) : <span className="text-sm text-slate-500">Add responses to generate strengths.</span>}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Improvement Areas</div>
                  <div className="flex flex-wrap gap-2">
                    {stats.improvements.length ? stats.improvements.map((s) => <Badge key={s} variant="outline" className="rounded-xl px-3 py-1">{s}</Badge>) : <span className="text-sm text-slate-500">Add responses to generate improvement areas.</span>}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Most Common Words from Written Feedback</div>
                  <div className="flex flex-wrap gap-2">
                    {stats.topKeywords.length ? stats.topKeywords.map((k) => <Badge key={k.word} className="rounded-xl px-3 py-1">{k.word} ({k.count})</Badge>) : <span className="text-sm text-slate-500">Written feedback will appear here.</span>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Overall Rating Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.overallBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Recommendation Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.recommendBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Entered Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Overall</TableHead>
                  <TableHead>Ready To</TableHead>
                  <TableHead>Recommend</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {responses.length ? responses.map((r, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{r.age}</TableCell>
                    <TableCell>{r.overall}</TableCell>
                    <TableCell>{r.q9}</TableCell>
                    <TableCell>{r.q14}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => removeResponse(idx)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-slate-500">No responses entered yet.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
