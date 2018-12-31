package com.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.portfolio.model.Client;
import com.portfolio.service.ClientService;

/**
 * {@link Client}'s REST endpoints.
 * 
 * @author aleksandar.milicevic
 *
 */
@RestController
@RequestMapping(path = "/api/clients")
public class ClientController {

  @Autowired
  private ClientService clientService;

  @PostMapping
  public Client createClient(@RequestBody Client client) {
    return clientService.create(client);
  }

  @GetMapping
  public Iterable<Client> readAllClients(
      @RequestParam(required = false, defaultValue = "name") String orderBy,
      @RequestParam(required = false, defaultValue = "ASC") Direction direction,
      @RequestParam(required = false, defaultValue = "0") int page,
      @RequestParam(required = false, defaultValue = "10") int size,
      @RequestParam(required = false) String filter) {
    return clientService.readAllPageable(orderBy, direction, page, size, filter);
  }

  @GetMapping(path = "/{id}")
  public Client readClient(@PathVariable Integer id) {
    return clientService.readById(id);
  }

  @PutMapping(path = "/{id}")
  public void updateClient(@PathVariable Integer id, @RequestBody Client client) {
    clientService.update(id, client);
  }

  @DeleteMapping(path = "/{id}")
  public void deleteClient(@PathVariable Integer id) {
    clientService.delete(id);
  }
}
