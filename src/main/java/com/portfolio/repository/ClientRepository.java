package com.portfolio.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import com.portfolio.model.Client;

/**
 * Repository for CRUD operations against database of {@link Client}s.
 * 
 * @author aleksandar.milicevic
 *
 */
public interface ClientRepository
    extends CrudRepository<Client, Integer>, JpaSpecificationExecutor<Client> {

}
