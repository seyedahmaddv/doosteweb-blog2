# 🔧 حل مشکل React Hooks Error

## مشکل: Rules of Hooks Violation ❌

**خطای React:**
```
React has detected a change in the order of Hooks called by BlogEditor
```

### علت مشکل:

Hook‌ها نمی‌توانند در صورت conditional قرار بگیرند:

```typescript
// ❌ غلط
if (condition) return null  // بعضی hooks فراخوانی نمی‌شود
const editor = useEditor()  // خطا: Hook order تغییر می‌کند
```

### راه‌حل: تقسیم Component ✅

**قبل:** یک component بزرگ
```
BlogEditor (Auth Check + Editor UI + Hooks)
└─ useEffect → if return null
└─ useEditor (گاهی فراخوانی، گاهی نه) ❌
```

**بعد:** دو component جدا
```
BlogEditor (Auth Wrapper) ✅
├─ useEffect (auth check فقط)
└─ BlogEditorContent (اگر authenticated)
   ├─ useState (13 تا)
   ├─ useRef
   └─ useEditor (همیشه فراخوانی می‌شود) ✅
```

---

## تغییرات اعمال‌شده:

### 1️⃣ Component جدید: `BlogEditorContent`

```typescript
// تمام editor logic و hooks
function BlogEditorContent({ onSaveSuccess }: BlogEditorProps) {
  const [title, setTitle] = useState("")
  // ... 12 تا state دیگر
  const editor = useEditor(...)  // ✅ همیشه فراخوانی می‌شود
  // ... باقی logic
}
```

### 2️⃣ Wrapper Component: `BlogEditor`

```typescript
export function BlogEditor({ onSaveSuccess }: BlogEditorProps) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      // فقط auth check
    }
    checkAuth()
  }, [router])

  if (authLoading) return <Loading />
  if (isAdmin === false) return null
  
  // ✅ اگر authenticated شد، component داخلی رندر شود
  return <BlogEditorContent onSaveSuccess={onSaveSuccess} />
}
```

---

## ✅ چرا این حل درست است؟

| جنبه | وضعیت |
|------|-------|
| Hook order | ✅ ثابت (همیشه فراخوانی می‌شود) |
| Conditional | ✅ تقسیم شد (بین components) |
| Rules of Hooks | ✅ رعایت شد |
| Performance | ✅ بهتر (lazy rendering) |

---

## 📝 یادداشت‌ها

1. **Hook Rules:** Hooks باید در top level قرار بگیرند
2. **Conditional:** conditional باید بین components باشد
3. **Export:** فقط `BlogEditor` exported است
4. **Auth:** Wrapper می‌تواند auth check کند
5. **Content:** Content component دارای تمام logic است

---

## 🧪 تست کردن

```bash
npm run dev
# برو به: http://localhost:3000/blog/create

# اگر authenticated نیستی:
# ✅ Loading spinner
# ✅ Redirect to login (بدون error)

# اگر authenticated هستی:
# ✅ تمام form fields نمایش داده می‌شود
# ✅ No React hooks errors
```

---

## 📊 مقایسه

### قبل (❌ خطا):
```
BlogEditor
├─ useEffect
├─ if return null  ← خطا اینجا
├─ useRef
└─ useEditor  ← گاهی فراخوانی نمی‌شود
```

### بعد (✅ درست):
```
BlogEditor (wrapper)
├─ useEffect (auth check)
├─ if return null  ← OK: component level
└─ <BlogEditorContent />
   ├─ useState × 13
   ├─ useRef
   ├─ useEditor  ← ✅ همیشه فراخوانی
   └─ JSX
```

---

## 🎯 نتیجه

**خطا حل شد!** ✨

اکنون می‌توانی:
- ✅ به صفحه create برو
- ✅ پست بسازی بدون error
- ✅ تمام ویژگی‌ها کار کنند

---

**بیشتر بخوانید:** https://react.dev/reference/rules/rules-of-hooks
