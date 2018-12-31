package com.portfolio.repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import com.portfolio.model.Client;

/**
 * Specification class for filtering {@link Client}s.
 * 
 * @author aleksandar.milicevic
 *
 */
public class ClientSpecification implements Specification<Client> {

  private static final long serialVersionUID = 3062358340957748504L;

  private String filter;

  public ClientSpecification(String filter) {
    this.filter = filter;
  }

  @Override
  public Predicate toPredicate(Root<Client> root, CriteriaQuery<?> query,
      CriteriaBuilder criteriaBuilder) {
    if (filter != null) {
      final String[] filterParts = filter.split(":");
      if (root.get(filterParts[0]).getJavaType() == String.class) {
        return criteriaBuilder.like(root.<String>get(filterParts[0]), "%" + filterParts[1] + "%");
      }
    }
    return null;
  }
}
