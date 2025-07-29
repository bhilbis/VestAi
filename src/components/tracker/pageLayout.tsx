import React, { ReactNode } from "react";
import { BarChart3 } from "lucide-react";

const ModernPageLayout = ({ children: children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VEST AI
            </h1>
          </div>
          <p className="text-gray-600 text-2xl">Kelola dan analisis portfolio Anda dengan AI</p>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default ModernPageLayout