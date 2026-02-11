#!/bin/bash

# فایل بررسی سیستم
# استفاده: chmod +x check-setup.sh && ./check-setup.sh

echo "🔍 بررسی تنظیمات سیستم..."
echo ""

# رنگ‌ها
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_count=0
passed_count=0

# تابع برای بررسی
check() {
  check_count=$((check_count + 1))
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅${NC} $1"
    passed_count=$((passed_count + 1))
  else
    echo -e "${RED}❌${NC} $1"
  fi
}

# 1. بررسی Node.js
echo "📦 بررسی نصب:"
node -v > /dev/null 2>&1
check "Node.js نصب شده"

npm -v > /dev/null 2>&1
check "NPM نصب شده"

# 2. بررسی فایل‌های مهم
echo ""
echo "📁 بررسی فایل‌ها:"

[ -f ".env.local" ]
check ".env.local موجود است"

[ -f "middleware.ts" ]
check "middleware.ts موجود است"

[ -f "src/components/blog-editor.tsx" ]
check "blog-editor.tsx موجود است"

[ -f "src/app/api/auth/login/route.ts" ]
check "auth/login API موجود است"

[ -f "src/app/api/auth/me/route.ts" ]
check "auth/me API موجود است"

[ -f "src/db/schema.sql" ]
check "schema.sql موجود است"

[ -f "src/db/migration-002.sql" ]
check "migration-002.sql موجود است"

# 3. بررسی dependencies
echo ""
echo "📚 بررسی کتابخانه‌ها:"

if [ -f "package.json" ]; then
  grep -q "\"jose\"" package.json
  check "jose در package.json وجود دارد"
  
  grep -q "\"@mui/material\"" package.json
  check "Material-UI در package.json وجود دارد"
  
  grep -q "\"@tiptap" package.json
  check "Tiptap در package.json وجود دارد"
fi

# 4. بررسی .env.local
echo ""
echo "⚙️  بررسی متغیرهای محیطی:"

if [ -f ".env.local" ]; then
  grep -q "DATABASE_URL" .env.local
  check "DATABASE_URL تنظیم شده است"
  
  grep -q "JWT_SECRET" .env.local
  check "JWT_SECRET تنظیم شده است"
  
  grep -q "NEXT_PUBLIC_API_BASE" .env.local
  check "NEXT_PUBLIC_API_BASE تنظیم شده است"
fi

# 5. بررسی node_modules
echo ""
echo "🔗 بررسی نصب‌شده‌ها:"

if [ -d "node_modules" ]; then
  [ -d "node_modules/jose" ]
  check "jose نصب شده است"
  
  [ -d "node_modules/@mui/material" ]
  check "@mui/material نصب شده است"
  
  [ -d "node_modules/@tiptap/react" ]
  check "@tiptap/react نصب شده است"
else
  echo -e "${YELLOW}⚠️  node_modules یافت نشد${NC}"
  echo "   دستور: npm install"
fi

# خلاصه
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ نتایج: $passed_count/$check_count مورد${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $passed_count -eq $check_count ]; then
  echo -e "${GREEN}🎉 تمام بررسی‌ها موفق بودند!${NC}"
  echo ""
  echo "شروع سریع:"
  echo "  npm run dev"
  echo ""
  echo "سپس برو به:"
  echo "  http://localhost:3000/auth/auth1/login"
  echo ""
  echo "ورود: admin / admin123"
  exit 0
else
  echo -e "${RED}⚠️  برخی بررسی‌ها ناموفق بودند${NC}"
  echo ""
  echo "نیازهای فقدان‌شده:"
  echo "  1. npm install"
  echo "  2. تنظیم .env.local"
  echo "  3. migration دیتابیس"
  exit 1
fi
