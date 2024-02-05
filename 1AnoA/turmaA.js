let nav = 0;
let clicked = null;
let eventos;

if (localStorage.getItem('eventos')) {
    eventos = JSON.parse(localStorage.getItem('eventos'));
} else {
    eventos = [];
}

const novoEvento = document.getElementById('modalNovoEvento');
const modalDeleteEvento = document.getElementById('modalDeleteEvento');
const eventoCaixaTexto = document.getElementById('tituloCaixaEvento');
// --------
const calendario = document.getElementById('calendario'); // div calendario:
const diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']; // array com os dias da semana:

// Funções modal

function abrirModal(data) {
    clicked = data;
    const diaEvento = eventos.find((event) => event.date === clicked);

    if (diaEvento) {
        document.querySelector('#textoEvento').innerText = diaEvento.title;
        modalDeleteEvento.style.display = 'block';
    } else {
        novoEvento.style.display = 'block';
    }
}

function carregar() {
    const date = new Date();

    if (nav !== 0) {
        date.setMonth(new Date().getMonth() + nav);
    }
    const dia = date.getDate();
    const mes = date.getMonth() + 1; // Adicionando 1 porque os meses em JavaScript são zero-based
    const ano = date.getFullYear();

    const diasMes = new Date(ano, mes, 0).getDate();
    const primeiroDiaMes = new Date(ano, mes - 1, 1); // Subtraindo 1 porque os meses em JavaScript são zero-based

    const dateString = primeiroDiaMes.toLocaleDateString('pt-br', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    const paddinDays = diasSemana.indexOf(dateString.split(', ')[0]);

    // mostrar mês e ano:
    document.getElementById('displayMes').innerText = `${date.toLocaleDateString('pt-br', { month: 'long' }).toUpperCase()}, ${ano}`;

    calendario.innerHTML = '';

    // criando uma div com os dias:

    for (let i = 1; i <= paddinDays + diasMes; i++) {
        const diaSemana = document.createElement('div');
        diaSemana.classList.add('dia');

        const dayString = `${mes}/${i - paddinDays}/${ano}`;

        // condicional para criar os dias de um mês:

        if (i > paddinDays) {
            diaSemana.innerText = i - paddinDays;

            const eventoDia = eventos.find((event) => event.date === dayString);

            if (i - paddinDays === dia && nav === 0) {
                diaSemana.id = 'currentDay';
            }

            if (eventoDia) {
                const eventoDiv = document.createElement('div');
                eventoDiv.classList.add('event');
                eventoDiv.innerText = eventoDia.title;
                diaSemana.appendChild(eventoDiv);
            }

            diaSemana.addEventListener('click', () => abrirModal(dayString));
        } else {
            diaSemana.classList.add('padding');
        }

        calendario.appendChild(diaSemana);
    }
}

carregar();

function fecharModal() {
    eventoCaixaTexto.classList.remove('error');
    novoEvento.style.display = 'none';
    modalDeleteEvento.style.display = 'none';

    eventoCaixaTexto.value = '';
    clicked = null;
    carregar();
}

function salvarEvento() {
    if (eventoCaixaTexto.value) {
        eventoCaixaTexto.classList.remove('error');

        eventos.push({
            date: clicked,
            title: eventoCaixaTexto.value
        });

        localStorage.setItem('eventos', JSON.stringify(eventos));
        fecharModal();

    } else {
        eventoCaixaTexto.classList.add('error');
    }
}

function deletarEvento() {
    eventos = eventos.filter(event => event.date !== clicked);
    localStorage.setItem('eventos', JSON.stringify(eventos));
    fecharModal();
}

// botões

function botoes() {
    document.getElementById('botaoVoltar').addEventListener('click', () => {
        nav--;
        carregar();
    });

    document.getElementById('botaoProximo').addEventListener('click', () => {
        nav++;
        carregar();
    });

    document.getElementById('botaoSalvar').addEventListener('click', () => salvarEvento());

    document.getElementById('botaoCancelar').addEventListener('click', () => fecharModal());

    document.getElementById('botaoDeletar').addEventListener('click', () => deletarEvento());

    document.getElementById('botaoFechar').addEventListener('click', () => fecharModal());
}

botoes();
