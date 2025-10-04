import { Bot } from 'lucide-react';
import React from 'react';

const Loader = () => {
  return (
    <div className="flex w-full mx-auto my-6 px-4 gap-3">
      <Bot className="h-8 w-8 text-blue-400 animate-spin" />
      <span className="text-blue-400 text-lg font-medium">Loading...</span>
      
    </div>
  );
};

export default Loader;