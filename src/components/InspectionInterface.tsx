import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Mic, 
  MicOff, 
  Camera, 
  Upload, 
  Download,
  Volume2,
  Wifi,
  IdCard,
  FileText,
  Eye,
  RotateCcw
} from 'lucide-react';

type SessionState = 'pre-session' | 'live-session' | 'post-session';

interface InspectionItem {
  id: string;
  name: string;
  status: 'cleared' | 'pending' | 'violation';
  description?: string;
}

const InspectionInterface = () => {
  const [sessionState, setSessionState] = useState<SessionState>('pre-session');
  const [timeLeft, setTimeLeft] = useState(30); // 0:30 in seconds
  const [isMicOn, setIsMicOn] = useState(false);
  const [connectionTested, setConnectionTested] = useState(false);

  // Mock inspection items for live session
  const inspectionItems: InspectionItem[] = [
    { id: '1', name: 'Commercial Invoice', status: 'cleared', description: 'Document verified' },
    { id: '2', name: 'Electronics Package', status: 'pending', description: 'Awaiting closer inspection' },
    { id: '3', name: 'Textile Goods', status: 'cleared', description: 'No issues detected' },
    { id: '4', name: 'Suspicious Package', status: 'violation', description: 'Undeclared items found' }
  ];

  useEffect(() => {
    if (sessionState === 'pre-session' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [sessionState, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderPreSession = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/ebadb452-554b-45e6-a769-9ade4abcdf87.png" 
            alt="Ajman Port Logo" 
            className="h-20 mx-auto mb-4"
          />
          <h1 className="text-xl font-bold text-[#1A5F9E]">Customs Inspection Portal</h1>
        </div>

        {/* Countdown Timer */}
        <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-[#1A5F9E] mb-6">
          <CardContent className="p-6 text-center">
            <Clock className="w-12 h-12 mx-auto mb-4 text-[#1A5F9E]" />
            <p className="text-sm text-slate-300 mb-2">Your inspection starts in</p>
            <p className="text-4xl font-mono font-bold text-[#1A5F9E]">{formatTime(timeLeft)}</p>
          </CardContent>
        </Card>

        {/* Preparation Checklist */}
        <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-[#1A5F9E]">Preparation Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
              <span className="text-sm">Have commercial invoice ready</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
              <span className="text-sm">Ensure good internet connection</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
              <span className="text-sm">Prepare identification</span>
            </div>
          </CardContent>
        </Card>

        {/* Test Connection Button */}
        <Button 
          onClick={() => setConnectionTested(true)}
          className={`w-full h-12 text-lg font-semibold transition-all duration-300 ${
            connectionTested 
              ? 'bg-[#4CAF50] hover:bg-[#45a049] border-[#4CAF50]' 
              : 'bg-[#1A5F9E] hover:bg-[#145080] border-[#1A5F9E]'
          }`}
        >
          <Wifi className="w-5 h-5 mr-2" />
          {connectionTested ? 'Connection Tested ✓' : 'Test Connection'}
        </Button>

        {/* Start Session Button */}
        <Button 
          onClick={() => setSessionState('live-session')}
          className="w-full h-12 mt-4 bg-gradient-to-r from-[#1A5F9E] to-[#2d7bc7] hover:from-[#145080] hover:to-[#1A5F9E] text-lg font-semibold"
          disabled={timeLeft > 0}
        >
          Enter Session
        </Button>
      </div>
    </div>
  );

  const renderLiveSession = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 border-b border-[#1A5F9E]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">LIVE SESSION</span>
          </div>
          <div className="text-sm text-slate-300">ID: #AJ-2024-001</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Video Feed */}
        <div className="flex-1 p-4">
          <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg border border-[#1A5F9E] overflow-hidden">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-16 h-16 mx-auto mb-4 text-[#1A5F9E]" />
                <p className="text-lg font-semibold">Live Video Feed</p>
                <p className="text-sm text-slate-300 mt-2">Inspection in progress...</p>
              </div>
            </div>
            {/* Overlay Elements */}
            <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-full text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>HD Quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recognition Sidebar */}
        <div className="w-full lg:w-80 p-4">
          <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-[#1A5F9E] h-full">
            <CardHeader>
              <CardTitle className="text-lg text-[#1A5F9E]">AI Recognition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {inspectionItems.map(item => (
                <div key={item.id} className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.name}</span>
                    {item.status === 'cleared' && <CheckCircle className="w-4 h-4 text-[#4CAF50]" />}
                    {item.status === 'pending' && <AlertTriangle className="w-4 h-4 text-[#FFC107]" />}
                    {item.status === 'violation' && <XCircle className="w-4 h-4 text-[#F44336]" />}
                  </div>
                  <p className="text-xs text-slate-300">{item.description}</p>
                  {item.status === 'violation' && (
                    <Button size="sm" variant="outline" className="mt-2 text-xs border-[#F44336] text-[#F44336]">
                      Dispute
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Communication Bar */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 border-t border-[#1A5F9E]">
        <div className="flex items-center justify-center space-x-4">
          <Button
            onClick={() => setIsMicOn(!isMicOn)}
            size="sm"
            className={`${isMicOn ? 'bg-[#4CAF50]' : 'bg-slate-600'} hover:bg-[#45a049]`}
          >
            {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </Button>
          <Button size="sm" variant="outline" className="border-[#1A5F9E]">
            <Eye className="w-4 h-4 mr-2" />
            Request Close-up
          </Button>
          <Button size="sm" variant="outline" className="border-[#1A5F9E]">
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
          <Button 
            onClick={() => setSessionState('post-session')}
            size="sm" 
            className="bg-[#F44336] hover:bg-[#d32f2f]"
          >
            End Session
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPostSession = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/ebadb452-554b-45e6-a769-9ade4abcdf87.png" 
            alt="Ajman Port Logo" 
            className="h-20 mx-auto mb-4"
          />
          <h1 className="text-xl font-bold text-[#1A5F9E]">Inspection Complete</h1>
        </div>

        {/* Result Banner */}
        <Card className="bg-gradient-to-r from-[#FFC107] to-[#ff9800] border-[#FFC107] mb-6">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-slate-800" />
            <h2 className="text-xl font-bold text-slate-800 mb-2">Partial Confiscation</h2>
            <p className="text-sm text-slate-700">Some items require further processing</p>
          </CardContent>
        </Card>

        {/* Download Section */}
        <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-[#1A5F9E]">Download Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600">
              <Download className="w-4 h-4 mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium">Full Inspection Report</p>
                <p className="text-xs text-slate-300">PDF • 2.4 MB</p>
              </div>
            </Button>
            <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600">
              <Download className="w-4 h-4 mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium">Customs Certificate</p>
                <p className="text-xs text-slate-300">PDF • 1.1 MB</p>
              </div>
            </Button>
            <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600">
              <Download className="w-4 h-4 mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium">Session Recording</p>
                <p className="text-xs text-slate-300">MP4 • 24.7 MB</p>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          <Button 
            className="w-full bg-[#1A5F9E] hover:bg-[#145080] h-12"
            onClick={() => setSessionState('pre-session')}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Request Re-Inspection
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-slate-600 text-slate-300 h-12"
            onClick={() => setSessionState('pre-session')}
          >
            Return to Lobby
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {sessionState === 'pre-session' && renderPreSession()}
      {sessionState === 'live-session' && renderLiveSession()}
      {sessionState === 'post-session' && renderPostSession()}
    </div>
  );
};

export default InspectionInterface;
