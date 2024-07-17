# Unique ID Generator

This project is a unique ID generator server written in Node.js (Express.js). The generated IDs are 64-bit numbers composed of four parts:

1. **Sign Bit**: The first bit is set to `0` to indicate an unsigned number and reserved for future use.
2. **Timestamp**: The next 41 bits represent the current timestamp in milliseconds.
3. **Datacenter and Machine ID**: 10 bits divided into:
   - 5 bits for the datacenter ID (supports up to 32 datacenters).
   - 5 bits for the machine ID within the datacenter (supports up to 32 machines per datacenter).
4. **Sequence Number**: The final 12 bits are a counter that increments for each ID generated within the same millisecond, and resets to 0 every new millisecond.

## Architecture

- **Node.js (Express.js)**: Handles incoming requests and serves as the main application server.
- **Redis**: In-memory key-value store used to store the counter values.
- **Lua**: Script for incrementing the counter in Redis, offering performance and atomicity.
- **Docker and Docker Compose**: Containerize the application with multiple instances and an NGINX load balancer.

## ID Structure

- **Bit 1**: `0` (sign bit)
- **Bits 2-42**: Timestamp in milliseconds (41 bits)
- **Bits 43-52**: Datacenter ID (5 bits) and Machine ID (5 bits)
- **Bits 53-64**: Sequence number (12 bits)

## Redis and Lua

- The Lua script increments the counter in Redis for each machine.
- The script is loaded into Redis on server startup using the `SCRIPT LOAD` command, which returns a SHA1 hash.
- The SHA1 hash is used to invoke the script with `EVALSHA` for faster execution compared to `EVAL`, as the script is not loaded with every request.

## Deployment

The project runs on Docker with Docker Compose, consisting of:

- 4 instances of the server:
  - **Server 1** and **Server 2** in **Datacenter 1**
  - **Server 3** and **Server 4** in **Datacenter 2**
- **NGINX** load balancer using the least connections algorithm to distribute the load.

## Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/unique-id-generator.git
   cd unique-id-generator
2. **Build and start the containers**:
     ```sh
     docker-compose up --build
4. **Access the server**:
   The server will be accessible via the NGINX load balancer on "http://localhost:80".

## Usage
**Generate a unique ID**:
Send a GET request to "http://localhost:80/generate-id"

## Performance 
Using Lua for counter incrementation is significantly faster and more convenient than using the Node.js Redis client due to the following reasons:
- **Atomicity**: Lua scripts in Redis execute atomically, ensuring consistent and reliable counter increments.
-  **Speed**: Lua scripts run directly on the Redis server, reducing the latency compared to round-trips between the application server and Redis.
-  **Efficiency**: Preloading the script and using EVALSHA minimizes the overhead of script loading with every request.
