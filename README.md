Reclamador de internet
======================

Programa simples escrito em Node.js.

Usa o speedtest-cli para verificar sua conexão com a internet, e então, caso esteja lenta, manda um e-mail para o seu provedor.

As informações do usuário assim como o e-mail devem ser postas em um arquivo personalInfo.json na pasta principal.

o formato do arquivo deverá ser: 

>{
>    "user": {
>        "name": "",
>        "address": "",
>        "cpf": ""
>    },
>    "mail": {
>        "sendTo": "",
>        "from": "",
>        "host": "",
>        "port": 2525,
>        "user": "",
>        "password": ""
>    }
>}