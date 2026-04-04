import React, { useState } from "react";

const SUBJECTS = [
  {
    name: "Biology", icon: "🧬", color: "#1D9E75", progress: 60,
    topics: [
      { name: "Cell Structure & Organisation", status: "done" },
      { name: "Nutrition in Plants & Animals", status: "done" },
      { name: "Transport in Plants & Animals", status: "in-progress" },
      { name: "Respiration", status: "in-progress" },
      { name: "Excretion", status: "todo" },
      { name: "Coordination & Response", status: "todo" },
      { name: "Reproduction", status: "todo" },
      { name: "Ecology & Environment", status: "todo" },
    ],
  },
  {
    name: "Physics", icon: "⚡", color: "#378ADD", progress: 45,
    topics: [
      { name: "Measurements & Units", status: "done" },
      { name: "Forces & Motion", status: "done" },
      { name: "Pressure", status: "in-progress" },
      { name: "Energy, Work & Power", status: "in-progress" },
      { name: "Waves & Sound", status: "todo" },
      { name: "Light & Optics", status: "todo" },
      { name: "Electricity & Magnetism", status: "todo" },
      { name: "Thermal Physics", status: "todo" },
    ],
  },
  {
    name: "Chemistry", icon: "🧪", color: "#D85A30", progress: 50,
    topics: [
      { name: "Atomic Structure", status: "done" },
      { name: "The Periodic Table", status: "done" },
      { name: "Chemical Bonding", status: "done" },
      { name: "Acids, Bases & Salts", status: "in-progress" },
      { name: "Redox Reactions", status: "in-progress" },
      { name: "Organic Chemistry", status: "todo" },
      { name: "Electrochemistry", status: "todo" },
      { name: "Industrial Chemistry", status: "todo" },
    ],
  },
  {
    name: "English", icon: "📖", color: "#7C3AED", progress: 70,
    topics: [
      { name: "Reading Comprehension", status: "done" },
      { name: "Summary Writing", status: "done" },
      { name: "Essay Writing", status: "done" },
      { name: "Grammar & Usage", status: "in-progress" },
      { name: "Oral & Listening Skills", status: "in-progress" },
      { name: "Literature: Prose", status: "todo" },
      { name: "Literature: Poetry", status: "todo" },
      { name: "Literature: Drama", status: "todo" },
    ],
  },
  {
    name: "Agriculture", icon: "🌱", color: "#639922", progress: 40,
    topics: [
      { name: "Soil Science", status: "done" },
      { name: "Crop Production", status: "done" },
      { name: "Irrigation & Water Management", status: "in-progress" },
      { name: "Livestock Management", status: "in-progress" },
      { name: "Agricultural Economics", status: "todo" },
      { name: "Pest & Disease Control", status: "todo" },
      { name: "Farm Structures & Equipment", status: "todo" },
      { name: "Agro-forestry", status: "todo" },
    ],
  },
  {
    name: "Mathematics", icon: "📐", color: "#BA7517", progress: 55,
    topics: [
      { name: "Numbers & Arithmetic", status: "done" },
      { name: "Algebra", status: "done" },
      { name: "Geometry & Mensuration", status: "in-progress" },
      { name: "Trigonometry", status: "in-progress" },
      { name: "Statistics & Probability", status: "todo" },
      { name: "Vectors & Transformations", status: "todo" },
      { name: "Functions & Graphs", status: "todo" },
      { name: "Financial Mathematics", status: "todo" },
    ],
  },
];

const QUIZ_HISTORY = [
  { subject: "Biology", topic: "Cell Structure & Organisation", score: 88, date: "Apr 3" },
  { subject: "Mathematics", topic: "Algebra", score: 76, date: "Apr 2" },
  { subject: "English", topic: "Essay Writing", score: 82, date: "Apr 1" },
  { subject: "Chemistry", topic: "Acids, Bases & Salts", score: 65, date: "Mar 31" },
  { subject: "Physics", topic: "Forces & Motion", score: 58, date: "Mar 30" },
  { subject: "Agriculture", topic: "Crop Production", score: 90, date: "Mar 29" },
  { subject: "Biology", topic: "Nutrition in Plants & Animals", score: 72, date: "Mar 28" },
];

function TopicBadge({ status }) {
  const map = {
    done: { label: "Done", bg: "#0f3d20", color: "#4ade80" },
    "in-progress": { label: "In Progress", bg: "#0c2a4a", color: "#60a5fa" },
    todo: { label: "To Do", bg: "#1a2235", color: "#64748b" },
  };
  const s = map[status] || map.todo;
  return (
    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20, background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

function ScorePill({ score }) {
  const s = score >= 80
    ? { bg: "#0f3d20", color: "#4ade80" }
    : score >= 65
    ? { bg: "#3a2500", color: "#fbbf24" }
    : { bg: "#3d0f0f", color: "#f87171" };
  return (
    <span style={{ fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: s.bg, color: s.color }}>
      {score}%
    </span>
  );
}

function BarChart({ quizzes }) {
  const reversed = [...quizzes].reverse();
  return (
    <div style={{ padding: "16px 0" }}>
      {reversed.map((q, i) => (
        <div key={i} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>
            <span>{q.topic} — {q.subject}</span>
            <span style={{ fontWeight: 600, color: q.score >= 80 ? "#4ade80" : q.score >= 65 ? "#fbbf24" : "#f87171" }}>
              {q.score}%
            </span>
          </div>
          <div style={{ height: 8, background: "#1a2235", borderRadius: 99, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${q.score}%`,
              background: q.score >= 80 ? "#1D9E75" : q.score >= 65 ? "#BA7517" : "#D85A30",
              borderRadius: 99,
              transition: "width 0.6s ease"
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function SubjectCard({ subject }) {
  return (
    <div style={{ background: "#111827", border: "1px solid #1f2d45", borderRadius: 12, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 14, color: "#e2e8f0" }}>
          <span style={{ fontSize: 18 }}>{subject.icon}</span>
          {subject.name}
        </div>
        <span style={{ fontSize: 18, fontWeight: 700, color: subject.color }}>{subject.progress}%</span>
      </div>
      <div style={{ height: 5, background: "#1a2235", borderRadius: 99, overflow: "hidden", marginBottom: 12 }}>
        <div style={{ height: "100%", width: `${subject.progress}%`, background: subject.color, borderRadius: 99 }} />
      </div>
      {subject.topics.map((t, i) => (
        <div key={t.name} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "7px 0", fontSize: 13, color: "#94a3b8",
          borderBottom: i < subject.topics.length - 1 ? "1px solid #1f2d45" : "none"
        }}>
          <span>{t.name}</span>
          <TopicBadge status={t.status} />
        </div>
      ))}
    </div>
  );
}

export default function ProgressPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredSubjects = activeFilter === "all" ? SUBJECTS : SUBJECTS.filter(s => s.name === activeFilter);
  const filteredQuizzes = activeFilter === "all" ? QUIZ_HISTORY : QUIZ_HISTORY.filter(q => q.subject === activeFilter);

  const totalProgress = Math.round(SUBJECTS.reduce((a, s) => a + s.progress, 0) / SUBJECTS.length);
  const totalDone = SUBJECTS.flatMap(s => s.topics).filter(t => t.status === "done").length;
  const totalTopics = SUBJECTS.flatMap(s => s.topics).length;
  const avgScore = Math.round(QUIZ_HISTORY.reduce((a, q) => a + q.score, 0) / QUIZ_HISTORY.length);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 900, margin: "0 auto", padding: "24px 16px", background: "#0a0e1a", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#e2e8f0" }}>My Progress</h1>
        <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>Malawian Secondary School Syllabus — Track your learning</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Overall Progress", value: `${totalProgress}%`, sub: "6 subjects" },
          { label: "Topics Completed", value: `${totalDone} / ${totalTopics}`, sub: `${totalTopics - totalDone} remaining` },
          { label: "Avg Quiz Score", value: `${avgScore}%`, sub: `${QUIZ_HISTORY.length} quizzes taken` },
          { label: "Study Streak", value: "7 days", sub: "personal best: 12" },
        ].map(s => (
          <div key={s.label} style={{ background: "#111827", borderRadius: 10, padding: "14px 16px", border: "1px solid #1f2d45" }}>
            <p style={{ fontSize: 11, color: "#64748b", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#e2e8f0" }}>{s.value}</p>
            <p style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {["all", ...SUBJECTS.map(s => s.name)].map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{
            padding: "5px 14px", borderRadius: 20, border: "1px solid",
            borderColor: activeFilter === f ? "#378ADD" : "#1f2d45",
            background: activeFilter === f ? "#0c2a4a" : "transparent",
            color: activeFilter === f ? "#60a5fa" : "#64748b",
            fontSize: 13, fontWeight: 500, cursor: "pointer"
          }}>
            {f === "all" ? "All Subjects" : f}
          </button>
        ))}
      </div>

      {/* Subject Cards */}
      <p style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 12 }}>Topic Completion</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, marginBottom: 20 }}>
        {filteredSubjects.map(s => <SubjectCard key={s.name} subject={s} />)}
      </div>

      {/* Score Chart */}
      <div style={{ background: "#111827", border: "1px solid #1f2d45", borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>Quiz Score History</p>
        <p style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>Your scores from most recent quizzes</p>
        <BarChart quizzes={filteredQuizzes} />
      </div>

      {/* Quiz List */}
      <div style={{ background: "#111827", border: "1px solid #1f2d45", borderRadius: 12, padding: 16 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 12 }}>Recent Quiz Results</p>
        {filteredQuizzes.length === 0 ? (
          <p style={{ color: "#64748b", fontSize: 13, textAlign: "center", padding: "16px 0" }}>No quizzes for this subject yet.</p>
        ) : (
          filteredQuizzes.map((q, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "11px 0",
              borderBottom: i < filteredQuizzes.length - 1 ? "1px solid #1f2d45" : "none"
            }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: "#e2e8f0" }}>{q.subject}</p>
                <p style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{q.topic} · {q.date}</p>
              </div>
              <ScorePill score={q.score} />
            </div>
          ))
        )}
      </div>

    </div>
  );
}