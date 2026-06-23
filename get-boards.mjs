const token = process.argv[2];

if (!token) {
  console.log("Please provide your Pinterest Access Token.");
  console.log("Usage: node get-boards.mjs YOUR_ACCESS_TOKEN");
  process.exit(1);
}

async function getBoards() {
  console.log("Fetching your Pinterest boards...");
  try {
    const res = await fetch('https://api.pinterest.com/v5/boards', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error from Pinterest API:", data);
      return;
    }

    if (data.items && data.items.length > 0) {
      console.log("\n✅ Found your boards!\n");
      data.items.forEach(board => {
        console.log(`Board Name: "${board.name}"`);
        console.log(`Board ID:   ${board.id}`);
        console.log("-".repeat(40));
      });
    } else {
      console.log("No boards found. Are you sure you created them on this account?");
    }
  } catch (err) {
    console.error("Network Error:", err);
  }
}

getBoards();
