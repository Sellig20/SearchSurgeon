.PHONY: all backend frontend

all: backend frontend

backend:
	cd backend && npm install && npm run dev &

frontend:
	cd frontend && npm install && ng serve