import uuid from 'uuid-js'

const data = [
  {
    name: 'Sacramental',
    students: [
      {
        name: 'Barbara Washington',
        attended: false,
      },
      {
        name: 'Priscila Passará',
        attended: false,
      },
      {
        name: 'Eduardo Sampaio',
        attended: false,
      },
      {
        name: 'Heitor Xamã',
        attended: false,
      },
      {
        name: 'Jessica Fagundes',
        attended: false,
      },
      {
        name: 'Cristina Resmungão',
        attended: false,
      },
      {
        name: 'Marina Gabiru',
        attended: false,
      },
      {
        name: 'Ivete Doce',
        attended: false,
      },
      {
        name: 'Tilapia Agusta',
        attended: false,
      },
      {
        name: 'Leonardo Urubamba',
        attended: false,
      },
      {
        name: 'Pedro Visconde',
        attended: false,
      },
      {
        name: 'Neimar Tarantim',
        attended: false,
      },
      {
        name: 'Camilo Sorocaba',
        attended: false,
      },
      {
        name: 'Artur Elevaldo',
        attended: false,
      },
      {
        name: 'Maria da Silva',
        attended: false,
      },
      {
        name: 'Joana Dark',
        attended: false,
      },
      {
        name: 'Joice Greice',
        attended: false,
      },
      {
        name: 'Belarmina Betel',
        attended: false,
      },
      {
        name: 'Claudia Gomes',
        attended: false,
      },
      {
        name: 'Fernanda dos Anjos',
        attended: false,
      },
      {
        name: 'Miguelito da Costa',
        attended: false,
      },
      {
        name: 'João da Silva',
        attended: false,
      },
      {
        name: 'Tafarel Cabral',
        attended: false,
      },
      {
        name: 'Henrique Salsicha',
        attended: false,
      },
      {
        name: 'Romulo Maciel',
        attended: false,
      },
      {
        name: 'Daniel Bernardo',
        attended: false,
      },
      {
        name: 'Hugo Saraiva',
        attended: false,
      },
    ],
  },
  {
    name: 'Quorum',
    students: [
      {
        name: 'Miguelito da Costa',
        attended: false,
      },
      {
        name: 'João da Silva',
        attended: false,
      },
      {
        name: 'Tafarel Cabral',
        attended: false,
      },
      {
        name: 'Henrique Salsicha',
        attended: false,
      },
      {
        name: 'Romulo Maciel',
        attended: false,
      },
      {
        name: 'Daniel Bernardo',
        attended: false,
      },
      {
        name: 'Hugo Saraiva',
        attended: false,
      },
    ],
  },
  {
    name: 'Soc Soc',
    students: [
      {
        name: 'Maria da Silva',
        attended: false,
      },
      {
        name: 'Joana Dark',
        attended: false,
      },
      {
        name: 'Joice Greice',
        attended: false,
      },
      {
        name: 'Belarmina Betel',
        attended: false,
      },
      {
        name: 'Claudia Gomes',
        attended: false,
      },
      {
        name: 'Fernanda dos Anjos',
        attended: false,
      },
    ],
  },
  {
    name: 'Rapazes',
    students: [
      {
        name: 'Leonardo Urubamba',
        attended: false,
      },
      {
        name: 'Pedro Visconde',
        attended: false,
      },
      {
        name: 'Neimar Tarantim',
        attended: false,
      },
      {
        name: 'Camilo Sorocaba',
        attended: false,
      },
      {
        name: 'Artur Elevaldo',
        attended: false,
      },
    ],
  },
  {
    name: 'Moças',
    students: [
      {
        name: 'Jessica Fagundes',
        attended: false,
      },
      {
        name: 'Cristina Resmungão',
        attended: false,
      },
      {
        name: 'Marina Gabiru',
        attended: false,
      },
      {
        name: 'Ivete Doce',
        attended: false,
      },
      {
        name: 'Tilapia Agusta',
        attended: false,
      },
    ],
  },
  {
    name: 'Primária',
    students: [
      {
        name: 'Barbara Washington',
        attended: false,
      },
      {
        name: 'Priscila Passará',
        attended: false,
      },
      {
        name: 'Eduardo Leite',
        attended: false,
      },
      {
        name: 'Heitor Xamã',
        attended: false,
      },
    ],
  }
]

data.forEach(attendance=>{
  attendance.students.forEach(student=>{
    student.id = uuid.create().toString()
  })
})

export default data
