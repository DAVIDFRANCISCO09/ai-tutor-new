import React, { useState } from "react";

const SUBJECTS = [
  {
    name: "Agriculture", icon: "🌱", color: "#639922",
    topics: [
      { name: "Agro-forestry", score: 78 },
      { name: "Agricultural Economics", score: null },
      { name: "Crop Production", score: 90 },
      { name: "Farm Structures & Equipment", score: null },
      { name: "Irrigation & Water Management", score: 65 },
      { name: "Livestock Management", score: 72 },
      { name: "Pest & Disease Control", score: null },
      { name: "Soil Science", score: 85 },
    ],
  },
  {
    name: "Biology", icon: "🧬", color: "#1D9E75",
    topics: [
      { name: "Cell Structure & Organisation", score: 88 },
      { name: "Coordination & Response", score: null },
      { name: "Ecology & Environment", score: null },
      { name: "Excretion", score: null },
      { name: "Nutrition in Plants & Animals", score: 72 },
      { name: "Reproduction", score: null },
      { name: "Respiration", score: 60 },
      { name: "Transport in Plants & Animals", score: 55 },
    ],
  },
  {
    name: "Chemistry", icon: "🧪", color: "#D85A30",
    topics: [
      { name: "Acids, Bases & Salts", score: 65 },
      { name: "Atomic Structure", score: 80 },
      { name: "Chemical Bonding", score: 74 },
      { name: "Electrochemistry", score: null },
      { name: "Industrial Chemistry", score: null },
      { name: "Organic Chemistry", score: null },
      { name: "Redox Reactions", score: 58 },
      { name: "The Periodic Table", score: 91 },
    ],
  },
  {
    name: "English", icon: "📖", color: "#7C3AED",
    topics: [
      { name: "Essay Writing", score: 82 },
      { name: "Grammar & Usage", score: 70 },
      { name: "Literature: Drama", score: null },
      { name: "Literature: Poetry", score: null },
      { name: "Literature: Prose", score: null },
      { name: "Oral & Listening Skills", score: 68 },
      { name: "Reading Comprehension", score: 88 },
      { name: "Summary Writing", score: 76 },
    ],
  },
  {
    name: "Mathematics", icon: "📐", color: "#BA7517",
    topics: [
      { name: "Algebra", score: 76 },
      { name: "Financial Mathematics", score: null },
      { name: "Functions & Graphs", score: null },
      { name: "Geometry & Mensuration", score: 63 },
      { name: "Numbers & Arithmetic", score: 90 },
      { name: "Statistics & Probability", score: null },
      { name: "Trigonometry", score: 55 },
      { name: "Vectors & Transformations", score: null },
    ],
  },
  {
    name: "Physics", icon: "⚡", color: "#378ADD",
    topics: [
      { name: "Electricity & Magnetism", score: null },
      { name: "Energy, Work & Power", score: 62 },
      { name: "Forces & Motion", score: 58 },
      { name: "Light & Optics", score: null },
      { name: "Measurements & Units", score: 95 },
      { name: "Pressure", score: 70 },
      { name: "Thermal Physics", score: null },
      { name: "Waves & Sound", score: null },
    ],
  },
];

function ScoreBar({ score }) {
  if (score === null) {
    return (
      <span style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic" }}>Not attempted</span>
    );
  }
  const color = score >= 80 ? "#1D9E75" : score >= 65 ? "#BA7517" : "#D85A30";
  const textColor = score >= 80 ? "#166534" : score >= 65 ? "#854f0b" : "#991b1b";
  const bg = score >= 80 ? "#dcfce7" : score >= 65 ? "#fef9c3" : "#fee2e2";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, justifyContent: "flex-end" }}>
      <div style={{ width: 100, height: 6, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${score}%`, background: color, borderRadius: 99 }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: bg, color: textColor, minWidth: 40, textAlign: "center" }}>
        {score}%
      </span>
    </div>
  );
}

function SubjectDetail({ subject, onBack }) {
  const attempted = subject.topics.filter(t => t.score !== null);
  const avgScore = attempted.length > 0
    ? Math.round(attempted.reduce((a, t) => a + t.score, 0) / attempted.length)
    : null;

  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          background: "#1a3a6b", color: "#fff", border: "none",
          borderRadius: 8, padding: "8px 16px", fontSize: 13,
          fontWeight: 600, cursor: "pointer", marginBottom: 24,
          display: "flex", alignItems: "center", gap: 6
        }}
      >
        ← Back to Subjects
      </button>

      {/* Subject header */}
      <div style={{
        background: "#1a3a6b", borderRadius: 14, padding: "24px",
        marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>{subject.name}</h2>
          </div>
          <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>
            {attempted.length} of {subject.topics.length} topics attempted
          </p>
        </div>
        {avgScore !== null && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: subject.color }}>{avgScore}%</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>average score</div>
          </div>
        )}
      </div>

      {/* Topics list */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "12px 20px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Topic</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Quiz Result</span>
        </div>
        {subject.topics.map((t, i) => (
          <div key={t.name} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 20px",
            borderBottom: i < subject.topics.length - 1 ? "1px solid #f1f5f9" : "none",
            background: i % 2 === 0 ? "#fff" : "#fafafa"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: t.score === null ? "#cbd5e1" : t.score >= 80 ? "#1D9E75" : t.score >= 65 ? "#BA7517" : "#D85A30"
              }} />
              <span style={{ fontSize: 14, color: "#1e293b", fontWeight: 500 }}>{t.name}</span>
            </div>
            <ScoreBar score={t.score} />
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 20, marginTop: 16, flexWrap: "wrap" }}>
        {[
          { color: "#1D9E75", bg: "#dcfce7", text: "#166534", label: "80–100% Excellent" },
          { color: "#BA7517", bg: "#fef9c3", text: "#854f0b", label: "65–79% Good" },
          { color: "#D85A30", bg: "#fee2e2", text: "#991b1b", label: "Below 65% Needs Work" },
        ].map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.color }} />
            <span style={{ fontSize: 12, color: "#64748b" }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProgressPage() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const totalDone = SUBJECTS.flatMap(s => s.topics).filter(t => t.score !== null).length;
  const totalTopics = SUBJECTS.flatMap(s => s.topics).length;
  const allScores = SUBJECTS.flatMap(s => s.topics).filter(t => t.score !== null).map(t => t.score);
  const avgScore = allScores.length > 0 ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0;

  if (selectedSubject) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 800, margin: "0 auto", padding: "24px 16px", background: "#fff", minHeight: "100vh" }}>
        <SubjectDetail subject={selectedSubject} onBack={() => setSelectedSubject(null)} />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 800, margin: "0 auto", padding: "24px 16px", background: "#fff", minHeight: "100vh" }}>

      {/* Page Title */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#1a3a6b", margin: 0 }}>My Progress</h1>
        <p style={{ color: "#64748b", fontSize: 14, marginTop: 6 }}>Malawian Secondary School Syllabus — Click a subject to view your quiz results</p>
      </div>

      {/* Summary Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 32 }}>
        {[
          { label: "Subjects", value: SUBJECTS.length },
          { label: "Topics Attempted", value: `${totalDone} / ${totalTopics}` },
          { label: "Avg Quiz Score", value: `${avgScore}%` },
          { label: "Study Streak", value: "7 days" },
        ].map(s => (
          <div key={s.label} style={{ background: "#1a3a6b", borderRadius: 12, padding: "16px" }}>
            <p style={{ fontSize: 11, color: "#64748b", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Subjects Label */}
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a3a6b", marginBottom: 14 }}>Subjects</h2>

      {/* Subject Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SUBJECTS.map(s => {
          const attempted = s.topics.filter(t => t.score !== null).length;
          const subjectAvg = attempted > 0
            ? Math.round(s.topics.filter(t => t.score !== null).reduce((a, t) => a + t.score, 0) / attempted)
            : null;
          const progress = Math.round((attempted / s.topics.length) * 100);

          return (
            <button
              key={s.name}
              onClick={() => setSelectedSubject(s)}
              style={{
                background: "#1a3a6b", border: "none", borderRadius: 12,
                padding: "18px 20px", cursor: "pointer", textAlign: "left",
                transition: "transform 0.15s, opacity 0.15s",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{s.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 80, height: 4, background: "#1a2235", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${progress}%`, background: s.color, borderRadius: 99 }} />
                    </div>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{attempted}/{s.topics.length} topics done</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {subjectAvg !== null && (
                  <span style={{
                    fontSize: 18, fontWeight: 800, color: s.color
                  }}>{subjectAvg}%</span>
                )}
                <span style={{ color: "#64748b", fontSize: 18 }}>›</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}