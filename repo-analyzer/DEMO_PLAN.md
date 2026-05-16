# Demo Flow Plan - Simulated Live Analysis

## Executive Summary
**Approach**: Option A - Simulated Demo (0 coins)
**Total Project Cost**: 22.6 coins used, 17.4 remaining
**Demo Implementation**: 2-3 coins
**Final Total**: ~25 coins, 15 coin buffer ✅

---

## Demo User Flow

### 1. Landing Page (Home)
**Current**: Static hero with "View Analysis" button
**New**: Add "Analyze New Repos" button

```
┌─────────────────────────────────────┐
│  Organizational Intelligence Report │
│                                     │
│  [View Sample Analysis]             │
│  [Analyze New Repos] ← NEW          │
└─────────────────────────────────────┘
```

### 2. Analysis Start Page (NEW)
**Route**: `/analyze`
**Purpose**: User inputs GitHub repo URLs

**UI Components**:
- Header: "Analyze Your Repositories"
- Dropzone for GitHub URLs (paste or drag)
- Input validation (GitHub URL format)
- "Analyze" button
- Example URLs shown

```
┌─────────────────────────────────────┐
│  Paste GitHub Repository URLs       │
│  ┌─────────────────────────────┐   │
│  │ https://github.com/IBM/... │   │
│  │ https://github.com/IBM/... │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Analyze Repositories]             │
└─────────────────────────────────────┘
```

### 3. Analysis Progress Page (NEW)
**Route**: `/analyze/progress`
**Purpose**: Show animated "analysis" in progress

**Animation Sequence** (30 seconds total):
1. ⏳ Cloning repositories... (3s)
2. 📁 Analyzing file structure... (4s)
3. 🔗 Mapping dependencies... (5s)
4. 👥 Identifying critical developers... (5s)
5. 🔍 Detecting code duplication... (4s)
6. 💰 Calculating financial impact... (5s)
7. ✨ Generating recommendations... (4s)

**Visual Elements**:
- IBM Bob avatar with thinking animation
- Progress bar (0-100%)
- Current step highlighted
- Completed steps with checkmarks
- Smooth transitions

### 4. Results Dashboard
**Route**: `/dashboard`
**Purpose**: Show analysis results
**Data Source**: Pre-saved `analysis_final.json`

---

## Technical Implementation

### New Files to Create:

```
frontend/src/
├── pages/
│   ├── AnalyzeStart.jsx (NEW)
│   └── AnalyzeProgress.jsx (NEW)
├── components/
│   └── analyze/
│       ├── RepoInput.jsx (NEW)
│       ├── ProgressStep.jsx (NEW)
│       └── BobAvatar.jsx (NEW)
└── utils/
    └── simulateAnalysis.js (NEW)
```

### Component Specifications:

#### AnalyzeStart.jsx
```javascript
- State: repoUrls (array of strings)
- Validation: GitHub URL format
- Submit: Navigate to /analyze/progress
- Features: 
  - Paste multiple URLs
  - Remove individual URLs
  - Example URLs button
  - URL validation feedback
```

#### AnalyzeProgress.jsx
```javascript
- State: currentStep (0-7), progress (0-100)
- Timer: Auto-advance every 3-5 seconds
- Animation: Smooth progress bar
- Completion: Auto-navigate to /dashboard
- Features:
  - Bob avatar animation
  - Step-by-step progress
  - Percentage display
  - Can't skip or cancel
```

#### simulateAnalysis.js
```javascript
const ANALYSIS_STEPS = [
  { id: 1, label: 'Cloning repositories', duration: 3000 },
  { id: 2, label: 'Analyzing file structure', duration: 4000 },
  { id: 3, label: 'Mapping dependencies', duration: 5000 },
  { id: 4, label: 'Identifying critical developers', duration: 5000 },
  { id: 5, label: 'Detecting code duplication', duration: 4000 },
  { id: 6, label: 'Calculating financial impact', duration: 5000 },
  { id: 7, label: 'Generating recommendations', duration: 4000 }
];

export function simulateAnalysis(onProgress, onComplete) {
  // Returns promise that resolves after 30 seconds
  // Calls onProgress(step, percentage) for each step
  // Calls onComplete() when done
}
```

---

## Routing Updates

### App.jsx Changes:
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/analyze" element={<AnalyzeStart />} /> {/* NEW */}
  <Route path="/analyze/progress" element={<AnalyzeProgress />} /> {/* NEW */}
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/dependencies" element={<Dependencies />} />
  <Route path="/risk" element={<Risk />} />
  <Route path="/efficiency" element={<Efficiency />} />
</Routes>
```

### Home.jsx Updates:
```javascript
// Add second button
<button onClick={() => navigate('/analyze')}>
  Analyze New Repos
</button>
```

---

## Visual Design

### Bob Avatar Animation States:
1. **Thinking**: Rotating gears, pulsing brain icon
2. **Working**: Progress indicator, file icons flowing
3. **Complete**: Checkmark, success animation

### Color Scheme:
- Progress bar: IBM Blue (#0f62fe)
- Completed steps: Success Green (#24a148)
- Current step: Primary Blue with pulse
- Pending steps: Secondary Gray (#8d8d8d)

### Typography:
- Step labels: IBM Plex Sans, 16px, medium
- Progress percentage: 48px, bold
- Status text: 14px, regular

---

## Demo Script

### Presenter Actions:
1. **Start**: "Let me show you how easy it is to analyze your repos"
2. **Navigate**: Click "Analyze New Repos"
3. **Input**: Paste 2 GitHub URLs
4. **Analyze**: Click "Analyze Repositories"
5. **Watch**: Bob analyzes in real-time (30 seconds)
6. **Results**: Automatically shows dashboard with insights

### Key Talking Points:
- "Bob clones and analyzes your repositories"
- "Identifies critical developers and bus factor risks"
- "Detects code duplication and inefficiencies"
- "Calculates financial impact and ROI"
- "Generates actionable recommendations"

---

## Implementation Checklist

### Phase 1: New Pages (1-1.5 coins)
- [ ] Create AnalyzeStart.jsx with URL input
- [ ] Create AnalyzeProgress.jsx with animation
- [ ] Add routes to App.jsx
- [ ] Update Home.jsx with new button

### Phase 2: Components (0.5-1 coin)
- [ ] Create RepoInput component
- [ ] Create ProgressStep component
- [ ] Create BobAvatar component
- [ ] Add simulateAnalysis utility

### Phase 3: Polish (0.5 coin)
- [ ] Add smooth transitions
- [ ] Test full flow
- [ ] Verify timing
- [ ] Check mobile responsiveness

### Phase 4: Cleanup (Code mode)
- [ ] Delete cloned repos (mcp-context-forge, ibm-watsonx-orchestrate-adk)
- [ ] Verify analysis_final.json is saved
- [ ] Test demo end-to-end

**Total Estimated**: 2-3 coins

---

## Post-Demo Enhancements (Optional)

### Future: Real Analysis Mode
If you want to add real analysis later:
1. Add "Demo Mode" toggle in settings
2. Create backend service for real analysis
3. Implement caching system
4. Add 5-coin hard limit per analysis
5. Fall back to demo data if limit exceeded

### Benefits of This Approach:
✅ **Demo-ready**: Reliable, polished experience
✅ **Cost-effective**: Only 2-3 coins for implementation
✅ **Extensible**: Can add real analysis later
✅ **Professional**: Looks like real AI analysis
✅ **Fast**: 30-second demo, perfect timing

---

## Budget Summary

- **Current**: 22.6 coins used
- **Demo Implementation**: 2-3 coins
- **Final Total**: 24.6-25.6 coins
- **Remaining**: 14.4-15.4 coins
- **Buffer**: Excellent for unexpected issues ✅

**Ready to implement?**