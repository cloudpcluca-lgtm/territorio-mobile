export async function onRequest({request,env,params}) {
 const headers={'content-type':'application/json; charset=utf-8','cache-control':'no-store'};
 const respond=(data,status=200)=>new Response(JSON.stringify(data),{status,headers});
 if(!env.DB)return respond({error:'Banco D1 não configurado. Vincule DB nas configurações do Pages.'},503);
 const id=String(params.id||'');if(!/^[a-z0-9_-]{1,60}$/.test(id))return respond({error:'Código de sala inválido'},400);
 try{
  if(request.method==='GET'){
   const row=await env.DB.prepare('SELECT content,revision FROM rooms WHERE id=?').bind(id).first();
   return respond(row?{exists:true,entries:JSON.parse(row.content),revision:row.revision}:{exists:false,entries:[],revision:0});
  }
  if(request.method==='PUT'){
   const body=await request.json();const entries=body.entries;
   if(!Array.isArray(entries)||entries.length>500||JSON.stringify(entries).length>100000||!entries.every(x=>typeof x.name==='string'&&x.name.length<=100&&Number.isInteger(x.count)&&x.count>=0&&x.count<=99))return respond({error:'Lista inválida ou muito grande'},400);
   const expected=Number(body.revision);
   if(!Number.isSafeInteger(expected)||expected<0)return respond({error:'Revisão inválida'},400);
   if(expected===0){const result=await env.DB.prepare('INSERT OR IGNORE INTO rooms (id,content,revision) VALUES (?,?,1)').bind(id,JSON.stringify(entries)).run();if(result.meta.changes)return respond({revision:1});}
   const result=await env.DB.prepare('UPDATE rooms SET content=?,revision=revision+1 WHERE id=? AND revision=?').bind(JSON.stringify(entries),id,expected).run();
   if(!result.meta.changes)return respond({error:'Outra pessoa alterou a lista. Clique em Atualizar sala antes de salvar novamente.'},409);
   return respond({revision:expected+1});
  }
  return respond({error:'Método não permitido'},405);
 }catch(e){return respond({error:'Erro no banco de dados: '+e.message},500)}
}
