# 🔧 دستورات Migration دیتابیس

## ✅ مرحله 1: اجرای Schema اولیه

اگر هنوز دیتابیس را ایجاد نکرده‌اید:

```bash
psql "$DATABASE_URL" -f src/db/schema.sql
```

## ✅ مرحله 2: اجرای Migration برای Tags

```bash
psql "$DATABASE_URL" -f src/db/migration-002.sql
```

## ✅ بررسی موفقیت

```bash
# وصل شدن به دیتابیس
psql "$DATABASE_URL"

# دستورات بررسی:
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name='posts' 
ORDER BY ordinal_position;

# نتیجه مورد انتظار:
# column_name  | data_type
# id           | integer
# title        | text
# content      | text
# cover_img    | text
# tags         | jsonb  ✅ (ستون جدید)
# category     | text
# featured     | boolean
# author_id    | integer
# created_at   | timestamp with time zone
# views        | integer
# shares       | integer
```

## 🆘 اگر Migration انجام نشده:

### گزینه 1: دستور دستی

```bash
psql "$DATABASE_URL" -c "
ALTER TABLE posts ADD COLUMN IF NOT EXISTS tags JSONB;
CREATE INDEX IF NOT EXISTS posts_tags_idx ON posts USING GIN(tags);
"
```

### گزینه 2: از فایل Migration

```bash
psql "$DATABASE_URL" < src/db/migration-002.sql
```

## 📋 چک کردن وضعیت اتصال

```bash
# بررسی متغیر محیطی
echo $DATABASE_URL

# یا اتصال مستقیم
psql -h localhost -p 5432 -U postgres -d blog_db -c "SELECT COUNT(*) FROM posts;"
```

---

**اگر مشکل دارید، پیام خطا را به اشتراک بگذارید!** ✨
