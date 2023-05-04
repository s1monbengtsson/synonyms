import { useState } from 'react'
import './App.css'

type Synonyms = {
  word: string
  score: number
}

function App() {
  const [word, setWord] = useState("")
  const [searchedWord, setSearchedWord] = useState("")
  const [synonyms, setSynonyms] = useState<Synonyms[]>([])

  const handleClickedSynonym = (word: string) => {
    handleFetchData(word)
    setSearchedWord(word)
    setWord("")
  }

  const handleFetchData = async (word: string) => {
    const res = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`)
    const data = await res.json()

    return setSynonyms(data)   
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    handleFetchData(word)
    setSearchedWord(word)
    setWord("")
  }


  return (
    <div className="container">
      <h1 className="hero-heading">Synonyms</h1>

      <form onSubmit={handleFormSubmit}>
        <input 
          onChange={(e => setWord(e.target.value))}
          type="text"
          placeholder="Type a word"
          id="word-input" 
          value={word}
        />
        <button className="form-button">Search</button>
      </form>

      {synonyms.length > 0 && (
      <>
        <span className="info-text">Showing synonyms for <span style={{fontStyle: 'italic'}}>'{searchedWord}'</span></span>
        
        <ul className="synonym-list">

          {synonyms.map((synonym, index) => (
            <li 
              key={index}
              className="list-item"
              >
              <a 
                onClick={() => handleClickedSynonym(synonym.word)}
                className="item-link">{synonym.word}</a>
            </li>
          ))}
        </ul>
        <p style={{fontStyle:'italic', fontSize: '12px'}}>Click on a synonym to make a new search</p>
      </>
      )}

      {synonyms.length === 0 && (
        <span>No synonym found for <span style={{fontStyle: 'italic'}}>"{searchedWord}"</span></span>
      )}
    </div>
  )
}

export default App
