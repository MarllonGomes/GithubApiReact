import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { toast } from "react-toastify";

import api from '../../services/api';
import { Container, Form, SubmitButton, List } from './styles';

export default function Main() {
  const [repositories, setRepositories] = useState([]);
  const [newRepo, setNewRepo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const reps = localStorage.getItem('repositories');
    if(reps) {
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

    try {
      setLoading(true);
      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };

      setRepositories([...repositories, data]);
      setLoading(false);
      setNewRepo('');

      toast('Repositório adicionado com sucesso!',{type: "success"});
    } catch (e) {
      setLoading(false);
      setNewRepo('');
      toast('O repositório não existe.',{type: "error"});
    }
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
            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
