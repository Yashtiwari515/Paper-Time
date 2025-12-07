import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiBookOpen, FiFolder, FiSearch, FiDownload } from "react-icons/fi";
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

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/courses`).then((res) => setCourses(res.data));
  }, []);

  useEffect(() => {
    if (course) {
      axios
        .get(`${API}/branches/${course}`)
        .then((res) => setBranches(res.data));
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
  <div className="paper-wrapper">

      <div className="selector-card">

        <h1 className="selector-heading">
          <FiBookOpen size={32} /> Previous Year Papers
        </h1>

        <div className="input-group">
          <label><FiFolder /> Select Course</label>
          <select value={course} onChange={(e) => setCourse(e.target.value)}>
            <option value="">-- Choose Course --</option>
            {courses.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* BRANCH */}
        {course && (
          <div className="input-group fade-in">
            <label><FiFolder /> Select Branch</label>
            <select value={branch} onChange={(e) => setBranch(e.target.value)}>
              <option value="">-- Choose Branch --</option>
              {branches.map((b, i) => (
                <option key={i} value={b}>{b}</option>
              ))}
            </select>
          </div>
        )}

        {/* YEAR */}
        {branch && (
          <div className="input-group fade-in">
            <label><FiSearch /> Select Year</label>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">-- Choose Year --</option>
              {years.map((y, i) => (
                <option key={i} value={y}>{y}</option>
              ))}
            </select>
          </div>
        )}

        {/* SUBJECT */}
        {year && (
          <div className="input-group fade-in">
            <label><FiSearch /> Select Subject</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option value="">-- Choose Subject --</option>
              {subjects.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}

        {/* PAPERS LIST */}
        {subject && papers.length > 0 && (
          <div className="paper-list fade-pop">
            <h3>{subject} Papers</h3>
            <ul>
              {papers.map((p, i) => (
                <li key={i}>
                  <a href={p.link} download>
                    <FiDownload /> {p.year} Paper
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* NO PAPERS */}
        {subject && papers.length === 0 && (
          <p className="no-papers fade-pop">No Papers Found 😕</p>
        )}

      </div>

  </div>
);

}

export default PaperSelector;
