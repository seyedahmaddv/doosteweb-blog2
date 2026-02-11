# 🆘 حل مشکلات ورود و Redirect

## مشکل: بعد از ورود دوباره به صفحه خانه هدایت می‌شوم

### ✅ راه‌حل 1: بررسی Cookies

**مطمئن شوید که cookies در مرورگر ذخیره شده‌اند:**

```javascript
// در Console مرورگر:
document.cookie
// باید شامل: token=eyJ... باشد
```

**اگر cookie نیست:**
1. بروز `DevTools` → `Application` → `Cookies`
2. بررسی اینکه `token` وجود دارد

---

### ✅ راه‌حل 2: پاک کردن Cache

```bash
# Cache را پاک کن
rm -rf .next

# برنامه را دوباره شروع کن
npm run dev
```

---

### ✅ راه‌حل 3: بررسی Login API

**در Console مرورگر:**

```javascript
// 1. ورود
fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'admin123' }),
  credentials: 'include'
})
.then(r => r.json())
.then(d => console.log(d))

// 2. بررسی کاربر
fetch('/api/auth/me', {
  credentials: 'include'
})
.then(r => r.json())
.then(d => console.log(d))
```

**باید دیده شود:**
```json
{
  "status": 200,
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  },
  "msg": "success"
}
```

---

### ✅ راه‌حل 4: بررسی Environment Variables

**فایل: `.env.local`**

```bash
# باید وجود داشته باشد:
DATABASE_URL=...
JWT_SECRET=your-secret-key-change-this-in-production
NEXT_PUBLIC_API_BASE=/api
NODE_ENV=development
```

**اگر تغییری کردی، دوباره شروع کن:**
```bash
npm run dev
```

---

### ✅ راه‌حل 5: بررسی Middleware

**فایل: `middleware.ts` - باید اینطور باشد:**

```typescript
export const config = {
  matcher: ["/blog/create", "/blog/create2"],
};
```

**نه:**
```typescript
// ❌ غلط
matcher: ["/blog/create", "/blog/create2", "/auth/auth1"],
```

---

### ✅ راه‌حل 6: بررسی Blog Editor

**صفحه**: `src/components/blog-editor.tsx`

**باید این بخش را داشته باشی:**

```typescript
const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

useEffect(() => {
  const checkAuth = async () => {
    const res = await fetch("/api/auth/me", {
      credentials: "include",  // ⚠️ مهم!
    })
    // ...
  }
  checkAuth()
}, [router])
```

---

## 🔍 نحوه Debug کردن

### مرحله 1: بروز DevTools

```
F12 → Network → Fetch/XHR
```

### مرحله 2: ورود را بازی کن

1. برو به `/auth/auth1/login`
2. admin / admin123 را وارد کن
3. دکمه ورود را کلیک کن

### مرحله 3: نگاه کن به Network Requests

```
POST /api/auth/login
Status: 200 ✅
Response: { token: "eyJ...", status: 200 }
Cookies: token=eyJ...
```

### مرحله 4: چک کن /api/auth/me

```
GET /api/auth/me
Status: 200 ✅
Response: { data: { role: "admin" } }
```

---

## ⚠️ نکات مهم

1. **Credentials:** همیشه شامل `credentials: "include"` باشد
2. **Path:** صفحه ورود مسیر صحیح است: `/auth/auth1/login`
3. **Redirect:** بعد از ورود باید به `/blog/create` برود
4. **Cookie:** بین درخواست‌ها باید پایدار بماند

---

## 📝 Checklist

- [ ] `npm install` انجام داده‌ای
- [ ] `.env.local` تنظیم کردی
- [ ] `middleware.ts` درست است
- [ ] DevTools میتوانی ببینی
- [ ] `/api/auth/login` token برمی‌گرداند
- [ ] Cookie حاوی token است
- [ ] `/api/auth/me` موفق است

---

## 🚨 اگر هنوز مشکل دارد

**دستورات تشخیصی:**

```bash
# 1. DevTools را باز کن (F12)
# 2. Console tab را برو
# 3. اینها را بچه کن:

# چک کن اگر token موجود است
console.log(document.cookie)

# درخواست ورود را بفرست
fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'admin123' }),
  credentials: 'include'
}).then(r => r.json()).then(console.log)

# چک کن اگر درخواست موفق بود
# سپس DevTools → Application → Cookies را بازبینی کن
```

---

**اگر مشکل حل نشد، این اطلاعات را به اشتراک بگذار:** ✨
- خروجی console
- Network requests
- Browser version
- OS
