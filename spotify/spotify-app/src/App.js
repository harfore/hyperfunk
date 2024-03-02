import React, { useEffect, useState } from 'react'

const App = () => {

  const [music, setMusic] = useState([])

  const getMusic = async () => {
    const url = 'https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2f0070ca6bmshcef9001052a267cp173e79jsn53f58d3f6a15',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setMusic(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMusic()
  }, [])

  return (

    <div>
      <h1>TUC A 11H</h1>
      <div>
        {music?.albums?.items?.map((musicData) => {
          return <>
            <h1>{musicData?.data?.name}</h1>
          </>
        })}
      </div >
    </div>
  )
}

export default App