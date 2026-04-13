# Domain Registration Guide

_Last updated: April 13, 2026_

---

## Step 1: Choose Your Domain Name

**Recommended options for Raisa:**
- `raisapierre.com` — Full name, professional, easy to remember
- `raisa.design` — Short, design-focused TLD
- `raisapierre.design` — Full name with design TLD

**Best practices:**
- Use your real name — most credible for senior designers
- Prefer `.com` (highest recognition) or `.design` (industry-relevant)
- Avoid numbers, hyphens, or abbreviations
- Match your LinkedIn handle for brand consistency

---

## Step 2: Choose a Domain Registrar

### Recommended Registrars (Ranked)

**1. Cloudflare Registrar** — Best overall value
- Price: ~$10.46/year for .com (at-cost, no markup)
- Renewal: ~$9.15/year (prices stay at cost)
- Free WHOIS privacy
- Fastest DNS infrastructure in the world
- Integrates perfectly with Cloudflare Pages (our recommended host)
- Website: [cloudflare.com](https://www.cloudflare.com/products/registrar/)

**2. Porkbun** — Most transparent pricing
- Price: ~$11.08/year for .com
- Renewal: $11.08/year (no surprise increases)
- Free WHOIS privacy, SSL, and email forwarding
- Friendly, straightforward interface
- Website: [porkbun.com](https://porkbun.com/)

**3. Namecheap** — Budget first year (but watch renewals)
- Price: ~$5.98/year first year for .com
- Renewal: $13.98/year (170% increase — be aware)
- Free WHOIS privacy
- Good interface, large community
- Website: [namecheap.com](https://www.namecheap.com/)

### Recommendation
Use **Cloudflare** if we go with Cloudflare Pages for hosting (everything in one place, cheapest long-term). Use **Porkbun** if you prefer a simpler, dedicated registrar experience.

---

## Step 3: Register the Domain

1. Go to your chosen registrar's website
2. Search for your desired domain name to check availability
3. Create an account (use your personal email: raisapierre@gmail.com)
4. Add domain to cart
5. At checkout:
   - Enable **WHOIS privacy** (usually free — hides your personal info from public records)
   - Enable **auto-renewal** (prevents accidentally losing your domain)
   - Skip any upsells (extra email hosting, "premium DNS", security bundles)
6. Complete payment (~$10-12 for the first year)

---

## Step 4: Connect Domain to Hosting

Once we set up Cloudflare Pages (or chosen host):

### If using Cloudflare for both domain and hosting:
- Everything is automatic — domain and hosting are already connected
- Just add the site in Cloudflare Pages and select your domain

### If domain is on Porkbun/Namecheap, hosting on Cloudflare Pages:
1. In Cloudflare, add your domain as a new site
2. Cloudflare gives you two nameserver addresses (e.g., `anna.ns.cloudflare.com`)
3. In your registrar's dashboard, find "Nameservers" or "DNS" settings
4. Replace the default nameservers with Cloudflare's
5. Save and wait 24-48 hours for DNS propagation
6. Cloudflare will confirm when propagation is complete

### Verification
- Run `nslookup yourdomain.com` in terminal to check DNS
- Or use [dnschecker.org](https://dnschecker.org/) to verify global propagation

---

## Step 5: Set Up SSL (HTTPS)

With Cloudflare Pages, SSL is **automatic and free**. No action needed.

For other hosts:
- Vercel: Automatic SSL
- Netlify: Automatic SSL
- GitHub Pages: Automatic SSL (enable in repository settings)

---

## Step 6: Set Up Email Forwarding (Optional but Recommended)

Having `hello@raisapierre.com` forwarding to your Gmail looks professional.

**On Cloudflare:**
1. Go to Email > Email Routing
2. Add a forwarding rule: `hello@raisapierre.com` → `raisapierre@gmail.com`
3. Verify your Gmail address
4. Done — emails to your custom domain arrive in your Gmail

**On Porkbun:**
1. Go to domain management > Email
2. Set up email forwarding
3. Similar process — forward to your Gmail

---

## Cost Summary

| Item | Cost | Frequency |
|------|------|-----------|
| Domain (.com) | ~$10-12 | Per year |
| Hosting (Cloudflare Pages) | Free | — |
| SSL Certificate | Free | — |
| Email forwarding | Free | — |
| **Total** | **~$10-12/year** | |

---

## Security Checklist

- [ ] Domain registered under YOUR name (not a company or third party)
- [ ] WHOIS privacy enabled
- [ ] Auto-renewal turned on
- [ ] Strong password on registrar account
- [ ] Two-factor authentication (2FA) enabled on registrar account
- [ ] Recovery email set and current
- [ ] Keep registrar login credentials in a password manager

---

## Timeline

| Action | When |
|--------|------|
| Choose domain name | This week |
| Register domain | This week |
| Connect to hosting | When hosting is set up (Phase 3) |
| Set up email forwarding | After domain is connected |
| Go live | Phase 7 (launch) |
