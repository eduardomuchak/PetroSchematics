export const regexRemoverCaracteresEspeciais = (stringToReplace: string) =>
  stringToReplace.replace(/[§ª°º`´¨~!@#$%^&*()_|+=?;:'".,<>{}[]\]*/gi, '');

export const regexRemoverCaracteresEspeciaisENumeros = (stringToReplace: string) =>
  stringToReplace.replace(/[1234567890§ª°º`´¨~!@#$%^&*()/_|+=?;:'",.<>{}[]\]*/gi, '');

export const regexSomenteNumeros = (stringToReplace: string) =>
  // .match(/[0-9]+/g).join([]);
  stringToReplace.replace(/\D/g, '');

export const regexSomenteNumerosMonetario = (stringToReplace: string | undefined | null) =>
  stringToReplace ? stringToReplace.replace(/\D/g, '') : null;

export const regexCnpj = (stringToReplace: string | undefined | null) =>
  stringToReplace
    ? stringToReplace

        .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
        .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') // captura os dois últimos 2 números, com um - antes dos dois números
    : null;

export const regexPolegadas = (stringToReplace: string | any) =>
  // Caracteres permitidos:
  // 0-9 (números)
  // / (barra)
  // " (aspas duplas)
  // . (ponto)
  stringToReplace.replace(/[a-z]/gi, '').replace(/[§ª°º`´¨~!@#$%^&*()_|+=?;:',<>{}[]\]*/gi, '');

export const regexEquipamentosPocos = (stringToReplace: string | any) =>
  // Caracteres especiais permitidos:
  // / (barra)
  // " (aspas duplas)
  // . (ponto)
  stringToReplace.replace(/[§ª°º`´¨~!@#$%^&*()_|+=?;:',<>{}[]\]*/gi, '');
