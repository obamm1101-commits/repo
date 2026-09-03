const API_URL = "http://localhost:5000/api";

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
  image: string;
}

export interface Skill {
  id: number;
  name: string;
  level: string;
  percentage: number;
  group_title: string;
  group_icon: string;
}

export interface SkillGroup {
  title: string;
  icon: string;
  skills: {
    name: string;
    level: string;
    percentage: number;
  }[];
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  stars: number;
  quote: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface DashboardStats {
  projects: number;
  skills: number;
  certificates: number;
  testimonials: number;
  contacts: number;
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }

  return response.json();
}

export async function fetchProjects(): Promise<Project[]> {
  const result = await fetchJson<{
    success: boolean;
    data: any[];
  }>(`${API_URL}/projects`);

  return result.data.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    description: item.description,
    tech:
      typeof item.tech === "string"
        ? JSON.parse(item.tech)
        : item.tech || [],
    demoUrl: item.demo_url || "#",
    githubUrl: item.github_url || "#",
    image: item.image || "",
  }));
}

export async function fetchSkills(): Promise<SkillGroup[]> {
  const result = await fetchJson<{
    success: boolean;
    data: Skill[];
  }>(`${API_URL}/skills`);

  const grouped = new Map<string, SkillGroup>();

  result.data.forEach((skill) => {
    if (!grouped.has(skill.group_title)) {
      grouped.set(skill.group_title, {
        title: skill.group_title,
        icon: skill.group_icon || "💻",
        skills: [],
      });
    }

    grouped.get(skill.group_title)!.skills.push({
      name: skill.name,
      level: skill.level,
      percentage: skill.percentage,
    });
  });

  return Array.from(grouped.values());
}

export async function fetchCertificates(): Promise<Certificate[]> {
  const result = await fetchJson<{
    success: boolean;
    data: any[];
  }>(`${API_URL}/certificates`);

  return result.data.map((item) => ({
    id: item.id,
    title: item.title,
    issuer: item.issuer,
    date: item.date,
    credentialId: item.credential_id,
    verificationUrl: item.verification_url || "#",
  }));
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const result = await fetchJson<{
    success: boolean;
    data: Testimonial[];
  }>(`${API_URL}/testimonials`);

  return result.data;
}

export async function sendMessage(data: {
  name: string;
  email: string;
  message: string;
}) {
  return fetchJson<{
    success: boolean;
    message: string;
    data: ContactMessage;
  }>(`${API_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function fetchMessages(): Promise<ContactMessage[]> {
  const result = await fetchJson<{
    success: boolean;
    data: ContactMessage[];
  }>(`${API_URL}/messages`);

  return result.data;
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const result = await fetchJson<{
    success: boolean;
    data: DashboardStats;
  }>(`${API_URL}/dashboard/stats`);

  return result.data;
}