/*eslint-disable*/

import { useState, useEffect } from 'react'

function avisarAPI() {
  console.log('Lista salva!')
}

function App() {
  const [list, setList] = useState<string[]>([])
  // valores do user digitando
  const [filter, setFilter] = useState('')

  // useEffect recebe uma função e uma ordem para executar ela sempre que uma variavel mudar (no caso, a list)
  // isso facilita a vida para a gente nao precisar ficar chamando a funcao dentro dos métodos toda vez que a lista mudar
  // se você só joga o console.log() na raiz, ele vai obrigar a renderizar toda a vez que a lista mudar
  // ele já faz uma primeira execução quando o componente é montado, por isso o console.log() já aparece na tela ao abrir o site

  useEffect(() => {
    // aqui eu coloco o código que quero que execute só uma vez
    fetch('https://api.github.com/users/lucasunemat/repos')
      .then((response) => response.json())
      .then((data) => {
        setList(data.map((item: any) => item.full_name))
      })
  }, [])

  useEffect(() => {
    // evitar primeira execução ao abrir o site
    if (list.length !== 0) {
      avisarAPI()
    }
  }, [list])

  // essa linha aqui tava num estado (filteredList, setFilteredList), mas não precisa.
  // Quando um estado é derivado de outro, podemos simplesmente implementar ele e jogar numa variavel
  // Com isso, não precisamos ficar chamando o setFilteredList toda vez que a lista mudar, e economizamos renderizações
  // Se você tá usando o useEffect para atualizar estado, provavelmente tá fazendo algo errado
  const filteredList = list.filter((item) => item.includes(filter))

  // essa função é uma closure, ela tem acesso a variavel list porque está dentro da função App()
  function addToList() {
    setList((state) => [...state, 'Novo item'])
  }

  return (
    <div>
      <h1>Hello World</h1>

      <input
        type="text"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />

      <ul>
        {list.map((item) => (
          <li>{item}</li>
        ))}
      </ul>

      <ul>
        {filteredList.map((item) => (
          <li>{item}</li>
        ))}
      </ul>

      <button onClick={addToList}>Add to list</button>
    </div>
  )
}

export default App
