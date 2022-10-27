/* eslint-disable prettier/prettier */
export const emailTestResult = (
  name: string,
  role: string,
  emote: string,
  message: string,
  approved: string,
) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Test Template Email</title>
        <style>
          body {
            margin: 0;
            background-color: #ffff;
          }

          table {
            border-spacing: 0;
          }

          td {
            padding: 0;
          }

          img {
            border: 0;
          }

          .wrapper {
            display: table;
            table-layout: fixed;
            width: 100%;
            background-image: url("https://i.ibb.co/xJwbFmd/fundo-email.png");

          }

          .logo {
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
          }

          .main {
            background-color: #ffff;
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
            font-family: sans-serif;
            color: #171a17;
          }

            a:link,
            #button-dark {
            display: block;
            background-color: #4E2096;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-weight: bold;
          }

        </style>
      </head>
      <body>
        <div class="wrapper">

          <!-- Petlove Logo -->
          <table class="logo">
            <tr>
                <td style="text-align: center;">
                    <img src="https://i.ibb.co/R0gGJhz/petlove.png" alt="" width="310px">
                </td>
            </tr>
          </table>

          <table class="main">

            <!-- Border Top -->
            <tr>
              <td height="8px" style="background-color: #DF3C7C"></td>
            </tr>


            <!-- Main -->
            <tr>
                <td style="padding: 15px 0 50px;">
                    <table width="100%">
                        <tr>
                            <td style="text-align: center;padding: 15px">

                                <p style="font-size: 20px;font-weight: bold;">Temos uma mensagem para você.</p>
                                <hr />
                                <p style="line-height: 23px;padding: 5px 0 15px;text-align: left;font-weight: bold; font-size: large;">Olá, ${name}!</p>
                                <p style="text-align: justify;">Gostaríamos de informar que o seu teste “Self Awareness” foi concluído com sucesso. O resultado do seu teste foi:</p>
                                <p style="text-align: justify; font-size: large;">Função definida: <strong>${role}</strong>.</p>
                                <p style="text-align: justify; font-size: large;">Aprovado? <strong>${approved}. ${emote}</strong></p>
                                <p style="text-align: justify; font-size: large;"><strong>${message}</strong></p>
                                <img src="https://i.ibb.co/z4K5H5j/pets.png" alt="">
                                <p style="text-align: justify;">Até lá, parabenizamos sua iniciativa e intento em progredir em sua carreira como dev e desejamos boa sorte em futuras conquistas.</p>
                                <a href="${process.env.URL_HISTORY}" id="button-dark">Acesse aqui!</a>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="background-color: #26292b">
                    <table width="100%">
                        <tr>
                            <td style="text-align: center;padding: 45px 20px;color: #ffffff">
                                <p style="padding: 10px;">SUBSCRIBE</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

          </table>
        </div>
      </body>
    </html>

    `;
};

export const emailVerify = (id: string, name: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Test Template Email</title>
      <style>
        body {
          margin: 0;
          background-color: #ffff;
        }

        table {
          border-spacing: 0;
        }

        td {
          padding: 0;
        }

        img {
          border: 0;
        }

        .wrapper {
          display: table;
          table-layout: fixed;
          width: 100%;
          background-image: url("https://i.ibb.co/xJwbFmd/fundo-email.png");
        }

        .logo {
          margin: 0 auto;
          width: 100%;
          max-width: 600px;
          border-spacing: 0;
        }

        .main {
          background-color: #ffff;
          margin: 0 auto;
          width: 100%;
          max-width: 600px;
          border-spacing: 0;
          font-family: sans-serif;
          color: #171a17;
        }

        a:link,
        #button-dark {
          display: block;
          background-color: #4e2096;
          color: #ffffff;
          text-decoration: none;

          padding: 12px 20px;
          border-radius: 5px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <!-- Petlove Logo -->
        <table class="logo">
          <tr>
            <td style="text-align: center">
              <img
                src="https://i.ibb.co/R0gGJhz/petlove.png"
                alt=""
                width="310px"
              />
            </td>
          </tr>
        </table>

        <table class="main">
          <!-- Border Top -->
          <tr>
            <td height="8px" style="background-color: #df3c7c"></td>
          </tr>

          <!-- Main -->
          <tr>
            <td style="padding: 15px 0 50px">
              <table width="100%">
                <tr>
                  <td style="text-align: center; padding: 15px">
                    <p style="font-size: 20px; font-weight: bold">
                      Verifique sua conta.
                    </p>
                    <hr />
                    <p
                      style="
                        line-height: 23px;
                        padding: 5px 0 15px;
                        text-align: left;
                        font-weight: bold;
                        font-size: large;
                      "
                    >
                      Olá, ${name}!
                    </p>
                    <p style="text-align: justify">
                      Bem-vindo(a) à nossa plataforma. Para prosseguirmos é
                      preciso verificar sua conta. Clique no botão abaixo para
                      continuar.
                    </p>
                    <img src="https://i.ibb.co/z4K5H5j/pets.png" alt="" />
                    <a
                      href="${process.env.URL_VERIFY}/${id}"
                      id="button-dark"
                      >Acesse aqui!</a

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #26292b">
              <table width="100%">
                <tr>
                  <td
                    style="text-align: center; padding: 45px 20px; color: #ffffff"
                  >
                    <p style="padding: 10px">SUBSCRIBE</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>

    `;
};

export const emailChangePassword = (
  id: string,
  tokenToUrl: string,
  name: string,
) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Test Template Email</title>
        <style>
          body {
            margin: 0;
            background-color: #ffff;
          }

          table {
            border-spacing: 0;
          }

          td {
            padding: 0;
          }

          img {
            border: 0;
            margin: 10px auto;
          }

          .wrapper {
            display: table;
            table-layout: fixed;
            width: 100%;
            background-image: url("https://i.ibb.co/xJwbFmd/fundo-email.png");

          }

          .logo {
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
          }

          .main {
            background-color: #ffff;
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
            font-family: sans-serif;
            color: #171a17;
          }

            a:link,
            #button-dark {
            display: block;
            background-color: #4E2096;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-weight: bold;
          }

        </style>
      </head>
      <body>
        <div class="wrapper">

          <!-- Petlove Logo -->
          <table class="logo">
            <tr>
                <td style="text-align: center;">
                    <img src="https://i.ibb.co/R0gGJhz/petlove.png" alt="" width="310px">
                </td>
            </tr>
          </table>

          <table class="main">

            <!-- Border Top -->
            <tr>
              <td height="8px" style="background-color: #DF3C7C"></td>
            </tr>


            <!-- Main -->
            <tr>
                <td style="padding: 15px 0 50px;">
                    <table width="100%">
                        <tr>
                            <td style="text-align: center;padding: 15px">

                                <p style="font-size: 20px;font-weight: bold;">Redefina a sua senha!</p>
                                <hr />
                                <p style="line-height: 23px;padding: 5px 0 15px;text-align: left;font-weight: bold; font-size: large;">Olá, ${name}</p>
                                <p style="text-align: justify;">Estamos encaminhando o email para que você possa redefinir a sua senha de acesso à sua conta.</p>
                                <img src="https://i.ibb.co/z4K5H5j/pets.png" alt="">
                                <p style="text-align: justify;">Se você não solicitou uma redefinição de senha, você pode ignorar este email. Sua senha não será alterada.</p>
                                <a href="${process.env.URL_CHANGE}/${tokenToUrl}/${id}" id="button-dark">Mude sua senha!</a>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="background-color: #26292b">
                    <table width="100%">
                        <tr>
                            <td style="text-align: center;padding: 45px 20px;color: #ffffff">
                                <p style="padding: 10px;">SUBSCRIBE</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

          </table>
        </div>
      </body>
    </html>
    `;
};

export const emailConfirmChangePassword = (name: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Test Template Email</title>
        <style>
          body {
            margin: 0;
            background-color: #ffff;
          }

          table {
            border-spacing: 0;
          }

          td {
            padding: 0;
          }

          img {
            border: 0;
            margin: 10px auto;
          }

          .wrapper {
            display: table;
            table-layout: fixed;
            width: 100%;
            background-image: url("https://i.ibb.co/xJwbFmd/fundo-email.png");

          }

          .logo {
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
          }

          .main {
            background-color: #ffff;
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
            font-family: sans-serif;
            color: #171a17;
          }

            a:link,
            .button-dark {
            display: block;
            background-color: #4E2096;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-weight: bold;
          }

        </style>
      </head>
      <body>
        <div class="wrapper">

          <!-- Petlove Logo -->
          <table class="logo">
            <tr>
                <td style="text-align: center;">
                    <img src="https://i.ibb.co/R0gGJhz/petlove.png" alt="" width="310px">
                </td>
            </tr>
          </table>

          <table class="main">

            <!-- Border Top -->
            <tr>
              <td height="8px" style="background-color: #DF3C7C"></td>
            </tr>


            <!-- Main -->
            <tr>
                <td style="padding: 15px 0 50px;">
                    <table width="100%">
                        <tr>
                            <td style="text-align: center;padding: 15px">

                                <p style="font-size: 20px;font-weight: bold;">Senha redefinida com sucesso!</p>
                                <hr />
                                <p style="line-height: 23px;padding: 5px 0 15px;text-align: left;font-weight: bold; font-size: large;">Olá, ${name}</p>
                                <p style="text-align: justify;">Estamos encaminhando este email para notificar que sua senha foi alterada com sucesso!</p>
                                <img src="https://i.ibb.co/z4K5H5j/pets.png" alt="">
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="background-color: #26292b">
                    <table width="100%">
                        <tr>
                            <td style="text-align: center;padding: 45px 20px;color: #ffffff">
                                <p style="padding: 10px;">SUBSCRIBE</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

          </table>
        </div>
      </body>
    </html>
    `;
};

export const emailTestValidation = (name: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Test Template Email</title>
        <style>
          body {
            margin: 0;
            background-color: #ffff;
          }

          table {
            border-spacing: 0;
          }

          td {
            padding: 0;
          }

          img {
            border: 0;
          }

          .wrapper {
            display: table;
            table-layout: fixed;
            width: 100%;
            background-image: url("https://i.ibb.co/xJwbFmd/fundo-email.png");
          }

          .logo {
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
          }

          .main {
            background-color: #ffff;
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
            font-family: sans-serif;
            color: #171a17;
          }

            a:link,
            #button-dark {
            display: block;
            background-color: #4E2096;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-weight: bold;
          }

        </style>
      </head>
      <body>
        <div class="wrapper">

          <!-- Petlove Logo -->
          <table class="logo">
            <tr>
                <td style="text-align: center;">
                    <img src="https://i.ibb.co/R0gGJhz/petlove.png" alt="" width="310px">
                </td>
            </tr>
          </table>

          <table class="main">

            <!-- Border Top -->
            <tr>
              <td height="8px" style="background-color: #DF3C7C"></td>
            </tr>


            <!-- Main -->
            <tr>
                <td style="padding: 15px 0 50px;">
                    <table width="100%">
                        <tr>
                            <td style="text-align: center;padding: 15px">

                                <p style="font-size: 20px;font-weight: bold;">Temos uma mensagem para você.</p>
                                <hr />
                                <p style="line-height: 23px;padding: 5px 0 15px;text-align: left;font-weight: bold; font-size: large;">Olá, ${name}</p>
                                <p style="text-align: justify;">Gostaríamos de informar que recebemos seu teste “Self Awareness” e que já está sendo encaminhado para nosso gestor para avaliação.</p>
                                <img src="https://i.ibb.co/z4K5H5j/pets.png" alt="">
                                <p style="text-align: justify;">Até lá, parabenizamos sua iniciativa e intento em progredir em sua carreira como dev e desejamos boa sorte em futuras conquistas.</p>
                                <a href="${process.env.URL_HISTORY}" id="button-dark">Acesse aqui!</a>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="background-color: #26292b">
                    <table width="100%">
                        <tr>
                            <td style="text-align: center;padding: 45px 20px;color: #ffffff">
                                <p style="padding: 10px;">SUBSCRIBE</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

          </table>
        </div>
      </body>
    </html>

    `;
};

export const emailTestValidationAdm = (nameUser: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Test Template Email</title>
        <style>
          body {
            margin: 0;
            background-color: #ffff;
          }

          table {
            border-spacing: 0;
          }

          td {
            padding: 0;
          }

          img {
            border: 0;
          }

          .wrapper {
            display: table;
            table-layout: fixed;
            width: 100%;
            background-image: url("https://i.ibb.co/xJwbFmd/fundo-email.png");
          }

          .logo {
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
          }

          .main {
            background-color: #ffff;
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
            font-family: sans-serif;
            color: #171a17;
          }

            a:link,
            #button-dark {
            display: block;
            background-color: #4E2096;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-weight: bold;
          }

        </style>
      </head>
      <body>
        <div class="wrapper">

          <!-- Petlove Logo -->
          <table class="logo">
            <tr>
                <td style="text-align: center;">
                    <img src="https://i.ibb.co/R0gGJhz/petlove.png" alt="" width="310px">
                </td>
            </tr>
          </table>

          <table class="main">

            <!-- Border Top -->
            <tr>
              <td height="8px" style="background-color: #DF3C7C"></td>
            </tr>


            <!-- Main -->
            <tr>
                <td style="padding: 15px 0 50px;">
                    <table width="100%">
                        <tr>
                            <td style="text-align: center;padding: 15px">

                                <p style="font-size: 20px;font-weight: bold;">Temos uma mensagem para você.</p>
                                <hr />
                                <p style="line-height: 23px;padding: 5px 0 15px;text-align: left;font-weight: bold; font-size: large;">Olá, Gestor</p>
                                <p style="text-align: justify;">Gostaríamos de informar que um novo teste “Self Awareness” foi enviado pelo(a) usuário(a) ${nameUser} e já se encontra disponível para realizar a validação.</p>
                                <img src="https://i.ibb.co/z4K5H5j/pets.png" alt="">
                                <a href="${process.env.URL_ADMIN}" id="button-dark">Acesse aqui!</a>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="background-color: #26292b">
                    <table width="100%">
                        <tr>
                            <td style="text-align: center;padding: 45px 20px;color: #ffffff">
                                <p style="padding: 10px;">SUBSCRIBE</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

          </table>
        </div>
      </body>
    </html>

    `;
};
