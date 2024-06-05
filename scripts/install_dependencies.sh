#!/bin/bash

# this file is being executed in /opt/codedeploy-agent/deployment-root/47../<deployment_id>/

#stdout logs of this process executing can be found in /opt/codedeploy-agent/deployment-root/47../<deployment_id>/logs/scripts.log

# here we update the server and install node and npm
echo installing dependencies




# install the application using npm
# we need to traverse to where the application bundle is copied too.
echo installing application with npm

ls /opt
cd /opt/nynx-frontend
sudo npm install
