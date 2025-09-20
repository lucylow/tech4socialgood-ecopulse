import { NextRequest, NextResponse } from 'next/server';
import { lovableClient } from '@/lib/lovable';

/**
 * Lovable API Integration Routes
 * Handles Lovable platform integration and deployment
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'test':
        const testResult = await lovableClient.testConnection();
        return NextResponse.json(testResult);

      case 'project':
        const projectResult = await lovableClient.getProjectInfo();
        return NextResponse.json(projectResult);

      case 'status':
        const statusResult = await lovableClient.getDeploymentStatus();
        return NextResponse.json(statusResult);

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action. Supported actions: test, project, status'
        }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    switch (action) {
      case 'deploy':
        const deployResult = await lovableClient.deployProject();
        return NextResponse.json(deployResult);

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action. Supported actions: deploy'
        }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
