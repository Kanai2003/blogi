FROM node:18-alpine AS builder

WORKDIR /app

# Install system dependencies for Next.js SWC
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./

RUN npm install --force

COPY . .

RUN npm run build


# Production stage
FROM node:18-alpine

WORKDIR /app

# Install system dependencies for Next.js SWC
RUN apk add --no-cache libc6-compat

COPY --from=builder /app/.next .next  
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

ENV NEXT_DISABLE_SWC_WARNINGS=1

CMD ["npm", "run", "start"]
