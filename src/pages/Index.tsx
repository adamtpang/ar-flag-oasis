
import React, { useState, useEffect } from 'react';
import ARViewer from '@/components/ARViewer';
import Header from '@/components/Header';
import Instructions from '@/components/Instructions';
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [arInitialized, setArInitialized] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);

  // First-time visit detection
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('ar-flag-visited');
    if (!hasVisitedBefore) {
      setShowInstructions(true);
      localStorage.setItem('ar-flag-visited', 'true');
    }
  }, []);

  const handleInfoClick = () => {
    setShowInstructions(true);
  };

  const handleDownloadMarker = () => {
    // Create a link element to download the marker
    const link = document.createElement('a');
    link.href = './assets/marker.png';
    link.download = 'ar-marker.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Marker Downloaded",
      description: "Print or display this marker to view the flag in AR.",
    });
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setCameraPermission(true);
      setArInitialized(true);
    } catch (error) {
      console.error('Camera permission denied:', error);
      setCameraPermission(false);
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to use AR features.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-b from-background to-secondary">
      <Header 
        onInfoClick={handleInfoClick} 
        onDownloadMarker={handleDownloadMarker} 
      />
      
      <Instructions 
        isOpen={showInstructions} 
        onClose={() => setShowInstructions(false)} 
      />
      
      {!cameraPermission && !arInitialized ? (
        <div className="flex flex-col items-center justify-center h-full p-6">
          <div className="glass-panel p-8 max-w-md text-center animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4">Experience Our Flag in AR</h2>
            <p className="text-muted-foreground mb-6">
              Point your camera at the Hiro marker to see our flag come to life in augmented reality.
            </p>
            <button
              onClick={requestCameraPermission}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Start AR Experience
            </button>
          </div>
        </div>
      ) : cameraPermission === false ? (
        <div className="flex flex-col items-center justify-center h-full p-6">
          <div className="glass-panel p-8 max-w-md animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4">Camera Access Required</h2>
            <p className="text-muted-foreground mb-4">
              Please allow camera access in your browser settings to use the AR features.
            </p>
            <button
              onClick={requestCameraPermission}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="ar-overlay">
            <div className="ar-interface">
              {arInitialized ? (
                <ARViewer flagUrl="./assets/flag.png" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                  <span className="ml-2">Initializing AR...</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="fixed bottom-0 left-0 right-0 z-20 p-4 pointer-events-none animate-slide-up">
            <div className="glass-panel p-4 mx-auto max-w-sm text-center pointer-events-auto">
              <p className="text-sm text-muted-foreground">
                Point your camera at the Hiro marker to view the flag in AR
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
