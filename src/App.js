import React, { useEffect, useState } from 'react';
import { usersAPI } from './API';
import './index.scss';
import { Success } from './components/Success';
import  Users from './components/Users/Users';

// Тут список пользователей: https://reqres.in/api/users

const App = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [invites, setInvites] = useState([]);
  const [isSuccess, setSuccess] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      try {  
        const data = await usersAPI.getUsers()
        setUsers(data)
        setLoading(false)
      }  catch (error) {
       console.log(error.message)
      }
    }
    getUsers();
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)){
      setInvites( prev => prev.filter( _id => _id !== id))
    } else {
      setInvites( prev => [...prev, id])
    }
  }

  const onClickSuccess = () => {
    setSuccess(!isSuccess);
  }

  return (
    <div className="App">
      {isSuccess 
        ? <Success count={invites.length} onClickSuccess={onClickSuccess}/> 
        : <Users  searchValue={searchValue}
                  onChangeSearchValue={onChangeSearchValue}
                  items={users} 
                  isLoading={isLoading}
                  onClickInvite={onClickInvite}
                  invites={invites}
                  onClickSuccess={onClickSuccess}/>
      }
    </div>
  );
}

export default App;
