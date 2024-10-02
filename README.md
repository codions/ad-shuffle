# MyBannerRotation - Random Banner Rotator

Este pacote JavaScript permite a rotação aleatória de banners em uma página da web com base em frequência configurada, datas de início e término.

## Funcionalidades

- Randomização de banners com base na frequência.
- Controle de exibição com datas de início e término.
- Manipulação de múltiplos containers de banners na mesma página.
- Fácil integração com HTML através da biblioteca gerada.
- Aplicação automática de estilos padrões ao utilizar a classe `ads-styled`.

## Instalação

### Instalação via NPM (para desenvolvimento)

Se você deseja desenvolver ou customizar o pacote:

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Compile o pacote com `npm run build`.

### Uso da Versão Compilada

Se você deseja apenas utilizar o pacote compilado, adicione o arquivo gerado `dist/random-banner.es.js` à sua página HTML:

```html
<script src="dist/random-banner.es.js"></script>
```

## Como Usar

Após incluir o arquivo de script, adicione a seguinte estrutura HTML para incluir os banners em sua página.

### Exemplo de Implementação HTML

Adicione a classe `ads-styled` ao seu banner para aplicar o estilo padrão do pacote:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rotação de Banners</title>
    <script src="dist/random-banner.es.js"></script>
</head>
<body>
    <div class="rb-ads">
        <div class="rb-random-ads ads-styled" data-frequency="50" data-start-date="2024-09-09 09:31:00" data-end-date="2024-09-10 12:35:00">
            <div class="ads-info">Publicidade</div>
            Banner 1 - Frequência 50%
        </div>
        <div class="rb-random-ads ads-styled" data-frequency="25" data-end-date="2024-09-09 13:00:00">
            <div class="ads-info">Publicidade</div>
            Banner 2 - Frequência 25%
        </div>
        <div class="rb-random-ads ads-styled" data-frequency="25" data-start-date="2024-09-01 00:00:00">
            <div class="ads-info">Publicidade</div>
            Banner 3 - Frequência 25%
        </div>
    </div>
</body>
</html>
```

### Atributos

- `data-frequency`: Define a probabilidade de exibição do banner. O valor é relativo aos outros banners no mesmo container.
- `data-start-date` (opcional): Define a data de início em que o banner estará disponível para exibição.
- `data-end-date` (opcional): Define a data de término após a qual o banner não será mais exibido.
- `class="ads-styled"`: Aplica o estilo padrão fornecido pelo pacote.

### Comportamento

- Os banners com `data-start-date` e/ou `data-end-date` só serão exibidos se a data atual estiver dentro do intervalo especificado.
- A frequência é usada para determinar qual banner será exibido aleatoriamente. Um banner com `data-frequency="50"` tem 50% de chance de ser exibido se estiver disponível.


### Scripts NPM

- `npm run dev`: Executa o ambiente de desenvolvimento com Vite.
- `npm run build`: Compila o projeto para produção.

## Licença

Este projeto está licenciado sob a licença MIT.