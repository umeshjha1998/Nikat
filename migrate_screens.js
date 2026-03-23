const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = 'e:/My folder/Education/Git/Nikat/Manually Added files';
const frontendDir = 'e:/My folder/Education/Git/Nikat/frontend';
const appDir = path.join(frontendDir, 'src/app');

const dirs = fs.readdirSync(sourceDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

dirs.forEach(screenName => {
   const htmlPath = path.join(sourceDir, screenName, 'code.html');
   if(!fs.existsSync(htmlPath)) {
      console.log(`Skipping ${screenName}: code.html not found`);
      return;
   }
   
   const compName = screenName.replace(/_/g, '-');
   let moduleFolder = 'shared';
   
   if (screenName.includes('login') || screenName.includes('password') || screenName.includes('otp') || screenName.includes('registration')) {
       moduleFolder = 'auth';
   } else if (screenName.includes('admin') || screenName.includes('manage_') || screenName.includes('security_') || screenName.includes('platform_')) {
       moduleFolder = 'admin';
   } else if (screenName.includes('community') || screenName.includes('review') || screenName.includes('horizon')) {
       moduleFolder = 'community';
   } else if (screenName.includes('shop_owner') || screenName.includes('service_provider') || screenName.includes('time_based_rates')) {
       moduleFolder = 'user-dashboard';
   } else if (screenName.includes('search') || screenName.includes('browse')) {
       moduleFolder = 'search';
   } else if (screenName.includes('homepage')) {
       moduleFolder = 'home';
   }
   
   const componentPath = `${moduleFolder}/${compName}`;
   
   console.log(`Generating ${componentPath}...`);
   try {
     execSync(`npx ng generate component ${componentPath} --style=scss --skip-tests`, { cwd: frontendDir, stdio: 'ignore' });
   } catch (e) { 
     console.error(`Error generating ${componentPath}`); 
   }

   const content = fs.readFileSync(htmlPath, 'utf8');
   
   const bodyStart = content.indexOf('<body');
   const bodyEnd = content.indexOf('</body>');
   if (bodyStart === -1 || bodyEnd === -1) return;
   
   const bodyClosingBracket = content.indexOf('>', bodyStart);
   const bodyContent = content.substring(bodyClosingBracket + 1, bodyEnd);
   
   let styleContent = '';
   const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
   if (styleMatch) styleContent = styleMatch[1];
   
   const destHtml = path.join(appDir, moduleFolder, compName, `${compName}.component.html`);
   const destScss = path.join(appDir, moduleFolder, compName, `${compName}.component.scss`);
   
   if (fs.existsSync(destHtml)) {
       fs.writeFileSync(destHtml, bodyContent);
       fs.writeFileSync(destScss, styleContent);
   } else {
       console.log(`Warning: files for ${compName} not found at expected path.`);
   }
});
console.log('Migration complete!');
