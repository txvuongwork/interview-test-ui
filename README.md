# PostVibe - Interview Test UI

PostVibe là một ứng dụng web blog được xây dựng bằng React + TypeScript với Vite, hỗ trợ authentication, tìm kiếm và hiển thị bài viết blog.

## 🚀 Tính năng chính

- **Authentication**: Đăng ký, đăng nhập người dùng
- **Blog Management**: Xem danh sách blog, chi tiết blog, tìm kiếm blog
- **Comment System**: Hệ thống bình luận cho bài viết
- **Responsive Design**: Giao diện tương thích đa thiết bị
- **Internationalization**: Hỗ trợ đa ngôn ngữ (i18n)

## 🛠 Công nghệ sử dụng

- **Frontend Framework**: React 19.x
- **Build Tool**: Vite 7.x
- **Language**: TypeScript
- **Styling**: TailwindCSS 4.x
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v7
- **Form Handling**: React Hook Form + Zod validation
- **UI Components**: Radix UI
- **HTTP Client**: Axios
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint

## 📋 Yêu cầu hệ thống

- Node.js 18.x hoặc cao hơn
- npm hoặc yarn
- Git

## ⚙️ Cài đặt và thiết lập

### 1. Clone repository

```bash
git clone <repository-url>
cd interview-test-ui
```

### 2. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### 3. Thiết lập environment variables

Tạo file `.env` trong thư mục root và thêm các biến môi trường cần thiết:

```env
VITE_API_URL=http://localhost:8000/api
```

### 4. Chạy ứng dụng

#### Development mode

```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

#### Production build

```bash
npm run build
# hoặc
yarn build
```

#### Preview production build

```bash
npm run preview
# hoặc
yarn preview
```

## 🧪 Testing

### Chạy tất cả tests

```bash
npm run test
# hoặc
yarn test
```

### Chạy tests với UI

```bash
npm run test:ui
# hoặc
yarn test:ui
```

### Chạy tests một lần (CI mode)

```bash
npm run test:run
# hoặc
yarn test:run
```

## 🏗 Cấu trúc thư mục

```
src/
├── components/          # Các component tái sử dụng
│   ├── auth/           # Components liên quan authentication
│   ├── form/           # Form components
│   ├── layouts/        # Layout components
│   ├── post/           # Blog post components
│   └── ui/             # UI components cơ bản
├── config/             # Cấu hình ứng dụng
├── constants/          # Constants và cấu hình
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── locales/            # Internationalization files
├── pages/              # Page components
├── routes/             # Routing configuration
├── schemas/            # Zod validation schemas
├── services/           # API service functions
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🔗 API Integration

Ứng dụng sử dụng Axios để tương tác với API backend. Cấu hình API được thiết lập trong `src/config/axios.ts` với:

- Automatic authentication token handling
- Request/Response interceptors
- Error handling
- Base URL configuration via environment variables

## 📱 Routing

Ứng dụng sử dụng React Router với các routes chính:

- `/` - Homepage (protected)
- `/auth/login` - Đăng nhập
- `/auth/register` - Đăng ký
- `/blogs/search` - Tìm kiếm blog
- `/blogs/:id` - Chi tiết blog

## 🎨 UI Components

Ứng dụng sử dụng design system dựa trên:

- **Radix UI**: Accessible UI primitives
- **TailwindCSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Framer Motion**: Animation library

### Code formatting

Dự án được cấu hình với ESLint để đảm bảo code quality và consistency.

## 🚀 Deployment

Dự án đã được cấu hình để deploy lên Vercel với file `vercel.json` để handle client-side routing.

### Deploy to Vercel

1. Connect repository to Vercel
2. Set environment variables trong Vercel dashboard
3. Deploy automatically từ main branch
