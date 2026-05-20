// ── Banner ────────────────────────────────────────────────────
const BANNER_LINES = [
    '██╗   ██╗██╗███╗   ██╗██╗██████╗ ███╗   ███╗██╗████████╗██╗  ██╗',
    '██║   ██║██║████╗  ██║██║██╔══██╗████╗ ████║██║╚══██╔══╝██║  ██║',
    '██║   ██║██║██╔██╗ ██║██║██████╔╝██╔████╔██║██║   ██║   ███████║',
    '╚██╗ ██╔╝██║██║╚██╗██║██║██╔══██╗██║╚██╔╝██║██║   ██║   ██╔══██║',
    ' ╚████╔╝ ██║██║ ╚████║██║██║  ██║██║ ╚═╝ ██║██║   ██║   ██║  ██║',
    '  ╚═══╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝'
];

const COLOR_STOPS = [
    'rgb(255,255,255)',
    'rgb(255,214,242)',
    'rgb(255,122,214)',
    'rgb(255,94,199)',
    'rgb(139,95,255)',
    'rgb(107,63,255)'
];

function esc(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function renderBanner() {
    const el = document.getElementById('terminal-banner');
    const rows = BANNER_LINES.map((line, i) => {
        const cells = Array.from(line).map(ch =>
            `<span class="terminal-banner__cell">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`
        ).join('');
        return `<span class="terminal-banner__row" style="--banner-cols:${line.length};color:${COLOR_STOPS[i]}">${cells}</span>`;
    }).join('');

    el.innerHTML =
        `<div class="terminal-banner__full" aria-label="VINIRMITH">${rows}</div>` +
        `<div class="terminal-banner__subline">` +
            `<span class="terminal-banner__tagline">AI-native engineer</span>` +
            `<span class="terminal-banner__sep">·</span>` +
            `<span class="terminal-banner__meta">building production AI systems</span>` +
            `<span class="terminal-banner__sep">·</span>` +
            `<span class="terminal-banner__meta">RAG · Agents · LLMOps · AWS</span>` +
        `</div>`;
}

// ── Terminal state ────────────────────────────────────────────
const outputEl   = document.getElementById('terminal-output');
const pinnedEl   = document.getElementById('terminal-pinned');
const screenEl   = document.getElementById('terminal-screen');
const displayEl  = document.getElementById('input-display');
const cursorEl   = document.getElementById('cursor');
const captureEl  = document.getElementById('input-capture');

let currentInput = '';
let cmdHistory   = [];
let histIdx      = -1;
let draftInput   = '';

const CMD_LIST = ['about', 'skills', 'experience', 'contact', 'help', 'clear'];

const COMMANDS = {
    about: () => {
        line('');
        line('  Vinirmith Kureti', 'pink');
        line('  AI ML Engineer | GenAI Developer | Data Scientist', 'mute');
        line('  Mobile: +91 7995678578  |  Hyderabad, India', 'dim');
        line('');
        line('  ── Summary ──────────────────────────────────────────────────────', 'pink');
        line('  Highly skilled AI/ML Engineer with extensive experience in designing,', 'mute');
        line('  developing and implementing cutting-edge machine learning, deep', 'mute');
        line('  learning, and Generative AI (GenAI) models, including Large Language', 'mute');
        line('  Models (LLMs) and Retrieval-Augmented Generation (RAG) systems.', 'mute');
        line('  Proficient in leveraging advanced statistical techniques, neural', 'mute');
        line('  network architectures (including Transformer models like GPT, BERT)', 'mute');
        line('  and cloud platforms such as AWS to solve complex problems across', 'mute');
        line('  various domains. Adept at data pre-processing, feature engineering,', 'mute');
        line('  model selection and performance optimization to deliver robust,', 'mute');
        line('  scalable and cloud-native solutions. Skilled in using frameworks like', 'mute');
        line('  LangChain, LlamaIndex for developing and fine-tuning LLM applications.', 'mute');
        line('');
        line('  ── Education ────────────────────────────────────────────────────', 'pink');
        line('  B.Sc Statistics and Mathematics', 'mute');
        line('  Andhra Loyola College                                  2019 – 2022', 'dim');
        line('');
        line('  ── Certifications ───────────────────────────────────────────────', 'pink');
        line('  Google Cloud Big Data and Machine Learning Fundamentals', 'mute');
        line('  Coursera, 2023', 'dim');
        line('');
        line('  Post Graduation in Computational Data Science', 'mute');
        line('  International School of Engineering (INSOFE), 2023', 'dim');
        line('');
        line('  Power BI Virtual Case Experience', 'mute');
        line('  Forage, 2023', 'dim');
        line('');
    },
    skills: () => {
        line('');
        line('  ── Technical Skills ─────────────────────────────────────────────', 'pink');
        line('');
        line('  Cloud', 'pink');
        line('    AWS  – S3, RDS, SageMaker, EC2', 'mute');
        line('    GCP  – Studio, Looker, VertexAI', 'mute');
        line('    Azure – Blob, Power Automate, Power App', 'mute');
        line('');
        line('  GenAI', 'pink');
        line('    Hugging Face · LlamaIndex · Ollama · llamacpp · OpenAI API', 'mute');
        line('    LangChain · Transformers (GPT, BERT)', 'mute');
        line('    Fine-tuning: LoRA / QLoRA (PEFT)', 'mute');
        line('');
        line('  ML & AI Libraries', 'pink');
        line('    PyTorch · TensorFlow · Keras', 'mute');
        line('    SVM · Decision Trees · Random Forest · XGBoost · AdaBoost', 'mute');
        line('    Gradient Boosting · K-Means Clustering', 'mute');
        line('    Matplotlib · Seaborn', 'mute');
        line('');
        line('  Database', 'pink');
        line('    MongoDB · MySQL · PostgreSQL · Pinecone · ChromaDB', 'mute');
        line('');
        line('  API & Backend', 'pink');
        line('    REST API · Flask API · Python', 'mute');
        line('');
        line('  DevOps & Version Control', 'pink');
        line('    Git · GitHub · GitLab', 'mute');
        line('');
        line('  ── Soft Skills ──────────────────────────────────────────────────', 'pink');
        line('    Problem Solving and Statistical Analytical Ability', 'mute');
        line('    Excellent Written and Verbal Communication', 'mute');
        line('    Project Management and Time Management', 'mute');
        line('    Team Leadership and Emotional Intelligence', 'mute');
        line('');
    },
    experience: () => {
        line('');
        line('  StackNexus | Senior AI/ML Engineer', 'pink');
        line('  August 2025 – Present', 'dim');
        line('  ─────────────────────────────────────────────────────────────────', 'dim');
        line('');
        line('  Project: LLM Security & Compliance Agent (PII + Malicious Intent)', 'mute');
        line('  · Fine-tuned LLMs using LoRA / QLoRA (PEFT) on curated Hugging Face', 'mute');
        line('    security datasets to detect PII leakage, prompt injection, and', 'mute');
        line('    policy bypass attempts.', 'mute');
        line('  · Built a pre-execution security agent that classifies user prompts', 'mute');
        line('    before downstream LLM invocation, treating LLMs as controlled', 'mute');
        line('    execution surfaces.', 'mute');
        line('  · Achieved PII detection F1-score of 0.90 (Precision 0.92, Recall', 'mute');
        line('    0.89) and ~91% accuracy on malicious intent classification.', 'mute');
        line('  · Reduced false negatives by ~25% compared to base models,', 'mute');
        line('    significantly lowering risk of data leakage and jailbreaks in prod.', 'mute');
        line('');
        line('  Project: Autonomous AI Agents for Salesforce & ServiceNow (MCP+A2A)', 'mute');
        line('  · Designed Model Context Protocol (MCP) servers for Salesforce and', 'mute');
        line('    ServiceNow to expose enterprise tools and data safely to LLM-based', 'mute');
        line('    agents using an Agent Development Kit.', 'mute');
        line('  · Implemented secure CRUD capabilities (query, create, update records;', 'mute');
        line('    ticket and lead management) via MCP tool definitions with strict', 'mute');
        line('    schema and permission boundaries.', 'mute');
        line('  · Enabled Agent-to-Agent (A2A) coordination to orchestrate multi-step', 'mute');
        line('    workflows across CRM and ITSM systems without hardcoded integrations.', 'mute');
        line('  · Elevated AI agents from prompt-level responders to context-aware', 'mute');
        line('    enterprise actors, reducing manual operations and accelerating', 'mute');
        line('    business workflows.', 'mute');
        line('');
        line('  Harphil Software Solutions | AI Engineer', 'pink');
        line('  August 2023 – July 2025', 'dim');
        line('  ─────────────────────────────────────────────────────────────────', 'dim');
        line('');
        line('  Project: Road Construction Quality – Proactive Road Condition Detection', 'mute');
        line('  · Led AI projects in road traffic sign detection and road quality', 'mute');
        line('    assessment, improving detection accuracy by 15%.', 'mute');
        line('  · Developed Object Detection models using Python, PyTorch and', 'mute');
        line('    TensorFlow, reducing false positive detections by 30%.', 'mute');
        line('  · Streamlined data labelling with Label-Studio and RoboFlow;', 'mute');
        line('    optimised AWS S3 for faster data retrieval by 50%.', 'mute');
        line('  · Optimised deployment for real-time Object Detection processing', 'mute');
        line('    using PyTorch with CUDA, enhancing model performance.', 'mute');
        line('');
        line('  Project: AI Voice Assistant – Conversational AI for Client Calls', 'mute');
        line('  · Developed an app providing customer service through an AI Agent', 'mute');
        line('    that mimics human customer service capability using ElevenLabs', 'mute');
        line('    (Low Code / No Code solution).', 'mute');
        line('  · App handles voice calls via Twilio; queries are answered through', 'mute');
        line('    ChatGPT + RAG, facilitating real-time Speech-to-Text conversion.', 'mute');
        line('');
        line('  Ayattih Tech Pvt Ltd | Machine Learning Analyst', 'pink');
        line('  July 2022 – July 2023', 'dim');
        line('  ─────────────────────────────────────────────────────────────────', 'dim');
        line('');
        line('  · Analysed 100K data points on SQL for pre-approved loan sanction,', 'mute');
        line('    reducing lending defaults by 12% by eliminating false positives', 'mute');
        line('    and driving higher profitable lending.', 'mute');
        line('  · Built interactive real-time dashboards (Excel + Python using', 'mute');
        line('    Matplotlib & Seaborn) for senior management to review Financial', 'mute');
        line('    Risk Metrics, reducing loan default by 12% and increasing', 'mute');
        line('    profitability by 12%.', 'mute');
        line('  · Drove automation for Loan application assessment, enhancing loan', 'mute');
        line('    decisioning speed by 25%, reducing Financial Risk by 10%, and', 'mute');
        line('    cutting disbursement time by 35%.', 'mute');
        line('  · Developed a loan approval prediction model with 98% accuracy using', 'mute');
        line('    SVM, Decision Trees, Random Forest, and Boosting (XGBoost, AdaBoost,', 'mute');
        line('    Gradient Boosting); performed EDA, outlier detection, univariate &', 'mute');
        line('    bivariate analysis, feature engineering with Grid Search, and', 'mute');
        line('    K-Means clustering for customer segmentation with MLOps techniques.', 'mute');
        line('');
    },
    contact: () => {
        line('');
        line('  Email      kuretivinirmith1@gmail.com', 'pink');
        line('  Work       vinirmith.kureti@stacknexus.io', 'pink');
        line('  Mobile     +91 7995678578', 'mute');
        line('  LinkedIn   linkedin.com/in/vinirmith-kureti', 'mute');
        line('  Location   Hyderabad, India', 'dim');
        line('');
    },
    help: () => {
        line('');
        CMD_LIST.filter(c => c !== 'clear').forEach(cmd => {
            const descs = {
                about:      'summary, education & certifications',
                skills:     'full tech stack and soft skills',
                experience: 'complete work history',
                contact:    'get in touch',
                help:       'list commands',
            };
            line(`  ${cmd.padEnd(14)} ${descs[cmd] || ''}`, 'mute');
        });
        line(`  ${'clear'.padEnd(14)} clear terminal`, 'mute');
        line('');
    },
    clear: () => {
        outputEl.innerHTML = '';
    }

};

function makeLine(text, cls) {
    const div = document.createElement('div');
    div.className = 'out-line' + (cls ? ' ' + cls : '');
    if (text === '') {
        div.className += ' empty';
        div.innerHTML = '&nbsp;';
    } else {
        div.textContent = text;
    }
    return div;
}

function line(text, cls = '') {
    const div = makeLine(text, cls);
    outputEl.appendChild(div);
    screenEl.scrollTop = screenEl.scrollHeight;
}

function pinnedLine(text, cls = '') {
    const div = makeLine(text, cls);
    pinnedEl.appendChild(div);
}

function promptLine(cmd) {
    const div = document.createElement('div');
    div.className = 'out-line cmd';
    div.innerHTML =
        `<span class="c-user">guest</span>` +
        `<span class="c-at">@</span>` +
        `<span class="c-host">vinirmith</span>` +
        `<span class="c-arrow"> › </span>` +
        `<span class="c-text">${esc(cmd)}</span>`;
    outputEl.appendChild(div);
    screenEl.scrollTop = screenEl.scrollHeight;
}

function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    cmdHistory.unshift(raw.trim());
    histIdx   = -1;
    draftInput = '';

    promptLine(raw.trim());

    if (COMMANDS[cmd]) {
        COMMANDS[cmd]();
    } else {
        line('');
        line(`  command not found: ${raw.trim()}`, 'err');
        line(`  type help to list available commands`, 'dim');
        line('');
    }
}

function sync() {
    displayEl.textContent = currentInput;
}

// ── Keyboard handling ─────────────────────────────────────────
captureEl.addEventListener('keydown', e => {
    // Ctrl / Meta combos
    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'c') {
            e.preventDefault();
            promptLine(currentInput + '^C');
            currentInput = '';
            histIdx = -1;
            sync();
        } else if (e.key === 'l') {
            e.preventDefault();
            outputEl.innerHTML = '';
        }
        return;
    }

    switch (e.key) {
        case 'Enter':
            e.preventDefault();
            runCommand(currentInput);
            currentInput = '';
            sync();
            break;

        case 'Backspace':
            e.preventDefault();
            currentInput = currentInput.slice(0, -1);
            sync();
            break;

        case 'ArrowUp':
            e.preventDefault();
            if (histIdx === -1) draftInput = currentInput;
            if (histIdx < cmdHistory.length - 1) {
                histIdx++;
                currentInput = cmdHistory[histIdx];
                sync();
            }
            break;

        case 'ArrowDown':
            e.preventDefault();
            if (histIdx > 0) {
                histIdx--;
                currentInput = cmdHistory[histIdx];
            } else if (histIdx === 0) {
                histIdx = -1;
                currentInput = draftInput;
            }
            sync();
            break;

        case 'Tab':
            e.preventDefault();
            const partial = currentInput.trim().toLowerCase();
            if (partial) {
                const match = CMD_LIST.find(c => c.startsWith(partial));
                if (match) { currentInput = match; sync(); }
            }
            break;

        default:
            // Characters come through the 'input' event — do nothing here
            break;
    }
});

// All character input (desktop + mobile IME) handled here only
captureEl.addEventListener('input', () => {
    const val = captureEl.value;
    if (val) {
        currentInput += val;
        captureEl.value = '';
        sync();
    }
});

// Focus on any click inside the window
document.querySelector('.window').addEventListener('click', e => {
    if (!e.target.closest('button, a, input, kbd')) captureEl.focus();
});

// Cursor blink state
captureEl.addEventListener('focus', () => cursorEl.style.animationPlayState = 'running');
captureEl.addEventListener('blur',  () => cursorEl.style.animationPlayState = 'paused');

// ── Init ──────────────────────────────────────────────────────
function printWelcome() {
    pinnedLine('');
    pinnedLine('  ✓  LLMs · RAG · Agents · Fine-tuning (LoRA/QLoRA)', 'dim');
    pinnedLine('  ✓  Python · LangChain · LlamaIndex · Hugging Face', 'dim');
    pinnedLine('  ✓  AWS · GCP · Azure · MCP · A2A Workflows', 'dim');
    pinnedLine('  ✓  PyTorch · TensorFlow · Pinecone · ChromaDB', 'dim');
    pinnedLine('');
    pinnedLine('  Commands:  about · skills · experience · contact · clear', 'dim');
    pinnedLine('');
}

window.addEventListener('load', () => {
    renderBanner();
    printWelcome();
    captureEl.focus();
});
