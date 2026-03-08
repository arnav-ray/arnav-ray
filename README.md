# Arnav Amal Ray - Portfolio

**AI-native product builder - from idea → prompt → prototype → production.**

## 👋 About Me

I am an SAP FI (Finance) consultant by day, AI-assisted builder by passion. I bridge the gap between finance, compliance, and technology in large S/4HANA implementations - and apply the same structured thinking to building software from scratch.

My approach: I work as product and solution architect. I define the problem worth solving, design the system that solves it, and direct AI tools to build it. The idea, the logic, the constraints, and the decisions are mine. I handle system architecture, process, testing, and deployment. AI handles execution speed.

---

## 🧠 The Workflow

**Frame** → Define the core problem. What is worth solving and what is the simplest path?

**Generate** → Prompt. Test. Refine. Use AI to rapidly build, break, and fix the implementation.

**Launch** → Ship a live URL. Real value only comes from software people can actually use.

---

## 🗂 Portfolio: Concept to Production

### 1. Local LLM (RAG) for Immigration Questions
**[github.com/arnav-ray/immigration-rag](https://github.com/arnav-ray/immigration-rag)**

> Local-first RAG system for querying German immigration law. Learning project - not legal advice.

Runs entirely on local hardware. No API calls to cloud AI services, no data leaving the machine, full GDPR compliance by design. Every answer is cited to the exact section of the law.

**The Challenge:** German immigration law is spread across multiple statutes totalling hundreds of individually numbered sections, sub-sections, clauses, and sentences that cross-reference each other. A single eligibility question can require reading five different parts of the law simultaneously. Generic AI assistants either refuse to engage with this complexity or confidently cite rules that do not exist.

**The Solution:** Ask a question in plain English or German and get a direct answer - with the exact section of the law it comes from, so you can verify it yourself. Where the local legal database needs supplementing, the system searches the web and surfaces the latest official guidance in the same window.

**RAG Pipeline:** Ingest → Chunk → Embed → Retrieve → Generate

**Key metrics:**
- Inference: 100% On-Premise
- AI Models: Mistral NeMo 12B / Qwen 2.5 14B
- Privacy: Zero Data Leaves Machine
- Corpus: German Immigration, Residence, and Employment Laws

**Tech Stack:** LlamaIndex · Ollama · Mistral NeMo 12B · Qwen 2.5 14B · nomic-embed-text-v2-moe · Docling · Streamlit · DuckDuckGo Web Search · RTX 5070 Ti

---

### 2. Family Finance and Goals AI Bot
**[github.com/arnav-ray/Finance-and-Goals-bot](https://github.com/arnav-ray/Finance-and-Goals-bot)**

Log expenses on the go, set family goals, and track everything live in Google Sheets - no app, no manual entry, just a message.

**The Challenge:** Families lose track of spending because logging an expense means opening an app, finding a category, and typing it in - friction that guarantees gaps. Goals suffer the same fate: they get written down once and forgotten. There is no single place where the whole picture lives.

**The Solution:** Send a message or a photo of a receipt on Telegram. The bot reads it, categorises it, and writes it directly into a shared Google Sheet in under a second. Goals work the same way - type "Trip to Japan 5000 by December" and the bot creates a tracked goal entry. The family's full financial picture stays current with zero manual effort.

**Key metrics:**
- Time to Build: 5 Days
- OpEx Cost: $0.00 / month
- AI Model: Llama 4 Vision (via Groq)
- Latency: < 1 Second

**Tech Stack:** Python Serverless · Groq AI · Llama 4 Vision · Computer Vision · NLP · Telegram Bot API · Google Sheets API · Vercel

---

### 3. OpenCredit Platform
**[Live Demo: credit.arnavray.ca](https://credit.arnavray.ca/)**

From "Black Box" to "Transparent Logic" in 1 Sprint.

**The Challenge:** Credit scores are opaque algorithms. Consumers are judged by a number they cannot audit, explain, or effectively optimize.

**The Solution:** A fully transparent risk engine. By integrating behavioral economics and FICO methodology, every calculation is visible and interactive.

**Key Tradeoff:** Prioritized rule-based explainability over deep learning to satisfy strict financial audit requirements.

**Key metrics:**
- Dev Time: 4 Days
- Logic Model: Basel III
- Compliance: GDPR Ready

**Tech Stack:** React · Financial Modeling · Risk Analytics · Data Visualization

---

### 4. TreasuryFlow
**[Live Demo: treasuryflow.arnavray.ca](https://treasuryflow.arnavray.ca/)**

From "Data Silos" to "Unified Command" in 3 Weeks.

**The Challenge:** Enterprise ERPs are rigid and siloed. CFOs rely on Excel because getting real-time, cross-system cash visibility is technically painful and expensive.

**The Solution:** An ERP-agnostic overlay that pulls data via API without touching the core system, using AI to normalize transactions and predict cash flow instantly.

**Architecture Note:** Chose real-time API aggregation over cached batch processing to ensure instant liquidity visibility.

**Key metrics:**
- Dev Time: 3 Week Sprint
- Architecture: API-First
- Security: Zero-Trust

**Tech Stack:** Google Gemini API · Chart.js · TradingView API · Agile DevOps

---

## ⚡ Rapid Prototypes

| Project | Description | Stack |
|---|---|---|
| [Curse of the Frozen North](https://game.arnavray.ca/) | Zero-install multiplayer party game with <50ms Firestore sync | React · Firebase |
| [Automated Podcast](https://podcast.arnavray.ca/) | 100% automated daily podcast pipeline, zero operating cost | Node.js · GitHub Actions |
| [Daily German](https://german.arnavray.ca/) | Gamified German learning with interactive grammar and memory games | Serverless · Interactive UI |
| [AI Portal](https://arnav-personal-sandbox.uc.r.appspot.com/) | Raw interface to Google Gemini for understanding streaming and API behaviour | Gemini API · Google Cloud |
| [LocalSnap](https://github.com/arnav-ray/LocalSnap) | Offline photo library manager with local face recognition — no cloud dependency | Python · OpenCV · Flask |

---

## 🛠 Technology Stack

**AI & ML:** LlamaIndex · Ollama · Groq AI · Google Gemini API · Computer Vision · NLP · Vector Embeddings

**Infrastructure:** Python Serverless · Vercel · Google Cloud · GitHub Actions

**Frontend:** React · Chart.js · TradingView API · Streamlit

**Enterprise:** SAP FI/CO · S/4HANA · Financial Process Design · API Integration

---

## 📫 Let's Connect

- **Portfolio:** [arnavray.ca](https://arnavray.ca)
- **GitHub:** [github.com/arnav-ray](https://github.com/arnav-ray)
- **LinkedIn:** [linkedin.com/in/arnavray](https://linkedin.com/in/arnavray)
- **Email:** arnav@arnavray.ca

---

*AI-Assisted Build · Human-Directed*
