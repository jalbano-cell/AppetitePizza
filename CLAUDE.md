# CLAUDE.md

---

# Online Ordering System

The website should include a complete online ordering experience.

Customers should be able to:

• Browse the full menu
• Customize menu items
• Add special instructions
• Add items to cart
• View cart before checkout
• Modify quantities
• Remove items
• View subtotal, taxes, and total
• Checkout seamlessly

The ordering experience should feel similar to Uber Eats or DoorDash while maintaining Appetite's premium branding.

---

# Pickup Ordering

Customers should be able to place Pickup Orders directly through the website.

Pickup workflow:

1. Select menu items
2. Customize items
3. Review cart
4. Select Pickup
5. Choose pickup date
6. Choose pickup time

Available pickup times should be generated dynamically.

Example:

Today

• ASAP
• 15 minutes
• 30 minutes
• 45 minutes
• 1 hour
• Custom Time

Future dates should also be supported.

---

# Pickup Checkout

Customers should be able to choose between:

• Pay Online
• Pay In Person

If Pay Online is selected, support:

• Credit Card
• Debit Card
• Apple Pay
• Google Pay

If Pay In Person is selected:

Display confirmation message informing the customer payment will be collected upon pickup.

---

# Delivery Partners

The website should prominently support third-party delivery services.

Include professionally designed sections and buttons for:

• Uber Eats
• DoorDash
• SkipTheDishes

Each should open Appetite's ordering page once available.

The design should encourage users to order through Appetite's own pickup system first.

Display messaging similar to:

"Save on fees by ordering pickup directly from Appetite."

---

# Restaurant Management

Design the website so it can later integrate with a restaurant management backend.

Future integrations should include:

• Order Dashboard
• Kitchen Display
• Inventory
• Order Status
• Customer History
• Promotions
• Coupons
• Analytics

Keep the frontend architecture modular.

---

# Cart Experience

Shopping cart should include:

• Quantity controls
• Remove items
• Notes for kitchen
• Live subtotal
• Tax calculation
• Estimated pickup time
• Checkout button
• Continue shopping

Cart should slide in from the side on desktop.

Bottom sheet on mobile.

---

# Menu System

Each menu item should support:

• Multiple sizes
• Crust options
• Extra toppings
• Remove toppings
• Combo upgrades
• Drinks
• Dips
• Quantity selector

Menu should be data-driven.

Avoid hardcoded menu items.

---

# Payment Integration

Structure checkout to support future Stripe integration.

Preferred payment provider:

Stripe

Support:

• Credit Cards
• Apple Pay
• Google Pay

Keep payment logic modular.

---

# Customer Information

Collect:

• Name
• Phone Number
• Email (optional)
• Pickup Time
• Order Notes

Validate all fields.

---

# Order Confirmation

After checkout display:

Order Number

Pickup Time

Estimated Preparation Time

Order Summary

Payment Method

Pickup Instructions

Confirmation should feel polished and premium.

---

# Notifications

Prepare architecture for:

• Order Confirmation Email
• SMS Confirmation
• Ready for Pickup Notification

Do not hardcode providers.

Keep notification services modular.

---

# Future Scalability

The codebase should be built so future features can easily be added, including:

• Delivery Ordering
• Customer Accounts
• Loyalty Rewards
• Gift Cards
• Coupons
• Online Reservations
• Catering Orders
• QR Code Menu
• Admin Dashboard
• POS Integration

Architecture should prioritize scalability.

---

# User Experience

The entire ordering process should require as few clicks as possible.

Customers should always know:

• What they're ordering
• Total price
• Pickup time
• Payment method

The experience should feel effortless on both desktop and mobile.

Think Apple-level simplicity.