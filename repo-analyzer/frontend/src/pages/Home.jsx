import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Network, AlertTriangle, Target, TrendingUp } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Network,
      title: 'Dependency Analysis',
      description: 'Visualize cross-repo dependencies and coupling risks'
    },
    {
      icon: AlertTriangle,
      title: 'Risk Assessment',
      description: 'Identify critical developers and bus factor risks'
    },
    {
      icon: Target,
      title: 'Efficiency Insights',
      description: 'Find code duplication and coordination opportunities'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-500 rounded-2xl mb-4">
          <BarChart3 className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-secondary-900">
          Organizational Intelligence Report
        </h1>
        <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
          AI-powered analysis of your codebase to identify risks, inefficiencies, 
          and opportunities for improvement across multiple repositories
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/analyze')}
            className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
          >
            <span>Analyze New Repos</span>
            <TrendingUp className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 text-lg px-8 py-4 rounded-lg font-medium inline-flex items-center space-x-2 transition-colors"
          >
            <span>View Sample Analysis</span>
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="card-hover text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-xl mb-4">
              <Icon className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-secondary-600">{description}</p>
          </div>
        ))}
      </div>

      {/* Stats Preview */}
      <div className="card bg-gradient-to-r from-primary-500 to-accent-500 text-white">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">2</div>
            <div className="text-primary-100">Repositories Analyzed</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">$95K</div>
            <div className="text-primary-100">Potential Annual Savings</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">7.5x</div>
            <div className="text-primary-100">Average ROI</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// Made with Bob
