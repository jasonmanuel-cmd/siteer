import { scanWebsite } from '../lib/scanner';
scanWebsite('https://siteer.dev').then(report => console.log(JSON.stringify(report, null, 2))).catch(error => { console.error(error.message); process.exitCode = 1; });
