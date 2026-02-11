# 📚 راهنمای کامل سیستم بلاگ

## 🎯 محتویات

- [نصب و راه‌اندازی](#نصب-و-راه‌اندازی)
- [استفاده](#استفاده)
- [میگریشن دیتابیس](#میگریشن-دیتابیس)
- [حل مشکلات](#حل-مشکلات)
- [ویژگی‌ها](#ویژگی‌ها)
- [فایل‌های مرجع](#فایل‌های-مرجع)

---

## 🚀 نصب و راه‌اندازی

### مرحله 1: نصب Dependencies

```bash
npm install
# یا
pnpm install
```

### مرحله 2: تنظیم متغیرهای محیطی

```bash
cp .env.local.example .env.local
```

**فایل**: `.env.local`

```env
DATABASE_URL=postgres://postgres:password@localhost:5432/blog_db
JWT_SECRET=your-secret-key-change-this
NEXT_PUBLIC_API_BASE=/api
NODE_ENV=development
```

### مرحله 3: میگریشن دیتابیس

```bash
# Schema اولیه
psql "$DATABASE_URL" -f src/db/schema.sql

# Migration برای Tags
psql "$DATABASE_URL" -f src/db/migration-002.sql
```

### مرحله 4: شروع سرور

```bash
npm run dev
```

سرور در `http://localhost:3000` اجرا می‌شود.

---

## 💻 استفاده

### 1️⃣ صفحه ورود

**مسیر**: `http://localhost:3000/auth/auth1/login`

```
نام کاربری: admin
رمز عبور: admin123
```

### 2️⃣ صفحه ایجاد پست

**مسیر**: `http://localhost:3000/blog/create`

#### مراحل:
1. **عنوان**: عنوان پست را وارد کن
2. **دسته‌بندی**: 
   - انتخاب از لیست
   - یا اضافه کردن دسته جدید
3. **تصویر کاور**:
   - وارد کردن URL
   - نمایش پیش‌نمایش
4. **برچسب‌ها**:
   - افزودن برچسب
   - حذف با کلیک روی ✕
5. **محتوا**: نوشتن در ویرایشگر
6. **ذخیره**: دکمه ذخیره

### 3️⃣ نمایش تمام پست‌ها

**مسیر**: `http://localhost:3000/blog`

---

## 🗄️ میگریشن دیتابیس

### دستورات تفصیلی

```bash
# 1. فایل‌ها را بررسی کن
ls src/db/

# 2. بررسی اتصال دیتابیس
psql "$DATABASE_URL" -c "SELECT VERSION();"

# 3. ایجاد schema
psql "$DATABASE_URL" -f src/db/schema.sql

# 4. اجرای migration
psql "$DATABASE_URL" -f src/db/migration-002.sql

# 5. بررسی موفقیت
psql "$DATABASE_URL" -c "
  SELECT column_name, data_type 
  FROM information_schema.columns 
  WHERE table_name='posts'
  ORDER BY ordinal_position;
"
```

### خروجی مورد انتظار

```
    column_name    |            data_type
-------------------+----------------------------
 id                | integer
 title             | text
 content           | text
 cover_img         | text
 created_at        | timestamp with time zone
 views             | integer
 shares            | integer
 category          | text
 featured          | boolean
 author_id         | integer
 tags              | jsonb   ✅ (ستون جدید)
```

---

## 🔐 احراز هویت

### سیستم JWT

- **محل ذخیره**: HttpOnly Cookie
- **صلاحیت**: 7 روز
- **API بررسی**: `/api/auth/me`

### مسیرهای محافظت‌شده

```
/blog/create     → فقط ادمین
/blog/create2    → فقط ادمین
```

### Logout

```bash
POST /api/auth/logout
```

---

## 🛠️ حل مشکلات

### مشکل: بعد از ورود redirect می‌شود

**راه‌حل:**

1. **پاک‌سازی Cache**
   ```bash
   rm -rf .next
   npm run dev
   ```

2. **بررسی Cookies**
   ```javascript
   // DevTools Console:
   document.cookie
   // باید شامل: token=eyJ... باشد
   ```

3. **بررسی API**
   ```javascript
   fetch('/api/auth/me', { credentials: 'include' })
     .then(r => r.json())
     .then(d => console.log(d))
   ```

### مشکل: Database Connection Failed

**راه‌حل:**

```bash
# بررسی اتصال
psql "$DATABASE_URL" -c "SELECT 1;"

# بررسی متغیر محیطی
echo $DATABASE_URL

# مثال صحیح:
# postgres://postgres:mypassword@localhost:5432/blog_db
```

### مشکل: "jose is not installed"

**راه‌حل:**

```bash
npm install jose
```

---

## ✨ ویژگی‌ها

### 🖼️ تصویر کاور

- ✅ بارگذاری URL
- ✅ پیش‌نمایش
- ✅ ذخیره

### 📂 دسته‌بندی‌های سفارشی

- ✅ لیست پیش‌فرض
- ✅ افزودن دسته جدید
- ✅ انتخاب از لیست

### 🏷️ برچسب‌ها

- ✅ چند برچسب
- ✅ نمایش چیپ‌ها
- ✅ حذف راحت
- ✅ ذخیره JSON

### 🔒 احراز هویت

- ✅ JWT Tokens
- ✅ HttpOnly Cookies
- ✅ Middleware Protection
- ✅ Role-based Access

---

## 📖 فایل‌های مرجع

| فایل | توضیح |
|------|-------|
| [QUICKSTART.md](./QUICKSTART.md) | شروع سریع (5 دقیقه) |
| [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) | راهنمای میگریشن |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | حل مشکلات |
| [FIXES_SUMMARY.md](./FIXES_SUMMARY.md) | خلاصه تغییرات |
| [IMPLEMENTATION_SUMMARY_FA.md](./IMPLEMENTATION_SUMMARY_FA.md) | جزئیات کامل |
| [BLOG_FEATURES.md](./BLOG_FEATURES.md) | ویژگی‌های بلاگ |

---

## 🧪 تست سریع

### 1. بررسی تنظیمات

```bash
chmod +x check-setup.sh
./check-setup.sh
```

### 2. ورود و استفاده

```
1. برو به: http://localhost:3000/auth/auth1/login
2. وارد شو: admin / admin123
3. ایجاد پست: http://localhost:3000/blog/create
4. دیدن پست‌ها: http://localhost:3000/blog
```

### 3. DevTools

```javascript
// F12 → Console
fetch('/api/auth/me', { credentials: 'include' })
  .then(r => r.json())
  .then(d => console.log(d))
```

---

## 📝 یادداشت‌های مهم

1. **JWT_SECRET**: در production تغییر دهید
2. **DATABASE_URL**: متغیر محیطی درست است
3. **Cookies**: HttpOnly برای امنیت
4. **Migration**: دستی انجام شود
5. **Tags**: JSON format ذخیره می‌شود

---

## 🎓 ساختار پروژه

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts
│   │       ├── me/route.ts
│   │       └── logout/route.ts
│   ├── blog/
│   │   ├── create/page.tsx
│   │   └── page.tsx
│   └── auth/
│       ├── auth1/login/page.tsx
│       └── authForms/AuthLogin.tsx
├── components/
│   └── blog-editor.tsx
├── types/
│   └── blog.ts
└── db/
    ├── schema.sql
    └── migration-002.sql

middleware.ts
package.json
.env.local
```

---

## ❓ سوالات متکرر

**Q: چگونه رمز ادمین را تغییر دهم؟**
A: فایل `src/app/api/auth/login/route.ts` را ویرایش کنید

**Q: آیا دسته‌بندی‌ها محفوظ می‌مانند؟**
A: خیر، در حافظه هستند. برای محفوظ‌سازی به دیتابیس منتقل کنید

**Q: چگونه فایل آپ‌لود کنم؟**
A: فعلاً فقط URL. برای آپ‌لود middleware اضافه کنید

**Q: آیا Logout کردن ممکن است؟**
A: بله، POST به `/api/auth/logout`

---

## 🆘 نیاز به کمک؟

1. [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) را بخوانید
2. DevTools (F12) را بررسی کنید
3. Network requests را چک کنید
4. Console errors را بگویید

---

## 📄 لایسنس

MIT License

---

## 📧 تماس

برای سوالات یا مشاهده bug: ایشو یا PR ایجاد کنید

---

**🎉 موفق باشید!** ✨
