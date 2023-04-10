# Boas-vindas ao repositório do projeto de Trivia!

[MEUS COMMITS](https://github.com/HugoRamosC/jogo-trivia-react-redux/commits)

Aqui desenvolvi em grupo um jogo de perguntas e respostas baseado no jogo **Trivia** _(tipo um show do milhão americano rs)_ utilizando _React e Redux_. O grupo se organizou utilizando o quadro _Kanban_ para maior eficiência e para minimizar os conflitos que a união de vários poderia trazer. A partir dessas demandas, temos uma aplicação onde a pessoa usuária poderá:

  - Logar no jogo e, se o email tiver cadastro no site [Gravatar](https://pt.gravatar.com/), ter sua foto associada ao perfil da pessoa usuária.
  - Acessar a página referente ao jogo, onde se deverá escolher uma das respostas disponíveis para cada uma das perguntas apresentadas. A resposta deve ser marcada antes do contador de tempo chegar a zero, caso contrário a resposta deverá ser considerada errada.
  - Ser redirecionada, após 5 perguntas respondidas, para a tela de score, onde o texto mostrado depende do número de acertos.
  - Visualizar a página de ranking, se quiser, ao final de cada jogo.
  - Configurar algumas opções para o jogo em uma tela de configuração acessível a partir do cabeçalho do app.


Nesse projeto, desenvolvemos:

  - Um store Redux em aplicações React
  - Reducers no Redux em aplicações React
  - Actions no Redux em aplicações React
  - Dispatchers no Redux em aplicações React
  - Conectamos Redux aos componentes React
  - Actions assíncronas na sua aplicação React que faz uso de Redux.
  - Testes para garantir que sua aplicação possua uma boa cobertura de testes.

# Requisitos

Nesse projeto, a pessoa que joga deve conseguir completar o jogo e conseguir ver seu placar depois de responder todas as 5 perguntas, além de acessar a tela de configurações e de ranking.

## Tela de início/login

>Obs: É necessário que a página de Login tenha o caminho `src/pages/Login.js`

## 1. Crie a tela de login, onde a pessoa que joga deve preencher as informações para iniciar um jogo

Criar a tela de login contendo as informações de nome e email, onde a pessoa que joga deve conseguir escrever seu nome e email nos inputs e o botão de jogar ("Play") deve estar desabilitado caso não tenha alguma dessas informações.

---

## 2. Crie o botão de iniciar o jogo
  
  O botão "Play" deve fazer requisição para a API para obter o token e redirecionar a pessoa para tela de jogo

---

## 3. Crie um botão que leva a pessoa para tela de configuração
  A tela inicial deve conter um botão que leve para a configuração do jogo

---

## 4. Desenvolva testes para atingir 90% de cobertura da tela de Login

---

## Tela de jogo
>Obs: É necessário que a página de Game tenha o caminho `src/pages/Game.js`

## 5. Crie um _header_ que deve conter as informações da pessoa jogadora
  O _header_ deve conter as informações sobre a pessoa jogadora, como a imagem do Gravatar, o nome e o placar

---

## 6. Crie a página de jogo que deve conter as informações relacionadas à pergunta
  Deve ser feita a requisição para a API para popular o jogo com as perguntas, categoria e alternativas

---

## 7. Desenvolva o estilo que, ao clicar em uma resposta, a correta deve ficar verde e as incorretas, vermelhas
  Ao responder a pergunta, se a alternativa for correta, deve ficar verde, caso contrário, vermelha

---

## 8. Desenvolva um timer onde a pessoa que joga tem 30 segundos para responder
  A página deve conter um timer com o tempo máximo de 30 segundos para responder. Caso ultrapasse o tempo, a pergunta é considerada errada

---

## 9. Crie o placar com as seguintes características:
  Ao clicar na resposta correta, pontos devem ser somados no placar da pessoa que está jogando

---

## 10. Crie um botão de `Next` que apareça após a resposta ser dada
  Deve aparecer um botão de próxima ("Next") pergunta após a resposta ser dada

---

## 11. Desenvolva o jogo de forma que a pessoa jogadora deve responder 5 perguntas no total
  O jogo deve ser composto por 5 perguntas, onde, a cada nova pergunta, o timer é reiniciado. Após respondê-las, a pessoa que joga deve ser redirecionada para a tela de feedback

---

## Tela de feedback
>Obs: É necessário que a página de Feedback tenha o caminho `src/pages/Feedback.js`

## 12. Desenvolva o header de _feedback_ que deve conter as informações da pessoa jogadora
  A tela de feedback deve conter as informações da pessoa que joga, incluindo o placar com o valor referente ao desempenho no jogo

---

## 13. Crie a mensagem de _feedback_ para ser exibida a pessoa usuária
  A tela de feedback deve exibir uma mensagem relacionada ao desempenho da pessoa que jogou

---

## 14. Exiba as informações relacionadas aos resultados obtidos para a pessoa usuária
  A tela de feedback deve exibir informações sobre o desempenho da pessoa, como o placar final e o número de perguntas que acertou

---

## 15. Crie a opção para a pessoa jogadora poder jogar novamente
  A pessoa terá a opção de jogar novamente ("Play Again") que, ao ser clicada, levará para a tela de inicial

---

## 16. Crie a opção para a pessoa jogadora poder visualizar a tela de _ranking_
  Deve existir um botão que redirecione a pessoa para a tela de ranking

---

## 17. Desenvolva testes para atingir 90% de cobertura da tela de Feedbacks
  Cobertura de testes da tela de Ranking

---

## Tela de ranking
>Obs: É necessário que a página de Ranking tenha o caminho `src/pages/Ranking.js`

## 18. Crie um botão para ir ao início
  O botão deve redirecionar a pessoa para a tela de inicial (login)

---

## 19. Crie o conteúdo da tela de _ranking_
  A tela de ranking deve possuir uma lista com a imagem, nome e pontuação das pessoas que jogaram e deve ficar armazenado no localStorage

---

## 20. Desenvolva testes para atingir 90% de cobertura da tela de Ranking
  Cobertura de testes da tela de Ranking

---

## Testes da tela de jogo
## 21. Desenvolva testes para atingir 90% de cobertura da tela de Jogo
  Cobertura de testes da tela de Jogo

---

## Testes de cobertura da aplicação
## 22. Desenvolva testes para atingir 95% de cobertura total
  Cobertura de testes da aplicação

---

# Requisitos não avaliativos

## Tela de configurações
### 23. Ao mudar o valor do dropdown categoria, apenas perguntas da categoria selecionada devem aparecer para a pessoa que está jogando. Essa configuração será identificada pela chave category no retorno da API;

---

### 24. Ao mudar o valor do dropdown dificuldade, apenas perguntas da dificuldade selecionada devem aparecer para a pessoa que está jogando. Essa configuração será identificada pela chave difficulty no retorno da API;

---

### 25. Ao mudar o valor do dropdown tipo, apenas perguntas do tipo selecionado devem aparecer para a pessoa que está jogando. Essa configuração será identificada pela chave type no retorno da API.
