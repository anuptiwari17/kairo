# 🚀 Kairo Authentication & Database Implementation Plan

## 📋 Overview
This document outlines the complete implementation plan for adding simple authentication functionality to the Kairo platform for hackathon demonstration, including MongoDB integration, user management, and dashboard creation.

## 🎯 Goals
- ✅ Implement simple email/phone + password authentication
- ✅ Connect directly to MongoDB Atlas database  
- ✅ Create database models and schemas
- ✅ Build simple dashboard page with user redirect
- ✅ Modify existing login/signup UI for simple auth flow
- ✅ Use hardcoded OTP for phone verification (demo purpose)
- ✅ No session management - keep it simple for hackathon
- ✅ Ensure nothing breaks in current functionality

## 🗄️ Database Schema Design

### 1. User Model
```javascript
// models/User.js
{
  _id: ObjectId,                    // MongoDB auto-generated
  email: String,                    // Can be used for login
  phoneNumber: String,              // Can be used for login  
  password: String,                 // Hashed with bcrypt
  profile: {
    name: String,                   // Full name
    state: String,                  // Indian state (optional)
    city: String,                   // City name (optional)
    role: {                         // Optional - default: "citizen"
      type: String,
      default: "citizen",
      enum: [
        "citizen", "worker", "student", "woman", "senior", 
        "business", "government", "ngo", "activist", 
        "lawyer", "journalist", "researcher", "volunteer"
      ]
    },
    language: String,               // Preferred language (optional)
    isPhoneVerified: Boolean,       // OTP verification status (hardcoded for now)
    isEmailVerified: Boolean,       // Email verification status
  },
  timestamps: {
    createdAt: Date,
    updatedAt: Date,
    lastLoginAt: Date,
  },
  status: {                        // Account status
    type: String,
    default: "active",
    enum: ["active", "inactive", "suspended"]
  }
}
```

```

## 🛠️ Technical Implementation Plan

### Phase 1: Database Setup & Models
**Files to Create:**
1. `lib/mongodb.js` - MongoDB connection utility
2. `models/User.js` - User schema and model
3. `.env.local` - Environment variables

**Tasks:**
- Set up MongoDB Atlas connection
- Create Mongoose models with validation
- Add password hashing with bcrypt
- Simple database connection (no session management)

### Phase 2: API Routes for Authentication  
**Files to Create:**
1. `app/api/auth/signup/route.js` - User registration with OTP
2. `app/api/auth/login/route.js` - Simple email/phone + password authentication  
3. `app/api/auth/verify-otp/route.js` - OTP verification (hardcoded for demo)
4. `app/api/user/profile/route.js` - User profile management (optional)

**Simple Authentication Flow:**
```
SIGNUP:
1. User enters: name, email, phone, password, confirm password
2. Server validates input and creates user (unverified)
3. Show OTP screen with hardcoded OTP (e.g., "12345")
4. User enters hardcoded OTP
5. Mark phone as verified, create JWT token  
6. Redirect to dashboard

LOGIN:  
1. User enters email/phone + password
2. Server validates credentials against database
3. Create JWT token and return user data
4. Redirect to dashboard
```

### Phase 3: Frontend UI Updates & Integration
**Files to Modify:**
1. `app/login/page.jsx` - **MAJOR UPDATE**: Simple email/phone + password form
2. `app/signup/page.jsx` - **MAJOR UPDATE**: Name, email, phone, password, confirm password, then hardcoded OTP
3. `components/Navigation.jsx` - Show user name when logged in, add logout
4. `app/layout.js` - Add JWT token management

**Files to Create:**
1. `app/dashboard/page.jsx` - Simple user dashboard 
2. `lib/auth.js` - JWT token utilities (create, verify, decode)
3. `hooks/useAuth.js` - Simple authentication hook
4. `middleware.js` - Protect dashboard route

### Phase 4: Simple Dashboard & Route Protection
**Dashboard Features:**
- Welcome message with user name and role
- User profile summary (name, email, phone, role)
- Quick navigation buttons:
  - "Ask AI Rights Assistant" (placeholder)
  - "Create Petition" (placeholder)  
  - "View Community Issues" (placeholder)
  - "Profile Settings" (placeholder)
- Simple logout button

**Route Protection:**
- Simple middleware to check JWT token
- Redirect to login if not authenticated  
- Store JWT in localStorage (simple approach for hackathon)

## 📁 Updated Project Structure
```
kairo/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js         # Email/phone + password login
│   │   │   ├── signup/route.js        # User registration
│   │   │   └── verify-otp/route.js    # Hardcoded OTP verification  
│   │   └── user/
│   │       └── profile/route.js       # User profile (optional)
│   ├── dashboard/
│   │   └── page.jsx                   # Simple dashboard page
│   ├── login/page.jsx                 # **MODIFIED** - Simple login form
│   ├── signup/page.jsx                # **MODIFIED** - Simple signup + OTP
│   ├── layout.js                      # Add simple JWT handling
│   └── globals.css
├── components/
│   ├── Navigation.jsx                 # **MODIFIED** - Add logout, user state
│   └── Footer.jsx
├── hooks/
│   └── useAuth.js                     # Simple auth hook with JWT
├── lib/
│   ├── mongodb.js                     # MongoDB connection
│   └── auth.js                        # JWT utilities (create/verify/decode)
├── models/
│   └── User.js                        # User model only
├── middleware.js                      # Simple route protection
└── .env.local                         # Environment variables
```

## 🔐 Authentication Strategy & UI Changes

### **NEW Signup Page UI Flow (`/signup`):**
**Step 1: User Details**
- Name (required)
- Email (required)  
- Phone Number (required)
- Role (dropdown - optional, default: "citizen")
  - Options: Citizen, Worker, Student, Woman, Senior, Business, Government, NGO, Activist, Lawyer, Journalist, Researcher, Volunteer
- Create Password (required)
- Confirm Password (required)
- Submit button → goes to Step 2

**Step 2: OTP Verification**  
- Display: "OTP sent to +91-XXXXXXXXX"
- OTP Input Field (6 digits)
- **Hardcoded OTP: "123456"** (for demo/hackathon)
- Verify button → creates account & redirects to dashboard
- Resend OTP button (placeholder, shows same hardcoded OTP)

### **NEW Login Page UI Flow (`/login`):**
**Single Step Login**
- Email or Phone Number (required)
- Password (required)  
- Login button → validates & redirects to dashboard
- "Forgot Password?" link (placeholder)
- "Don't have account? Sign up" link

### **Dashboard Page (`/dashboard`):**
```jsx
// Simple dashboard layout
- Header: "Welcome, [User Name]!" + Logout button
- Profile Card: Name, Email, Phone, Role
- Quick Actions (4 placeholder cards):
  * "AI Rights Assistant" → Coming Soon
  * "Create Petition" → Coming Soon  
  * "Community Issues" → Coming Soon
  * "Profile Settings" → Coming Soon
- Footer: "Kairo Platform - Empowering Citizens"
```

## 🌐 Environment Variables Needed
```bash
# .env.local
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kairo
JWT_SECRET=your-jwt-secret-here-for-hackathon
HARDCODED_OTP=123456
```

## 📦 Additional Dependencies to Install
```bash
npm install:
- mongoose              # MongoDB ODM
- bcryptjs             # Password hashing  
- jsonwebtoken         # JWT tokens
- validator            # Input validation (email, phone)
```

## 🚧 Implementation Steps (Ordered)

### Step 1: Database Setup
1. Add MongoDB Atlas URI to environment variables
2. Install required dependencies (mongoose, bcryptjs, jsonwebtoken, validator)
3. Create MongoDB connection utility (`lib/mongodb.js`)
4. Create User model with role dropdown options (`models/User.js`)

### Step 2: API Routes  
1. Create signup API route (`/api/auth/signup`) - creates user with email/phone/password
2. Create hardcoded OTP verification route (`/api/auth/verify-otp`) - always accepts "123456"
3. Create login API route (`/api/auth/login`) - email/phone + password validation
4. Add JWT token creation/verification utilities (`lib/auth.js`)

### Step 3: UI Updates (Major Changes)
1. **Complete rewrite of signup page UI:**
   - Step 1: Name, Email, Phone, Role (dropdown), Password, Confirm Password
   - Step 2: Hardcoded OTP verification screen
2. **Complete rewrite of login page UI:**  
   - Single form: Email/Phone + Password + Login button
3. **Update Navigation component:**
   - Show user name when logged in
   - Add logout functionality

### Step 4: Dashboard Creation
1. Create simple dashboard page (`/app/dashboard/page.jsx`)
2. Add route protection middleware (`middleware.js`)  
3. Implement JWT storage in localStorage
4. Add redirect logic after successful auth

### Step 5: Testing & Validation
1. Test signup flow: User details → Hardcoded OTP → Dashboard
2. Test login flow: Email/Phone + Password → Dashboard
3. Test dashboard protection and logout
4. Verify role dropdown has all options
5. Confirm hardcoded OTP "123456" always works

## 🎨 Design Considerations

### UI/UX Changes:
- **Signup Page**: Complete UI overhaul for simple 2-step flow
- **Login Page**: Complete UI overhaul for single-step email/phone + password
- **Navigation**: Add user state and logout button
- **New Dashboard**: Clean, simple layout with placeholder cards
- **Role Selection**: Dropdown with 12+ options, default to "citizen"
- **OTP Flow**: Always accept "123456" with proper loading states

### User Experience Flow:
- **Signup**: Details → Hardcoded OTP → Dashboard redirect
- **Login**: Email/Phone + Password → Dashboard redirect  
- **Dashboard**: Welcome + Profile + Quick Actions + Logout
- **Error Handling**: Clear inline validation messages
- **Loading States**: Show spinners during API calls

### Security Features (Simplified for Hackathon):
- Password strength validation (minimum 6 characters)
- Email/phone format validation  
- Password confirmation matching
- Password hashing with bcrypt
- JWT token for authentication (stored in localStorage)  
- Basic input sanitization

## 🔍 Success Criteria

### Authentication Must Work:
- [x] Users can register with name, email, phone, password
- [x] Role dropdown shows 12+ options with "citizen" default
- [x] Hardcoded OTP "123456" always works for verification
- [x] Users can login with email/phone + password  
- [x] Users are redirected to dashboard after successful auth
- [x] Dashboard shows user info and placeholder features
- [x] Users can logout and return to home page
- [x] Route protection works (dashboard requires auth)

### UI Changes Complete:
- [x] Signup page completely redesigned for 2-step flow
- [x] Login page completely redesigned for simple email/phone + password
- [x] Navigation shows user name and logout when authenticated  
- [x] Dashboard page created with welcome message and quick actions
- [x] All forms show proper validation errors
- [x] Loading states work during API calls

### Database Integration Works:
- [x] MongoDB Atlas connection established
- [x] User records created with all fields including role
- [x] Passwords hashed securely with bcrypt
- [x] JWT tokens generated and validated correctly
- [x] Role defaults to "citizen" if not selected

## 🚀 Future Enhancements (Post-Hackathon)

1. **Real OTP Integration**: Replace hardcoded OTP with SMS service
2. **Email Verification**: Send confirmation emails for registration
3. **Password Reset**: Forgot password functionality
4. **Profile Management**: Edit user information and settings
5. **Social Login**: Google, Facebook authentication options
6. **Enhanced Dashboard**: Real features instead of placeholder cards
7. **Role-based Permissions**: Different access levels per role
8. **State/City Dropdowns**: Populate with real Indian locations

---

## ✅ Ready for Hackathon Implementation

This simplified plan provides a complete roadmap for implementing functional authentication while:
- Creating a working signup/login system with database integration
- Building a simple dashboard for user redirection  
- Using hardcoded OTP for demo purposes
- Implementing role selection with extensive dropdown options
- Following security best practices with JWT and bcrypt
- Keeping the implementation simple and hackathon-appropriate

**Next Step**: Await approval to begin implementation following this updated plan.

**Estimated Timeline**: 1 day for complete implementation of all phases.

**Hackathon Focus**: Functional demo with clean UI, working authentication, and simple dashboard - perfect for showcasing the platform concept.