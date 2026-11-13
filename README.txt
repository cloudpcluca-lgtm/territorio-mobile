TERRITÓRIO MOBILE — CLOUDFLARE PAGES

1. IMPORTANTE: Para publicar o site com reconhecimento de imagens, a pasta deve ser implantada com suporte a Pages Functions. A opção de upload direto de arquivos no painel do Pages pode não publicar a pasta functions corretamente. Recomenda-se criar um repositório GitHub com o conteúdo desta pasta e conectar o repositório ao Cloudflare Pages (sem comando de build; diretório de saída: / ou .).

2. O site e o OCR funcionam no Pages sem banco. O reconhecimento usa Tesseract.js via CDN e precisa de internet; o reconhecimento de ❌ em prints pode ser imperfeito e sempre deve ser conferido.

3. PARA COMPARTILHAR ENTRE PESSOAS:
- Cloudflare Dashboard > Workers & Pages > D1 > Create database; nome sugerido: territorio-db.
- No console do banco D1, execute o SQL do arquivo schema.sql.
- Abra o projeto Pages > Settings > Bindings > Add > D1 database.
- Nome da variável: DB (exatamente maiúsculo). Escolha territorio-db.
- Faça um novo deploy após adicionar o binding.
- No site, escolha um código de sala longo e difícil de adivinhar. Compartilhe o link somente com pessoas autorizadas. Qualquer pessoa com o link pode ler e editar. Não há login, histórico nem recuperação de alterações.

4. ARQUIVOS:
- index.html: interface mobile, reconhecimento OCR, listas, cópia e edição.
- functions/api/room/[id].js: API compartilhada.
- schema.sql: estrutura do banco.

5. TESTE: No celular abra o site publicado em HTTPS. Se o botão Colar não funcionar, use Escolher foto. O Safari e o WhatsApp podem restringir a área de transferência de imagens.

6. Segurança: o código da sala funciona como chave de acesso. Não use para informações pessoais ou sensíveis. O banco é compartilhado entre navegadores. O modo local salva somente no navegador do dispositivo.
