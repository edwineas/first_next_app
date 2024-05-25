import { NextRequest, NextResponse } from 'next/server'
import { organizations } from '../organizations'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
    console.log('Creating new organization');
    const newOrganization = await req.json();
    organizations.push(newOrganization);
    fs.writeFileSync(path.resolve(process.cwd(), 'src/app/api/organizations/organizations.json'), JSON.stringify(organizations, null, 2));
    return NextResponse.json({ status: 'success', message: 'Organization added successfully' });
}