/**
 * Lovable AI Integration Helper
 * This file provides utilities for integrating with Lovable AI platform
 */

interface LovableConfig {
  apiKey: string;
  projectId: string;
  baseUrl: string;
}

interface LovableResponse {
  success: boolean;
  data?: any;
  error?: string;
}

class LovableClient {
  private config: LovableConfig;

  constructor() {
    this.config = {
      apiKey: process.env.LOVABLE_API_KEY || '',
      projectId: process.env.LOVABLE_PROJECT_ID || '',
      baseUrl: 'https://api.lovable.dev/v1'
    };
  }

  /**
   * Test connection to Lovable API
   */
  async testConnection(): Promise<LovableResponse> {
    try {
      if (!this.config.apiKey) {
        return {
          success: false,
          error: 'LOVABLE_API_KEY not configured'
        };
      }

      const response = await fetch(`${this.config.baseUrl}/health`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        return {
          success: true,
          data: { status: 'connected' }
        };
      } else {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get project information
   */
  async getProjectInfo(): Promise<LovableResponse> {
    try {
      if (!this.config.apiKey || !this.config.projectId) {
        return {
          success: false,
          error: 'LOVABLE_API_KEY and LOVABLE_PROJECT_ID must be configured'
        };
      }

      const response = await fetch(`${this.config.baseUrl}/projects/${this.config.projectId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          data
        };
      } else {
        return {
          success: false,
          error: data.message || `HTTP ${response.status}`
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Deploy project to Lovable
   */
  async deployProject(): Promise<LovableResponse> {
    try {
      if (!this.config.apiKey || !this.config.projectId) {
        return {
          success: false,
          error: 'LOVABLE_API_KEY and LOVABLE_PROJECT_ID must be configured'
        };
      }

      const response = await fetch(`${this.config.baseUrl}/projects/${this.config.projectId}/deploy`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          data
        };
      } else {
        return {
          success: false,
          error: data.message || `HTTP ${response.status}`
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get deployment status
   */
  async getDeploymentStatus(): Promise<LovableResponse> {
    try {
      if (!this.config.apiKey || !this.config.projectId) {
        return {
          success: false,
          error: 'LOVABLE_API_KEY and LOVABLE_PROJECT_ID must be configured'
        };
      }

      const response = await fetch(`${this.config.baseUrl}/projects/${this.config.projectId}/deployments/latest`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          data
        };
      } else {
        return {
          success: false,
          error: data.message || `HTTP ${response.status}`
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Export singleton instance
export const lovableClient = new LovableClient();

// Export utility functions
export const testLovableConnection = () => lovableClient.testConnection();
export const getLovableProjectInfo = () => lovableClient.getProjectInfo();
export const deployToLovable = () => lovableClient.deployProject();
export const getLovableDeploymentStatus = () => lovableClient.getDeploymentStatus();

// Export types
export type { LovableConfig, LovableResponse };
