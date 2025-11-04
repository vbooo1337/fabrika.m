import fetch from 'node-fetch';

const OWNER = 'vbooo1337';
const REPO = 'fabrika.m';
const PATH = 'shift.json';
const BRANCH = 'main';
const TOKEN = process.env.GITHUB_TOKEN;

export default async function handler(req,res){
  try{
    const { shift, sha } = req.body;
    const body = {
      message: 'Обновление смены',
      content: Buffer.from(JSON.stringify(shift,null,2)).toString('base64'),
      sha,
      branch: BRANCH
    };
    const r = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`, {
      method:'PUT',
      headers:{ Authorization:`token ${TOKEN}`, 'Content-Type':'application/json' },
      body: JSON.stringify(body)
    });
    const data = await r.json();
    if(data.content && data.content.sha) res.json({ message:'Сохранено!', sha:data.content.sha });
    else res.status(400).json({ error: JSON.stringify(data) });
  }catch(e){ res.status(500).json({ error: e.message }); }
}