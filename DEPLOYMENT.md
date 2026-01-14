# Deployment Guide - AXA Barbershop

## Pre-Deployment Checklist

- [ ] Code is committed to git
- [ ] All tests pass: `npm run build`
- [ ] `.env.local` is configured with production values
- [ ] `RESEND_API_KEY` is set and verified
- [ ] `ADMIN_PASSWORD` is changed from default
- [ ] Database is initialized: `npx prisma migrate deploy`
- [ ] No console errors in development build

## Environment Variables

**Required for production:**
```env
RESEND_API_KEY=re_xxxxx  # Get from Resend dashboard
ADMIN_PASSWORD=secure_password_here
DATABASE_URL=file:./dev.db  # Or use cloud database
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Deploy to Vercel (Recommended)

1. **Connect Repository**
   - Push code to GitHub/GitLab/Bitbucket
   - Go to https://vercel.com
   - Click "New Project"
   - Select your repository
   - Click "Import"

2. **Configure Environment**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add all variables from `.env.local`
   - Make sure they're set for Production

3. **Deploy**
   - Click "Deploy"
   - Vercel automatically builds and deploys
   - Your site will be live at `yourdomain.vercel.app`

4. **Custom Domain**
   - In Vercel Settings > Domains
   - Add your domain (e.g., axabarbershop.fi)
   - Update DNS records as instructed

## Deploy to Other Hosting

### Linux/Unix Server (Recommended: Ubuntu 20+)

```bash
# SSH into your server
ssh user@your-server.com

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone your repository
git clone https://github.com/yourusername/axabarbershop.git
cd axabarbershop

# Install dependencies
npm install

# Create .env.local with production values
nano .env.local
# Paste your environment variables, save with Ctrl+X, Y, Enter

# Build the project
npm run build

# Install PM2 for process management
npm install -g pm2

# Start the application
pm2 start "npm start" --name "axabarbershop"
pm2 startup
pm2 save

# Verify it's running
pm2 status
```

### Docker Deployment

```bash
# Build Docker image
docker build -t axabarbershop .

# Run container
docker run -p 3000:3000 \
  -e RESEND_API_KEY=your_key \
  -e ADMIN_PASSWORD=your_password \
  -e DATABASE_URL=file:./dev.db \
  -e NEXT_PUBLIC_SITE_URL=https://yourdomain.com \
  axabarbershop

# Or with Docker Compose
docker-compose up -d
```

### Windows/IIS Hosting

1. Install Node.js 18+ on the server
2. Clone repository to `C:\inetpub\wwwroot\axabarbershop`
3. Open PowerShell as Administrator
4. Run:
   ```powershell
   cd C:\inetpub\wwwroot\axabarbershop
   npm install
   npm run build
   npm install -g iisnode
   # Configure IIS with iisnode to run Node.js
   ```

## Post-Deployment

1. **Test the Site**
   - Visit your domain
   - Test booking flow
   - Verify email notifications work
   - Check admin dashboard access

2. **Monitor**
   - Set up error tracking (Sentry, LogRocket)
   - Monitor server logs
   - Check database size periodically

3. **Backup**
   - Set up automated database backups
   - Keep `.env` variables backed up securely
   - Document your deployment setup

## Database Backup

### SQLite (Local Database)

```bash
# Backup
cp dev.db dev.db.backup

# Restore
cp dev.db.backup dev.db
```

### Scheduled Backups

Create a cron job (Linux):
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * cp /app/dev.db /backups/dev.db.$(date +\%Y\%m\%d)
```

## Troubleshooting

**Site won't start after deploy:**
- Check logs: `pm2 logs axabarbershop`
- Verify environment variables are set
- Check Node.js version: `node -v`

**Emails not sending:**
- Verify `RESEND_API_KEY` is correct
- Check Resend dashboard for error logs
- Test with `npm run dev` locally first

**High server load:**
- Check database queries in Prisma logs
- Consider moving to cloud database
- Enable caching layer (Redis)

**Database locked errors:**
- SQLite doesn't work well with concurrent writes
- Consider PostgreSQL for production
- Check for long-running queries

## Scaling Checklist

As your barbershop grows:

1. **Database:** Migrate from SQLite to PostgreSQL
2. **Cache:** Add Redis for availability caching
3. **Storage:** Move images to CDN
4. **Monitoring:** Set up Datadog/New Relic
5. **Analytics:** Enable Google Analytics
6. **Backups:** Automated daily backups to S3

## Security Checklist

- [ ] Change default `ADMIN_PASSWORD`
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set security headers in `next.config.js`
- [ ] Enable rate limiting on API
- [ ] Regular security updates: `npm audit fix`
- [ ] Use strong, unique API keys
- [ ] Never commit `.env.local` to git

## Support & Updates

- Check for security updates: `npm audit`
- Update dependencies: `npm update`
- Monitor Vercel/hosting provider alerts
- Subscribe to Next.js security releases

---

**Last Updated:** January 2026
**Version:** 1.0.0
