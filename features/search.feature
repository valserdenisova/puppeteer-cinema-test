Feature: Ticket booking

  Scenario: Booking one ticket
    Given this user visited the page "/client/index.php"
    When the user selects the day of the booking week "2"
    When the user selects the show time and movie title "Сталкер(1979)"
    When the user has selected any free seat in the auditorium
    When the user clicks the «Reservation» button
    Then sees the booking confirmation with the name of the movie "Сталкер(1979)"

  Scenario: Booking multiple tickets
    Given this user visited the page "/client/index.php"
    When the user selects the day of the booking week "3"
    When the user selects the show time and movie title "Ведьмак"
    When the user has selected any free seat in the auditorium
    When the user has selected any free seat in the auditorium
    When the user has selected any free seat in the auditorium
    When the user clicks the «Reservation» button
    Then sees the booking confirmation with the name of the movie "Ведьмак"

  Scenario: Reservation of occupied seats
    Given this user visited the page "/client/index.php"
    When the user selects the day of the booking week "2"
    When the user selects the show time and movie title "Сталкер(1979)"
    When a user selects a seat in the hall that is not available for booking
    When the user clicks the «Reservation» button
    Then the user understands that the «Reservation» button is inactive