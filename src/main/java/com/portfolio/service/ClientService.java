package com.portfolio.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort.Direction;
import com.portfolio.exception.ClientException;
import com.portfolio.model.Client;
import com.portfolio.repository.ClientRepository;

/**
 * Wrapper around {@link ClientRepository}.
 * 
 * @author aleksandar.milicevic
 *
 */
public interface ClientService {

  Client create(Client client) throws ClientException;

  Page<Client> readAllPageable(String orderBy, Direction direction, int page, int size,
      String filter) throws ClientException;

  Client readById(Integer id) throws ClientException;

  Client update(Integer id, Client client) throws ClientException;

  void delete(Integer id) throws ClientException;
}
