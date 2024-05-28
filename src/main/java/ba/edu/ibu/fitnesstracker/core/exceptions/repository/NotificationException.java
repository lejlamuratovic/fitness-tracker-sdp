package ba.edu.ibu.fitnesstracker.core.exceptions.repository;

import ba.edu.ibu.fitnesstracker.core.exceptions.GeneralException;

public class NotificationException extends GeneralException {
    public NotificationException(String message) {
        super(message);
    }

    public NotificationException(String message, Exception e) {
        super(message, e);
    }
}
