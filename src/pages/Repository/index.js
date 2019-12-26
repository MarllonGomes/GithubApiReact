import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {FaSpinner} from "react-icons/fa";
import api from '../../services/api';

import {Loading, Container, Owner, IssuesList, Issue, BackLink} from './styles';
import {toast} from "react-toastify";

export default function Repository(props, context) {

  let {repository} = useParams();
  repository = decodeURIComponent(repository);
  const [repoInfo, setRepoInfo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [repoResponse, issuesResponse] = await Promise.all([
          api.get(`/repos/${repository}`),
          api.get(`/repos/${repository}/issues`, {
            params: {
              state: 'open',
              per_page: 5
            }
          })
        ]);

        setRepoInfo(repoResponse.data);
        setIssues(issuesResponse.data);
        setLoading(false);
      } catch (e) {
        setLoading(true);
        setRepoInfo({});
        setIssues([]);
        toast('O repositório solicitado não existe, você será redirecionado para a página de listagem...',{type: "warning"});
        setTimeout(() => {
          props.history.push('/');
        },2000);
      }
    };

    fetchData();
  }, [repository,props]);

  if(loading) {
      return <Loading><FaSpinner size={35} color="#FFF"/>Carregando</Loading>;
  }

  return (
    <Container>
      <BackLink to="/">Voltar</BackLink>
      <Owner>
        <img src={repoInfo.owner.avatar_url} alt={repoInfo.owner.login}/>
        <h1>{repoInfo.full_name}</h1>
        <p>{repoInfo.description}</p>
      </Owner>

      <IssuesList>
        {issues.map(issue => (
            <Issue key={issue.id}>
                <a href={issue.html_url}>{issue.title}
                {issue.labels.map(label => (
                  <span key={label.name} title={label.description}>{label.name}</span>
                ))}
                </a>
            </Issue>
        ))}
      </IssuesList>
    </Container>
  )
}
