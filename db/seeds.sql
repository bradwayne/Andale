INSERT INTO users
    (first_name, last_name, gender, username,email, password, location, hometown, dob, photo, bio)
VALUES 
    ('SK', 'Tan', 'Male', 'sktan', 'sktan@gmail.com', 'abcd123', 'Cleveland, OH', 'Penang, Malaysia', '1986-09-07', '', 'trying to burn off da belly fat, i am interested in any intense cardio'),
    ('Lebron', 'James', 'Male', 'bronbron', 'lebron@james.com', 'abcd123', 'Cleveland, OH', 'Akron, OH', '1988-01-27', '', 'ima humble kid from akron yo, lets ball'),
    ('Peter', 'Gade', 'Male', 'pgade', 'peter@gade.com', '1234abc', 'Chicago, MI', 'Chicago. MI', '1979-04-07', '', 'international badminton player'),
    ('Muhammad', 'Ali', 'Male', 'muhammadAli', 'muhammad@ali.com', 'aliali321', 'Louisville, KY', 'Louisville, KY', '1942-01-17', '', 'i hated every minute of training, but i said dont quit, suffer now and live the rest of your life as a champion'),
    ('Maria', 'Sharapova', 'Female', 'mpova', 'maria@sharapova.com', 'mariamaria100', 'Cleveland, OH', 'Cleveland, OH', '1987-04-19', '', 'my main goal is to stay healthy because when you are injured you realise how lucky you are to have your health.'),
    ('Ronda', 'Rousey' , 'Female' ,'rousey', 'ronda@rousey.com', 'rondayo123', 'Cleveland Heights, OH' ,'Riverside, CA',  '1987-02-01', '', 'you have to fight because you cannot count on anyone else fighting for you. now, put on your boxing gloves'),
    ('Serena', 'Williams', 'Female' , 'serenaWilliams', 'serena@williams.com', 'serenavenus155', 'Cleveland Heights, OH', 'Saginaw, MI', '1981-09-26', '', 'i definitely have found a balance. i have had so many offers in the past to do different movies or different things and i always choose tournaments over it.'),
    ('Hope', 'Solo', 'Female', 'isolou', 'hope@solo.com', 'youhope543', 'Cleveland, OH', 'Richland, WA', '1981-07-30', '', 'Even when quitting seems like the best option, theres always a reason to keep going.');



INSERT INTO sports
    (name, sport_type)
VALUES
    ('Badminton', 'Net Sport'),
    ('Race Track', 'Motorsport'),
    ('Tennis', 'Net Sport'),
    ('Basketball', 'Street Sport'),
    ('Boxing', 'Combat Sport'),
    ('Bowling', 'Throwing Sport');


INSERT INTO events 
    (name, location, attendants, fees, host, phone_contact, email_contact, gender, level, age, details, start_time, end_time)
VALUES
    ('3 ON 3 Basketball', 'Cleveland, OH', '1', '5', 'SK Tan', '85933367', 'sktan@gmail.com', 'Male', '4', '20', 'We have 5 players, and looking to play some basketball after our coding bootcamp lecture! Join us!', '2018-02-25 21:30:00', '2018-02-25 23:30:00'),
    ('Bowling at Corner Alley', 'Cleveland, OH', '3', '15', 'Hope Solo', '85954599', 'hope@solo.com', 'Unspecified', '1', '30', 'New in town! Looking forward to meet some new friends that share the same interest!!', '2018-04-05 18:30:00',  '2018-04-05 20:00:00' ),
    ('Shaker Badminton Club', 'Shaker Heights, OH', '12', '4', 'Peter Gade', '28042399', 'peter@gade.com', 'Unspecified', '8', '8',  'We are looking for 2 expert players for regular play day, we have an open court this Saturday, come try out if we are the one for you!', '2018-03-11 10:00:00',  '2018-03-11 22:00:00' ),
    ('Looking for a female sparring partner', 'Cleveland, OH', '1', '20', 'Serena Williams', '85015000', 'serena@williams.com', 'Female', '10', '25', 'YO! I have a tournament coming, I need to get my fitness level up to kick some butts! Weakling stay out! I MEAN IT', '2018-02-21 13:00:00',  '2018-02-21 19:00:00' );

