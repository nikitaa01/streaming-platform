FROM debian:bullseye-slim

# Update GPG keys and install dependencies
RUN apt-get update -y && \
  apt-get install -y gpg apt-transport-https && \
  apt-get clean && \
  gpg --list-keys && \
  apt-get -y install curl unzip && \
  rm -rf /var/lib/apt/lists/*

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

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