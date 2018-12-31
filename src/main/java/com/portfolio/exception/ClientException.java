package com.portfolio.exception;

/**
 * General API exception.
 * 
 * @author aleksandar.milicevic
 *
 */
public class ClientException extends RuntimeException {

  private static final long serialVersionUID = -6356839987896879322L;

  public ClientException(final String message) {
    super(message);
  }

}
