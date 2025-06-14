module.exports = {
  apps: [
    {
      name: "chatify-api",
      script: "./dist/index.js",
      watch: false,
      autorestart: true,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}
