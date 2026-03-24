const https = require('https');
const fs = require('fs');
const path = require('path');

const screens = [
  {
    name: "community-hub",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2Y4Y2QwYmJhM2ZhNjQwZDJiMTU1MWQ5ZTdmYmE5NGY2EgsSBxCD08PAtBsYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTA1MjAyMjQ0NDY0Mjc4NzcxMg&filename=&opi=89354086",
    file: "src/app/features/admin/community-hub/community-hub.html"
  },
  {
    name: "approvals",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzMwNjE4Y2ZiMmFlNTQwMTRiMGQwODYwMjQ2NWMzNTI3EgsSBxCD08PAtBsYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTA1MjAyMjQ0NDY0Mjc4NzcxMg&filename=&opi=89354086",
    file: "src/app/features/admin/approvals/approvals.html"
  },
  {
    name: "advertisements",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzBiMDYzNTYxZjgzMzQzN2I4Y2ZjOTIxYmIxNjVlNzVlEgsSBxCD08PAtBsYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTA1MjAyMjQ0NDY0Mjc4NzcxMg&filename=&opi=89354086",
    file: "src/app/features/admin/advertisements/advertisements.html"
  },
  {
    name: "platform-stats",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2ZlMDRjODZhMjJlYjQwYTM5YjJmNWY4NWRlYzc1NDU1EgsSBxCD08PAtBsYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTA1MjAyMjQ0NDY0Mjc4NzcxMg&filename=&opi=89354086",
    file: "src/app/features/admin/platform-stats/platform-stats.html"
  },
  {
    name: "security-logs",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzQ1ZmY1ZTVjMjhjZTQzNDg4Y2RjZGNlZTdiNjFjYmRhEgsSBxCD08PAtBsYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTA1MjAyMjQ0NDY0Mjc4NzcxMg&filename=&opi=89354086",
    file: "src/app/features/admin/security-logs/security-logs.html"
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      // follow redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return resolve(downloadFile(response.headers.location, dest));
      }
      
      let data = '';
      response.on('data', chunk => {
        data += chunk;
      });
      response.on('end', () => {
        // Strip the wrapping ```html and ``` if present, or just dump as is.
        // Actually it's probably just the raw HTML.
        fs.writeFileSync(path.resolve(__dirname, dest), data, 'utf8');
        console.log(`Downloaded ${dest}`);
        resolve();
      });
    }).on('error', err => reject(err));
  });
}

async function run() {
  for (const screen of screens) {
    if (fs.existsSync(path.resolve(__dirname, screen.file))) {
      await downloadFile(screen.url, screen.file);
    } else {
      console.log(`File does not exist: ${screen.file}`);
    }
  }
}

run().catch(console.error);
