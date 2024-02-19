FROM node:18-alpine3.18 AS base

# Install dependencies only when needed
FROM base AS develop

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat bash
WORKDIR /app

ARG BUILD_UID=1000

RUN if [[ ${BUILD_UID} != 1000 && ${BUILD_UID} != 0 ]]; then \
    deluser node && \
    addgroup -g 1000 node && \
    adduser -u ${BUILD_UID} -G node -s /bin/sh -D node; \
  fi

# Configure NPM directories.
ENV npm_config_prefix /home/node/npm
ENV YARN_CACHE_FOLDER /opt/cache/yarn
RUN mkdir -p /home/node/npm && chown -R node:node /home/node/npm && \
    mkdir -p /opt/cache/yarn && chown -R node:node /opt/cache/yarn

COPY --from=dockerfile-dir entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

FROM develop as deps

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/ ./
#COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 80

ENV PORT 80
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]