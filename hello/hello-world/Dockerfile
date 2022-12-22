FROM public.ecr.aws/lambda/nodejs:16

COPY app.ts package*.json ./

RUN npm install
RUN npx esbuild app.ts --platform=node --bundle --outdir=./

CMD ["app.select"]
