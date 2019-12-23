import React, { useState, useEffect } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';
import { Container, Form, SubmitButton, List } from './styles';

export default function Main() {
  const [repositories, setRepositories] = useState([]);
  const [newRepo, setNewRepo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const reps = localStorage.getItem('repositories');
    if (reps) {
      setRepositories(JSON.parse(reps));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  const handleInputChange = e => {
    setNewRepo(e.target.value);
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name,
    };

    setRepositories([...repositories, data]);
    setLoading(false);
    setNewRepo('');
  };

  return (
    <Container>
      <h1>
        <FaGithubAlt /> Repositórios
      </h1>

      <Form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          onChange={handleInputChange}
          value={newRepo}
        />

        <SubmitButton disabled={loading}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositories.map(repository => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <a href="#">Detalhes</a>
          </li>
        ))}
      </List>
    </Container>
  );
}
