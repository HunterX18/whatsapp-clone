# nextjs-whatsapp-clone-starter

Points to remember

1. service name doesn't work but localhost does in url
2. only service name for the db works in the db connection url
3. wait-for-it.sh to fully initialize the db container before requesting connection from the server container
4. "npx prisma db push" to create tables and "npx prisma generate" to create the Prisma client
