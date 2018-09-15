

---
export REACT_APP_SECRET=secret
export REACT_APP_RUNNING_ENV=production

export REACT_APP_SYSTEM_USER_EMAIL=systemuser@mail.com


----DEPLOYMENT
forever start -c "npm start" . 


--for webui-system
export REACT_APP_SECRET=secret
export REACT_APP_RUNNING_ENV=production

--for webui-admin
#export REACT_APP_REPO_SERVICE_URL=http://54.165.238.39:5101
export REACT_APP_REPO_SERVICE_URL=http://localhost:5101
Login: 
hnnadmin@hnn.com / tuandang6

--for system-service 
export REACT_APP_SYSTEM_USER_EMAIL=systemuser@mail.com
//export REACT_APP_USER_SERVICE_URL=http://54.165.238.39:5010
export REACT_APP_USER_SERVICE_URL=http://localhost:5010

--for all services only
#export REACT_APP_SYS_DB_URL=mongodb://adminsys:admin123@34.227.75.167/hlsys
export REACT_APP_SYS_DB_URL=mongodb://adminsys:admin123@203.128.241.218/hlsys

forever start -c "npm start" . 

DB: 
ssh -i "blockchain-perm.pem" ubuntu@ec2-34-227-75-167.compute-1.amazonaws.com

Code
ssh -i "blockchain-perm.pem" ubuntu@ec2-54-165-238-39.compute-1.amazonaws.com
---
tuandang8@mail.com / tuandang8
-----
#add admin user to dbs

# add admin user to hlsys
use hlsys
db.createUser({ user: "adminsys" , pwd: "admin123", roles: [ { role: "dbOwner", db: "hlsys" } ]})

# add admin user to hlhnn
use hlhnn
db.createUser({ user: "admin" , pwd: "honeynet2018", roles: [ { role: "dbOwner", db: "hlhnn" } ]})


# create repo
db.repos.insert({ "companyName" : "hnn", "repoCode" : "hnn", "contactName" : "mr a", "contactEmail" : "contact@hnn.com", "adminName" : "hnnadmin", "adminEmail" : "hnnadmin@hnn.com", "adminPassword" : "$2a$10$ZDRqfAvUPAIH/PFcz2EOiODX//Dl6lo/T2Y/O6GPT3aMu4NjK0B3i", "description" : "hnn db", "__v" : 0, "repoConnectionUrl" : "mongodb://admin:honeynet2018@203.128.241.218/hlhnn" })
//pass = tuandang6

db.dropUser("adminhnn")


mongo --username admin --password honeynet2018 --host 203.128.241.218 --authenticationDatabase admin
mongo 203.128.241.218/hlhnn --username admin --password honeynet2018  --authenticationDatabase admin 

----
1. VPS Front End:
203.128.241.213
port 22
user: ubuntu
pass: h@neynet.vn
ssh  ubuntu@203.128.241.213


2. VPS Back End:
203.128.241.218
port 22
user: ubuntu
pass: h@neynet.vn

ssh  ubuntu@203.128.241.218


------
Phuc Vo
git clone -b develop https://tamphuc042011@bitbucket.org/tamphuc042011/atuan-lms.git



----
Video + Images source
https://www.istockphoto.com/videos/higher-education?sort=mostpopular&offlinecontent=include&phrase=higher%20education
https://media.istockphoto.com/videos/writing-in-class-video-id851926704
