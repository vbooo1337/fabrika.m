import fetch from 'node-fetch';

const OWNER = 'vbooo1337';
const REPO = 'fabrika.m';
const PATH = 'shift.json';
const BRANCH = 'main';
const TOKEN = process.env.GITHUB_TOKEN;

export default async function handler(req,res){
  try{
    const r = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}?ref=${BRANCH}`, {
      headers:{ Authorization: `token ${TOKEN}` }
    });
    const data = await r.json();
    if(data.content){
      const shift = JSON.parse(Buffer.from(data.content,'base64').toString());
      res.json({ shift, sha: data.sha });
    } else res.status(404).json({ error: 'Файл не найден' });
  }catch(e){ res.status(500).json({ error: e.message }); }
}