import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
    console.log('Creating new organization');
    const newOrganization = await req.json();

    // Read the existing organizations
    const organizationsPath = path.resolve(process.cwd(), 'src/app/api/organizations/organizations.json');
    const organizationsData = fs.readFileSync(organizationsPath, 'utf-8');
    const organizations = JSON.parse(organizationsData);

    // Add the new organization to the array
    organizations.push(newOrganization);

    // Write the updated array back to the file
    fs.writeFileSync(organizationsPath, JSON.stringify(organizations, null, 2));

    return NextResponse.json({ status: 'success', message: 'Organization added successfully' });
}