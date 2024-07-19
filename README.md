#Welcome on the Search Surgeons app !#

To make this project works, you need to :
    - gitclone the repository,
    - launch Mongo Compass and connect to : 

Backend : Expressjs server on port:3000
Frontend : Angular port:4200
DB : MongoDB

To connect to my database :
    Here is my mongoURI = 'mongodb+srv://jeanne:Sellig20@cluster0.fjzp4df.mongodb.net/su'
    The Access List Entry allows any IP addresses (0.0.0./0).
    /su is the database, /searches is the collection where the .csv file is imported.

This app sorts an array of surgeons with :
    - Her/his rank (calculated by his number of interventions, from the biggest worker to the smallest),
    - Her/his name,
    - Her/his number of interventions (ranking variable),
    - Her/his speciality (if the surgeon has many, the speciality most present in the provided database),
    - Her/his most worked with anaesthetist,
    - Her/his most worked with nurse1,
    - Her/his most worked with nurse2,
    - The room where she/he worked the most,
    - The intervention he practiced the most.

You can search at anytime, any surgeons in the search bar.

Now you can `make` int the terminal !

App on -> "[localhost:4200:](http://localhost:4200/)"

If there is any problem, I am of course at your disposal.

Thank you for your time !