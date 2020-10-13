import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

function Home() {
  const [input, setInput] = useState('');
  const [resluts, setResults] = useState(null);

  const onInputChange = e => {
    setInput(e.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/shows?q=${input}`).then(r => setResults(r));
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) onSearch();
  };

  const renderResults = () => {
    if (resluts && resluts.length === 0) {
      return <div>No results</div>;
    }

    if (resluts && resluts.length > 0) {
      return (
        <div>
          {resluts.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        value={input}
        onKeyDown={onKeyDown}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
}

export default Home;
