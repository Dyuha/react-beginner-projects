import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';

const Users = ({ items, isLoading, onChangeSearchValue, searchValue, invites, onClickInvite, onClickSuccess }) => {
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input onChange={onChangeSearchValue} type="text" placeholder="Найти пользователя..." value={searchValue}/>
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {items.filter( item => {
            const fullName = (item.first_name + " " + item.last_name).toLowerCase();
            const email = item.email.toLowerCase();
            return (
              fullName.includes(searchValue.toLowerCase()) || 
              email.includes(searchValue.toLowerCase())
            )
          }).map( (item) => (
            <User key={item.id} id={item.id}
                  email={item.email}
                  firstName={item.first_name}
                  lastName={item.last_name}
                  avatar={item.avatar}
                  onClickInvite={onClickInvite}
                  isInvited={invites.includes(item.id)}/>
          ))}
        </ul>
      )}
      <button disabled={!invites.length} onClick={() => onClickSuccess()} className="send-invite-btn">Отправить приглашение</button>
    </>
  );
};

export default Users;