# Blogi - Full-Stack Application

This is a full-stack application built with FastAPI for the backend, Next.js with TypeScript and Tailwind CSS for the frontend, and PostgreSQL as the database. The entire application is containerized using Docker and Docker Compose.

## Prerequisites

Ensure you have the following installed:
- Docker
- Docker Compose

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Kanai2003/blogi
```

2. Navigate to the project directory:

```bash
cd blogi/
```

3. Build and run the application:

```bash
docker-compose build --no-cache
docker-compose up
```


***Note:*** 
Please make sure that you have the following ports available on your machine and not occupied by any other service: `3000` , `8000` and `5432`. 

If you have any service running on these ports, please stop them before running the application.

## Access it!
Open your browser and navigate to `http://localhost:3000/` to view the application. and `http://localhost:8000/docs` to view the FastAPI Swagger UI.

## Credentials 
By default you can login with username: `username` and password: `password`