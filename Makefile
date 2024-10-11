# Build the Docker containers, use services argument to pass list of services. by default - all services
build:
	docker-compose build $(shell echo "${services}" | sed -e 's/,/ /g')

# Run Docker containers in detached mode, use services argument to pass list of services. by default - all services
run:
	docker-compose up -d $(shell echo "${services}" | sed -e 's/,/ /g')

# Stops Docker containers, use services argument to pass list of services. by default - all services
stop:
	docker-compose stop $(shell echo "${services}" | sed -e 's/,/ /g')

# Stops and removes all Docker containers
clear:
	docker-compose down

# Rebuild Docker containers without cache, use services argument to pass list of services. by default - all services
rebuild:
	docker-compose build --no-cache $(shell echo "${services}" | sed -e 's/,/ /g')