// pages/api/organizations.ts
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path';

export async function GET(req: NextRequest) {
  // Read organizations from JSON file
  const data = fs.readFileSync(path.resolve(process.cwd(), 'src/app/api/organizations/organizations.json'), 'utf8');
  const organizations = JSON.parse(data);

  return NextResponse.json(organizations);
}