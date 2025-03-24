
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Camera, Download } from 'lucide-react';

interface HeaderProps {
  onInfoClick: () => void;
  onDownloadMarker: () => void;
}

const Header: React.FC<HeaderProps> = ({ onInfoClick, onDownloadMarker }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 animate-slide-down">
      <div className="mx-auto px-4 py-3 flex items-center justify-between glass-panel m-4 rounded-full">
        <div className="flex items-center">
          <Camera className="h-5 w-5 text-primary mr-2" />
          <h1 className="text-lg font-medium">AR Flag Viewer</h1>
        </div>
        
        <div className="flex space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={onDownloadMarker}
                  className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
                >
                  <Download className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download Marker</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={onInfoClick}
                  className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
                >
                  <Info className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>How to Use</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};

export default Header;
