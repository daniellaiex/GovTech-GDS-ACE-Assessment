import { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

interface SearchBarProps {
  onSearch: (staffPassId: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
    onSearch(newSearchText);
  };

  return (
    <div style={{ width: '100%' }} className='mb-3'>
      <Form>
        <FormControl 
          type="text" 
          placeholder="Search Staff" 
          className="mr-sm-2" 
          value={searchText} 
          onChange={handleSearch} 
          style={{ width: '100%' }}
        />
      </Form>
    </div>
  );
};

export default SearchBar;