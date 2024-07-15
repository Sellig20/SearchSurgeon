DIST_DIR=backend/dist
NM=node_modules
BNM=backend/node_modules
FNM=frontend/node_modules

all: up

up:
	npm install && docker compose up --build --force-recreate #>> logs.txt #-d
	
down:
	docker compose down -v

ps:		
	docker compose ps -a
	docker ps -a

fclean:	down
	docker system prune --force
	docker volume prune --force
	docker builder prune -f
	docker image prune -f
	rm -rf $(DIST_DIR)
	rm -rf $(NM)
	rm -rf $(BNM)
	rm -rf $(FNM)

re : 	clean up

mongodb: 
	docker exec -it mongodb bash

backend: 
	docker exec -it backend bash

frontend: 
	docker exec -it frontend bash

.PHONY: up down re ps clean frontend backend mongodb