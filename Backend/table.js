const sqlite3 = require('sqlite3').verbose();
let sql;
// connect to db
const db = new sqlite3.Database("/home/sourav/Documents/RMdb/Backend/index.db", sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err.message);
});


// sql = `CREATE TABLE users(username,email TEXT PRIMARY KEY,password,jwt)`;
// db.run(sql);

// SECRET_KEY = "RMDb";
// sql = `INSERT INTO users(username,email,password,jwt) VALUES (?,?,?,?)`
// db.run(sql,["user1","user1@gmail.com","test1","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwicm9sZSI6InVzZXIifQ.5lqo5TkiOKEkmEJTXcEaxzCcD2VrKe2Uv2x_JuYVlyU"],(err)=>{
//   if(err) return console.error(err.message);
// });
// db.run(sql,["user2","user2@gmail.com","test2","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyIiwicm9sZSI6InVzZXIifQ.CtT3CWXm5LgbjprQwIztYFu0zx0ce3CkCGlIubfqXPI"],(err)=>{
//   if(err) return console.error(err.message);
// });
// db.run(sql,["user3","user3@gmail.com","test3","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIzIiwicm9sZSI6InVzZXIifQ.9tSjzCQRNR2cr3WN-cm52jAfOp7_a1cEGCYVY1MYp74"],(err)=>{
//     if(err) return console.error(err.message);
// });
// db.run(sql,["user4","user4@gmail.com","test4","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXI0Iiwicm9sZSI6InVzZXIifQ.wCn2_qODDG7fNPmcGnAfu80HMBziZE-jx2pSsNqOclM"],(err)=>{
//     if(err) return console.error(err.message);
// });
// db.run(sql,["user5","user5@gmail.com","test5","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXI1Iiwicm9sZSI6InVzZXIifQ.EUbalCHA3pkTJ0-owt99jMNz49bdaZfRrqFK1nSAgi0"],(err)=>{
//     if(err) return console.error(err.message);
// });


// sql = `UPDATE users SET pic="https://lh3.googleusercontent.com/a/ACg8ocLPxGeQKjUTI0wnjiQwvxqCxj-gq4FBTRKpNsU0xT2M=s96-c" WHERE email="sourav@ma.iitr.ac.in"`;
// db.run(sql);

// sql = `ALTER TABLE SpiderManreviews
// RENAME TO SpiderManAcrosstheSpiderVersereviews`;
// db.run(sql); 

// db.run(`ALTER TABLE users DROP COLUMN jwt;`)

// sql = `DELETE FROM allcelebrities WHERE name="Yash Chopra"`;
// db.run(sql);

// sql=`DROP TABLE allmovies`;
// db.run(sql);



// db.run(`CREATE TABLE allmovies(name TEXT PRIMARY KEY,rating,overview,img,time,release,director,writer,stars,genres,trailer,ott,trailersrc)`);
sql = `INSERT INTO allmovies(name,rating,overview,img,time,release,director,writer,stars,genres,trailer,ott,trailersrc) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
// db.run(sql,["Oppenheimer","8.4","A dramatization of the life story of J. Robert Oppenheimer, the physicist who had a large hand in the development of the atomic bomb, thus helping end World War 2. We see his life from university days all the way to post-WW2, where his fame saw him embroiled in political machinations.","/images/uploads/Oppenheimer(cover).jpg","3h","21 July 2023","Christopher Nolan","Christopher Nolan,Kai Bird,Martin Sherwin","Cillian Murphy,Emily Blunt,Matt Damon","Biography,Drama,History",`<iframe width="560" height="315" src="https://www.youtube.com/embed/uYPbbksJxIg?si=ub1LLmoGZ7aHDrvm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,"Amazon Prime Video","https://www.youtube.com/embed/uYPbbksJxIg?si=ub1LLmoGZ7aHDrvm"]);
db.run(sql,["Spider-Man: Across the Spider-Verse","8.6","Miles Morales returns for the next chapter of the Oscar®-winning Spider-Verse saga, an epic adventure that will transport Brooklyn's full-time, friendly neighborhood Spider-Man across the Multiverse to join forces with Gwen Stacy and a new team of Spider-People to face off with a villain more powerful than anything they have ever encountered.","/images/uploads/Spider-Man:(cover).jpg","2h 20m","2 June 2023","Joaquim Dos Santos,Kemp Powers,Justin K. Thompson","Phil Lord,Christopher Miller,Dave Callaham","Shameik Moore,Hailee Steinfeld,Brian Tyree Henry","Animation,Action,Adventure,Family,Fantasy,Sci-Fi",`<iframe width="560" height="315" src="https://www.youtube.com/embed/shW9i6k8cB0?si=sd4XzW1N09bhNEEF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,"Netflix","https://www.youtube.com/embed/shW9i6k8cB0?si=sd4XzW1N09bhNEEF"]);
db.run(sql,["Jawan","7.0","Driven by a desire to rectify societal wrongs, Vikram embarks on a mission to obliterate Kalee and presents the government with a set of demands, setting the stage for an electrifying and high-stakes showdown. The film delivers a strong social message about issues like the corrupt political system, challenges faced by farmers, and flaws in the healthcare system. It emphasizes the power of the index finger during elections as a means for citizens to actively participate in shaping the destiny of their country.","/images/uploads/Jawan(cover).jpg","2h 49m","7 September 2023","Atlee","Sumit Arora,Atlee,Ramanagirivasan","Shah Rukh Khan,Nayanthara,Vijay Sethupathi","Action,Thriller",`<iframe width="560" height="315" src="https://www.youtube.com/embed/MWOlnZSnXJo?si=yI3ffpdBiq0Ms5EW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,"Netflix","https://www.youtube.com/embed/MWOlnZSnXJo?si=yI3ffpdBiq0Ms5EW"]);
db.run(sql,["Dunki","7.8","Four friends from a village in Punjab share a common dream: to go to England. Their problem is that they have neither the visa nor the ticket. A soldier promises to take them to the land of their dreams. Dunki is a hilarious and heartwarming saga of a perilous journey, borders, friendships, nostalgia for home, and love that towers above it all.","/images/uploads/Dunki(cover).jpg","2h 40m","21 December 2023","Rajkumar Hirani","Kanika Dhillon,Rajkumar Hirani,Abhijat Joshi","Shah Rukh Khan,Taapsee Pannu,Boman Irani","Comedy,Drama",`<iframe width="560" height="315" src="https://www.youtube.com/embed/uOlDK7g7b-E?si=pM1RNo-Dvk_0NpFa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,"Only in Theatures","https://www.youtube.com/embed/uOlDK7g7b-E?si=pM1RNo-Dvk_0NpFa"]);
db.run(sql,["OMG 2","7.6","Kanti Sharan Mudgal a devotee of Lord Shiva who runs a shop in the temple premises and lives happily with his family.He gets a shocked when he finds that his son Vivek has been admitted to hospital and finds that the Doctor only wants to speak to him.After Doctor's consultation Kanti finds from Vivek's friend Zaheer that in order to increase size of his penis Vivek had taken pills after his classmates questioned about his size which lead him to hospitalization.Kanti convinces Vivek to join back school but he is issued a rustication letter after his video goes viral of masturbating in school bathroom.Kanti's world turns upside down after this incident as the video becomes viral in society and everyone avoids his family.As Kanti is true follower of Lord Shiva he sends his messenger to help Kanti in his difficult times.The messenger roams as a vagabond in the region and helps Kanti in his difficult times.Kanti gets the courage and files a case against Vivek's school and others responsible for the same and also files a plea in court to make sex education compulsory in school so that kids don't go wrong way.","/images/uploads/OMG(cover).jpg","2h 36m","11 August 2023","Amit Rai","Amit Rai","Akshay Kumar,Pankaj Tripathi,Yami Gautam","Comedy,Drama",`<iframe width="560" height="315" src="https://www.youtube.com/embed/Y6ZKXqM7HNQ?si=pkgSSx6oNuSp--lG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,"Netflix","https://www.youtube.com/embed/Y6ZKXqM7HNQ?si=pkgSSx6oNuSp--lG"]);
db.run(sql,["Salaar","7.1","A gang leader tries to keep a promise made to his dying friend and takes on the other criminal gangs.","/images/uploads/Salaar(cover).jpg","2h 55m","22 December 2023","Prashanth Neel","Sandeep Reddy Bandla,Choudary Hanuman,Prashanth Neel","Prabhas,Prithviraj Sukumaran,Shruti Haasan","Action,Drama,Thriller",`<iframe width="560" height="315" src="https://www.youtube.com/embed/HihakYi5M2I?si=IlEEx83eudBikIEf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,"Only in Theatures","https://www.youtube.com/embed/HihakYi5M2I?si=IlEEx83eudBikIEf"]);
db.run(sql,["Animal","6.9","Balbir Singh is a rich industrialist but has no time for his family. His son Ranvijay loves him to the core and considers him a superhero. But differences develop between them, and Ranvijay is sent to boarding school. Years later, he returns to celebrate the 60th birthday of Balbir but is asked to leave the house. While leaving, he is surprised to see Gitanjali, who has broken her engagement and wants to be with him. They both get married in a private ceremony and shift to US. Eight years later, Balbir is attacked by unknown assailants but survives. Ranvijay returns with Gitanjali and his kids to be with his family, and starts a war with the people who tried to assassinate Balbir.","/images/uploads/Animal(cover).jpg","3h 24m","1 December 2023","Sandeep Reddy Vanga","Suresh Bandaru,Saurabh Gupta,Pranay Reddy Vanga","Ranbir Kapoor,Anil Kapoor,Bobby Deol","Action,Crime,Drama,Thriller",`<iframe width="560" height="315" src="https://www.youtube.com/embed/8FkLRUJj-o0?si=PUp4W8LiHu-MfaT4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,"Only in Theatures","https://www.youtube.com/embed/8FkLRUJj-o0?si=PUp4W8LiHu-MfaT4"]);
db.run(sql,["Tu Jhoothi Main Makkaar","6.0","Mickey belongs to a well-known business family, as a side business he along with his friend Dabbas help couples to separate who are not happy in their relationships.During bachelor-rate of Dabbas he meets Tinni and both fall in love after lot of hide and seek in relationship.Mickey and Tinni's parents agree for their marriage but Tinni finds that Mickey's family is quite possessive about him.Tinni feels that she won't be able to adjust in his family as she wants her own space.Tinni contacts for advise in breaking her relationship not knowing that she is speaking to none other then Mickey.","/images/uploads/Tu(cover).jpg","2h 30m","8 March 2023","Luv Ranjan","Rahul Mody,Luv Ranjan","Ranbir Kapoor,Shraddha Kapoor,Anubhav Singh Bassi","Comedy,Romance",`<iframe width="560" height="315" src="https://www.youtube.com/embed/Cx_Dtwn4ayw?si=_SDUaziPThEWvMdq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,"Netflix","https://www.youtube.com/embed/Cx_Dtwn4ayw?si=_SDUaziPThEWvMdq"]);
db.run(sql,["K.G.F: Chapter 2","8.3","The blood-soaked land of Kolar Gold Fields (KGF) has a new overlord now - Rocky, whose name strikes fear in the heart of his foes. His allies look up to Rocky as their savior, the government sees him as a threat to law and order; enemies are clamoring for revenge and conspiring for his downfall. Bloodier battles and darker days await as Rocky continues on his quest for unchallenged supremacy.","/images/uploads/K.G.F:(cover).jpg","2h 46m","14 April 2022","Prashanth Neel","Prashanth Neel","Yash,Sanjay Dutt,Raveena Tandon","Action,Crime,Drama,Thriller",`<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/JKa05nyUmuQ?si=mheOd0NSyYAX4DFo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,"Amazon Prime Video","https://www.youtube-nocookie.com/embed/JKa05nyUmuQ?si=mheOd0NSyYAX4DFo"]);
db.run(sql,["Sita Ramam","8.6","Afreen is a student president of Pakistan at a university in London. She takes up the job of delivering a letter to Sita Mahalakshmi at the insistence of her grandfather's will. Though she doesn't like the job, she agrees to do it to get her share of her grandfather's property. The letter is written by Lieutenant Ram to Sita.","/images/uploads/Sita(cover).jpg","2h 43m","5 August 2022","Hanu Raghavapudi","Hanu Raghavapudi,Jay Krishna,Raj Kumar Kandamudi","Dulquer Salmaan,Mrunal Thakur,Rashmika Mandanna","Action,Drama,Mystery,Romance",`<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/3UKsbXQUwqw?si=rRQrZdn_WWCunkuH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,"Disney Hotstar","https://www.youtube-nocookie.com/embed/3UKsbXQUwqw?si=rRQrZdn_WWCunkuH"]);
db.run(sql,["RRR","7.8","During the British era, Malli, a small tribal girl, is taken away by British governor Scott Buxton and his wife Catherine against the wishes of her mother. Rama Raju is an Indian cop who works for the British army; for him duty comes first, and he is very ruthless to revolutionary Indians but is never given his due by British government. The British government find that a tribal Komaram Bheem, who considers Malli his sister, has started his search for her and could be an obstacle for the British army. The governor and his wife announce a special post for any officer who can bring Bheem to them. Rama Raju decides to take the matters into his own hands and promises the government to bring him in dead or alive. Bheem by now has reached he city in search of Malli and pretends to be a mechanic, Akhtar. During a train accident on a lake he and Rama Raju risk their lives and save a kid and become best of friends. But each man will clash with the other and will thirst for each other's blood in order to complete their missions.","/images/uploads/RRR(cover).jpg","3h 7m","25 March 2022","S.S. Rajamouli","Vijayendra Prasad,S.S. Rajamouli,Sai Madhav Burra","N.T. Rama Rao Jr.,Ram Charan,Ajay Devgn","Action,Drama",`<iframe width="560" height="315" src="https://www.youtube.com/embed/f_vbAtFSEc0?si=wcZS-sJik2yP15lC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,"Netfilx","https://www.youtube.com/embed/f_vbAtFSEc0?si=wcZS-sJik2yP15lC"]);
db.run(sql,["Brahmastra Part One: Shiva","5.6","In ancient India people of Brahmansh community would take care of their spiritual weapon Brahmastra but as years passed by with changing times people started to forget about it. In present day Shiva a DJ has strange connection with fire which never harms him he meets Isha and both fall in love. A Delhi based scientist Mohan Bhargav from Brahmansh community possess a piece of Brahmastra and gets attacked by two evil forces Zor and Raftaar but he manages to overcome them with powers of Vanarastra but the evil queen Junoon manages to control him and tortures to ask about Brahmastra. But Bhargav being protector of it gives his life which is seen by Shiva in hallucinations after he comes in contact with fire he also notices that next target could be an artist Anish Shetty. Shiva and Isha go to save Anish at Varanasi where he tells him the events he saw but Junoon has already reached there to kill him but Anish manages to escape with Shiva and Isha with power of Nandiastra and asks them to take him to Guruji's Ashram in Himachal. On the way Anish finds who actually is Shiva and gives his piece of Brahmastra to Isha and asks her to reach it safely to Guruji as Junoon is following them who is unaware of Guruji's Ashram. Anish loses his life while fighting with Junoon and her men while after lot of hurdles Shiva and Isha reach Guruji's Ashram where Guruji reveals who actually Shiva is and his connection with fire. And that Brahmastra has three pieces of which one is missing and if Junoon joins them all together the universe will be destroyed.","/images/uploads/Brahmastra(cover).jpg","2h 47m","9 September 2022","Ayan Mukerji","Hussain Dalal,Ayan Mukerji","Amitabh Bachchan,Ranbir Kapoor,Alia Bhatt","Action,Adventure,Fantasy",`<iframe width="560" height="315" src="https://www.youtube.com/embed/BUjXzrgntcY?si=YqIR6RAumMXClbXf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,"Disney Hotstar","https://www.youtube.com/embed/BUjXzrgntcY?si=YqIR6RAumMXClbXf"]);



// db.run(`CREATE TABLE Oppenheimerreviews(img,title,star,date,name,content)`);
// db.run(`CREATE TABLE SpiderManreviews(img,title,star,date,name,content)`);
// db.run(`CREATE TABLE Jawanreviews(img,title,star,date,name,content)`);
// db.run(`CREATE TABLE Dunkireviews(img,title,star,date,name,content)`);
// db.run(`CREATE TABLE OMGreviews(img,title,star,date,name,content)`);
// db.run(`CREATE TABLE Salaarreviews(img,title,star,date,name,content)`);
// db.run(`CREATE TABLE Animalreviews(img,title,star,date,name,content)`);
// db.run(`CREATE TABLE Tureviews(img,title,star,date,name,content)`);
// db.run(`CREATE TABLE KGFreviews(img,title,star,date,name,content)`);
// db.run(`CREATE TABLE Sitareviews(img,title,star,date,name,content)`);
// db.run(`CREATE TABLE RRRreviews(img,title,star,date,name,content)`);
// db.run(`CREATE TABLE Brahmastrareviews(img,title,star,date,name,content)`);


// sql = `INSERT INTO Brahmastrareviews(img,title,star,date,name,content) VALUES (?,?,?,?,?,?)`;
// db.run(sql,["images/uploads/userava1.jpg","Best Marvel movie in my opinion","8","17 December 2016","hawaiipierson","This is by far one of my favorite movies from the MCU. The introduction of new Characters both good and bad also makes the movie more exciting. giving the characters more of a back story can also help audiences relate more to different characters better, and it connects a bond between the audience and actors or characters. Having seen the movie three times does not bother me here as it is as thrilling and exciting every time I am watching it. In other words, the movie is by far better than previous movies (and I do love everything Marvel), the plotting is splendid (they really do out do themselves in each film, there are no problems watching it more than once."]);
// db.run(sql,["images/uploads/userava2.jpg","Just about as good as the first one!","6","7 July 2016"," jdaiipiershags",`Avengers Age of Ultron is an excellent sequel and a worthy MCU title! There are a lot of good and one thing that feels off in my opinion.

// THE GOOD:

// First off the action in this movie is amazing, to buildings crumbling, to evil blue eyed robots tearing stuff up, this movie has the action perfectly handled. And with that action comes visuals. The visuals are really good, even though you can see clearly where they are through the movie, but that doesn't detract from the experience. While all the CGI glory is taking place, there are lovable characters that are in the mix. First off the original characters, Iron Man, Captain America, Thor, Hulk, Black Widow, and Hawkeye, are just as brilliant as they are always. And Joss Whedon fixed my main problem in the first Avengers by putting in more Hawkeye and him more fleshed out. Then there is the new Avengers, Quicksilver, Scarletwich, and Vision, they are pretty cool in my opinion. Vision in particular is pretty amazing in all his scenes.

// THE BAD:

// The beginning of the film it's fine until towards the second act and there is when it starts to feel a little rushed. Also I do feel like there are scenes missing but there was talk of an extended version on Blu-Ray so that's cool.`]);
// db.run(sql,["images/uploads/userava3.jpg","One of the most boring exepirences from watching a movie","1","26 March 2017","christopherfreeman",`I can't right much... it's just so forgettable...Okay, from what I remember, I remember just sitting down on my seat and waiting for the movie to begin. 5 minutes into the movie, boring scene of Tony Stark just talking to his "dead" friends saying it's his fault. 10 minutes in: Boring scene of Ultron and Jarvis having robot space battles(I dunno:/). 15 minutes in: I leave the theatre.2nd attempt at watching it: I fall asleep. What woke me up is the next movie on Netflix when the movie was over.

// Bottemline: It's boring...

// 10/10 because I'm a Marvel Fanboy`]);
// db.run(sql,["images/uploads/userava4.jpg","That spirit of fun","7","2 December 2017"," juliawest",`If there were not an audience for Marvel comic heroes than clearly these films would not be made, to answer one other reviewer although I sympathize with him somewhat. The world is indeed an infinitely more complex place than the world of Marvel comics with clearly identifiable heroes and villains. But I get the feeling that from Robert Downey, Jr. on down the organizer and prime mover as Iron Man behind the Avengers these players do love doing these roles because it's a lot of fun. If they didn't show that spirit of fun to the audience than these films would never be made.

// So in that spirit of fun Avengers: Age Of Ultron comes before us and everyone looks like they're having a good time saving the world. A computer program got loose and took form in this dimension named Ultron and James Spader who is completely unrecognizable is running amuck in the earth. No doubt Star Trek fans took notice that this guy's mission is to cleanse the earth much like that old earth probe NOMAD which got its programming mixed up in that classic Star Trek prime story. Wouldst Captain James T. Kirk of the Enterprise had a crew like Downey has at his command.

// My favorite is always Chris Evans because of the whole cast he best gets into the spirit of being a superhero. Of all of them, he's already played two superheroes, Captain America and Johnny Storm the Human Torch. I'll be before he's done Evans will play a couple of more as long as the money's good and he enjoys it.

// Pretend you're a kid again and enjoy, don't take it so seriously.`]);
// db.run(sql,["images/uploads/userava5.jpg","Impressive Special Effects and Cast","9","14 Feb 2019","johnnylee",`The Avengers raid a Hydra base in Sokovia commanded by Strucker and they retrieve Loki's scepter. They also discover that Strucker had been conducting experiments with the orphan twins Pietro Maximoff (Aaron Taylor-Johnson), who has super speed, and Wanda Maximoff (Elizabeth Olsen), who can control minds and project energy. Tony Stark (Robert Downey Jr.) discovers an Artificial Intelligence in the scepter and convinces Bruce Banner (Mark Ruffalo) to secretly help him to transfer the A.I. to his Ultron defense system. However, the Ultron understands that is necessary to annihilate mankind to save the planet, attacks the Avengers and flees to Sokovia with the scepter. He builds an armature for self-protection and robots for his army and teams up with the twins. The Avengers go to Clinton Barton's house to recover, but out of the blue, Nick Fury (Samuel L. Jackson) arrives and convinces them to fight against Ultron. Will they succeed?

// "Avengers: Age of Ultron" is an entertaining adventure with impressive special effects and cast. The storyline might be better, since most of the characters do not show any chemistry. However, it is worthwhile watching this film since the amazing special effects are not possible to be described in words. Why Pietro has to die is also not possible to be explained. My vote is eight.`]);


// db.run(`CREATE TABLE Oppenheimercrew(name,role,img,work)`);
// db.run(`CREATE TABLE SpiderMancrew(name,role,img,work)`);
// db.run(`CREATE TABLE Jawancrew(name,role,img,work)`);
// db.run(`CREATE TABLE Dunkicrew(name,role,img,work)`);
// db.run(`CREATE TABLE OMGcrew(name,role,img,work)`);
// db.run(`CREATE TABLE Salaarcrew(name,role,img,work)`);
// db.run(`CREATE TABLE Animalcrew(name,role,img,work)`);
// db.run(`CREATE TABLE Tucrew(name,role,img,work)`);
// db.run(`CREATE TABLE KGFcrew(name,role,img,work)`);
// db.run(`CREATE TABLE Sitacrew(name,role,img,work)`);
// db.run(`CREATE TABLE RRRcrew(name,role,img,work)`);
// db.run(`CREATE TABLE Brahmastracrew(name,role,img,work)`);

// sql =`INSERT INTO Brahmastracrew(name,role,img,work) VALUES(?,?,?,?)`;
// db.run(sql,["Yash Chopra","director","images/uploads/cast1.jpg","... Director"]);
// db.run(sql,["Anurag Kashyap","director","images/uploads/cast2.jpg","... (based on Marvel comics)"]);
// db.run(sql,["Sanjay Leela Bhansali","director","images/uploads/cast3.jpg","... (character created by: Captain America)"]);
// db.run(sql,["Mahesh Bhatt","director","images/uploads/cast4.jpg","... (character created by: Thanos)"]);
// db.run(sql,["Rajkumar Hirani","director","images/uploads/cast5.jpg","... (character created by: Ultron, Vision"]);
// db.run(sql,["Amitabh Bachchan","cast","images/uploads/cast6.jpg","... Robert Downey Jr."]);
// db.run(sql,["Mohanlal","cast","images/uploads/cast7.jpg","... Thor"]);
// db.run(sql,["Irrfan Khan","cast","images/uploads/cast8.jpg","... Bruce Banner/ Hulk"]);
// db.run(sql,["Nana Patekar","cast","images/uploads/cast9.jpg","... Steve Rogers/ Captain America"]);
// db.run(sql,["Om Puri","cast","images/uploads/cast10.jpg","... Natasha Romanoff/ Black Widow"]);
// db.run(sql,["Shah Rukh Khan","cast","images/uploads/cast11.jpg","... Clint Barton/ Hawkeye"]);
// db.run(sql,["Aamir Khan","cast","images/uploads/cast12.jpg","... Ultron"]);
// db.run(sql,["Dhanush","cast","images/uploads/cast13.jpg","... James Rhodes/ War Machine"]);
// db.run(sql,["Ekta Kapoor","producer","images/uploads/cast14.jpg","... executive producer"]);
// db.run(sql,["Karan Johar","producer","images/uploads/cast15.jpg","... co-producer (as Mitch Bell)"]);
// db.run(sql,["Rakesh Roshan","producer","images/uploads/cast16.jpg","... associate producer"]);
// db.run(sql,["Aditya Chopra","producer","images/uploads/cast17.jpg","... producer"]);
// db.run(sql,["Ritesh Sidhwani","producer","images/uploads/cast18.jpg","... associate producer"]);


// db.run(`CREATE TABLE photos(Oppenheimerp,SpiderManp,Jawanp,Dunkip,OMGp,Salaarp,Animalp,Tup,KGFp,Sitap,RRRp,Brahmastrap)`)
// sql = `INSERT INTO vap(Oppenheimerp,SpiderManp,Jawanp,Dunkip,OMGp,Salaarp,Animalp,Tup,KGFp,Sitap,RRRp,Brahmastrap) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;
// db.run(sql,["/images/uploads/image10.jpg","/images/uploads/image10.jpg","/images/uploads/image10.jpg","/images/uploads/image10.jpg","/images/uploads/image10.jpg","/images/uploads/image10.jpg","/images/uploads/image10.jpg","/images/uploads/image10.jpg","/images/uploads/image10.jpg","/images/uploads/image10.jpg","/images/uploads/image10.jpg","/images/uploads/image10.jpg"]);



// db.run(`CREATE TABLE videos(Oppenheimerv,SpiderManv,Jawanv,Dunkiv,OMGv,Salaarv,Animalv,Tuv,KGFv,Sitav,RRRv,Brahmastrav)`)
// sql = `INSERT INTO videos(Oppenheimerv,SpiderManv,Jawanv,Dunkiv,OMGv,Salaarv,Animalv,Tuv,KGFv,Sitav,RRRv,Brahmastrav) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;
// db.run(sql,["https://www.youtube.com/embed/shW9i6k8cB0?si=sd4XzW1N09bhNEEF","https://www.youtube.com/embed/shW9i6k8cB0?si=sd4XzW1N09bhNEEF","https://www.youtube.com/embed/shW9i6k8cB0?si=sd4XzW1N09bhNEEF","https://www.youtube.com/embed/shW9i6k8cB0?si=sd4XzW1N09bhNEEF","https://www.youtube.com/embed/shW9i6k8cB0?si=sd4XzW1N09bhNEEF","https://www.youtube.com/embed/shW9i6k8cB0?si=sd4XzW1N09bhNEEF","https://www.youtube.com/embed/shW9i6k8cB0?si=sd4XzW1N09bhNEEF","https://www.youtube.com/embed/shW9i6k8cB0?si=sd4XzW1N09bhNEEF","https://www.youtube.com/embed/shW9i6k8cB0?si=sd4XzW1N09bhNEEF","https://www.youtube.com/embed/shW9i6k8cB0?si=sd4XzW1N09bhNEEF","https://www.youtube.com/embed/shW9i6k8cB0?si=sd4XzW1N09bhNEEF","https://www.youtube.com/embed/shW9i6k8cB0?si=sd4XzW1N09bhNEEF"])

// db.run(`INSERT INTO photos("'Jawan'") VALUES (?)`,["asdfghjkl"]);

// db.all(`SELECT * FROM allmovies`,[],(err,row)=>{
//     console.log(row);
// })

// db.run(`CREATE TABLE allcelebrities(name,img,profesion,Country,bio,dob,height)`)
// sql = `INSERT INTO allcelebrities(name,img,profesion,Country,bio,dob,height) VALUES (?,?,?,?,?,?,?)`
// db.run(sql,["Ritesh Sidhwani","images/uploads/cast18.jpg","Producer,Director","India",`Ritesh Sidhwani, a prominent and distinguished Indian filmmaker, is accredited for his visionary approach and peerless contribution to contemporary cinema. The two-time National awardee helms one of India's preeminent production houses, Excel Entertainment, a brand name aptly synonymous with excellence and success. The banner made its foray into the industry with Dil Chahta Hai (2001), a trailblazing film that not only bagged the National Award in 2001 by the President Of India but also acquired cult status amongst the millennial viewers as a forerunner of new age cinema.

// On the one hand, Excel's oeuvre comprises a string of box-office hits like Dil Chahta Hai (2001) , Don (2006) , Zindagi Na Milegi Dobara (2011) , Talaash: The Answer Lies Within (2012) & Fukrey (2013) . Alongside these blockbusters, Excel has also launched avant-garde ventures like Gully Boy (2019) , India's first hip hop film and the official entry to the Academy Awards this year and Inside Edge (2017) , India's first original series on Amazon Prime Video that was nominated for the coveted International Emmy Awards under the Best Drama category in 2018. In addition to commercially successful cinema, Excel has consistently garnered critical acclaim, Rock On being one such accomplishment that won the production house its second National Award in 2008.

// For Ritesh Sidhwani, the name behind the banner, success is not about being alone on the top but is about empowering others to reach there. As such, he has been instrumental in providing an open platform to debutant directors and filmmakers to exhibit their original work. This open and accessible approach has ensured that Excel stands as a hallmark for refreshingly novel content and cutting-edge global film making techniques, which have placed Indian cinema on the international map as a force to reckon with.

// From an entrepreneur who was a film aficionado to becoming one of India's most successful filmmakers with a panache for state-of-the-art cinema, Ritesh Sidhwani's journey has been as dramatic as his fast-paced action thrillers. He took a leap of faith, incorporating his entrepreneurial skills and business acumen coupled with his passion for good cinema by establishing Excel Entertainment Private Limited in partnership with his longtime friend and confidante, Farhan Akhtar.

// Excel aims at continuing its dream run as a production house. To that end, the banner produces feature films and has started distributing it theatricality worldwide apart from creating original content for digital platforms.

// Cinema is life with 'cuts' and Excel hopes to make the right ones to create cinema that will be remembered through the annals of revolutionary filmmaking.`,"1973","No info"])


// db.run(`CREATE TABLE AmitabhBachchan(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE Mohanlal(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE IrrfanKhan(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE NanaPatekar(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE OmPuri(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE ShahRukhKhan(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE AamirKhan(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE Dhanush(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE YashChopra(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE AnuragKashyap(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE SanjayLeelaBhansali(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE MaheshBhatt(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE RajkumarHirani(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE EktaKapoor(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE KaranJohar(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE RakeshRoshan(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE AdityaChopra(photo,video,cover,moviename,movieimg,movieyear)`);
// db.run(`CREATE TABLE RiteshSidhwani(photo,video,cover,moviename,movieimg,movieyear)`);

// sql = `INSERT INTO RiteshSidhwani(photo,video,cover,moviename,movieimg,movieyear) VALUES (?,?,?,?,?,?)`;
// db.run(sql,["/images/uploads/image1.jpg","https://www.youtube-nocookie.com/embed/JKa05nyUmuQ?si=mheOd0NSyYAX4DFo","/images/uploads/image1.jpg","K.G.F: Chapter 2","/images/uploads/K.G.F:(cover).jpg","2022"]);
// db.run(sql,["/images/uploads/image1-1.jpg","https://www.youtube-nocookie.com/embed/3UKsbXQUwqw?si=rRQrZdn_WWCunkuH","/images/uploads/image1-1.jpg","Sita Ramam","/images/uploads/Sita(cover).jpg","2022"]);
// db.run(sql,["/images/uploads/image2.jpg","https://www.youtube.com/embed/f_vbAtFSEc0?si=wcZS-sJik2yP15lC","/images/uploads/image2.jpg","RRR","/images/uploads/RRR(cover).jpg","2022"]);
// db.run(sql,["/images/uploads/image2-1.jpg","https://www.youtube.com/embed/BUjXzrgntcY?si=YqIR6RAumMXClbXf","/images/uploads/image2-1.jpg","Brahmastra Part One: Shiva","/images/uploads/Brahmastra(cover).jpg","2022"]);
// db.run(sql,["/images/uploads/image3.jpg","https://www.youtube.com/embed/uYPbbksJxIg?si=ub1LLmoGZ7aHDrvm","/images/uploads/image3.jpg","Oppenheimer","/images/uploads/Oppenheimer(cover).jpg","2023"]);
// db.run(sql,["/images/uploads/image4.jpg","https://www.youtube.com/embed/Y6ZKXqM7HNQ?si=pkgSSx6oNuSp--lG","/images/uploads/image4.jpg","OMG 2","/images/uploads/OMG(cover).jpg","2023"]);
// db.run(sql,["/images/uploads/image5.jpg","https://www.youtube.com/embed/HihakYi5M2I?si=IlEEx83eudBikIEf","/images/uploads/image5.jpg","Salaar","/images/uploads/Salaar(cover).jpg","2023"]);
// db.run(sql,["/images/uploads/image6.jpg","https://www.youtube.com/embed/8FkLRUJj-o0?si=PUp4W8LiHu-MfaT4","/images/uploads/image6.jpg","Animal","/images/uploads/Animal(cover).jpg","2023"]);
// db.run(sql,["/images/uploads/image7.jpg","https://www.youtube.com/embed/Cx_Dtwn4ayw?si=_SDUaziPThEWvMdq","/images/uploads/image7.jpg","Tu Jhoothi Main Makkaar","/images/uploads/Tu(cover).jpg","2023"]);
// db.run(sql,["/images/uploads/image8.jpg","https://www.youtube.com/embed/uOlDK7g7b-E?si=pM1RNo-Dvk_0NpFa","/images/uploads/image8.jpg","Dunki","/images/uploads/Dunki(cover).jpg","2023"]);
// db.run(sql,["/images/uploads/image9.jpg","https://www.youtube.com/embed/MWOlnZSnXJo?si=yI3ffpdBiq0Ms5EW","/images/uploads/image9.jpg","Jawan","/images/uploads/Jawan(cover).jpg","2023"]);
// db.run(sql,["/images/uploads/image10.jpg","https://www.youtube.com/embed/shW9i6k8cB0?si=sd4XzW1N09bhNEEF","/images/uploads/image10.jpg","Spider-Man: Across the Spider-Verse","/images/uploads/Spider-Man:(cover).jpg","2023"]);
