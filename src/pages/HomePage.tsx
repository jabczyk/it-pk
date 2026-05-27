import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe,
  MapPin, 
  Play, 
  Check, 
  Compass, 
  Shield, 
  BarChart3, 
  ArrowRight
} from 'lucide-react';

interface Article {
  id: number;
  category: string;
  title: string;
  description: string;
  date: string;
  image?: string;
}

const studentArticles: Article[] = [
  {
    id: 1,
    category: 'Research Grant',
    title: 'New Quantum Computing Laboratory to Open in Summer 2024',
    description: "Following a major international grant, our faculty is set to host one of the region's most advanced quantum simulation environments.",
    date: 'May 24, 2024',
    image: '/images/network_cables.png'
  },
  {
    id: 2,
    category: 'Student Affairs',
    title: '2024 Recruitment Cycle Begins: Key Dates for Applicants',
    description: 'Detailed schedule and document submission guidelines for undergraduate and graduate programs.',
    date: 'May 22, 2024'
  },
  {
    id: 3,
    category: 'International Cooperation',
    title: 'Erasmus+ Mobility: New Partner Universities in Norway',
    description: 'Expanding student exchange opportunities with leading technical universities in Scandinavia.',
    date: 'May 18, 2024'
  }
];

const employeeArticles: Article[] = [
  {
    id: 1,
    category: 'Faculty Funding',
    title: 'Faculty Senate Announces New Research Support Grants',
    description: 'A new funding scheme has been approved to support early-career researchers and collaborative projects across our key computing research departments.',
    date: 'May 26, 2024',
    image: '/images/computer_lab.png'
  },
  {
    id: 2,
    category: 'Administration',
    title: 'HR Guidelines: Annual Performance Review Schedule',
    description: 'Complete documentation and timelines for the upcoming academic and research staff performance evaluations.',
    date: 'May 23, 2024'
  },
  {
    id: 3,
    category: 'Academic Affairs',
    title: 'Teaching Excellence Awards 2024 Nominees Announced',
    description: 'Recognizing outstanding dedication to student mentorship and innovative classroom methodologies across the Faculty.',
    date: 'May 19, 2024'
  }
];

export function HomePage() {
  const [activeTab, setActiveTab] = useState<'students' | 'employees'>('students');
  const articles = activeTab === 'students' ? studentArticles : employeeArticles;

  return (
    <div className="flex flex-col flex-1">

      {/* 2. Hero Section */}
      <section className="relative min-h-[500px] lg:h-[600px] flex items-center text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/faculty_hero.png" 
            alt="Faculty Building" 
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#021124]/95 via-[#021124]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1200px] w-full mx-auto px-6 md:px-8 py-16 flex flex-col justify-center">
          <span className="text-[11px] md:text-[12px] font-bold text-[#84cc16] tracking-[0.2em] uppercase mb-3">
            Pioneering progress since 1945
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-[54px] font-bold leading-[1.1] tracking-tight max-w-3xl">
            Where Mathematical Precision Meets Computational Power
          </h1>
          <p className="text-slate-300 text-sm md:text-[17px] leading-relaxed max-w-2xl mt-5">
            Empowering the next generation of innovators through rigorous academic excellence, 
            world-class research infrastructure, and a vibrant community of digital architects.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a 
              href="#explore" 
              className="bg-[#4d7c0f] hover:bg-[#3f6212] text-white text-[14px] font-bold px-6 py-3 rounded-sm shadow-md transition-colors"
            >
              Explore Programs
            </a>
            <button 
              type="button"
              className="border-2 border-white/80 hover:border-white hover:bg-white/10 text-white text-[14px] font-bold px-6 py-2.5 rounded-sm transition-all"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="border-b border-slate-100 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 py-6">
          <div className="px-6 py-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#021124]">4,500+</div>
            <div className="text-[10px] md:text-[11px] font-bold text-slate-400 tracking-widest uppercase mt-1">Active Students</div>
          </div>
          <div className="px-6 py-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#021124]">19</div>
            <div className="text-[10px] md:text-[11px] font-bold text-slate-400 tracking-widest uppercase mt-1">Specialized Labs</div>
          </div>
          <div className="px-6 py-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#021124]">85%</div>
            <div className="text-[10px] md:text-[11px] font-bold text-slate-400 tracking-widest uppercase mt-1">Research Impact</div>
          </div>
          <div className="px-6 py-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#021124]">200+</div>
            <div className="text-[10px] md:text-[11px] font-bold text-slate-400 tracking-widest uppercase mt-1">Academic Staff</div>
          </div>
        </div>
      </section>

      {/* 4. Faculty Updates Section */}
      <section id="news" className="bg-[#f8fafc] py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 mb-8">
            <div className="relative">
              <h2 className="text-xl md:text-2xl font-bold text-[#021124] tracking-tight">
                Faculty Updates
              </h2>
              <div className="absolute -bottom-[17px] left-0 w-16 h-[2px] bg-[#65a30d]" />
            </div>
            
            {/* Tabs */}
            <div className="flex bg-slate-200/50 p-0.5 rounded border border-slate-200/20">
              <button 
                onClick={() => setActiveTab('students')}
                className={`px-4 py-1 rounded text-xs font-semibold transition-all ${activeTab === 'students' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Students
              </button>
              <button 
                onClick={() => setActiveTab('employees')}
                className={`px-4 py-1 rounded text-xs font-semibold transition-all ${activeTab === 'employees' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Employees
              </button>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Large Card on Left (spans 7 cols) */}
            <div className="lg:col-span-7 bg-white border border-slate-100 rounded shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full justify-between">
              <div>
                <div className="h-[260px] w-full overflow-hidden">
                  <img 
                    src={articles[0].image} 
                    alt={articles[0].title}
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[11px] font-bold text-[#65a30d] uppercase tracking-wider">
                    {articles[0].category}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-2 hover:text-[#021124] transition-colors leading-snug">
                    {articles[0].title}
                  </h3>
                  <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                    {articles[0].description}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-50">
                <span className="text-slate-400 text-xs">{articles[0].date}</span>
                <Link to="#" className="flex items-center gap-1 text-[12px] font-bold text-slate-700 hover:text-slate-950 transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Stacked Cards on Right (spans 5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {articles.slice(1).map((art) => (
                <div key={art.id} className="bg-white border border-slate-100 rounded shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between h-full min-h-[170px]">
                  <div>
                    <span className="text-[11px] font-bold text-[#65a30d] uppercase tracking-wider">
                      {art.category}
                    </span>
                    <h3 className="text-[15px] md:text-[16px] font-bold text-slate-900 mt-1 hover:text-[#021124] transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed line-clamp-2">
                      {art.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-50 mt-4 pt-4">
                    <span className="text-slate-400 text-[11px]">{art.date}</span>
                    <Link to="#" className="text-[11px] font-bold text-slate-700 hover:text-slate-950 transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Virtual Tour Promo Section */}
      <section className="bg-[#021124] py-16 px-6 text-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Explore Our Campus from Anywhere
            </h2>
            <p className="text-slate-300 text-sm md:text-[15px] leading-relaxed mt-4">
              Take a high-definition 360° tour through our laboratories, lecture halls, and the newly renovated student lounge area. Experience the atmosphere of the Faculty of Computer Science and Mathematics before you arrive.
            </p>
            
            <div className="flex flex-col gap-3 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#84cc16]/10 border border-[#84cc16]/40 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#84cc16]" />
                </div>
                <span className="text-slate-200 text-[13px] md:text-sm">Interactive 3D building maps</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#84cc16]/10 border border-[#84cc16]/40 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#84cc16]" />
                </div>
                <span className="text-slate-200 text-[13px] md:text-sm">Live lab demos recordings</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#84cc16]/10 border border-[#84cc16]/40 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#84cc16]" />
                </div>
                <span className="text-slate-200 text-[13px] md:text-sm">Student dorm walkthroughs</span>
              </div>
            </div>

            <Link 
              to="#"
              className="mt-8 flex items-center gap-2 bg-white text-[#021124] hover:bg-slate-100 text-[13px] font-bold px-5 py-2.5 rounded-sm transition-all shadow-md w-fit"
            >
              <MapPin className="w-4 h-4 text-[#65a30d]" />
              <span>Start Virtual Experience</span>
            </Link>
          </div>

          {/* Right Video / Image Column */}
          <div className="lg:col-span-6">
            <div className="relative rounded overflow-hidden shadow-2xl border border-white/10 group">
              <img 
                src="/images/computer_lab.png" 
                alt="Computer Laboratory" 
                className="w-full aspect-[4/3] object-cover"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                <button className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white text-[#021124] flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Departments Section */}
      <section id="departments" className="py-16 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#021124] tracking-tight">
            Our Departments
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-2 max-w-2xl mx-auto">
            Dedicated to specialized research and high-level education across the spectrum of exact sciences.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
            <div className="border border-slate-100 bg-[#f8fafc] p-8 rounded shadow-sm hover:shadow-md hover:bg-white transition-all duration-200">
              <div className="w-10 h-10 rounded bg-[#021124]/5 flex items-center justify-center mb-6">
                <Globe className="w-5 h-5 text-[#021124]" />
              </div>
              <h3 className="text-[16px] font-bold text-[#021124] uppercase tracking-wide">Computer Science</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Algorithms, AI, and Software Engineering.
              </p>
            </div>

            <div className="border border-slate-100 bg-[#f8fafc] p-8 rounded shadow-sm hover:shadow-md hover:bg-white transition-all duration-200">
              <div className="w-10 h-10 rounded bg-[#021124]/5 flex items-center justify-center mb-6">
                <Compass className="w-5 h-5 text-[#021124]" />
              </div>
              <h3 className="text-[16px] font-bold text-[#021124] uppercase tracking-wide">Applied Mathematics</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Modeling, Statistics, and Financial Math.
              </p>
            </div>

            <div className="border border-slate-100 bg-[#f8fafc] p-8 rounded shadow-sm hover:shadow-md hover:bg-white transition-all duration-200">
              <div className="w-10 h-10 rounded bg-[#021124]/5 flex items-center justify-center mb-6">
                <Shield className="w-5 h-5 text-[#021124]" />
              </div>
              <h3 className="text-[16px] font-bold text-[#021124] uppercase tracking-wide">Cybersecurity</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Cryptography and Network Defense.
              </p>
            </div>

            <div className="border border-slate-100 bg-[#f8fafc] p-8 rounded shadow-sm hover:shadow-md hover:bg-white transition-all duration-200">
              <div className="w-10 h-10 rounded bg-[#021124]/5 flex items-center justify-center mb-6">
                <BarChart3 className="w-5 h-5 text-[#021124]" />
              </div>
              <h3 className="text-[16px] font-bold text-[#021124] uppercase tracking-wide">Data Science</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Big Data, Mining, and Visualization.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
