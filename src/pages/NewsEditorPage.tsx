import React, { useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Table, Code, Undo, Upload, CheckCircle2, Circle } from 'lucide-react';

export function NewsEditorPage() {
  const [category, setCategory] = useState('news');
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [pinToTop, setPinToTop] = useState(false);

  return (
    <div className="flex-1 w-full font-sans text-slate-900 flex flex-col">
      <div className="max-w-[1200px] w-full mx-auto p-6 md:p-8 flex flex-col">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[13px] text-slate-500 mb-5 font-bold shrink-0">
          <span className="hover:text-slate-700 cursor-pointer transition-colors">Portal</span>
          <span className="text-slate-300 font-normal">&gt;</span>
          <span className="hover:text-slate-700 cursor-pointer transition-colors">News Editor</span>
          <span className="text-slate-300 font-normal">&gt;</span>
          <span className="text-slate-900">Create New Post</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 shrink-0">
          <div>
            <h1 className="text-[32px] md:text-4xl text-[#0f172a] tracking-tight mb-3 font-bold">
              Create New Post
            </h1>
            <p className="text-slate-500 text-[15px] md:text-[16px] max-w-[600px] font-medium leading-relaxed">
              Draft and publish academic updates, research breakthroughs, or career opportunities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 rounded border-2 border-[#0f172a] text-[#0f172a] font-bold text-[14px] hover:bg-slate-50 transition-colors shadow-sm">
              Save Draft
            </button>
            <button className="flex items-center gap-2 bg-[#021124] hover:bg-[#0f172a] text-white px-6 py-2.5 rounded shadow-sm transition-colors text-[14px] font-bold">
              <Upload className="w-4 h-4" />
              Publish
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          
          {/* Left Column - Editor */}
          <div className="flex-1 w-full flex flex-col gap-6">
            
            {/* Title Input */}
            <div className="bg-white border border-slate-200 rounded p-6 shadow-sm">
              <label className="block text-[13px] font-bold text-[#0f172a] mb-2 uppercase tracking-wider">
                Article Title
              </label>
              <input 
                type="text" 
                placeholder="Enter a compelling title for the post..." 
                className="w-full text-[24px] md:text-[26px] font-bold text-slate-800 placeholder:text-slate-300 border-none focus:outline-none focus:ring-0 px-0"
              />
            </div>

            {/* Rich Text Editor Mock */}
            <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden flex flex-col min-h-[500px]">
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-4 py-3">
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-slate-700 hover:bg-slate-200 rounded transition-colors"><Bold className="w-4 h-4" strokeWidth={2.5} /></button>
                  <button className="p-1.5 text-slate-700 hover:bg-slate-200 rounded transition-colors"><Italic className="w-4 h-4" strokeWidth={2.5} /></button>
                  <button className="p-1.5 text-slate-700 hover:bg-slate-200 rounded transition-colors"><Underline className="w-4 h-4" strokeWidth={2.5} /></button>
                  <div className="w-[1px] h-5 bg-slate-300 mx-2"></div>
                  <button className="p-1.5 text-slate-700 hover:bg-slate-200 rounded transition-colors"><List className="w-4 h-4" strokeWidth={2.5} /></button>
                  <button className="p-1.5 text-slate-700 hover:bg-slate-200 rounded transition-colors"><ListOrdered className="w-4 h-4" strokeWidth={2.5} /></button>
                  <div className="w-[1px] h-5 bg-slate-300 mx-2"></div>
                  <button className="p-1.5 text-slate-700 hover:bg-slate-200 rounded transition-colors"><LinkIcon className="w-4 h-4" strokeWidth={2.5} /></button>
                  <button className="p-1.5 text-slate-700 hover:bg-slate-200 rounded transition-colors"><ImageIcon className="w-4 h-4" strokeWidth={2.5} /></button>
                  <button className="p-1.5 text-slate-700 hover:bg-slate-200 rounded transition-colors"><Table className="w-4 h-4" strokeWidth={2.5} /></button>
                  <button className="p-1.5 text-slate-700 hover:bg-slate-200 rounded transition-colors"><Code className="w-4 h-4" strokeWidth={2.5} /></button>
                </div>
                <button className="p-1.5 text-slate-700 hover:bg-slate-200 rounded transition-colors"><Undo className="w-4 h-4" strokeWidth={2.5} /></button>
              </div>
              
              {/* Text Area */}
              <textarea 
                placeholder="Start typing to begin your announcement..."
                className="flex-1 w-full p-6 text-[16px] text-slate-700 placeholder:text-slate-400 placeholder:italic resize-none focus:outline-none bg-white"
              ></textarea>
            </div>
            
          </div>

          {/* Right Column - Sidebar Panels */}
          <div className="w-full lg:w-[340px] flex flex-col gap-6 shrink-0">
            
            {/* Publication Category */}
            <div className="bg-white border border-slate-200 rounded p-6 shadow-sm">
              <h3 className="text-[14px] font-bold text-[#0f172a] mb-4">Publication Category</h3>
              <div className="flex flex-col gap-3">
                
                {/* Category: News */}
                <div 
                  onClick={() => setCategory('news')}
                  className={`border rounded p-4 flex gap-3 cursor-pointer transition-all ${category === 'news' ? 'border-[#4d7c0f] shadow-[0_0_0_1px_#4d7c0f]' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <div className="pt-0.5">
                    {category === 'news' ? <CheckCircle2 className="w-5 h-5 text-[#4d7c0f]" /> : <Circle className="w-5 h-5 text-slate-300" />}
                  </div>
                  <div>
                    <div className="font-bold text-[14px] text-[#0f172a]">News</div>
                    <div className="text-[12px] text-slate-500 leading-snug mt-0.5">General faculty announcements</div>
                  </div>
                </div>

                {/* Category: Research */}
                <div 
                  onClick={() => setCategory('research')}
                  className={`border rounded p-4 flex gap-3 cursor-pointer transition-all ${category === 'research' ? 'border-[#4d7c0f] shadow-[0_0_0_1px_#4d7c0f]' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <div className="pt-0.5">
                    {category === 'research' ? <CheckCircle2 className="w-5 h-5 text-[#4d7c0f]" /> : <Circle className="w-5 h-5 text-slate-300" />}
                  </div>
                  <div>
                    <div className="font-bold text-[14px] text-[#0f172a]">Research</div>
                    <div className="text-[12px] text-slate-500 leading-snug mt-0.5">Academic journals and findings</div>
                  </div>
                </div>

                {/* Category: Recruitment */}
                <div 
                  onClick={() => setCategory('recruitment')}
                  className={`border rounded p-4 flex gap-3 cursor-pointer transition-all ${category === 'recruitment' ? 'border-[#4d7c0f] shadow-[0_0_0_1px_#4d7c0f]' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <div className="pt-0.5">
                    {category === 'recruitment' ? <CheckCircle2 className="w-5 h-5 text-[#4d7c0f]" /> : <Circle className="w-5 h-5 text-slate-300" />}
                  </div>
                  <div>
                    <div className="font-bold text-[14px] text-[#0f172a]">Recruitment</div>
                    <div className="text-[12px] text-slate-500 leading-snug mt-0.5">PhD positions and faculty roles</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white border border-slate-200 rounded p-6 shadow-sm">
              <h3 className="text-[14px] font-bold text-[#0f172a] mb-4">Featured Image</h3>
              <div className="border-2 border-dashed border-slate-200 bg-slate-100/50 rounded p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-100 transition-colors">
                <ImageIcon className="w-8 h-8 text-slate-600 mb-3" strokeWidth={1.5} />
                <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                  Drag and drop or<br/>click to upload<br/>header image (Max<br/>5MB)
                </p>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white border border-slate-200 rounded p-6 shadow-sm flex flex-col gap-5">
              
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setPinToTop(!pinToTop)}>
                <span className="text-[14px] font-bold text-[#0f172a]">Pin to top</span>
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${pinToTop ? 'bg-[#4d7c0f] border-[#4d7c0f]' : 'border-slate-300 bg-white'}`}>
                  {pinToTop && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
              </div>

              <div className="flex items-center justify-between cursor-pointer" onClick={() => setCommentsEnabled(!commentsEnabled)}>
                <span className="text-[14px] font-bold text-[#0f172a]">Comments enabled</span>
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${commentsEnabled ? 'bg-[#4d7c0f] border-[#4d7c0f]' : 'border-slate-300 bg-white'}`}>
                  {commentsEnabled && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-[14px] font-bold text-[#0f172a] mb-2">Visibility</label>
                <select className="w-full border border-slate-200 bg-slate-50 rounded p-2.5 text-[14px] text-slate-800 font-medium focus:outline-none focus:border-[#4d7c0f]">
                  <option>Public (Everyone)</option>
                  <option>Faculty Only</option>
                  <option>Students Only</option>
                </select>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
