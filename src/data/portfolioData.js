// Enhanced Portfolio Data for Kishan R. Nair
export const personalInfo = {
  name: "Kishan R. Nair",
  brandMark: "LOG!C",
  roleTitle: "Data Science & AI Systems Engineer",
  tagline: "AI systems, built to actually work. Practical AI applications, agentic workflows, and full-stack software.",
  footerTagline: "Built with curiosity. Engineered with intent.",
  philosophy: "I build AI that is useful before it is impressive.",
  philosophySub: "I care about systems that solve real problems, behave reliably, and make complex workflows simpler — not AI for the sake of a demo.",
  location: "Kochi, Kerala, India (IST / Remote)",
  email: "kishan.r.nair@gmail.com",
  phone: "+91 9495123456",
  github: "https://github.com/KishanRNair",
  linkedin: "https://www.linkedin.com/in/kishanrnair",
  whatsappUrl: "https://wa.me/919495123456?text=Hi%20Kishan,%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect!"
};

export const projects = [
  {
    id: "docuparse-ai",
    number: "01",
    title: "Enterprise Batch Document Intelligence & Normalization Engine",
    shortTitle: "DocuParse AI Agent",
    domain: "Agentic AI · Document Intelligence",
    category: "Agentic AI",
    status: "Live Production",
    statusColor: "emerald", // emerald, amber, sky
    summary: "Distributed batch document processing microservice utilizing Gemini models on Vertex AI to extract and normalize heterogeneous commercial invoices into validated JSON schemas.",
    overview: "Built to overcome the failure points of traditional template-based OCR, DocuParse ingests high-volume PDF documents, semantically maps arbitrary key-value pairs into standardized database schemas, and executes concurrent asynchronous batch processing with zero-loss fallback mechanisms.",
    gradient: "linear-gradient(135deg, rgba(82, 65, 45, 0.9), rgba(42, 33, 23, 0.9))",
    icon: "sparkles",
    tech: ["Python", "FastAPI", "Google Vertex AI", "Gemini 1.5", "Docker", "PostgreSQL", "React"],
    pipelineFlow: [
      { step: "01 Ingestion", desc: "Multipart PDF upload buffer with checksum validation and multi-page splitting." },
      { step: "02 Semantic Extraction", desc: "Vertex AI Gemini multimodal payload extraction with structured schema prompts." },
      { step: "03 Schema Mapping", desc: "Dynamic field alignment against target JSON schema with confidence scoring." },
      { step: "04 Validation Gate", desc: "Pydantic type checks, arithmetic total recalculation, and tax reconciliation." },
      { step: "05 Structured Store", desc: "PostgreSQL transactional commit and client webhook notification dispatch." }
    ],
    capabilities: [
      "Concurrent batch execution processing 100+ documents in parallel",
      "Dynamic schema mapping for unpredictable vendor invoice layouts",
      "Robust fault tolerance with exponential backoff on Vertex AI API rate limits",
      "Automated fallback validation preventing data corruption in enterprise databases",
      "Full audit trail telemetry with interactive diff views for human review"
    ],
    links: {
      github: "https://github.com/KishanRNair",
      demo: "http://localhost:5173/projects/docuparse-ai"
    }
  },
  {
    id: "omniquery-bi",
    number: "02",
    title: "OmniQuery — Agentic NL2Data Analytics & Aggregation Engine",
    shortTitle: "OmniQuery Analytics",
    domain: "Agentic AI · Database Telemetry",
    category: "Agentic AI",
    status: "Active Development",
    statusColor: "amber",
    summary: "Autonomous natural-language querying engine synthesizing complex database aggregation pipelines across collections with granular role-based data isolation.",
    overview: "Enables non-technical enterprise stakeholders to query live databases using natural language. The LLM planner translates plain queries into optimized NoSQL pipelines and SQL queries, verified inside an execution sandbox with strict read-only permissions and row-level privacy.",
    gradient: "linear-gradient(135deg, rgba(62, 45, 78, 0.85), rgba(32, 22, 42, 0.85))",
    icon: "brain",
    tech: ["Python", "FastAPI", "MongoDB Aggregations", "React", "TypeScript", "TailwindCSS", "PostgreSQL"],
    pipelineFlow: [
      { step: "01 Natural Language Prompt", desc: "Semantic intent parsing and entity detection from user query." },
      { step: "02 Schema Context Filter", desc: "Context injection strictly constrained to caller's authorization scope." },
      { step: "03 Pipeline Synthesis", desc: "LLM generation of multi-stage aggregation pipeline with memory context." },
      { step: "04 AST Sandbox Audit", desc: "Static AST validation rejecting destructive or un-indexed database queries." },
      { step: "05 Visual Dispatch", desc: "Instant reactive table and chart streaming to client with CSV/JSON export." }
    ],
    capabilities: [
      "Dynamic AST validation guaranteeing read-only isolation with zero injection risk",
      "Context-aware schema retrieval keeping LLM token overhead minimal",
      "Interactive data breakdown with dynamic visualization and instant export",
      "Historical conversational memory for multi-turn iterative analysis"
    ],
    links: {
      github: "https://github.com/KishanRNair",
      demo: "http://localhost:5173/projects/omniquery-bi"
    }
  },
  {
    id: "vanguard-esg",
    number: "03",
    title: "ESG Intelligence & Telemetry Compliance SaaS Platform",
    shortTitle: "ESG Compliance Analytics",
    domain: "Data & Systems · Full-Stack SaaS",
    category: "Data & Systems",
    status: "Live Production",
    statusColor: "emerald",
    summary: "Automated sustainability reporting, regulatory telemetry, and embedded self-service analytics with dynamic Row-Level Security.",
    overview: "A comprehensive SaaS application engineered for enterprise compliance and ESG telemetry. Integrated Apache Superset as an embedded analytics engine with fine-grained multi-tenant security, reducing BI software licensing overhead while providing real-time data audit trails.",
    gradient: "linear-gradient(135deg, rgba(38, 68, 52, 0.85), rgba(20, 38, 28, 0.85))",
    icon: "atom",
    tech: ["Python", "PostgreSQL", "Pandas", "FastAPI", "Apache Superset", "React", "Docker"],
    pipelineFlow: [
      { step: "01 Telemetry Influx", desc: "Automated collection across operational utility and carbon data streams." },
      { step: "02 Relational Modeling", desc: "Normalized data lake in PostgreSQL with GIN and B-Tree indexing." },
      { step: "03 RLS Gateway", desc: "Dynamic JWT security token injecting user-workspace tenancy rules." },
      { step: "04 Embedded BI", desc: "Seamless iframe Superset visual layer without license leak." },
      { step: "05 Automated Reporting", desc: "Scheduled PDF/Excel executive dispatch with digital validation signatures." }
    ],
    capabilities: [
      "Embedded analytics replacing expensive per-seat BI solutions",
      "Workspace-level data isolation preventing cross-tenant leakage",
      "Comprehensive peer benchmarking and regulatory KPI scoring",
      "High-throughput data exports with automated verification"
    ],
    links: {
      github: "https://github.com/KishanRNair",
      demo: "http://localhost:5173/projects/vanguard-esg"
    }
  },
  {
    id: "academic-xchange",
    number: "04",
    title: "AcademicXchange — AI-Native Research Collaboration Engine",
    shortTitle: "AcademicXchange",
    domain: "Full-Stack & Cloud · EdTech",
    category: "Full-Stack & Cloud",
    status: "Research Prototype",
    statusColor: "sky",
    summary: "Cross-disciplinary scholarship workspace featuring automated peer-review synthesizers and Neo4j citation knowledge graphs.",
    overview: "Built to accelerate scientific discovery, AcademicXchange connects global academic papers into an interactive graph database. An intelligent extraction agent synthesizes contradictory findings across publications, highlights research gaps, and powers collaborative peer commentary.",
    gradient: "linear-gradient(135deg, rgba(78, 55, 38, 0.85), rgba(42, 28, 18, 0.85))",
    icon: "graduation-cap",
    tech: ["Next.js", "TypeScript", "Neo4j", "Graph DB", "Python", "TailwindCSS"],
    pipelineFlow: [
      { step: "01 Paper Ingestion", desc: "Automated parsing of arXiv and PubMed preprint PDFs." },
      { step: "02 Citation Graph Construction", desc: "Extraction of methodology, citations, and datasets into Neo4j nodes." },
      { step: "03 Discrepancy Synthesis", desc: "LLM cross-comparison highlighting divergent research conclusions." },
      { step: "04 Collaborative Annotations", desc: "Real-time multi-researcher peer annotation channel with WebSocket." },
      { step: "05 Knowledge Export", desc: "Exportable LaTeX citation matrices with verifiable source DOIs." }
    ],
    capabilities: [
      "Semantic knowledge graph mapping over 50,000 academic relationships",
      "Automated discrepancy detection across independent clinical trials",
      "Real-time synchronized collaborative notes for research teams",
      "Clean LaTeX citation generation with automatic bibtex normalization"
    ],
    links: {
      github: "https://github.com/KishanRNair",
      demo: "http://localhost:5173/projects/academic-xchange"
    }
  },
  {
    id: "synapse-rag",
    number: "05",
    title: "Clinical & Enterprise Hybrid Semantic Matching Engine",
    shortTitle: "Clinical Trial Matcher",
    domain: "Applied ML · Healthcare NLP",
    category: "Applied ML",
    status: "Research Prototype",
    statusColor: "sky",
    summary: "Semantic matching between unstructured patient criteria and complex clinical trial protocols using dense embeddings.",
    overview: "Solves the extreme bottleneck of patient recruitment in clinical research. Employs fine-tuned biomedical language models and dense pgvector indexing to evaluate high-dimensional patient electronic health criteria against multi-variable protocol inclusion/exclusion guidelines.",
    gradient: "linear-gradient(135deg, rgba(38, 62, 78, 0.85), rgba(18, 34, 45, 0.85))",
    icon: "stethoscope",
    tech: ["Python", "PyTorch", "Hugging Face", "FastAPI", "Docker", "pgvector"],
    pipelineFlow: [
      { step: "01 Criteria Parsing", desc: "Hierarchical sentence-window decomposition of inclusion rules." },
      { step: "02 Dense Embeddings", desc: "Projection of medical entities into domain-specific vector space." },
      { step: "03 Hybrid Retrieval", desc: "Reciprocal rank fusion combining BM25 keyword & vector similarity." },
      { step: "04 Protocol Matching", desc: "Cross-encoder scoring evaluating strict exclusion criteria." },
      { step: "05 Confidence Score", desc: "Verifiable match confidence report with source guideline citations." }
    ],
    capabilities: [
      "Sub-200ms vector matching across 10,000+ protocol criteria clauses",
      "Zero-hallucination exclusion check with explicit line provenance",
      "Automated evaluation metrics measuring context precision and recall",
      "HIPAA-conscious decoupled patient record ingestion pipeline"
    ],
    links: {
      github: "https://github.com/KishanRNair",
      demo: "http://localhost:5173/projects/synapse-rag"
    }
  },
  {
    id: "cloudpulse-audio",
    number: "06",
    title: "Context-Aware Acoustic Generation & Audio Curator",
    shortTitle: "Neural Audio Curator",
    domain: "Applied ML · Audio & Streaming",
    category: "Applied ML",
    status: "Active Development",
    statusColor: "amber",
    summary: "Context-aware acoustic generation and dynamic playlist curation engine using Web Audio API and Librosa audio telemetry.",
    overview: "A real-time audio intelligence system extracting acoustic features (tempo, key, spectral centroid) to generate smooth dynamic soundscapes tailored to user focus sessions, ambient environments, and biometric telemetry.",
    gradient: "linear-gradient(135deg, rgba(72, 38, 62, 0.85), rgba(42, 18, 34, 0.85))",
    icon: "music",
    tech: ["Python", "Librosa", "Web Audio API", "React", "TypeScript", "FastAPI"],
    pipelineFlow: [
      { step: "01 Audio Stream", desc: "Low-latency buffer chunking of acoustic stream." },
      { step: "02 Spectral Extraction", desc: "Librosa feature computation: MFCCs, chroma, and tempo." },
      { step: "03 Latent Mapping", desc: "Projection into acoustic similarity space for contextual transitions." },
      { step: "04 DSP Synthesis", desc: "Client-side Web Audio API cross-fading and equalization filter." },
      { step: "05 Telemetry Feedback", desc: "User engagement telemetry continuously tuning curation weights." }
    ],
    capabilities: [
      "Real-time spectral analysis running directly against raw audio buffers",
      "Seamless harmonic cross-fading based on key and tempo alignment",
      "Lightweight client DSP processing with Web Audio API",
      "Low CPU overhead designed for background playback"
    ],
    links: {
      github: "https://github.com/KishanRNair",
      demo: "http://localhost:5173/projects/cloudpulse-audio"
    }
  }
];

export const processSteps = [
  {
    num: "01",
    title: "Understand",
    desc: "Define the problem, users, data, and constraints before choosing the technology."
  },
  {
    num: "02",
    title: "Prototype",
    desc: "Build the smallest useful version and validate the core idea quickly."
  },
  {
    num: "03",
    title: "Engineer",
    desc: "Turn the prototype into a reliable system with the right architecture, AI workflows, APIs, and data layer."
  },
  {
    num: "04",
    title: "Ship",
    desc: "Deploy, observe, iterate, and continuously improve production telemetry."
  }
];

export const techStackList = [
  "Python", "TypeScript", "JavaScript", "SQL", "C++",
  "PyTorch", "FastAPI", "PostgreSQL", "Redis", "Node.js",
  "React", "Next.js", "Tailwind CSS", "Docker", "Amazon AWS",
  "Git & GitHub", "Linux"
];

export const credentialsList = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    desc: "Demonstrated end-to-end expertise in designing resilient, cost-optimized, secure, and decoupled distributed cloud architectures on AWS."
  },
  {
    title: "Building & Evaluating Advanced RAG Systems",
    issuer: "DeepLearning.AI",
    desc: "Comprehensive certification on advanced chunking, sentence-window retrieval, agentic routing, and automated evaluation metrics (faithfulness & context recall)."
  },
  {
    title: "PostgreSQL & Database Engineering Professional",
    issuer: "Meta (Coursera)",
    desc: "Advanced mastery of relational database schema modeling, indexing strategies (B-Tree, GIN), concurrency isolation levels, and performance profiling."
  },
  {
    title: "Python 3: Deep Dive & Systems Programming",
    issuer: "Python Software Foundation & Coursera",
    desc: "In-depth investigation of CPython internals, garbage collection mechanisms, custom descriptors, asynchronous event loops, and multi-threading models."
  }
];

export const resumeExperience = [
  {
    role: "Jr. AI Engineer",
    company: "Sam Corporate",
    location: "Kochi, India",
    period: "Aug 2026 – Present",
    bullets: [
      "Integrated Apache Superset into the ESG Reporting application as an embedded BI solution, replacing Power BI for dashboarding and reducing significant licensing costs; implemented dynamic RLS based on user IDs with workspace-level data isolation.",
      "Designed and implemented a scalable batch document-processing microservice using Gemini on Google Cloud Vertex AI to semantically extract and normalize information from bills, mapping varying field labels to standardized schema fields and returning structured JSON while concurrently processing 100+ PDFs."
    ]
  },
  {
    role: "AI/ML Engineer Intern",
    company: "Sam Corporate",
    location: "Kochi, India",
    period: "Feb 2026 – July 2026",
    bullets: [
      "Architected an agentic AI analytics chatbot with an LLM-based planner that dynamically generates MongoDB aggregation pipelines across 25+ collections, enabling non-technical users to query data using natural language with GDPR-aligned privacy controls.",
      "Built an AI-powered QMS document generation platform adopted by 12+ employees, automating content generation across 10+ templates using LLMs and reducing document turnaround from hours to minutes.",
      "Extended an ESG analytics platform with 8+ modules, including AI-driven report generation, NL2SQL, peer benchmarking, and interactive data visualization, using PostgreSQL, OpenAI API, and Perplexity API.",
      "Improved production LLM reliability by optimizing prompt engineering and API workflows, eliminating HTTP 429 rate-limit errors and stabilizing application performance.",
      "Developed an automated MongoDB data validation tool that cross-checks records across multiple databases and generates Excel reports, replacing manual validation workflows with a single-click process."
    ]
  },
  {
    role: "Data Analytics Trainee",
    company: "Navodita Infotech",
    location: "Remote",
    period: "Aug 2025 – Sep 2025",
    bullets: [
      "Built a collaborative filtering recommendation system processing 10K+ user-movie ratings using Python, Pandas, cosine similarity, and NumPy, generating Top-10 personalized recommendations per user."
    ]
  },
  {
    role: "Data Science Trainee",
    company: "Keltron REC",
    location: "Kochi, India",
    period: "Jun 2025",
    bullets: [
      "Preprocessed 5+ real-world datasets, built Power BI dashboards, and applied ML fundamentals using Excel and SQL."
    ]
  }
];

export const resumeEducation = [
  {
    degree: "Bachelor of Technology in Data Science Engineering",
    institution: "Engineering Academy",
    location: "Kerala, India",
    period: "Graduated with Distinction",
    bullets: [
      "Rigorous foundations in Machine Learning, Statistical Modeling, and Database Systems.",
      "Coursework: Distributed Systems, Deep Learning, Cloud Computing, Database Administration, and Object-Oriented Software Design."
    ]
  }
];
