test('Administrador não consegue subir edital com arquivo não-PDF', async () => {
  await page.goto('https://trampolim.com.br/login');
  await page.type('#email', 'administrador@gmail.com');
  await page.type('#password', 'adm06');
  await page.click('#login-button');

  await page.waitForSelector('#gestao-editais');
  await page.click('#gestao-editais');
  await page.click('#novo-edital');

  await page.type('#titulo', 'Edital Teste');
  await page.type('#descricao', 'Descrição de teste');

  const filePath = '/path/para/arquivo-invalido.docx';
  const input = await page.$('input[type="file"]');
  await input.uploadFile(filePath);

  await page.click('#btn-submeter-edital');

  const erro = await page.$eval('.mensagem-erro', el => el.textContent);
  expect(erro).toMatch(/apenas arquivos pdf/i);
});
