import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; 
import { saveAs } from 'file-saver'; 

interface Character {
  name: string;
  eyeColor: string;
  gender: string;
}

const CharacterList: React.FC = () => {

  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); 

  useEffect(() => {
    axios
      .get('http://localhost:3000/test')
      .then((response) => {
        if (response.data.status === 'success') {
          setCharacters(response.data.data);
          setFilteredCharacters(response.data.data);
        } else {
          setError('Failed to fetch data');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  // arama fonksiyonu
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(searchValue)
    );
    setFilteredCharacters(filtered);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredCharacters);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Characters');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'FilteredCharacters.xlsx'); // Trigger the file download
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Characters</h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <button className="btn btn-primary mb-4" onClick={exportToExcel}>
        Download as Excel
      </button>

      {loading ? (
        <div className="alert alert-info">loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>name</th>
              <th>eye color</th>
              <th>gender</th>
            </tr>
          </thead>
          <tbody>
            {filteredCharacters.map((character, index) => (
              <tr key={index}>
                <td>{character.name}</td>
                <td>{character.eyeColor}</td>
                <td>{character.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CharacterList;
