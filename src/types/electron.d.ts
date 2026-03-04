// Type definitions for Electron API exposed through preload

export interface SortState {
  phase: 'init' | 'split' | 'merge' | 'complete';
  currentStepDescription: string;
  ramBuffer: number[];
  ramBufferState: ('unsorted' | 'processing' | 'sorted')[];
  diskState: {
    inputFile: {
      name: string;
      numbers: number[];
      status: string;
    };
    runs: Array<{
      name: string;
      numbers: number[];
      status: string;
    }>;
    outputFile: {
      name: string;
      numbers: number[];
      status: string;
    };
  };
  stats: {
    totalNumbers: number;
    ramSize: number;
    currentPhase: string;
    runsCreated: number;
  };
  isComplete: boolean;
}

export interface FileResult {
  success: boolean;
  filePath?: string;
  numbers?: number[];
  message?: string;
  error?: string;
  canceled?: boolean;
}

export interface SortResult {
  success: boolean;
  state?: SortState;
  isComplete?: boolean;
  message?: string;
  error?: string;
}

declare global {
  interface Window {
    electronAPI: {
      generateMockFile: (count: number) => Promise<FileResult>;
      selectFile: () => Promise<FileResult>;
      initSort: (filePath: string, ramSize: number) => Promise<SortResult>;
      nextStep: () => Promise<SortResult>;
      prevStep: () => Promise<SortResult>;
      resetSort: () => Promise<SortResult>;
      getCurrentState: () => Promise<SortResult>;
    };
  }
}

export {};
