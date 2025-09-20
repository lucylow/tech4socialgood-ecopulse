'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader2, Play, RefreshCw, AlertCircle } from 'lucide-react';

interface LovableStatus {
  connection: boolean;
  project: boolean;
  deployment: any;
  error?: string;
}

export default function LovableAdmin() {
  const [status, setStatus] = useState<LovableStatus>({
    connection: false,
    project: false,
    deployment: null
  });
  const [loading, setLoading] = useState(false);
  const [deploying, setDeploying] = useState(false);

  const checkStatus = async () => {
    setLoading(true);
    try {
      // Test connection
      const connectionResponse = await fetch('/api/lovable?action=test');
      const connectionResult = await connectionResponse.json();
      
      // Get project info
      const projectResponse = await fetch('/api/lovable?action=project');
      const projectResult = await projectResponse.json();
      
      // Get deployment status
      const deploymentResponse = await fetch('/api/lovable?action=status');
      const deploymentResult = await deploymentResponse.json();

      setStatus({
        connection: connectionResult.success,
        project: projectResult.success,
        deployment: deploymentResult.success ? deploymentResult.data : null,
        error: connectionResult.error || projectResult.error || deploymentResult.error
      });
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to check status'
      }));
    } finally {
      setLoading(false);
    }
  };

  const deployToLovable = async () => {
    setDeploying(true);
    try {
      const response = await fetch('/api/lovable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'deploy' })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Refresh status after deployment
        setTimeout(checkStatus, 2000);
      } else {
        setStatus(prev => ({
          ...prev,
          error: result.error
        }));
      }
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Deployment failed'
      }));
    } finally {
      setDeploying(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Lovable AI Integration</h2>
        <button
          onClick={checkStatus}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-3">
            {status.connection ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span className="text-white font-medium">API Connection</span>
          </div>
          <span className={`px-2 py-1 rounded text-sm ${
            status.connection 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {status.connection ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        {/* Project Status */}
        <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-3">
            {status.project ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span className="text-white font-medium">Project Access</span>
          </div>
          <span className={`px-2 py-1 rounded text-sm ${
            status.project 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {status.project ? 'Accessible' : 'No Access'}
          </span>
        </div>

        {/* Deployment Status */}
        {status.deployment && (
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-white font-medium">Latest Deployment</span>
            </div>
            <div className="text-sm text-gray-300">
              <p>Status: <span className="text-green-400">{status.deployment.status}</span></p>
              {status.deployment.url && (
                <p>URL: <a href={status.deployment.url} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{status.deployment.url}</a></p>
              )}
              {status.deployment.createdAt && (
                <p>Deployed: {new Date(status.deployment.createdAt).toLocaleString()}</p>
              )}
            </div>
          </div>
        )}

        {/* Error Display */}
        {status.error && (
          <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-400 font-medium">Error</p>
              <p className="text-red-300 text-sm mt-1">{status.error}</p>
            </div>
          </div>
        )}

        {/* Deploy Button */}
        <button
          onClick={deployToLovable}
          disabled={deploying || !status.connection || !status.project}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
        >
          {deploying ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Deploying to Lovable...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Deploy to Lovable
            </>
          )}
        </button>

        {/* Setup Instructions */}
        {(!status.connection || !status.project) && (
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h3 className="text-yellow-400 font-medium mb-2">Setup Required</h3>
            <div className="text-yellow-300 text-sm space-y-1">
              <p>1. Get your API key from <a href="https://lovable.dev" className="underline hover:text-yellow-200" target="_blank" rel="noopener noreferrer">Lovable.dev</a></p>
              <p>2. Create a <code className="bg-yellow-500/20 px-1 rounded">.env.local</code> file in the nextjs-app directory</p>
              <p>3. Add: <code className="bg-yellow-500/20 px-1 rounded">LOVABLE_API_KEY=your_key_here</code></p>
              <p>4. Add: <code className="bg-yellow-500/20 px-1 rounded">LOVABLE_PROJECT_ID=your_project_id</code></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
