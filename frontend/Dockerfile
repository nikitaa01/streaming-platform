FROM debian:bullseye-slim

# Install curl and unzip for Bun installation
RUN apt-get update && apt-get install -y curl unzip && rm -rf /var/lib/apt/lists/*

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV PATH="/root/.bun/bin:${PATH}"

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./
COPY . .

RUN bun install

RUN bun run build

CMD ["bun", "--bun", "run", "build"]