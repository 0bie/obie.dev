# Add seed data to `OBIEDEVdb` database
mongoimport --db OBIE_DEV_DB --collection users --file ./db/seed/users.json --jsonArray
mongoimport --db OBIE_DEV_DB --collection projects --file ./db/seed/projects.json --jsonArray
