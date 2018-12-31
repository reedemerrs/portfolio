package com.portfolio.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import com.portfolio.exception.ClientException;
import com.portfolio.model.Client;
import com.portfolio.repository.ClientRepository;
import com.portfolio.repository.ClientSpecification;

/**
 * MySQL implementation for {@link ClientService}.
 * 
 * @author aleksandar.milicevic
 *
 */
@Service
public class MySQLClientService implements ClientService {

  @Autowired
  private ClientRepository clientRepository;

  @Override
  public Client create(Client client) {
    return clientRepository.save(client);
  }

  @Override
  public Page<Client> readAllPageable(String orderBy, Direction direction, int page, int size,
      String filter) {
    return clientRepository.findAll(new ClientSpecification(filter),
        PageRequest.of(page, size, new Sort(direction, orderBy)));
  }

  @Override
  public Client readById(Integer id) {
    return clientRepository.findById(id)
        .orElseThrow(() -> new ClientException("Client with id " + id + " does not exist"));
  }

  @Override
  public Client update(Integer id, Client client) {
    final Client storedClient = readById(id);
    BeanUtils.copyProperties(client, storedClient);
    return clientRepository.save(storedClient);
  }

  @Override
  public void delete(Integer id) {
    clientRepository.delete(readById(id));
  }
}
