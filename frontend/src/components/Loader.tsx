import { Bot } from 'lucide-react';
import React from 'react';

const Loader = () => {
  return (
    <div className="flex w-full items-center mx-auto my-3 px-10 gap-4">
      <Bot className="h-8 w-8 text-blue-400 animate-spin" />
      <span className="text-blue">Loading...</span>
      
    </div>
  );
};

export default Loader;