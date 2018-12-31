package com.portfolio.model;

import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Entity class that represents a client.
 * 
 * @author aleksandar.milicevic
 *
 */
@Entity
public class Client {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  private String name;

  private String email;

  private String phoneNumber;

  private String identificationNumber;

  private String contactPerson;

  private LocalDate lastContactDate;

  private IncomeLevel incomeLevel;

  private String description;

  private Status status;

  private Municipality municipality;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getIdentificationNumber() {
    return identificationNumber;
  }

  public void setIdentificationNumber(String identificationNumber) {
    this.identificationNumber = identificationNumber;
  }

  public String getContactPerson() {
    return contactPerson;
  }

  public void setContactPerson(String contactPerson) {
    this.contactPerson = contactPerson;
  }

  public LocalDate getLastContactDate() {
    return lastContactDate;
  }

  public void setLastContactDate(LocalDate lastContactDate) {
    this.lastContactDate = lastContactDate;
  }

  public IncomeLevel getIncomeLevel() {
    return incomeLevel;
  }

  public void setIncomeLevel(IncomeLevel incomeLevel) {
    this.incomeLevel = incomeLevel;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }

  public Municipality getMunicipality() {
    return municipality;
  }

  public void setMunicipality(Municipality municipality) {
    this.municipality = municipality;
  }
}
