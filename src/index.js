const Hapi = require("@hapi/hapi");
const { routes } = require("./routes");

(async () => {
  const server = Hapi.server({
    host:
      process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    port: 5000,
  });

  server.route(routes);

  await server.start();
  console.log(`Server is running in ${server.info.uri}`);
})();
