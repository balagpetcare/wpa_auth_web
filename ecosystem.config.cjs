// PM2 production process manager config for WPA Auth Web (Next.js, next start).
// Env vars come from .env.production.local symlink (-> /srv/config/wpa/auth-web.env).
//
// Usage:
//   pm2 start ecosystem.config.cjs
//   pm2 logs wpa-auth-web
//   pm2 reload wpa-auth-web

module.exports = {
  apps: [
    {
      name: 'wpa-auth-web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 5011',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        NEXT_TELEMETRY_DISABLED: '1',
      },
      out_file: './logs/wpa-auth-web.out.log',
      error_file: './logs/wpa-auth-web.error.log',
      merge_logs: true,
      time: true,
    },
  ],
};
