test('Empreendedor não pode adicionar mais de 4 membros na equipe', async () => {
  await page.goto('https://trampolim.com.br/login');
  await page.type('#email', 'empreendedor@gmail.com');
  await page.type('#password', 'empreendedor1');
  await page.click('#login-button');

  await page.waitForSelector('#criar-equipe');
  await page.click('#criar-equipe');

  const emails = ['a@a.com', 'b@b.com', 'c@c.com', 'd@d.com'];

  for (const email of emails) {
    await page.type('.input-membro', email);
    await page.click('#btn-adicionar-membro');
    await page.waitForTimeout(500); // aguarda resposta do sistema
  }

  await page.type('.input-membro', 'e@e.com');
  await page.click('#btn-adicionar-membro');

  const erro = await page.$eval('.mensagem-erro', el => el.textContent);
  expect(erro).toMatch(/limite.*4/i);
});
