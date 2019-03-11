# Add seed data to `OBIEDEVdb` database
mongoimport --db OBIEDEVdb --collection users --file ./db/seed/users.json --jsonArray
mongoimport --db OBIEDEVdb --collection projects --file ./db/seed/projects.json --jsonArray
