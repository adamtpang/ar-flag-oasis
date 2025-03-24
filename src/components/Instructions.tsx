
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface InstructionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel border-none max-w-lg animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">How to Use AR Flag Viewer</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Follow these simple steps to view the flag in augmented reality.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex h-8 w-8 rounded-full bg-primary items-center justify-center">
              <span className="text-white text-sm font-medium">1</span>
            </div>
            <div>
              <h3 className="font-medium">Download the Marker</h3>
              <p className="text-muted-foreground text-sm">
                Click the download button in the top bar to save the marker image.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex h-8 w-8 rounded-full bg-primary items-center justify-center">
              <span className="text-white text-sm font-medium">2</span>
            </div>
            <div>
              <h3 className="font-medium">Print or Display the Marker</h3>
              <p className="text-muted-foreground text-sm">
                Print the marker image or display it on another device's screen.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex h-8 w-8 rounded-full bg-primary items-center justify-center">
              <span className="text-white text-sm font-medium">3</span>
            </div>
            <div>
              <h3 className="font-medium">Point Your Camera</h3>
              <p className="text-muted-foreground text-sm">
                Allow camera access when prompted and point your device at the marker.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex h-8 w-8 rounded-full bg-primary items-center justify-center">
              <span className="text-white text-sm font-medium">4</span>
            </div>
            <div>
              <h3 className="font-medium">View the Flag in AR</h3>
              <p className="text-muted-foreground text-sm">
                The flag will appear in augmented reality above the marker.
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Instructions;
