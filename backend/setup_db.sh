#!/usr/bin/env bash
sudo -u postgres psql -c "CREATE ROLE jojo WITH LOGIN PASSWORD 'jojo'"
sudo -u postgres psql -c "CREATE DATABASE openjio"
sudo -u postgres psql -c "CREATE DATABASE openjio_test"
