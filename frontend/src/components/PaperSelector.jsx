import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PaperSelector.css";

function PaperSelector() {
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");

  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [papers, setPapers] = useState([]);

  const API = "http://localhost:6969/api"; // apna backend URL daal

  // 🔹 Get All Courses on Page Load
  useEffect(() => {
    axios.get(`${API}/courses`).then((res) => setCourses(res.data));
  }, []);

  // 🔹 When Course Selected → Load Branches
  useEffect(() => {
    if (course) {
      axios.get(`${API}/branches/${course}`).then((res) => setBranches(res.data));
    } else {
      setBranches([]);
    }
    setBranch("");
    setYear("");
    setSubject("");
    setYears([]);
    setSubjects([]);
    setPapers([]);
  }, [course]);

  // 🔹 When Branch Selected → Load Years
  useEffect(() => {
    if (course && branch) {
      axios
        .get(`${API}/years/${course}/${branch}`)
        .then((res) => setYears(res.data));
    } else {
      setYears([]);
    }
    setYear("");
    setSubject("");
    setSubjects([]);
    setPapers([]);
  }, [branch]);

  // 🔹 When Year Selected → Load Subjects
  useEffect(() => {
    if (course && branch && year) {
      axios
        .get(`${API}/subjects/${course}/${branch}/${year}`)
        .then((res) => setSubjects(res.data));
    } else {
      setSubjects([]);
    }
    setSubject("");
    setPapers([]);
  }, [year]);

  // 🔹 When Subject Selected → Load Papers
  useEffect(() => {
    if (course && branch && year && subject) {
      axios
        .get(`${API}/papers/${course}/${branch}/${year}/${subject}`)
        .then((res) => setPapers(res.data));
    } else {
      setPapers([]);
    }
  }, [subject]);

  return (
    <div className="paper-container">
      <h2 className="paper-title">📘 Download Previous Year Papers</h2>

      {/* Course Dropdown */}
      <div className="paper-field">
        <label>Select Course:</label>
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          <option value="">-- Select Course --</option>
          {courses.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Branch Dropdown */}
      {course && (
        <div className="paper-field">
          <label>Select Branch:</label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="">-- Select Branch --</option>
            {branches.map((b, i) => (
              <option key={i} value={b}>{b}</option>
            ))}
          </select>
        </div>
      )}

      {/* Year Dropdown */}
      {branch && (
        <div className="paper-field">
          <label>Select Year:</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">-- Select Year --</option>
            {years.map((y, i) => (
              <option key={i} value={y}>{y}</option>
            ))}
          </select>
        </div>
      )}

      {/* Subject Dropdown */}
      {year && (
        <div className="paper-field">
          <label>Select Subject:</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">-- Select Subject --</option>
            {subjects.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      {/* Papers List */}
      {subject && papers.length > 0 && (
        <div className="paper-list">
          <h3>{subject} Papers</h3>
          <ul>
            {papers.map((p, index) => (
              <li key={index}>
                <a href={p.link} download>
                  {p.year} Paper ⬇️
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* If No Papers Found */}
      {subject && papers.length === 0 && (
        <p className="no-papers">❌ No Papers Found</p>
      )}
    </div>
  );
}

export default PaperSelector;
