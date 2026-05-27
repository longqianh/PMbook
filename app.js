const STORE_KEY = "pm-job-copilot-v0";

const stages = [
  { id: "wishlist", label: "Wishlist", color: "#6f579d" },
  { id: "applied", label: "Applied", color: "#3159a6" },
  { id: "recruiter", label: "Recruiter", color: "#147b75" },
  { id: "product", label: "Product Loop", color: "#b87318" },
  { id: "final", label: "Final", color: "#2f7c4f" },
  { id: "offer", label: "Offer", color: "#2f7c4f" },
  { id: "closed", label: "Closed", color: "#b34343" },
];

const competencies = [
  "Product Sense",
  "Execution",
  "Strategy",
  "Analytics",
  "User Research",
  "Leadership",
  "Technical Depth",
  "Conflict",
];

const promptBank = {
  "Product Sense": [
    "Pick a consumer product you use often. What user segment is underserved and what would you build next?",
    "Design a product for scientists who need to manage experimental workflows.",
    "How would you improve the onboarding experience for a technical SaaS product?",
  ],
  Execution: [
    "You shipped a feature and activation dropped. How do you diagnose and respond?",
    "Define the MVP for a PM job-search assistant and the launch plan for the first 30 users.",
    "A critical dependency slips by three weeks. What do you do as the PM?",
  ],
  Metrics: [
    "Choose north-star and guardrail metrics for a referral-driven job-search product.",
    "How would you measure whether a resume-tailoring feature improves outcomes?",
    "Build a funnel for applications to offers and identify the first bottleneck.",
  ],
  Strategy: [
    "Which PM job-search wedge should this product own first and why?",
    "How would you compete with spreadsheets, Notion templates, and career coaches?",
    "Prioritize three segments for a PM career tool: students, career switchers, and senior PMs.",
  ],
  Behavioral: [
    "Tell me about a time you influenced without authority.",
    "Tell me about a time you made a tradeoff with incomplete data.",
    "Tell me about a time you handled disagreement with an engineering partner.",
  ],
};

const decisionFactors = [
  { key: "scope", label: "Product scope" },
  { key: "manager", label: "Manager quality" },
  { key: "learning", label: "Learning curve" },
  { key: "craft", label: "PM craft" },
  { key: "comp", label: "Compensation" },
  { key: "mission", label: "Mission pull" },
  { key: "risk", label: "Risk control" },
];

const pmSignalTerms = [
  "roadmap",
  "strategy",
  "metrics",
  "experimentation",
  "analytics",
  "research",
  "discovery",
  "prioritization",
  "stakeholders",
  "launch",
  "growth",
  "platform",
  "ai",
  "api",
  "sql",
  "data",
  "market",
  "customer",
  "activation",
  "retention",
  "pricing",
  "technical",
  "execution",
  "vision",
  "design",
  "engineering",
];

const stopWords = new Set([
  "about",
  "after",
  "also",
  "and",
  "are",
  "but",
  "can",
  "for",
  "from",
  "have",
  "into",
  "our",
  "own",
  "that",
  "the",
  "their",
  "this",
  "with",
  "will",
  "you",
  "your",
  "product",
  "manager",
  "role",
  "team",
  "work",
]);

const stageById = Object.fromEntries(stages.map((stage) => [stage.id, stage]));
const stageOrder = Object.fromEntries(stages.map((stage, index) => [stage.id, index]));

let state = loadState();
let filters = {
  stage: "all",
  priority: "all",
  search: "",
  storyCompetency: "all",
};

let timerSeconds = 0;
let timerId = null;

function uid(prefix) {
  if (window.crypto && window.crypto.randomUUID) {
    return `${prefix}-${window.crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function todayIso() {
  return toIsoDate(new Date());
}

function toIsoDate(date) {
  const copy = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return copy.toISOString().slice(0, 10);
}

function offsetDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

function parseDate(value) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function daysBetween(start, end) {
  const startDate = parseDate(start);
  const endDate = parseDate(end);
  if (!startDate || !endDate) return 0;
  return Math.round((endDate - startDate) / 86400000);
}

function dueLabel(date) {
  if (!date) return "No date";
  const diff = daysBetween(todayIso(), date);
  if (diff < 0) return `${Math.abs(diff)}d overdue`;
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return `${diff}d`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

function tagsToArray(value) {
  if (Array.isArray(value)) return value;
  return String(value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function sentenceList(value) {
  return String(value || "")
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (raw) return normalizeState(JSON.parse(raw));
  } catch (error) {
    console.warn("Could not load state", error);
  }
  return defaultState();
}

function saveState() {
  window.localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function normalizeState(nextState) {
  const fallback = defaultState();
  return {
    ...fallback,
    ...nextState,
    jobs: Array.isArray(nextState.jobs) ? nextState.jobs : fallback.jobs,
    contacts: Array.isArray(nextState.contacts) ? nextState.contacts : fallback.contacts,
    stories: Array.isArray(nextState.stories) ? nextState.stories : fallback.stories,
    roles: Array.isArray(nextState.roles) ? nextState.roles : fallback.roles,
    actions: Array.isArray(nextState.actions) ? nextState.actions : fallback.actions,
    decisions: nextState.decisions && typeof nextState.decisions === "object" ? nextState.decisions : fallback.decisions,
    profile: { ...fallback.profile, ...(nextState.profile || {}) },
    goals: { ...fallback.goals, ...(nextState.goals || {}) },
    prep: { ...fallback.prep, ...(nextState.prep || {}) },
    fitLab: { ...fallback.fitLab, ...(nextState.fitLab || {}) },
    outreach: { ...fallback.outreach, ...(nextState.outreach || {}) },
    decisionJobId: nextState.decisionJobId || fallback.decisionJobId,
  };
}

function defaultState() {
  return {
    profile: {
      targetTitle: "Product Manager",
      location: "Remote, Bay Area, or Pasadena",
      companyThesis:
        "AI-native tools, scientific software, developer platforms, health technology, and data-heavy products with clear user pain.",
      strengths:
        "Technical depth, research empathy, data analysis, systems thinking, experimental rigor, and cross-functional communication.",
      constraints:
        "Prioritize PM roles with strong mentorship, clear product ownership, and teams that value technical context.",
      keywords:
        "AI, platform, developer tools, analytics, scientific software, experimentation, product discovery, roadmap, metrics",
    },
    goals: {
      applications: 8,
      warmIntros: 5,
      interviewDrills: 4,
      storyUpdates: 3,
    },
    fitLab: {
      jobId: "",
      jobDescription:
        "Own product discovery, roadmap, metrics, experimentation, user research, and cross-functional execution for an AI-enabled workflow product. Partner with engineering, design, data, and go-to-market teams to launch measurable improvements for technical users.",
    },
    outreach: {
      jobId: "",
      contactId: "",
      type: "warmIntro",
      hook: "",
      message: "",
    },
    decisionJobId: "",
    decisions: {},
    jobs: [
      {
        id: uid("job"),
        company: "Stripe",
        title: "Product Manager, Growth Platform",
        stage: "wishlist",
        priority: "High",
        source: "Company careers",
        contact: "Maya C.",
        dateApplied: "",
        followUp: offsetDate(2),
        url: "https://stripe.com/jobs",
        tags: ["growth", "platform", "payments"],
        nextStep: "Find warm intro and map growth metrics.",
        notes: "Strong match for analytics, experimentation, and platform thinking.",
      },
      {
        id: uid("job"),
        company: "Perplexity",
        title: "Product Manager, AI Search",
        stage: "recruiter",
        priority: "High",
        source: "Referral",
        contact: "Alex L.",
        dateApplied: offsetDate(-6),
        followUp: todayIso(),
        url: "https://www.perplexity.ai/careers",
        tags: ["ai", "search", "consumer"],
        nextStep: "Prepare product critique and search quality metrics.",
        notes: "Recruiter screen scheduled. Emphasize technical research background.",
      },
      {
        id: uid("job"),
        company: "Notion",
        title: "Product Manager, Collaboration",
        stage: "applied",
        priority: "Medium",
        source: "LinkedIn",
        contact: "",
        dateApplied: offsetDate(-3),
        followUp: offsetDate(4),
        url: "https://www.notion.so/careers",
        tags: ["collaboration", "productivity", "b2b"],
        nextStep: "Identify alumni or second-degree contact.",
        notes: "Need sharper story for multi-player workflows.",
      },
      {
        id: uid("job"),
        company: "Watershed",
        title: "Product Manager, Data Platform",
        stage: "product",
        priority: "High",
        source: "Founder post",
        contact: "Priya S.",
        dateApplied: offsetDate(-13),
        followUp: offsetDate(1),
        url: "https://watershed.com/jobs",
        tags: ["data", "climate", "platform"],
        nextStep: "Draft metrics answer for data quality and workflow trust.",
        notes: "Product interview next. Build examples around data integrity.",
      },
      {
        id: uid("job"),
        company: "Duolingo",
        title: "Associate Product Manager",
        stage: "closed",
        priority: "Low",
        source: "Job board",
        contact: "",
        dateApplied: offsetDate(-21),
        followUp: "",
        url: "https://careers.duolingo.com",
        tags: ["consumer", "education"],
        nextStep: "Archive learnings.",
        notes: "Rejected after application. Resume likely too technical for role framing.",
      },
    ],
    contacts: [
      {
        id: uid("contact"),
        name: "Alex L.",
        company: "Perplexity",
        relationship: "Friend of friend",
        status: "Referral submitted",
        followUp: todayIso(),
        url: "",
        notes: "Sent referral for AI Search PM.",
      },
      {
        id: uid("contact"),
        name: "Maya C.",
        company: "Stripe",
        relationship: "Caltech alum",
        status: "To contact",
        followUp: offsetDate(2),
        url: "",
        notes: "Ask for 20-minute PM growth team perspective.",
      },
      {
        id: uid("contact"),
        name: "Priya S.",
        company: "Watershed",
        relationship: "Former collaborator",
        status: "Call scheduled",
        followUp: offsetDate(1),
        url: "",
        notes: "Discuss data platform team scope.",
      },
    ],
    stories: [
      {
        id: uid("story"),
        title: "Built experiment workflow for imaging research",
        competency: "Execution",
        situation:
          "Researchers were losing time coordinating experiment setup, run logs, and post-processing decisions.",
        action:
          "Mapped the workflow, prioritized the highest-friction handoffs, and shipped a simple tracking process with templates.",
        impact:
          "Reduced repeated setup questions and created a shared view of experiment status across collaborators.",
        metrics: "Cut status-sync time by roughly 30% in active project weeks.",
      },
      {
        id: uid("story"),
        title: "Prioritized model quality tradeoffs",
        competency: "Analytics",
        situation:
          "A reconstruction pipeline had competing goals around accuracy, speed, and implementation effort.",
        action:
          "Defined decision metrics, compared options with test data, and made the tradeoff explicit for stakeholders.",
        impact:
          "Aligned the team on a practical path and avoided over-investing in low-impact optimization.",
        metrics: "Delivered a decision memo and reduced iteration scope by two workstreams.",
      },
      {
        id: uid("story"),
        title: "Translated technical risk for cross-functional partners",
        competency: "Leadership",
        situation:
          "Non-technical partners needed to understand why a planned capability could slip.",
        action:
          "Separated unknowns from controllable work, proposed milestones, and created a weekly risk review.",
        impact:
          "Improved trust and gave the team earlier signals for decisions.",
        metrics: "Moved risk discussion from ad hoc escalation to weekly planning.",
      },
    ],
    roles: [
      {
        id: uid("role"),
        name: "AI Product Manager",
        seniority: "APM to PM",
        companyType: "AI-native application or platform",
        mustHave: "Strong metrics, user empathy, and technical fluency",
        query: '"product manager" AI platform metrics user research',
        notes: "Best wedge for technical background and curiosity around AI workflows.",
      },
      {
        id: uid("role"),
        name: "Developer Tools PM",
        seniority: "PM",
        companyType: "B2B SaaS or infrastructure",
        mustHave: "Developer empathy and clear API/platform thinking",
        query: '"product manager" developer tools platform API',
        notes: "Use research tooling examples as proof of workflow depth.",
      },
      {
        id: uid("role"),
        name: "Data Platform PM",
        seniority: "PM",
        companyType: "Data-heavy SaaS",
        mustHave: "Data quality, trust, analytics, and operations",
        query: '"product manager" data platform analytics workflow',
        notes: "Strong fit when company sells complex data workflows.",
      },
    ],
    actions: [
      {
        id: uid("action"),
        text: "Tailor resume for AI Search PM",
        area: "Resume",
        due: todayIso(),
        done: false,
      },
      {
        id: uid("action"),
        text: "Send Stripe alum outreach",
        area: "Networking",
        due: offsetDate(1),
        done: false,
      },
      {
        id: uid("action"),
        text: "Practice product sense prompt",
        area: "Interview",
        due: offsetDate(2),
        done: false,
      },
    ],
    prep: {
      promptCategory: "Product Sense",
      currentPrompt: "Pick a consumer product you use often. What user segment is underserved and what would you build next?",
      notes: "",
    },
  };
}

function init() {
  document.getElementById("todayLine").textContent = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  hydrateStaticSelects();
  bindEvents();
  fillForms();
  render();
}

function hydrateStaticSelects() {
  const stageOptions = stages.map((stage) => `<option value="${stage.id}">${stage.label}</option>`).join("");
  document.getElementById("jobStageSelect").innerHTML = stageOptions;
  document.getElementById("stageFilter").innerHTML =
    `<option value="all">All stages</option>${stageOptions}`;

  const storyOptions = competencies.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("");
  document.getElementById("storyCompetencySelect").innerHTML = storyOptions;
  document.getElementById("storyFilter").innerHTML =
    `<option value="all">All competencies</option>${storyOptions}`;

  document.getElementById("promptCategory").innerHTML = Object.keys(promptBank)
    .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
    .join("");
}

function bindEvents() {
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("submit", handleSubmit);
  document.getElementById("pipelineSearch").addEventListener("input", (event) => {
    filters.search = event.target.value.trim().toLowerCase();
    renderPipeline();
  });
  document.getElementById("stageFilter").addEventListener("change", (event) => {
    filters.stage = event.target.value;
    renderPipeline();
  });
  document.getElementById("priorityFilter").addEventListener("change", (event) => {
    filters.priority = event.target.value;
    renderPipeline();
  });
  document.getElementById("storyFilter").addEventListener("change", (event) => {
    filters.storyCompetency = event.target.value;
    renderStories();
  });
  document.getElementById("promptCategory").addEventListener("change", (event) => {
    state.prep.promptCategory = event.target.value;
    choosePrompt();
  });
  document.getElementById("prepNotes").addEventListener("input", (event) => {
    state.prep.notes = event.target.value;
    saveState();
    flashSaved();
  });
  document.getElementById("briefJobSelect").addEventListener("change", renderBrief);
  document.getElementById("fitJobSelect").addEventListener("change", (event) => {
    state.fitLab.jobId = event.target.value;
    renderFitLab();
    saveState();
  });
  document.getElementById("fitDescription").addEventListener("input", (event) => {
    state.fitLab.jobDescription = event.target.value;
    saveState();
  });
  document.getElementById("outreachJobSelect").addEventListener("change", (event) => {
    state.outreach.jobId = event.target.value;
    renderOutreach();
    saveState();
  });
  document.getElementById("outreachContactSelect").addEventListener("change", (event) => {
    state.outreach.contactId = event.target.value;
    renderOutreach();
    saveState();
  });
  document.getElementById("outreachType").addEventListener("change", (event) => {
    state.outreach.type = event.target.value;
    renderOutreach();
    saveState();
  });
  document.getElementById("outreachMessage").addEventListener("input", (event) => {
    state.outreach.message = event.target.value;
    saveState();
  });
  document.getElementById("decisionJobSelect").addEventListener("change", (event) => {
    state.decisionJobId = event.target.value;
    renderDecision();
    saveState();
  });
  document.getElementById("importFile").addEventListener("change", importData);
}

function handleDocumentClick(event) {
  const nav = event.target.closest("[data-view-target]");
  if (nav) {
    showView(nav.dataset.viewTarget);
    return;
  }

  const openDialogButton = event.target.closest("[data-open-dialog]");
  if (openDialogButton) {
    openDialog(openDialogButton.dataset.openDialog);
    return;
  }

  const closeDialogButton = event.target.closest("[data-close-dialog]");
  if (closeDialogButton) {
    document.getElementById(closeDialogButton.dataset.closeDialog).close();
    return;
  }

  const saveFormButton = event.target.closest("[data-save-form]");
  if (saveFormButton) {
    const form = document.getElementById(saveFormButton.dataset.saveForm);
    if (form && (!form.reportValidity || form.reportValidity())) {
      routeFormSubmit(form);
    }
    return;
  }

  const action = event.target.closest("[data-action]");
  if (action) {
    handleAction(action.dataset.action, action.dataset.id);
    return;
  }

  if (event.target.id === "newPromptButton") choosePrompt();
  if (event.target.id === "savePromptAction") addPromptToPlan();
  if (event.target.id === "timerStart") startTimer();
  if (event.target.id === "timerPause") pauseTimer();
  if (event.target.id === "timerReset") resetTimer();
  if (event.target.id === "exportButton") exportData();
  if (event.target.id === "importButton") document.getElementById("importFile").click();
  if (event.target.id === "resetButton") resetData();
  if (event.target.id === "addFitActionsButton") addFitActions();
  if (event.target.id === "copyOutreachButton") copyOutreach();
  if (event.target.id === "planOutreachButton") planOutreach();
  if (event.target.id === "copyBriefButton") copyBrief();
}

function handleSubmit(event) {
  event.preventDefault();
  routeFormSubmit(event.target);
}

function routeFormSubmit(form) {
  const formId = form.getAttribute("id");
  if (formId === "jobForm") saveJob(form);
  if (formId === "contactForm") saveContact(form);
  if (formId === "storyForm") saveStory(form);
  if (formId === "roleForm") saveRole(form);
  if (formId === "fitForm") saveFitLab(form);
  if (formId === "outreachForm") saveOutreach(form);
  if (formId === "decisionForm") saveDecision(form);
  if (formId === "profileForm") saveProfile(form);
  if (formId === "goalForm") saveGoals(form);
  if (formId === "actionForm") saveAction(form);
}

function handleAction(action, id) {
  const handlers = {
    editJob: () => openJobEditor(id),
    deleteJob: () => deleteItem("jobs", id),
    advanceJob: () => advanceJob(id),
    editContact: () => openContactEditor(id),
    deleteContact: () => deleteItem("contacts", id),
    editStory: () => openStoryEditor(id),
    deleteStory: () => deleteItem("stories", id),
    editRole: () => openRoleEditor(id),
    deleteRole: () => deleteItem("roles", id),
    toggleAction: () => toggleAction(id),
    deleteAction: () => deleteItem("actions", id),
    createFollowUp: () => createFollowUpFromJob(id),
    openFitForJob: () => openFitForJob(id),
    openOutreachForJob: () => openOutreachForJob(id),
    openDecisionForJob: () => openDecisionForJob(id),
  };
  if (handlers[action]) handlers[action]();
}

function showView(viewId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewId);
  });
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.viewTarget === viewId);
  });
}

function fillForms() {
  const profileForm = document.getElementById("profileForm");
  Object.entries(state.profile).forEach(([key, value]) => {
    if (profileForm.elements[key]) profileForm.elements[key].value = value;
  });

  const goalForm = document.getElementById("goalForm");
  Object.entries(state.goals).forEach(([key, value]) => {
    if (goalForm.elements[key]) goalForm.elements[key].value = value;
  });

  document.getElementById("prepNotes").value = state.prep.notes || "";
  document.getElementById("promptCategory").value = state.prep.promptCategory || "Product Sense";
}

function render() {
  renderDashboard();
  renderRiskQueue();
  renderPipeline();
  renderTargeting();
  renderFitLab();
  renderNetwork();
  renderOutreach();
  renderStories();
  renderInterview();
  renderDecision();
  renderPlan();
  renderBriefOptions();
  renderBrief();
  saveState();
}

function metrics() {
  const jobs = state.jobs;
  const applied = jobs.filter((job) => job.stage !== "wishlist").length;
  const interviewStages = ["recruiter", "product", "final", "offer"];
  const interviews = jobs.filter((job) => interviewStages.includes(job.stage)).length;
  const active = jobs.filter((job) => !["closed", "offer"].includes(job.stage)).length;
  const due = jobs.filter((job) => job.followUp && daysBetween(todayIso(), job.followUp) <= 0 && !["closed", "offer"].includes(job.stage)).length;
  const appsThisWeek = jobs.filter((job) => job.dateApplied && daysBetween(job.dateApplied, todayIso()) <= 6).length;
  const warmThisWeek = state.contacts.filter((contact) => contact.followUp && daysBetween(contact.followUp, todayIso()) <= 6).length;
  const responseRate = applied ? Math.round((interviews / applied) * 100) : 0;
  const risks = pipelineRisks().length;
  return { applied, interviews, active, due, appsThisWeek, warmThisWeek, responseRate, risks };
}

function renderDashboard() {
  const data = metrics();
  const kpis = [
    { label: "Active roles", value: data.active, meta: `${state.jobs.length} total opportunities` },
    { label: "Applications", value: data.applied, meta: `${data.appsThisWeek}/${state.goals.applications} this week` },
    { label: "Interview rate", value: `${data.responseRate}%`, meta: `${data.interviews} roles in interview stages` },
    { label: "Follow-ups", value: data.due, meta: "due or overdue" },
    { label: "Pipeline risks", value: data.risks, meta: "stale, unowned, or low-fit roles" },
  ];

  document.getElementById("kpiGrid").innerHTML = kpis
    .map(
      (item) => `
        <article class="kpi-card">
          <div class="label">${escapeHtml(item.label)}</div>
          <div class="value">${escapeHtml(item.value)}</div>
          <div class="meta">${escapeHtml(item.meta)}</div>
        </article>
      `,
    )
    .join("");

  const followUps = state.jobs
    .filter((job) => job.followUp && daysBetween(todayIso(), job.followUp) <= 1 && !["closed", "offer"].includes(job.stage))
    .sort((a, b) => (a.followUp || "").localeCompare(b.followUp || ""))
    .slice(0, 5);
  const actions = state.actions
    .filter((action) => !action.done && daysBetween(todayIso(), action.due) <= 1)
    .sort((a, b) => a.due.localeCompare(b.due))
    .slice(0, 4);

  const focusItems = [
    ...followUps.map((job) => ({
      title: `${job.company} - ${job.title}`,
      meta: `Follow-up ${dueLabel(job.followUp)} | ${job.nextStep || "Next step"}`,
      action: `<button class="button ghost" type="button" data-action="createFollowUp" data-id="${job.id}">Plan</button>`,
    })),
    ...actions.map((action) => ({
      title: action.text,
      meta: `${action.area} | ${dueLabel(action.due)}`,
      action: `<button class="button ghost" type="button" data-action="toggleAction" data-id="${action.id}">Done</button>`,
    })),
  ];

  document.getElementById("todayCount").textContent = `${focusItems.length} items`;
  document.getElementById("todayFocus").innerHTML = focusItems.length
    ? focusItems
        .map(
          (item) => `
            <article class="focus-item">
              <div>
                <strong>${escapeHtml(item.title)}</strong>
                <div class="muted small">${escapeHtml(item.meta)}</div>
              </div>
              ${item.action}
            </article>
          `,
        )
        .join("")
    : `<div class="empty">No due items</div>`;

  const totalJobs = Math.max(state.jobs.length, 1);
  document.getElementById("stageTotal").textContent = `${state.jobs.length} roles`;
  document.getElementById("stageBars").innerHTML = stages
    .map((stage) => {
      const count = state.jobs.filter((job) => job.stage === stage.id).length;
      const width = Math.round((count / totalJobs) * 100);
      return `
        <div class="bar-row">
          <div class="bar-label">${escapeHtml(stage.label)}</div>
          <div class="bar-track"><div class="bar-fill" style="width:${width}%; background:${stage.color}"></div></div>
          <strong class="small">${count}</strong>
        </div>
      `;
    })
    .join("");
}


function pipelineRisks() {
  const risks = [];
  state.jobs.forEach((job) => {
    if (["closed", "offer"].includes(job.stage)) return;
    const fit = scoreJob(job);
    if (job.followUp && daysBetween(todayIso(), job.followUp) < 0) {
      risks.push({ job, severity: 3, reason: "Follow-up is " + dueLabel(job.followUp) });
    }
    if (job.stage === "applied" && job.dateApplied && daysBetween(job.dateApplied, todayIso()) > 7) {
      risks.push({ job, severity: 2, reason: "Applied more than a week ago without stage movement" });
    }
    if (job.priority === "High" && !job.contact && ["wishlist", "applied"].includes(job.stage)) {
      risks.push({ job, severity: 2, reason: "High-priority role has no referral path" });
    }
    if (fit < 58 && !job.notes.toLowerCase().includes("tailor")) {
      risks.push({ job, severity: 1, reason: "Low visible fit signal: " + fit + "/100" });
    }
  });
  return risks.sort((a, b) => b.severity - a.severity || scoreJob(b.job) - scoreJob(a.job)).slice(0, 6);
}

function renderRiskQueue() {
  const risks = pipelineRisks();
  document.getElementById("riskCount").textContent = risks.length + " risks";
  document.getElementById("riskQueue").innerHTML = risks.length
    ? risks
        .map(({ job, reason, severity }) =>
          '<article class="risk-card severity-' + severity + '">' +
            '<div>' +
              '<strong>' + escapeHtml(job.company) + ' - ' + escapeHtml(job.title) + '</strong>' +
              '<div class="muted small">' + escapeHtml(reason) + '</div>' +
            '</div>' +
            '<button class="button ghost" type="button" data-action="createFollowUp" data-id="' + job.id + '">Plan</button>' +
          '</article>'
        )
        .join("")
    : '<div class="empty">No pipeline risks</div>';
}

function filteredJobs() {
  return state.jobs.filter((job) => {
    const haystack = [job.company, job.title, job.source, job.contact, job.nextStep, job.notes, ...(job.tags || [])]
      .join(" ")
      .toLowerCase();
    const matchesSearch = !filters.search || haystack.includes(filters.search);
    const matchesStage = filters.stage === "all" || job.stage === filters.stage;
    const matchesPriority = filters.priority === "all" || job.priority === filters.priority;
    return matchesSearch && matchesStage && matchesPriority;
  });
}

function renderPipeline() {
  const jobs = filteredJobs();
  document.getElementById("kanban").innerHTML = stages
    .map((stage) => {
      const stageJobs = jobs
        .filter((job) => job.stage === stage.id)
        .sort((a, b) => scoreJob(b) - scoreJob(a));
      return `
        <section class="stage-column" style="--stage-color:${stage.color}">
          <div class="stage-head">
            <h3>${escapeHtml(stage.label)}</h3>
            <span class="count-pill">${stageJobs.length}</span>
          </div>
          ${stageJobs.map(renderJobCard).join("") || `<div class="empty">No roles</div>`}
        </section>
      `;
    })
    .join("");
}

function renderJobCard(job) {
  const nextStage = stages[stageOrder[job.stage] + 1];
  const tags = tagsToArray(job.tags);
  return `
    <article class="job-card">
      <div class="job-card-header">
        <div>
          <h4>${escapeHtml(job.company)}</h4>
          <p>${escapeHtml(job.title)}</p>
        </div>
        <div class="score" title="Fit score">${scoreJob(job)}</div>
      </div>
      <div class="tag-row">
        <span class="pill ${job.priority.toLowerCase()}">${escapeHtml(job.priority)}</span>
        <span class="pill">${escapeHtml(dueLabel(job.followUp))}</span>
        ${job.contact ? `<span class="pill">${escapeHtml(job.contact)}</span>` : ""}
      </div>
      ${tags.length ? `<div class="tag-row">${tags.map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
      <p>${escapeHtml(job.nextStep || job.notes || "No next step")}</p>
      <div class="card-actions">
        <button class="button ghost" type="button" data-action="editJob" data-id="${job.id}">Edit</button>
        ${
          nextStage
            ? `<button class="button ghost" type="button" data-action="advanceJob" data-id="${job.id}">Move</button>`
            : ""
        }
        <button class="button ghost" type="button" data-action="createFollowUp" data-id="${job.id}">Plan</button>
        <button class="button ghost" type="button" data-action="openFitForJob" data-id="${job.id}">Fit</button>
        <button class="button ghost" type="button" data-action="openOutreachForJob" data-id="${job.id}">Outreach</button>
        <button class="button ghost" type="button" data-action="openDecisionForJob" data-id="${job.id}">Score</button>
        <button class="button danger" type="button" data-action="deleteJob" data-id="${job.id}">Delete</button>
      </div>
    </article>
  `;
}

function scoreJob(job) {
  const profileTokens = sentenceList(`${state.profile.keywords},${state.profile.strengths},${state.profile.companyThesis}`)
    .join(" ")
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length > 2);
  const jobText = [job.company, job.title, job.notes, job.nextStep, ...(job.tags || [])].join(" ").toLowerCase();
  const keywordHits = new Set(profileTokens.filter((token) => jobText.includes(token))).size;
  const stagePoints = Math.min((stageOrder[job.stage] || 0) * 6, 30);
  const priorityPoints = job.priority === "High" ? 18 : job.priority === "Medium" ? 10 : 4;
  const referralPoints = job.contact ? 12 : 0;
  const keywordPoints = Math.min(keywordHits * 5, 30);
  return Math.min(100, 28 + stagePoints + priorityPoints + referralPoints + keywordPoints);
}

function renderTargeting() {
  document.getElementById("roleCount").textContent = `${state.roles.length} roles`;
  document.getElementById("targetRoles").innerHTML = state.roles
    .map((role) => {
      const score = scoreRole(role);
      return `
        <article class="role-card">
          <div class="job-card-header">
            <div>
              <strong>${escapeHtml(role.name)}</strong>
              <p>${escapeHtml(role.seniority || "Any seniority")} | ${escapeHtml(role.companyType || "Any company")}</p>
            </div>
            <div class="score">${score}</div>
          </div>
          <p><strong>Signal:</strong> ${escapeHtml(role.mustHave || "Not set")}</p>
          <p><strong>Query:</strong> ${escapeHtml(role.query || "Not set")}</p>
          <p>${escapeHtml(role.notes || "")}</p>
          <div class="card-actions">
            <button class="button ghost" type="button" data-action="editRole" data-id="${role.id}">Edit</button>
            <button class="button danger" type="button" data-action="deleteRole" data-id="${role.id}">Delete</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function scoreRole(role) {
  const profile = `${state.profile.targetTitle} ${state.profile.companyThesis} ${state.profile.strengths} ${state.profile.keywords}`.toLowerCase();
  const roleText = `${role.name} ${role.companyType} ${role.mustHave} ${role.query} ${role.notes}`.toLowerCase();
  const tokens = sentenceList(profile).join(" ").split(/\s+/).filter((token) => token.length > 3);
  const hits = new Set(tokens.filter((token) => roleText.includes(token))).size;
  return Math.min(100, 42 + hits * 7);
}


function renderFitLab() {
  const form = document.getElementById("fitForm");
  const selectedJob = state.jobs.find((job) => job.id === state.fitLab.jobId) || state.jobs[0];
  if (selectedJob && state.fitLab.jobId !== selectedJob.id) state.fitLab.jobId = selectedJob.id;
  form.elements.jobId.innerHTML = jobOptions(state.fitLab.jobId);
  form.elements.jobId.value = state.fitLab.jobId || "";
  if (document.activeElement !== form.elements.jobDescription) {
    form.elements.jobDescription.value = state.fitLab.jobDescription || "";
  }

  const analysis = analyzeFit(selectedJob, state.fitLab.jobDescription);
  document.getElementById("fitScoreLabel").textContent = analysis.hasDescription ? analysis.coverage + "% match" : "Needs JD";
  document.getElementById("fitSummary").innerHTML = analysis.hasDescription
    ? '<section class="brief-section fit-score-card">' +
        '<div class="score large">' + analysis.coverage + '</div>' +
        '<div><h3>Coverage</h3><p>' + escapeHtml(analysis.summary) + '</p></div>' +
      '</section>' +
      '<section class="brief-section"><h3>Matched Signals</h3><div class="tag-row">' + renderTermPills(analysis.matched, "No matched terms") + '</div></section>' +
      '<section class="brief-section"><h3>Missing Signals</h3><div class="tag-row">' + renderTermPills(analysis.missing, "No obvious gaps") + '</div></section>'
    : '<div class="empty">Select a role and add a job description</div>';

  document.getElementById("fitTailoring").innerHTML = analysis.hasDescription
    ? [fitCard("Resume bullets", analysis.resumeBullets), fitCard("Story matches", analysis.storyMatches), fitCard("Interview risks", analysis.risks)].join("")
    : '<div class="empty">No tailoring output yet</div>';
}

function fitCard(title, items) {
  return '<article class="story-card compact-card"><strong>' + escapeHtml(title) + '</strong><ul class="insight-list">' +
    (items.map((item) => '<li>' + escapeHtml(item) + '</li>').join("") || '<li>No items</li>') +
    '</ul></article>';
}

function renderTermPills(terms, emptyLabel) {
  return terms.length ? terms.map((term) => '<span class="pill">' + escapeHtml(term) + '</span>').join("") : '<span class="pill">' + escapeHtml(emptyLabel) + '</span>';
}

function analyzeFit(job, description) {
  const jdText = String(description || "");
  const jdLower = jdText.toLowerCase();
  const hasDescription = jdText.trim().length > 20;
  if (!hasDescription || !job) {
    return { hasDescription: false, coverage: 0, matched: [], missing: [], summary: "", resumeBullets: [], storyMatches: [], risks: [] };
  }

  const jdTerms = uniqueList([...termsFromText(jdText, 28), ...pmSignalTerms.filter((term) => jdLower.includes(term))]).slice(0, 28);
  const profileText = [
    state.profile.targetTitle,
    state.profile.companyThesis,
    state.profile.strengths,
    state.profile.keywords,
    job.title,
    job.notes,
    job.nextStep,
    ...(job.tags || []),
    ...state.stories.map((story) => story.title + " " + story.competency + " " + story.situation + " " + story.action + " " + story.impact + " " + story.metrics),
  ]
    .join(" ")
    .toLowerCase();
  const matched = jdTerms.filter((term) => profileText.includes(term)).slice(0, 10);
  const missing = jdTerms.filter((term) => !profileText.includes(term)).slice(0, 10);
  const coverage = jdTerms.length ? Math.round((matched.length / jdTerms.length) * 100) : 0;
  const summary = coverage >= 70
    ? "Strong overlap. Spend effort on proof points and quantified bullets."
    : coverage >= 45
      ? "Workable overlap. Tailor the resume and prepare gap stories before applying."
      : "Weak visible overlap. Find a stronger angle, referral, or adjacent role before investing heavily.";
  const resumeBullets = [
    ...matched.slice(0, 3).map((term) => "Show a measured PM outcome tied to " + term + "."),
    ...missing.slice(0, 3).map((term) => "Add credible language for " + term + " if you have evidence."),
  ];
  const storyMatches = state.stories
    .slice()
    .sort((a, b) => storyTermHits(b, jdTerms) - storyTermHits(a, jdTerms))
    .slice(0, 3)
    .map((story) => story.title + ": " + (story.metrics || story.impact || story.competency));
  const risks = [
    ...(missing.includes("metrics") ? ["Metrics language is underrepresented for this JD."] : []),
    ...(missing.includes("research") ? ["User discovery or research evidence may need to be explicit."] : []),
    ...(missing.includes("technical") || missing.includes("api") ? ["Technical fluency should be backed by a concrete example."] : []),
    ...(coverage < 50 ? ["Consider securing a warm intro before applying cold."] : []),
  ];
  if (!risks.length) risks.push("No major risk surfaced from the keyword pass.");
  return { hasDescription, coverage, matched, missing, summary, resumeBullets, storyMatches, risks };
}

function termsFromText(text, limit) {
  const counts = new Map();
  String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .split(/\s+/)
    .map((word) => word.replace(/^-+|-+$/g, ""))
    .filter((word) => word.length > 2 && !stopWords.has(word))
    .forEach((word) => counts.set(word, (counts.get(word) || 0) + 1));
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([word]) => word)
    .slice(0, limit);
}

function uniqueList(items) {
  return [...new Set(items.filter(Boolean))];
}

function storyTermHits(story, terms) {
  const text = (story.title + " " + story.competency + " " + story.situation + " " + story.action + " " + story.impact + " " + story.metrics).toLowerCase();
  return terms.filter((term) => text.includes(term)).length;
}

function jobOptions(selectedId) {
  return state.jobs
    .map((job) => '<option value="' + job.id + '" ' + (job.id === selectedId ? "selected" : "") + '>' + escapeHtml(job.company) + ' - ' + escapeHtml(job.title) + '</option>')
    .join("");
}

function renderNetwork() {
  const rows = state.contacts
    .slice()
    .sort((a, b) => (a.followUp || "9999").localeCompare(b.followUp || "9999"))
    .map(
      (contact) => `
        <tr>
          <td><strong>${escapeHtml(contact.name)}</strong><div class="muted small">${escapeHtml(contact.notes || "")}</div></td>
          <td>${escapeHtml(contact.company)}</td>
          <td>${escapeHtml(contact.relationship || "")}</td>
          <td><span class="pill">${escapeHtml(contact.status)}</span></td>
          <td>${escapeHtml(dueLabel(contact.followUp))}</td>
          <td>
            <div class="card-actions">
              <button class="button ghost" type="button" data-action="editContact" data-id="${contact.id}">Edit</button>
              <button class="button danger" type="button" data-action="deleteContact" data-id="${contact.id}">Delete</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");
  document.getElementById("contactRows").innerHTML = rows || `<tr><td colspan="6">No contacts</td></tr>`;
}


function renderOutreach() {
  const form = document.getElementById("outreachForm");
  const selectedJob = state.jobs.find((job) => job.id === state.outreach.jobId) || state.jobs[0];
  const selectedContact = state.contacts.find((contact) => contact.id === state.outreach.contactId) || state.contacts[0];
  if (selectedJob && state.outreach.jobId !== selectedJob.id) state.outreach.jobId = selectedJob.id;
  if (selectedContact && state.outreach.contactId !== selectedContact.id) state.outreach.contactId = selectedContact.id;

  form.elements.jobId.innerHTML = jobOptions(state.outreach.jobId);
  form.elements.contactId.innerHTML = state.contacts
    .map((contact) => '<option value="' + contact.id + '" ' + (contact.id === state.outreach.contactId ? "selected" : "") + '>' + escapeHtml(contact.name) + ' - ' + escapeHtml(contact.company) + '</option>')
    .join("");
  form.elements.jobId.value = state.outreach.jobId || "";
  form.elements.contactId.value = state.outreach.contactId || "";
  form.elements.type.value = state.outreach.type || "warmIntro";
  if (document.activeElement !== form.elements.hook) form.elements.hook.value = state.outreach.hook || "";
  if (!state.outreach.message) state.outreach.message = generateOutreachMessage(selectedJob, selectedContact, state.outreach.type, state.outreach.hook);
  if (document.activeElement !== document.getElementById("outreachMessage")) {
    document.getElementById("outreachMessage").value = state.outreach.message || "";
  }
}

function saveOutreach(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const job = state.jobs.find((item) => item.id === data.jobId) || state.jobs[0];
  const contact = state.contacts.find((item) => item.id === data.contactId) || state.contacts[0];
  state.outreach = {
    jobId: data.jobId,
    contactId: data.contactId,
    type: data.type,
    hook: data.hook.trim(),
    message: generateOutreachMessage(job, contact, data.type, data.hook.trim()),
  };
  render();
}

function generateOutreachMessage(job, contact, type, hook) {
  if (!job) return "";
  const contactName = contact?.name || "there";
  const hookLine = hook ? "\n\n" + hook : "";
  const strength = state.profile.strengths.split(",")[0]?.toLowerCase() || "product judgment";
  const fitLine = "I am targeting " + state.profile.targetTitle + " roles where " + strength + " matters.";
  const tagLine = tagsToArray(job.tags).slice(0, 2).join(" and ") || "product execution and metrics";
  const templates = {
    warmIntro: "Hi " + contactName + ",\n\nI saw " + job.company + " is hiring for " + job.title + ". " + fitLine + hookLine + "\n\nWould you be open to a brief chat about how the PM team thinks about this area? I would value your perspective before I apply.",
    referral: "Hi " + contactName + ",\n\nI am applying for " + job.title + " at " + job.company + ". The role seems aligned with my work around " + tagLine + ".\n\nIf you feel comfortable after a quick look at my background, would you consider referring me? I can send a concise resume and role-specific summary." + hookLine,
    recruiter: "Hi " + contactName + ",\n\nI am interested in " + job.company + "'s " + job.title + " role. My strongest fit is " + state.profile.strengths.split(",").slice(0, 2).join(" and ").toLowerCase() + ".\n\nI would be glad to share a tailored resume and discuss where my background maps to the team needs." + hookLine,
    followUp: "Hi " + contactName + ",\n\nFollowing up on " + job.company + "'s " + job.title + " role. I am still very interested, especially because the role connects to " + tagLine + ".\n\nPlease let me know if there is anything useful I can send as context." + hookLine,
  };
  return templates[type] || templates.warmIntro;
}

async function copyOutreach() {
  const button = document.getElementById("copyOutreachButton");
  const text = document.getElementById("outreachMessage").value;
  await copyText(text, button, "Copy");
}

function planOutreach() {
  const job = state.jobs.find((item) => item.id === state.outreach.jobId) || state.jobs[0];
  if (!job) return;
  state.actions.push({
    id: uid("action"),
    text: "Send " + (state.outreach.type || "outreach") + " message for " + job.company,
    area: "Networking",
    due: todayIso(),
    done: false,
  });
  render();
}

function renderStories() {
  const stories = state.stories.filter(
    (story) => filters.storyCompetency === "all" || story.competency === filters.storyCompetency,
  );
  document.getElementById("storyCards").innerHTML = stories.length
    ? stories
        .map(
          (story) => `
            <article class="story-card">
              <div>
                <strong>${escapeHtml(story.title)}</strong>
                <div class="tag-row"><span class="pill">${escapeHtml(story.competency)}</span></div>
              </div>
              <p><strong>Situation:</strong> ${escapeHtml(story.situation)}</p>
              <p><strong>Action:</strong> ${escapeHtml(story.action)}</p>
              <p><strong>Impact:</strong> ${escapeHtml(story.impact)}</p>
              <p><strong>Metrics:</strong> ${escapeHtml(story.metrics)}</p>
              <div class="card-actions">
                <button class="button ghost" type="button" data-action="editStory" data-id="${story.id}">Edit</button>
                <button class="button danger" type="button" data-action="deleteStory" data-id="${story.id}">Delete</button>
              </div>
            </article>
          `,
        )
        .join("")
    : `<div class="empty">No stories</div>`;
}

function renderInterview() {
  document.getElementById("promptText").textContent = state.prep.currentPrompt || "";
  document.getElementById("timerDisplay").textContent = formatTimer(timerSeconds);
}


function renderDecision() {
  const form = document.getElementById("decisionForm");
  const selectedJob = state.jobs.find((job) => job.id === state.decisionJobId) || state.jobs.find((job) => !["closed"].includes(job.stage)) || state.jobs[0];
  if (selectedJob && state.decisionJobId !== selectedJob.id) state.decisionJobId = selectedJob.id;
  form.elements.jobId.innerHTML = jobOptions(state.decisionJobId);
  form.elements.jobId.value = state.decisionJobId || "";
  const score = state.decisions[state.decisionJobId] || defaultDecisionScore();
  decisionFactors.forEach((factor) => {
    form.elements[factor.key].value = score[factor.key] ?? 3;
  });
  form.elements.notes.value = score.notes || "";

  const ranked = decisionRankings();
  const top = ranked[0];
  document.getElementById("decisionTopScore").textContent = top ? top.total + "/35" : "No scores";
  document.getElementById("decisionSummary").innerHTML = top
    ? '<section class="brief-section"><h3>' + escapeHtml(top.job.company) + ' - ' + escapeHtml(top.job.title) + '</h3><ul>' +
      '<li>Total score: ' + top.total + '/35</li>' +
      '<li>Strongest factor: ' + escapeHtml(top.strongest) + '</li>' +
      '<li>Weakest factor: ' + escapeHtml(top.weakest) + '</li>' +
      '<li>' + escapeHtml(decisionTradeoff(top.score)) + '</li>' +
      '</ul></section>'
    : '<div class="empty">Score at least one opportunity</div>';
  document.getElementById("decisionRows").innerHTML = ranked.length
    ? ranked
        .map((item) =>
          '<tr>' +
            '<td><strong>' + escapeHtml(item.job.company) + '</strong><div class="muted small">' + escapeHtml(item.job.title) + '</div></td>' +
            '<td><span class="score small-score">' + item.total + '</span></td>' +
            '<td>' + escapeHtml(stageById[item.job.stage]?.label || item.job.stage) + '</td>' +
            '<td>' + escapeHtml(decisionTradeoff(item.score)) + '</td>' +
            '<td>' + escapeHtml(item.score.notes || "") + '</td>' +
          '</tr>'
        )
        .join("")
    : '<tr><td colspan="5">No scores yet</td></tr>';
}

function saveDecision(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  state.decisionJobId = data.jobId;
  state.decisions[data.jobId] = {
    ...Object.fromEntries(decisionFactors.map((factor) => [factor.key, clampScore(data[factor.key])])),
    notes: data.notes.trim(),
  };
  render();
}

function decisionRankings() {
  return state.jobs
    .map((job) => {
      const score = state.decisions[job.id];
      if (!score) return null;
      const total = decisionFactors.map((factor) => score[factor.key] || 0).reduce((sum, value) => sum + value, 0);
      const strongestFactor = decisionFactors.slice().sort((a, b) => (score[b.key] || 0) - (score[a.key] || 0))[0];
      const weakestFactor = decisionFactors.slice().sort((a, b) => (score[a.key] || 0) - (score[b.key] || 0))[0];
      return {
        job,
        score,
        total,
        strongest: strongestFactor.label + " (" + (score[strongestFactor.key] || 0) + ")",
        weakest: weakestFactor.label + " (" + (score[weakestFactor.key] || 0) + ")",
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.total - a.total);
}

function defaultDecisionScore() {
  return Object.fromEntries(decisionFactors.map((factor) => [factor.key, 3]));
}

function clampScore(value) {
  return Math.max(1, Math.min(5, Number(value || 3)));
}

function decisionTradeoff(score) {
  const weak = decisionFactors.filter((factor) => (score[factor.key] || 0) <= 2).map((factor) => factor.label.toLowerCase());
  if (weak.length) return "Investigate " + weak.slice(0, 2).join(" and ") + " before committing.";
  const strong = decisionFactors.filter((factor) => (score[factor.key] || 0) >= 4).map((factor) => factor.label.toLowerCase());
  return strong.length ? "Lean in on " + strong.slice(0, 2).join(" and ") + "." : "Balanced but not yet differentiated.";
}

function renderPlan() {
  const data = metrics();
  const completedActions = state.actions.filter((action) => action.done).length;
  const progress = [
    { label: "Applications", current: data.appsThisWeek, target: state.goals.applications, color: "#3159a6" },
    { label: "Warm intros", current: data.warmThisWeek, target: state.goals.warmIntros, color: "#147b75" },
    {
      label: "Interview drills",
      current: state.actions.filter((action) => action.area === "Interview" && action.done).length,
      target: state.goals.interviewDrills,
      color: "#b87318",
    },
    {
      label: "Story updates",
      current: state.stories.length,
      target: state.goals.storyUpdates,
      color: "#6f579d",
    },
  ];

  document.getElementById("goalProgress").innerHTML = progress
    .map((item) => {
      const percent = item.target ? Math.min(100, Math.round((item.current / item.target) * 100)) : 100;
      return `
        <div class="bar-row">
          <div class="bar-label">${escapeHtml(item.label)}</div>
          <div class="bar-track"><div class="bar-fill" style="width:${percent}%; background:${item.color}"></div></div>
          <strong class="small">${item.current}/${item.target}</strong>
        </div>
      `;
    })
    .join("");

  document.getElementById("actionCount").textContent = `${completedActions}/${state.actions.length} done`;
  document.getElementById("actionList").innerHTML = state.actions
    .slice()
    .sort((a, b) => Number(a.done) - Number(b.done) || a.due.localeCompare(b.due))
    .map(
      (action) => `
        <article class="action-item ${action.done ? "done" : ""}">
          <label class="checkline">
            <input type="checkbox" ${action.done ? "checked" : ""} data-action="toggleAction" data-id="${action.id}" />
            <span>
              <strong>${escapeHtml(action.text)}</strong>
              <span class="muted small">${escapeHtml(action.area)} | ${escapeHtml(dueLabel(action.due))}</span>
            </span>
          </label>
          <button class="button danger" type="button" data-action="deleteAction" data-id="${action.id}">Delete</button>
        </article>
      `,
    )
    .join("");
}

function renderBriefOptions() {
  document.getElementById("briefJobSelect").innerHTML = state.jobs
    .map((job) => `<option value="${job.id}">${escapeHtml(job.company)} - ${escapeHtml(job.title)}</option>`)
    .join("");
}

function renderBrief() {
  const select = document.getElementById("briefJobSelect");
  const job = state.jobs.find((item) => item.id === select.value) || state.jobs[0];
  if (!job) {
    document.getElementById("briefOutput").innerHTML = `<div class="empty">No opportunity selected</div>`;
    return;
  }
  if (select.value !== job.id) select.value = job.id;

  const relevantStories = state.stories
    .slice()
    .sort((a, b) => storyRelevance(b, job) - storyRelevance(a, job))
    .slice(0, 3);
  const role = state.roles.slice().sort((a, b) => scoreRole(b) - scoreRole(a))[0];
  const tags = tagsToArray(job.tags);

  document.getElementById("briefOutput").innerHTML = `
    <section class="brief-section">
      <h3>Positioning</h3>
      <ul>
        <li>${escapeHtml(state.profile.targetTitle)} candidate for ${escapeHtml(job.company)} ${escapeHtml(job.title)}.</li>
        <li>Fit score: ${scoreJob(job)}. Stage: ${escapeHtml(stageById[job.stage]?.label || job.stage)}. Priority: ${escapeHtml(job.priority)}.</li>
        <li>Search thesis: ${escapeHtml(state.profile.companyThesis)}</li>
      </ul>
    </section>
    <section class="brief-section">
      <h3>Resume Emphasis</h3>
      <ul>
        ${sentenceList(state.profile.strengths)
          .slice(0, 4)
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join("")}
        ${tags.map((tag) => `<li>Mirror role language around ${escapeHtml(tag)}.</li>`).join("")}
      </ul>
    </section>
    <section class="brief-section">
      <h3>Stories</h3>
      <ul>
        ${relevantStories
          .map((story) => `<li>${escapeHtml(story.title)} - ${escapeHtml(story.impact || story.metrics)}</li>`)
          .join("")}
      </ul>
    </section>
    <section class="brief-section">
      <h3>Next Step</h3>
      <ul>
        <li>${escapeHtml(job.nextStep || "Define next step")}</li>
        <li>Follow-up: ${escapeHtml(dueLabel(job.followUp))}</li>
        ${role ? `<li>Closest target role: ${escapeHtml(role.name)}.</li>` : ""}
      </ul>
    </section>
  `;
}

function storyRelevance(story, job) {
  const text = `${job.title} ${job.company} ${job.notes} ${(job.tags || []).join(" ")}`.toLowerCase();
  const storyText = `${story.title} ${story.competency} ${story.situation} ${story.action} ${story.impact}`.toLowerCase();
  return text.split(/\s+/).filter((word) => word.length > 3 && storyText.includes(word)).length;
}


function saveFitLab(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  state.fitLab = {
    jobId: data.jobId,
    jobDescription: data.jobDescription.trim(),
  };
  render();
}

function addFitActions() {
  const job = state.jobs.find((item) => item.id === state.fitLab.jobId) || state.jobs[0];
  const analysis = analyzeFit(job, state.fitLab.jobDescription);
  if (!job || !analysis.hasDescription) return;
  const actions = [
    ...analysis.missing.slice(0, 3).map((term, index) => ({
      text: "Add resume proof for " + term + " in " + job.company + " application",
      area: "Resume",
      due: offsetDate(index),
    })),
    {
      text: "Practice fit story for " + job.company + " using " + (analysis.storyMatches[0] || "top PM example"),
      area: "Interview",
      due: offsetDate(1),
    },
  ];
  actions.forEach((item) => state.actions.push({ id: uid("action"), ...item, done: false }));
  render();
}

function saveJob(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const job = {
    id: data.id || uid("job"),
    company: data.company.trim(),
    title: data.title.trim(),
    stage: data.stage,
    priority: data.priority,
    source: data.source.trim(),
    contact: data.contact.trim(),
    dateApplied: data.dateApplied,
    followUp: data.followUp,
    url: data.url.trim(),
    tags: tagsToArray(data.tags),
    nextStep: data.nextStep.trim(),
    notes: data.notes.trim(),
  };
  upsert("jobs", job);
  form.closest("dialog").close();
  render();
}

function saveContact(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const contact = {
    id: data.id || uid("contact"),
    name: data.name.trim(),
    company: data.company.trim(),
    relationship: data.relationship.trim(),
    status: data.status,
    followUp: data.followUp,
    url: data.url.trim(),
    notes: data.notes.trim(),
  };
  upsert("contacts", contact);
  form.closest("dialog").close();
  render();
}

function saveStory(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const story = {
    id: data.id || uid("story"),
    title: data.title.trim(),
    competency: data.competency,
    situation: data.situation.trim(),
    action: data.action.trim(),
    impact: data.impact.trim(),
    metrics: data.metrics.trim(),
  };
  upsert("stories", story);
  form.closest("dialog").close();
  render();
}

function saveRole(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const role = {
    id: data.id || uid("role"),
    name: data.name.trim(),
    seniority: data.seniority.trim(),
    companyType: data.companyType.trim(),
    mustHave: data.mustHave.trim(),
    query: data.query.trim(),
    notes: data.notes.trim(),
  };
  upsert("roles", role);
  form.closest("dialog").close();
  render();
}

function saveProfile(form) {
  state.profile = { ...state.profile, ...Object.fromEntries(new FormData(form).entries()) };
  render();
}

function saveGoals(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  state.goals = {
    applications: Number(data.applications || 0),
    warmIntros: Number(data.warmIntros || 0),
    interviewDrills: Number(data.interviewDrills || 0),
    storyUpdates: Number(data.storyUpdates || 0),
  };
  render();
}

function saveAction(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  state.actions.push({
    id: uid("action"),
    text: data.text.trim(),
    area: data.area,
    due: data.due,
    done: false,
  });
  form.reset();
  form.elements.due.value = todayIso();
  render();
}

function upsert(collection, item) {
  const index = state[collection].findIndex((existing) => existing.id === item.id);
  if (index >= 0) state[collection][index] = item;
  else state[collection].push(item);
}

function deleteItem(collection, id) {
  state[collection] = state[collection].filter((item) => item.id !== id);
  render();
}

function openDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (dialogId === "jobDialog") resetForm("jobForm");
  if (dialogId === "contactDialog") resetForm("contactForm");
  if (dialogId === "storyDialog") resetForm("storyForm");
  if (dialogId === "roleDialog") resetForm("roleForm");
  dialog.showModal();
}

function resetForm(formId) {
  const form = document.getElementById(formId);
  form.reset();
  form.elements.id.value = "";
  if (formId === "jobForm") {
    form.elements.stage.value = "wishlist";
    form.elements.priority.value = "High";
    form.elements.followUp.value = offsetDate(3);
  }
  if (formId === "actionForm") {
    form.elements.due.value = todayIso();
  }
}

function openJobEditor(id) {
  const job = state.jobs.find((item) => item.id === id);
  if (!job) return;
  const form = document.getElementById("jobForm");
  setFormValues(form, { ...job, tags: tagsToArray(job.tags).join(", ") });
  document.getElementById("jobDialog").showModal();
}

function openContactEditor(id) {
  const contact = state.contacts.find((item) => item.id === id);
  if (!contact) return;
  setFormValues(document.getElementById("contactForm"), contact);
  document.getElementById("contactDialog").showModal();
}

function openStoryEditor(id) {
  const story = state.stories.find((item) => item.id === id);
  if (!story) return;
  setFormValues(document.getElementById("storyForm"), story);
  document.getElementById("storyDialog").showModal();
}

function openRoleEditor(id) {
  const role = state.roles.find((item) => item.id === id);
  if (!role) return;
  setFormValues(document.getElementById("roleForm"), role);
  document.getElementById("roleDialog").showModal();
}

function setFormValues(form, values) {
  Object.entries(values).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value ?? "";
  });
}

function advanceJob(id) {
  const job = state.jobs.find((item) => item.id === id);
  if (!job) return;
  const next = stages[stageOrder[job.stage] + 1];
  if (!next) return;
  job.stage = next.id;
  if (next.id === "applied" && !job.dateApplied) job.dateApplied = todayIso();
  job.followUp = offsetDate(next.id === "closed" || next.id === "offer" ? 0 : 3);
  render();
}

function createFollowUpFromJob(id) {
  const job = state.jobs.find((item) => item.id === id);
  if (!job) return;
  state.actions.push({
    id: uid("action"),
    text: job.nextStep || `Follow up with ${job.company}`,
    area: job.contact ? "Networking" : "Application",
    due: job.followUp || todayIso(),
    done: false,
  });
  render();
}


function openFitForJob(id) {
  state.fitLab.jobId = id;
  showView("fit");
  renderFitLab();
  saveState();
}

function openOutreachForJob(id) {
  state.outreach.jobId = id;
  state.outreach.message = "";
  showView("outreach");
  renderOutreach();
  saveState();
}

function openDecisionForJob(id) {
  state.decisionJobId = id;
  showView("decision");
  renderDecision();
  saveState();
}

function toggleAction(id) {
  const action = state.actions.find((item) => item.id === id);
  if (!action) return;
  action.done = !action.done;
  render();
}

function choosePrompt() {
  const category = document.getElementById("promptCategory").value;
  const prompts = promptBank[category] || promptBank["Product Sense"];
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];
  state.prep.promptCategory = category;
  state.prep.currentPrompt = prompt;
  render();
}

function addPromptToPlan() {
  state.actions.push({
    id: uid("action"),
    text: `Practice: ${state.prep.currentPrompt}`,
    area: "Interview",
    due: todayIso(),
    done: false,
  });
  render();
}

function startTimer() {
  if (timerId) return;
  timerId = window.setInterval(() => {
    timerSeconds += 1;
    renderInterview();
  }, 1000);
}

function pauseTimer() {
  window.clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  pauseTimer();
  timerSeconds = 0;
  renderInterview();
}

function formatTimer(seconds) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const rest = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function flashSaved() {
  const saved = document.getElementById("noteSaved");
  saved.textContent = "Saved";
  saved.style.color = "var(--green)";
  window.setTimeout(() => {
    saved.style.color = "";
  }, 350);
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `pm-job-copilot-${todayIso()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function importData(event) {
  const [file] = event.target.files;
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state = normalizeState(JSON.parse(reader.result));
      fillForms();
      render();
    } catch (error) {
      window.alert("Could not import JSON.");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function resetData() {
  const confirmed = window.confirm("Reset PM Job Copilot data to sample state?");
  if (!confirmed) return;
  state = defaultState();
  fillForms();
  render();
}


async function copyText(text, button, originalLabel) {
  try {
    await navigator.clipboard.writeText(text || "");
    button.textContent = "Copied";
    window.setTimeout(() => {
      button.textContent = originalLabel;
    }, 900);
  } catch (error) {
    window.alert("Clipboard is unavailable.");
  }
}

async function copyBrief() {
  const text = document.getElementById("briefOutput").innerText;
  await copyText(text, document.getElementById("copyBriefButton"), "Copy Brief");
}

document.addEventListener("DOMContentLoaded", () => {
  init();
  document.getElementById("actionForm").elements.due.value = todayIso();
});
