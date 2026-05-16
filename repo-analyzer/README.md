# Organizational Intelligence Report Tool

> AI-powered repository analysis tool that identifies code inefficiencies, developer risks, and cost-saving opportunities across your organization's codebases.

Built with IBM Bob AI | React + Vite | Zero Backend Required

---

## 🎯 What It Does

This tool analyzes GitHub repositories and generates comprehensive organizational intelligence reports showing:

- **💰 Cost Savings**: Identifies $127K+ in annual savings opportunities
- **👥 Developer Risk**: Maps critical developers and bus factor risks
- **🔄 Code Duplication**: Finds duplicate code costing thousands in wasted hours
- **🎯 Coordination Blindspots**: Spots teams working on conflicting features
- **📊 ROI Calculator**: Interactive "What If" scenarios for implementing recommendations
- **📄 PDF Export**: Professional reports ready to share with executives

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- A modern web browser

### Installation

```bash
# Navigate to the frontend directory
cd repo-analyzer/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open at `http://localhost:5173/`

---

## 📖 Demo Flow

### 1. **Home Page**
- Click **"Analyze New Repos"** to start a new analysis
- Or click **"View Sample Analysis"** to see pre-loaded results

### 2. **Input Repositories**
- Paste GitHub repository URLs (up to 5)
- Or click **"Load Example URLs"** for demo data
- Click **"Analyze Repositories"**

### 3. **Watch Bob Analyze** (5 seconds)
- Bob's head bounces while analyzing
- Progress counter shows 0-100%
- Smooth, engaging animation

### 4. **View Results Dashboard**
- **Executive Summary**: Key metrics and findings
- **Export/Share**: Download PDF or copy shareable link
- **ROI Calculator**: Select recommendations to see combined impact
- **Quick Wins**: High-ROI opportunities ranked by impact
- **Repository Overview**: Analyzed repos with key modules

### 5. **Explore Detailed Pages**
- **Dependencies**: Interactive graph of module relationships
- **Risk Analysis**: Developer risk heatmap and bus factor assessment
- **Efficiency**: Code duplication and coordination blindspots

---

## 🎨 Key Features

### 📊 Interactive Dependency Graph
- Color-coded nodes (repositories, modules, critical components)
- Click to zoom and focus
- Filter by criticality
- Shows cross-repo connections

### 💡 "What If" ROI Calculator
- Select multiple recommendations
- See combined cost, savings, and ROI
- Real-time calculations
- Expandable/collapsible interface

### 📄 Professional PDF Export
- Executive summary with ROI metrics
- Repository analysis details
- Developer risk assessment
- Code duplication findings
- Quick wins & recommendations
- IBM-branded, presentation-ready

### 🔗 Shareable Links
- Generate shareable URLs
- One-click copy to clipboard
- Perfect for team collaboration

---

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18.2 + Vite 5.0
- **Styling**: Tailwind CSS 3.3
- **Routing**: React Router 6.20
- **Visualization**: react-force-graph-2d, recharts
- **PDF Export**: jsPDF + jspdf-autotable
- **Icons**: lucide-react

### Project Structure
```
repo-analyzer/
├── frontend/
│   ├── public/
│   │   ├── data/
│   │   │   └── analysis_final.json    # Pre-loaded analysis data
│   │   └── bob.svg                     # Bob avatar for animations
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/              # Dashboard components
│   │   │   ├── dependencies/           # Dependency graph components
│   │   │   ├── efficiency/             # Efficiency analysis components
│   │   │   └── risk/                   # Risk analysis components
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Dependencies.jsx
│   │   │   ├── Risk.jsx
│   │   │   ├── Efficiency.jsx
│   │   │   ├── AnalyzeStart.jsx
│   │   │   └── AnalyzeProgress.jsx
│   │   ├── hooks/
│   │   │   └── useAnalysisData.js      # Data fetching hook
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── formatters.js
│   │   │   ├── calculations.js
│   │   │   ├── exportPDF.js            # PDF export logic
│   │   │   └── simulateAnalysis.js     # Demo simulation
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── DEMO_PLAN.md
├── SPECIFICATION.md
└── README.md
```

---

## 📊 Sample Analysis Data

The tool comes with pre-loaded analysis of two IBM repositories:
- **mcp-context-forge**: MCP Gateway with 340 files analyzed
- **ibm-watsonx-orchestrate-adk**: WatsonX ADK with 222 files analyzed

### Key Findings:
- **$127K** annual savings potential
- **8.2x** average ROI on recommendations
- **1.5 months** payback period
- **4 critical developers** identified
- **12 single-owner modules** need backup maintainers
- **3 code duplication patterns** found

---

## 🎯 Use Cases

### For Engineering Managers
- Identify bus factor risks before they become problems
- Prioritize refactoring efforts with ROI data
- Spot coordination issues between teams
- Present data-driven cases for technical debt reduction

### For CTOs/VPs
- Quantify technical debt in dollar terms
- Make informed decisions on resource allocation
- Share professional reports with stakeholders
- Track improvements over time

### For Development Teams
- Understand cross-repo dependencies
- Find opportunities to share code
- Reduce duplicate work
- Improve collaboration

---

## 🔧 Customization

### Adding Your Own Analysis Data

1. Place your analysis JSON in `public/data/`
2. Update `useAnalysisData.js` to point to your file
3. Ensure your data matches the schema in `SPECIFICATION.md`

### Styling

- Colors defined in `tailwind.config.js`
- IBM color palette: Primary (#0f62fe), Secondary (#393939)
- Custom classes in `index.css`

---

## 📝 Development Notes

### Built with IBM Bob
This entire application was built using IBM Bob AI assistant within a 40 bobcoin budget:
- **Used**: 31 coins for development
- **Remaining**: 9 coins buffer
- **Time**: Single development session
- **Components**: 40+ React components
- **Lines of Code**: ~5,000+

### Demo Mode
The analysis is simulated (5 seconds) to provide a smooth demo experience without consuming API tokens. In production, this would connect to a real analysis backend.

---

## 🚢 Deployment

### Build for Production

```bash
cd frontend
npm run build
```

The `dist/` folder contains the production build ready to deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

### Environment Variables
No environment variables required - this is a static site!

---

## 📄 License

Built as a demonstration project. Feel free to use and modify.

---

## 🙏 Acknowledgments

- Built with **IBM Bob** AI assistant
- Analyzed **IBM open-source repositories**
- Uses **IBM Design Language** color palette
- Inspired by real organizational code analysis needs

---

## 📞 Support

For questions or issues:
1. Check `SPECIFICATION.md` for detailed component documentation
2. Review `DEMO_PLAN.md` for demo flow details
3. Inspect the code - it's well-commented!

---

**Made with ❤️ and IBM Bob**