# Use PHP 8.3 FPM Alpine as the base image
FROM php:8.3-fpm-alpine

# Install system dependencies for Puppeteer and Chromium
RUN apk add --no-cache \
    curl \
    git \
    unzip \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    oniguruma-dev \
    libxml2-dev \
    zip \
    bash \
    shadow \
    nodejs npm \
    chromium \
    libx11 \
    libxcomposite \
    libxdamage \
    libxrandr \
    xdg-utils \
    ttf-freefont

# Set environment variable for Puppeteer to use Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Expose PHP-FPM port
EXPOSE 9000

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy all files from the current directory into /var/www/html
COPY . /var/www/html

# Install Node.js dependencies
RUN npm install

# Start PHP-FPM
CMD ["php-fpm"]
