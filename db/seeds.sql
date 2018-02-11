INSERT INTO users
    (first_name, last_name, sex, location, dob)
VALUES 
    ('SK', 'Tan', 'Male', 'Cleveland, OH', '1986-09-07'),
    ('Lebron', 'James', 'Male', 'Cleveland, OH', '1988-01-27'),
    ('Peter', 'Gade', 'Male', 'Chicago, MI', '1979-04-07'),
    ('Muhammad', 'Ali', 'Male', 'Louisville, KY', '1942-01-17'),
    ('Maria', 'Sharapova', 'Female', 'Cleveland, OH', '1987-04-19'),
    ('Ronda', 'Rousey', 'Female', 'Riverside, CA', '1987-02-01'),
    ('Serena', 'Williams', 'Female', 'Saginaw, MI', '1981-09-26'),
    ('Hope', 'Solo', 'Female', 'Richland, WA', '1981-07-30');



INSERT INTO activities
    (name, activity_type)
VALUES
    ('Badminton', 'Net Sport'),
    ('Race Track', 'Motorsport'),
    ('Tennis', 'Net Sport'),
    ('Basketball', 'Street Sport'),
    ('Boxing', 'Combat Sport'),
    ('Bowling', 'Throwing Sport');

INSERT INTO events 
    (name, attendants, fees, host, sex, level, details, start_time, end_time)
VALUES
    ('3 ON 3 Basketball', '1', '5', 'SK Tan', 'Male', '4', 'We have 5 players, and looking to play some basketball after our coding bootcamp lecture! Join us!', '2018-02-25 21:30:00', '2018-02-25 23:30:00'),
    ('Bowling at Corner Alley', '3', '15', 'Hope Solo', 'Unspecified', '1', 'New in town! Looking forward to meet some new friends that share the same interest!!', '2018-04-05 18:30:00',  '2018-04-05 20:00:00' ),
    ('Shaker Badminton Club', '12', '4', 'Peter Gade', 'Unspecified', '8', 'We are looking for 2 expert players for regular play day, we have an open court this Saturday, come try out if we are the one for you!', '2018-03-11 10:00:00',  '2018-03-11 22:00:00' ),
    ('Looking for a female sparring partner', '1', '20', 'Serena Williams', 'Female', '10', 'YO! I have a tournament coming, I need to get my fitness level up to kick some butts! Weakling stay out! I MEAN IT', '2018-02-21 13:00:00',  '2018-02-21 19:00:00' )
