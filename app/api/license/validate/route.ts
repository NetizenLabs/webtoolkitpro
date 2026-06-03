import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { licenseKey, hardwareId } = body;

    if (!licenseKey || !hardwareId) {
      return NextResponse.json({ valid: false, error: "Missing licenseKey or hardwareId" }, { status: 400 });
    }

    const apiKey = process.env.WHOP_API_KEY;
    if (!apiKey) {
      console.error("WHOP_API_KEY is not configured on the server.");
      return NextResponse.json({ valid: false, error: "Server configuration error" }, { status: 500 });
    }

    // Call the Whop API to validate the license
    const response = await fetch(`https://api.whop.com/api/v2/memberships/${licenseKey}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error("Whop API Error:", response.status, err);
      return NextResponse.json({ valid: false, error: "Invalid License Key" }, { status: 403 });
    }

    const membership = await response.json();

    // Check if membership is active
    if (membership.status !== 'active') {
      return NextResponse.json({ valid: false, error: "Membership is not active." }, { status: 403 });
    }

    // Hardware ID locking logic
    const existingHardwareId = membership.metadata?.hardware_id;
    let allowedDevices = 1; // Default
    
    // Determine limit based on product type (assuming "pro" is in the plan name or product name)
    const productName = membership.product?.name?.toLowerCase() || "";
    if (productName.includes("pro")) {
      allowedDevices = 5;
    } else if (productName.includes("enterprise")) {
      allowedDevices = 9999; // Unlimited
    }

    // Parse existing devices
    let devices: string[] = [];
    if (existingHardwareId) {
        try {
            devices = JSON.parse(existingHardwareId);
        } catch(e) {
            devices = [existingHardwareId];
        }
    }

    if (!devices.includes(hardwareId)) {
        if (devices.length >= allowedDevices) {
            return NextResponse.json({ valid: false, error: `Device limit reached (${allowedDevices} max).` }, { status: 403 });
        }
        
        // Add new device
        devices.push(hardwareId);
        
        // Update membership metadata in Whop
        await fetch(`https://api.whop.com/api/v2/memberships/${licenseKey}`, {
            method: 'POST', // or PATCH depending on Whop's metadata update
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                metadata: {
                    hardware_id: JSON.stringify(devices)
                }
            })
        });
    }

    return NextResponse.json({ 
        valid: true, 
        tier: productName.includes("enterprise") ? "enterprise" : "pro",
        devices: devices.length
    });

  } catch (error) {
    console.error("License validation failed:", error);
    return NextResponse.json({ valid: false, error: "Internal server error" }, { status: 500 });
  }
}
