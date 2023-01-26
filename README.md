# Projeto "Stock-trader" 📈

Este projeto consiste em um jogo que simula compra e venda de ações, desenvolvido através do framework **Vue.js**. Ele faz parte do módulo 18 e é um dos projetos práticos do curso [Vue JS 2 - O Guia Completo](https://www.udemy.com/course/vue-js-completo/) ministrado pela [Cod3r](https://www.cod3r.com.br/) na plataforma da [Udemy](https://www.udemy.com).

## Telas do programa
+ ### Início
Esta é a página inicial da aplicação. Nela está a data atual, algumas informações adicionais e detalhes sobre o saldo do usuário.

![Home](https://user-images.githubusercontent.com/66395880/214827483-23196b3b-2dc9-4e08-9989-006c475831b3.PNG)

+ ### Ações
A página de ações mostra as ações disponíveis para compra (que são trazidos a página diretamente via Vuex). Os preços são atualizados a cada 5 segundos.

![Stocks](https://user-images.githubusercontent.com/66395880/214828043-f0ef4ccc-3258-48fe-a998-3047d22b94df.PNG)

+ ### Portifólio
Uma vez que a ação é comprada ela é adicionada ao portifólio. Aqui as ações podem ser vendidas ao preço atual delas. O objetivo é vender em um preço maior do que o valor pago inicialmente.

![Portfolio](https://user-images.githubusercontent.com/66395880/214828321-ba2c6113-103c-4b2e-8ccd-e3bc4d21e259.PNG)

+ ### Resumo
Ao escolher a opção "**Finalizar dia**", a aplicação mostrará um resumo das suas ações no portifólio, as ações compradas e vendidas no dia. Também da a opção de iniciar mais um dia, onde será adicionado R$ 2000,00 ao saldo do usuário.

![Resume](https://user-images.githubusercontent.com/66395880/214829052-9406b215-18b6-4463-93af-2c9e50674bad.PNG)

<hr>

A aplicação também utiliza o sistema de localStorage, tornando possível salvar os dados, e depois de a página ser atualizada, os recuperar através da opção de carregamento.
