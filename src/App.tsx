import { useState } from 'react'
import React from 'react'
import './App.css'

const BASE_URL = 'https://wordsapiv1.p.rapidapi.com/words';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};

function App() {
  const [word, setWord] = useState("")
  const [searchedWord, setSearchedWord] = useState("")
  const [synonyms, setSynonyms] = useState<string[]>([])
  const [definition, setDefinition] = useState("")

  const handleClickedSynonym = (word: string) => {
    handleFetchData(word)
    setSearchedWord(word)
    setWord("")
  }

  const handleFetchData = async (word: string) => {
    const res = await fetch(`${BASE_URL}/${word}`, options)  
    
    const data = await res.json()

    setSynonyms(data.results[0].synonyms || [])
    setDefinition(data.results[0].definition)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    handleFetchData(word)
    setSearchedWord(word)
    setWord("")
    console.log("synonyms:", synonyms.length)

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

        <p>Definition: {definition}</p>
        
        <ul className="synonym-list">

          {synonyms.map((synonym, index) => (
            <li 
              key={index}
              className="list-item"
              >
              <a 
                onClick={() => handleClickedSynonym(synonym)}
                className="item-link">{synonym}</a>
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
