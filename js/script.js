// Selecionando id dos elementos do HTML

const hrEl = document.querySelector("#hora");
const mnEl = document.querySelector("#minuto");
const sgEl = document.querySelector("#segundo");
const mlEl = document.querySelector("#milissegundo");

const diaEl = document.querySelector("#dia");
const mesEl = document.querySelector("#mes");
const anoEl = document.querySelector("#ano");

const cronoData = document.querySelector("#crono-data");

const btnStart = document.querySelector("#btnStart");
const btnPause = document.querySelector("#btnPause");
const btnReset = document.querySelector("#btnReset");
const btnMostrar = document.querySelector("#btnMostrar");
const btnEsconder = document.querySelector("#btnEsconder");
const btnMarcar = document.querySelector("#btnMarcar");
let listaMarcada = document.getElementById("listaMarcada");

// Variável que receberar o inicio do cronômetro
let intervalo;

// Variáveis que receberão os valores de tempo
let hr = 0;
let mn = 0;
let sg = 0;
let ml = 0;
let dia = 1;
let mes = 1;
let ano = 2024;

// Eventos de click que chamarão as funções
btnStart.addEventListener("click", iniTime);
btnPause.addEventListener("click", pauseTime);
btnReset.addEventListener("click", resetTime);
btnMostrar.addEventListener("click", mostrarData);
btnEsconder.addEventListener("click", esconderData);
btnMarcar.addEventListener("click", addMarcaLista);

// Função que inicia o cronômetro
function iniTime(){
    // Essa variável recebe uma função global setInterval 
    // que recebe uma função anônima que faz a contagem de 
    // tempo no cronômetro
    intervalo = setInterval(() => {
        ml += 10;
        if(ml == 1000){
            ml = 0;
            sg++;
            if(sg == 60){
                sg = 0;
                mn++;
                if(mn == 60){
                    mn = 0;
                    hr++;
                    if(hr == 24){
                        hr = 0;
                        dia++;
                        if(dia > 30){
                            dia = 1;
                            mes++;
                            if(mes == 13){
                                mes = 1;
                                ano++;
                            }
                        }
                    }
                }
            }
        }
        // Retornando o valor do tempo formatado
        mlEl.textContent = formatTimerMl(ml);
        sgEl.textContent = formatTimer(sg);
        mnEl.textContent = formatTimer(mn);
        hrEl.textContent = formatTimer(hr);
        
        diaEl.textContent = formatTimerDia(dia);
        mesEl.textContent = formatTimerMes(mes);
        anoEl.textContent = ano;
        // O valor 10 será o intervalo de tempo em
        // milissegundos que o cronômetro deve atrasar
    }, 10);
    // Mostrar o botão de pause e oculta o botão de start
    btnPause.style.display = "block";
    btnStart.style.display = "none";
}

// Função que captura o tempo selecionado
function addMarcaLista () {
    // Mostra o campo de lista do cronômetro
    listaMarcada.style.display = "block";
    // Adiciona no campo uma tag p na lista o tempo capturado
    listaMarcada.innerHTML += 
        `<p>(${formatTimer(hr)} : ${formatTimer(mn)} 
            : ${formatTimer(sg)} : ${formatTimerMl(ml)}) 
            - ${formatTimerDia(dia)}/${formatTimerMes(mes)}/${formatTimerMes(ano)}
        </p>`;
}

// Função que pausa a contagem
function pauseTime (){
    // A função global clearInterval limpa todo o valor da 
    // variável intervalo
    clearInterval(intervalo);
    // Oculta o botão de start e mostrar o botão de pause
    btnPause.style.display = "none";
    btnStart.style.display = "block";
}

// Função que zera todos os valores dos segundos, minutos, 
// horas e milissegundos
function resetTime(){
    // A função global clearInterval limpa todo o valor da 
    // variável intervalo
    clearInterval(intervalo);

    // Zera os valores das variáveis
    hr = 0;
    mn = 0;
    sg = 0;
    ml = 0;
    dia = 1;
    mes = 1;
    ano = 2024;

    // Zera o valor direto do documento HTML
    hrEl.textContent = formatTimer(hr);
    mnEl.textContent = formatTimer(mn);
    sgEl.textContent = formatTimer(sg);

    mlEl.textContent = formatTimerMl(ml);

    diaEl.textContent = formatTimerDia(dia);
    mesEl.textContent = formatTimerMes(mes);
    anoEl.textContent = ano;

    listaMarcada.innerHTML = '';
    
    // Oculta o botão de start e mostrar o botão de pause
    btnPause.style.display = "none";
    btnStart.style.display = "block";
    // Limpa o campo da tag p na lista o tempo capturado
    listaMarcada.style.display = "none";
}

// Função que formata os valores de hora, minuto e segundo 
// para o documento HTML
function formatTimer(tempo){
    // Retorna a string de: (tempo < 10 ?) se tempo for menor 
    // que 10, então (`0${tempo}`) adiciona zeros à esquerda, 
    // se for menor que 10 é adicionado '0' no começo, 
    // números como 0, 1, 2..., se não, mostra apenas o 
    // valor de tempo.
    return tempo < 10 ? `0${tempo}` : tempo;
}

// Função que formata os valores de milissegundo 
function formatTimerMl(tempo){
    // Retorna a string de: (tempo < 100 ?) se tempo for menor 
    // que 100, então (`${tempo}`.padStart(3, '0')), o método 
    // padStart é responsável por adicionar zeros à esquerda, 
    // definindo a quantidade de caracteres, 3 e se for menor 
    // que 100 é adicionado '00' no começo, números como 0, 1, 
    // 2..., se não, mostra apenas o valor de tempo.
    return tempo < 100 ? `${tempo}`.padStart(3, '0') : tempo;
}

// Função que formata os valores de dia
function formatTimerDia(dia){
    // Retorna a string de: (dia < 10 ?) se dia for menor que 
    // 10, então (`0${dia}`) adiciona um '0' a esquerda, se não,
    // (: dia) mostra o número comum, 10, 11, 12...
    return dia < 10 ? `0${dia}`: dia;
}

// Função que formata os valores de mes 
function formatTimerMes(mes){
    // Retorna a string de: (mes < 10 ?) se mes for menor que 
    // 10, então (`0${mes}`) adiciona um '0' a esquerda, se não,
    // (: mes) mostra o número comum, 10, 11, 12...
    return mes < 10 ? `0${mes}`: mes;
}

// Função que mostra a data
function mostrarData(){
    // Mostra a div da data, oculta o botão de mostrar e 
    // mostra o botão de esconder
    cronoData.style.display = "block";
    btnMostrar.style.display = "none";
    btnEsconder.style.display = "block";
}

// Função que esconde a data
function esconderData(){
    // Oculta a div da data, mostra o botão de mostrar e 
    // oculta o botão de esconder
    cronoData.style.display = "none";
    btnMostrar.style.display = "block";
    btnEsconder.style.display = "none";
}

// (document.querySelector('input[type="checkbox"]')): Este 
// comando seleciona o primeiro elemento do tipo input com 
// o atributo type igual a checkbox que ele encontra no documento HTML.
// (.addEventListener('change', function(){...})): Este comando adiciona 
// um ouvinte de eventos ao elemento selecionado. O ouvinte de eventos 
// é acionado quando o estado do elemento checkbox muda (ou seja, quando 
// é marcado ou desmarcado).
document.querySelector('input[type="checkbox"]').addEventListener('change', function(){
    // (document.body.classList.toggle('dark-mode', this.checked)): Dentro da função do 
    // ouvinte de eventos, este comando alterna a classe dark-mode no elemento body do 
    // documento. A classe é adicionada se o checkbox estiver marcado (this.checked é 
    // verdadeiro) e removida se o checkbox estiver desmarcado (this.checked é falso).
    document.body.classList.toggle('dark-mode', this.checked);
});