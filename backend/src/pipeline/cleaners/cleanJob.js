import { canonicalSkillMap } from "../utils/skillMap.js";  
import sanitizeHtml from "sanitize-html";

function cleanText(str) {
  return sanitizeHtml(str, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "") 
    .trim();
}

function cleanCompany(company) {
  return company
    .replace(/Inc\.?|LLC|Ltd\.?|Pvt\.?/gi, "")  
    .replace(/\s+/g, " ")
    .trim();
}

function cleanLocation(location) {
  if (!location) return "Unknown";

  return location
    .replace(/[\|\/]/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeSkills(list) {
  if (!Array.isArray(list)) return [];

  return list
    .map(s => s.toLowerCase().trim())
    .map(s => canonicalSkillMap[s] || s)
    .filter((s, i, arr) => s.length > 1 && arr.indexOf(s) === i); 
}


function normalizeStipend(value) {
  if (!value) 
    return 0;

  const cleaned = value.toString().replace(/[^\d]/g, "");

  return Number(cleaned) || 0;
}

function safeDate(date) {
  const d = new Date(date);
  return isNaN(d.getTime()) ? null : d;
}
function safeDate(date) {
  const d = new Date(date);
  return isNaN(d.getTime()) ? null : d;
}


export const cleanJob = (raw) => {
  const job = { ...raw };

  job.title = cleanText(job.title || "");

  job.description = cleanText(job.description || "");

  job.company = cleanCompany(job.company || "");

  job.location = cleanLocation(job.location || "");

  job.skills = normalizeSkills(job.skills || []);

  job.stipend = normalizeStipend(job.stipend);

  job.remote = job.remote === true || job.location.toLowerCase().includes("remote");

  job.postedDate = safeDate(job.postedDate);
  job.deadline = safeDate(job.deadline);

  job.url = cleanUrl(job.url || "");

  return job;
};
