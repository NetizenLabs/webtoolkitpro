'use client'

import React, { useState } from 'react'
import { Layers, PlayCircle, Palette, Copy } from 'lucide-react'

export default function CssGenerators() {
  const [activeTab, setActiveTab] = useState<'shadow' | 'gradient' | 'keyframes'>('shadow')

  // Shadow State
  const [hOffset, setHOffset] = useState(10)
  const [vOffset, setVOffset] = useState(10)
  const [blur, setBlur] = useState(15)
  const [spread, setSpread] = useState(-3)
  const [shadowColor, setShadowColor] = useState('rgba(0,0,0,0.1)')

  // Gradient State
  const [color1, setColor1] = useState('#00D4B4')
  const [color2, setColor2] = useState('#0094FF')
  const [angle, setAngle] = useState(135)

  // Keyframes State
  const [animName, setAnimName] = useState('bounce')

  const generateShadowCss = () => `box-shadow: ${hOffset}px ${vOffset}px ${blur}px ${spread}px ${shadowColor};\n-webkit-box-shadow: ${hOffset}px ${vOffset}px ${blur}px ${spread}px ${shadowColor};\n-moz-box-shadow: ${hOffset}px ${vOffset}px ${blur}px ${spread}px ${shadowColor};`;
  const generateGradientCss = () => `background: linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%);`;
  const generateKeyframesCss = () => `@keyframes ${animName} {
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
}

.element {
  animation: ${animName} 2s infinite ease-in-out;
}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-100 dark:border-[#1E2D47]">
        <button
          onClick={() => setActiveTab('shadow')}
          className={`px-6 py-4 flex items-center gap-2 text-sm font-semibold transition-colors ${activeTab === 'shadow' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
        >
          <Layers className="w-4 h-4" /> Box Shadow
        </button>
        <button
          onClick={() => setActiveTab('gradient')}
          className={`px-6 py-4 flex items-center gap-2 text-sm font-semibold transition-colors ${activeTab === 'gradient' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
        >
          <Palette className="w-4 h-4" /> Gradient
        </button>
        <button
          onClick={() => setActiveTab('keyframes')}
          className={`px-6 py-4 flex items-center gap-2 text-sm font-semibold transition-colors ${activeTab === 'keyframes' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
        >
          <PlayCircle className="w-4 h-4" /> Keyframes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[500px]">
        {/* Controls */}
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 shadow-sm flex flex-col space-y-6 overflow-y-auto">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Properties</h3>
          
          {activeTab === 'shadow' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex justify-between">Horizontal Offset <span>{hOffset}px</span></label>
                <input type="range" min="-50" max="50" value={hOffset} onChange={(e) => setHOffset(Number(e.target.value))} className="w-full accent-blue-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex justify-between">Vertical Offset <span>{vOffset}px</span></label>
                <input type="range" min="-50" max="50" value={vOffset} onChange={(e) => setVOffset(Number(e.target.value))} className="w-full accent-blue-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex justify-between">Blur Radius <span>{blur}px</span></label>
                <input type="range" min="0" max="100" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full accent-blue-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex justify-between">Spread Radius <span>{spread}px</span></label>
                <input type="range" min="-50" max="50" value={spread} onChange={(e) => setSpread(Number(e.target.value))} className="w-full accent-blue-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Shadow Color</label>
                <input type="text" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-[#0B1120] border border-transparent rounded-xl text-sm outline-none dark:text-white" />
              </div>
            </div>
          )}

          {activeTab === 'gradient' && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Color 1</label>
                  <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-full h-12 rounded-xl cursor-pointer" />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Color 2</label>
                  <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-full h-12 rounded-xl cursor-pointer" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex justify-between">Angle <span>{angle}°</span></label>
                <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-blue-500" />
              </div>
            </div>
          )}

          {activeTab === 'keyframes' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Animation Name</label>
                <input type="text" value={animName} onChange={(e) => setAnimName(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-[#0B1120] border border-transparent rounded-xl text-sm outline-none dark:text-white" />
              </div>
              <p className="text-xs text-gray-500">This generator provides a basic bouncing animation structure. You can copy the code and modify the transform properties to build complex keyframes.</p>
            </div>
          )}
        </div>

        {/* Preview & Output */}
        <div className="flex flex-col space-y-6">
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 shadow-sm flex-grow flex items-center justify-center overflow-hidden">
            <div 
              className="w-48 h-48 rounded-2xl bg-white dark:bg-gray-800 transition-all flex items-center justify-center text-gray-400 font-bold"
              style={
                activeTab === 'shadow' ? { boxShadow: `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${shadowColor}` } :
                activeTab === 'gradient' ? { background: `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)` } :
                {}
              }
            >
              {activeTab === 'keyframes' && <span className="animate-bounce p-4 bg-blue-500 text-white rounded-xl">Preview</span>}
              {activeTab !== 'keyframes' && 'Preview'}
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-3xl p-6 shadow-sm relative">
            <button onClick={() => copyToClipboard(activeTab === 'shadow' ? generateShadowCss() : activeTab === 'gradient' ? generateGradientCss() : generateKeyframesCss())} className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/10 p-2 rounded-xl">
              <Copy className="w-4 h-4" />
            </button>
            <pre className="text-emerald-400 text-sm font-mono overflow-x-auto">
              {activeTab === 'shadow' ? generateShadowCss() : activeTab === 'gradient' ? generateGradientCss() : generateKeyframesCss()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
