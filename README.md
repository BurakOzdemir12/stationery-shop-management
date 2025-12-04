
<br/>
<p align="center" >
  <a href="https://skillicons.dev">
    <img  src="https://skillicons.dev/icons?i=nextjs,react,ts,npm,vercel,tailwind" />
<img src="https://skills.syvixor.com/api/icons?perline=15&i=shadcnui,neon,drizzle,zod,betterauth,upstash" />  

</a>
</p>
<a  style="cursor: pointer"    href="https://www.guneskirtasiye.com/" >
<p  align="center" style="font-size:large">Live Link</p> 
<p  align="center" style="font-size:large">
</p> 

</a>

 <div class="container flex-row" align="center" >

**Demo Video:**

[![Demo Videosu](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://youtu.be/8Udte6F2Yj8)
</div>

## Table of Contents
- **[Introduction](#introduction)**
- **[Admin Features](#admin-features)**
- **[Client Features](#client-features)**
- **[Tech Stack](#tech-stack)**

<section id="introduction" style="scroll-behavior:smooth "  >
<h1 align="center" > Shop Management – POS & Inventory System (with Barcode Scanner)</h1>

<p align="left" style="font-size: large"  >This project is a full-stack POS & inventory management system built for a real stationery shop.  
It centralizes product management, stock tracking, sales, and revenue reporting in a modern web dashboard.
 </p> 
</section>

<section id="admin-features" style="font-size: 1rem" >

The app is designed as **enterprise-ready**:
- clean architecture
- multi-language support (EN / TR)
- separation of admin & normal users

<h2> Admin Features</h2>

- **CRUD operations for products, services, requests.**


- **Barcode-based POS** 
  - USB barcode scanner support (EAN-13)
  - Scan to add products to the cart and routes to the page instantly
  - Scanned products shows as a list with own values like price for each product, product names, total price.
  - Manager also can add products to pos cart without Barcode Scanner <br/>
  - Whenever the user completes the pos order, it will automatically reduce the product stock from the database and organize the reports.
  - !!! Pos Screen works with buttons and usb-scanner it doesn't work with any third party hardware or service.<br/>


- **Stock management** 
  - The manager can track their product stocks.
  - If stock is renewed or added, the manager can update the stock values from the product edit page.


- **Orders & Revenue**
    - Orders & order items stored historically
    - Daily / monthly / yearly revenue reports
    - Profit calculation using purchase_price & sale_price
    - Charts for revenue vs. sales count
  

- **Product Requests Management**
  - Shop manager can view and manage product stock requests.
    - Requests can be marked as "seen" when the request seen.
    - Requests can be marked as "restocked" when stock is added.


- **Admin Panel**
    - Admin dashboard with charts, filters
</section>
<section id="client-features" style="font-size: 1rem" >

<h2> Client Features</h2>
    
- **Product Catalog**
  - View products with pagination
  - Search products by name
  - Filter products by category, price range, etc.
  - Get information about product values like stock availability, price, description, etc.


- **Product Requests**
  - Clients can send product stock requests to the admin.
  - Requests are stored in the database and can be viewed by the admin.
  - Clients can see the status of their requests in their profile.



</section>
<section id="tech-stack" style="scroll-behavior:smooth "  >
<h2> Tech Stack</h2>

<ul  style="font-size: 1.05rem">

**Full-stack**
- Next.js 15
- React 19
- TypeScript

**Style**
- TailwindCSS
- ShadCN

**Workflows & API**
- Better Auth
- Upstash

**Forms & validation**
- Zod & react-hook-form

**Database & Host**
- Neon postgresql
- Drizzle ORM
- Vercel
- Imagekit io


**Internationalization**
- next-intl
</ul>
</section>