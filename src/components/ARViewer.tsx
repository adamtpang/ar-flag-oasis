
import React, { useEffect, useRef, useState } from 'react';
import { toast } from "@/components/ui/use-toast";

interface ARViewerProps {
  markerUrl?: string;
  flagUrl: string;
}

const ARViewer: React.FC<ARViewerProps> = ({ 
  markerUrl = './assets/marker.png',
  flagUrl 
}) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [isARSupported, setIsARSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [markerFound, setMarkerFound] = useState(false);

  useEffect(() => {
    const checkARSupport = async () => {
      try {
        // Check if the browser supports WebXR
        if (!navigator.xr) {
          setIsARSupported(false);
          toast({
            title: "AR Not Supported",
            description: "Your browser doesn't support WebXR or AR capabilities.",
            variant: "destructive",
          });
          return;
        }

        // Load AR.js and A-Frame scripts
        await Promise.all([
          loadScript('https://aframe.io/releases/1.4.0/aframe.min.js'),
          loadScript('https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js')
        ]);

        // Add event listeners for marker found/lost
        document.addEventListener('markerFound', () => {
          console.log('Marker found!');
          setMarkerFound(true);
          toast({
            title: "Marker Detected",
            description: "Flag is now visible in AR.",
          });
        });

        document.addEventListener('markerLost', () => {
          console.log('Marker lost!');
          setMarkerFound(false);
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing AR:', error);
        setIsARSupported(false);
        toast({
          title: "AR Initialization Failed",
          description: "There was a problem setting up the AR viewer.",
          variant: "destructive",
        });
      }
    };

    checkARSupport();

    return () => {
      document.removeEventListener('markerFound', () => {});
      document.removeEventListener('markerLost', () => {});
    };
  }, []);

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  };

  if (!isARSupported) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="glass-panel p-8 max-w-md animate-fade-in">
          <h2 className="text-2xl font-semibold mb-4">AR Not Supported</h2>
          <p className="text-muted-foreground">
            Your device or browser doesn't support AR features. 
            Please try using a modern mobile browser like Chrome or Safari.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="animate-pulse-subtle">
          <svg className="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="mt-4 text-muted-foreground animate-pulse-subtle">
          Initializing AR experience...
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full" ref={sceneRef}>
      <div 
        id="ar-scene-container"
        className="w-full h-full"
        dangerouslySetInnerHTML={{
          __html: `
            <a-scene
              embedded
              arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3; patternRatio: 0.75;"
              vr-mode-ui="enabled: false"
              device-orientation-permission-ui="enabled: false"
              renderer="antialias: true; alpha: true; precision: mediump;"
            >
              <a-marker preset="hiro" emitevents="true" smooth="true" smoothCount="5" smoothTolerance="0.01" smoothThreshold="2">
                <a-image
                  src="${flagUrl}"
                  position="0 0.5 0"
                  rotation="-90 0 0"
                  scale="1 1 1"
                  transparent="true"
                  alpha-test="0.5"
                  animation="property: rotation; to: -90 360 0; loop: true; dur: 15000; easing: linear;"
                ></a-image>
                <a-entity
                  position="0 0 0"
                  particle-system="preset: snow; particleCount: 500; size: 0.5"
                ></a-entity>
              </a-marker>
              <a-entity camera></a-entity>
            </a-scene>
          `
        }}
      />
    </div>
  );
};

export default ARViewer;
