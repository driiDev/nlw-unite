// array
let participantes = [
  {
    nome: "Andrielle Soares",
    email: "andri@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2 ,25, 22, 00)
  },
  {
    nome: "Carlos Silva",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 15, 30),
    dataCheckIn: new Date(2024, 2 ,26, 10, 45)
  },
  {
    nome: "Mariana Oliveira",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 10, 10),
    dataCheckIn: null
  },
  {
    nome: "João Santos",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 17, 45),
    dataCheckIn: new Date(2024, 2 ,28, 14, 55)
  },
  {
    nome: "Fernanda Lima",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 14, 20),
    dataCheckIn: new Date(2024, 2 ,29, 16, 30)
  },
  {
    nome: "Ricardo Barbosa",
    email: "ricardo@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 12, 00),
    dataCheckIn: null
  },
  {
    nome: "Ana Pereira",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 20, 45),
    dataCheckIn: new Date(2024, 3 ,2, 12, 20)
  },
  {
    nome: "Pedro Almeida",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 29, 11, 30),
    dataCheckIn: null
  },
  {
    nome: "Mariana Costa",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 18, 15),
    dataCheckIn: new Date(2024, 3 ,4, 20, 15)
  },
  {
    nome: "Paulo Gomes",
    email: "paulo@gmail.com",
    dataInscricao: new Date(2024, 2, 31, 16, 40),
    dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null){
    dataCheckIn = `
    <button data-email="${participante.email}"
    onclick="fazerCheckin(event)"> 
    Confirmar check-in </button>
    `
  }
  return `
      <tr>
        <td>
          <strong>
            ${participante.nome}
          </strong>
          <br>
          <small>
            ${participante.email} 
          </small>
        </td>
        <td>
          ${dataInscricao}
        </td>
        <td>
          ${dataCheckIn}
        </td>
      </tr>
    `
  }

  const atualizarLista = (participantes) => {
    let output = ""
    // estrutura de repetição - loop
    for(let participante of participantes){
      // faça alguma coisa
      output = output + criarNovoParticipante(participante)
    }

  // substituir informação do HTML
  document.querySelector('tbody')
  .innerHTML = output
  }

  atualizarLista(participantes)

  const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
      nome: dadosDoFormulario.get('nome'),
      email: dadosDoFormulario.get('email'),
      dataInscricao: new Date(),
      dataCheckIn: null
    }

    // verificar se o participante já existe
    const participanteExiste = participantes.find(
      (p) => p.email == participante.email
    )

    if(participanteExiste){
      alert('Email já cadastrado!')
      return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    // limpar o formulário
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
  }

  const fazerCheckin = (event) => {
    // confirmar o check-in
    msgConfirmacao = 'Tem certeza que deseja fazer o check-in?'
    if(confirm(msgConfirmacao) == false){
      return
    }
    // encontrar o participante dentro da lista
    const participante = participantes.find((p) => {
      return p.email == event.target.dataset.email
    })
    // atualizar o xheck-in do participante
    participante.dataCheckIn = new Date()
    // atualizar a lista de participantes
    atualizarLista(participantes)
  }