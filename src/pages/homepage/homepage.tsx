import { PostCard } from "@/components";

export const Homepage = () => {
  const postData = {
    author: {
      name: "Trần Văn Nhân",
      avatar:
        "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?q=80&w=881&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    createdAt: "2025-06-09T05:06:31.047Z",
    content: {
      full: `<h1>Khám phá React 18: Những tính năng mới và cải tiến đáng chú ý</h1>

<p>React 18 đã chính thức được phát hành với nhiều <strong>tính năng mới</strong> và <em>cải tiến đáng kể</em>. Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu những thay đổi quan trọng nhất.</p>

<h2>1. Concurrent Features</h2>

<p>Đây là <strong>tính năng lớn nhất</strong> của React 18. Concurrent rendering cho phép React:</p>

<ul>
<li>Tạm dừng, tiếp tục hoặc bỏ qua việc rendering</li>
<li>Ưu tiên các tác vụ quan trọng hơn</li>
<li>Cải thiện hiệu suất ứng dụng đáng kể</li>
</ul>

<blockquote>
<p>"Concurrent rendering không phải là một tính năng - nó là một cơ chế mới đằng sau React cho phép React chuẩn bị nhiều phiên bản UI cùng một lúc."</p>
</blockquote>

<h2>2. Automatic Batching</h2>

<p>Trước đây, React chỉ batch updates trong event handlers. Giờ đây, <code>automatic batching</code> hoạt động với:</p>

<ol>
<li>Promises</li>
<li>setTimeout</li>
<li>Native event handlers</li>
<li>Và nhiều hơn nữa...</li>
</ol>

<h3>Code example:</h3>

<pre><code>// Trước React 18: 2 lần re-render
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 1000);

// React 18: 1 lần re-render (batched)</code></pre>

<h2>3. New Hooks</h2>

<p>React 18 giới thiệu một số hooks mới:</p>

<ul>
<li><strong>useId()</strong>: Tạo unique ID cho accessibility</li>
<li><strong>useTransition()</strong>: Đánh dấu state updates như non-urgent</li>
<li><strong>useDeferredValue()</strong>: Defer việc update giá trị</li>
<li><strong>useSyncExternalStore()</strong>: Subscribe external store</li>
</ul>

<h2>4. Suspense Improvements</h2>

<p>Suspense giờ đây hỗ trợ tốt hơn với <em>server-side rendering</em> và có thể được sử dụng với <code>lazy()</code> một cách hiệu quả hơn.</p>

<p>Để tìm hiểu thêm, bạn có thể tham khảo <a href="https://reactjs.org/blog/2022/03/29/react-v18.html" target="_blank">tài liệu chính thức</a> của React team.</p>

<hr>

<p><strong>Kết luận:</strong> React 18 mang đến những cải tiến đáng kể về hiệu suất và trải nghiệm người dùng. Đây thực sự là một bước tiến lớn cho cộng đồng React developers! 🚀</p>`,
    },
  };

  const postData2 = {
    author: {
      name: "Trần Văn Nhân",
      avatar:
        "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?q=80&w=881&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    createdAt: "2025-06-09T05:06:31.047Z",
    content: {
      full: `<h1>Chuyến du lịch Đà Lạt: Khám phá thành phố ngàn hoa</h1>

<p>Vừa trở về từ chuyến du lịch <strong>3 ngày 2 đêm</strong> tại Đà Lạt cùng gia đình. Đây thực sự là một trải nghiệm <em>tuyệt vời</em> và đáng nhớ! 🌸</p>

<img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop" alt="Đà Lạt toàn cảnh" style="width: 100%; height: 400px; object-fit: cover; border-radius: 8px; margin: 16px 0;" />

<h2>🏨 Nơi lưu trú</h2>

<p>Chúng tôi đã chọn <strong>Dalat Palace Heritage Hotel</strong> - một khách sạn có lịch sử lâu đời với kiến trúc cổ điển châu Âu. View từ phòng nhìn ra hồ Xuân Hương thật đẹp!</p>

<figure style="text-align: center; margin: 24px 0;">
  <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=300&fit=crop" alt="Dalat Palace Hotel" style="width: 100%; max-width: 600px; height: 300px; object-fit: cover; border-radius: 8px;" />
  <figcaption style="font-style: italic; color: #666; margin-top: 8px;">Dalat Palace Heritage Hotel - nơi chúng tôi lưu trú</figcaption>
</figure>

<h2>🍓 Ẩm thực địa phương</h2>

<p>Không thể bỏ qua những món ăn đặc sản của Đà Lạt:</p>

<ul>
<li><strong>Bánh tráng nướng</strong> - giòn rụm, thơm ngon</li>
<li><strong>Nem nướng Đà Lạt</strong> - đậm đà hương vị</li>
<li><strong>Sữa đậu nành nóng</strong> - ấm bụng trong tiết trời se lạnh</li>
<li><strong>Dâu tây tươi</strong> - ngọt thanh, mọng nước</li>
</ul>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 20px 0;">
  <img src="https://images.unsplash.com/photo-1588566565463-180a5b2090d5?w=400&h=250&fit=crop" alt="Bánh tráng nướng" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;" />
  <img src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=250&fit=crop" alt="Dâu tây Đà Lạt" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;" />
</div>

<h2>📍 Những địa điểm check-in</h2>

<h3>1. Ga Đà Lạt (Cremaillère)</h3>

<p>Ga xe lửa cổ với kiến trúc <em>Art Déco</em> độc đáo. Bạn có thể trải nghiệm đoàn tàu từ Đà Lạt đến Trại Mát.</p>

<img src="https://images.unsplash.com/photo-1566408671221-ede25af91dda?w=700&h=350&fit=crop" alt="Ga Đà Lạt" style="width: 100%; height: 350px; object-fit: cover; border-radius: 8px; margin: 16px 0;" />

<h3>2. Hồ Xuân Hương</h3>

<blockquote>
<p>"Buổi sáng dạo quanh hồ, hít thở không khí trong lành, ngắm nhìn thành phố từ từ thức giấc... Cảm giác thật tuyệt vời!"</p>
</blockquote>

<h3>3. Valley of Love (Thung lũng Tình yêu)</h3>

<p>Nơi lý tưởng cho các cặp đôi và gia đình. Có nhiều hoạt động vui chơi như:</p>

<ol>
<li>Cưỡi đà điểu</li>
<li>Đi thuyền trên hồ</li>
<li>Chụp ảnh với background hoa cỏ</li>
</ol>

<img src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=400&fit=crop" alt="Valley of Love" style="width: 100%; height: 400px; object-fit: cover; border-radius: 8px; margin: 16px 0;" />

<h2>💰 Chi phí tham khảo</h2>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr style="background-color: #f8f9fa;">
    <th style="border: 1px solid #dee2e6; padding: 12px; text-align: left;">Hạng mục</th>
    <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Giá (VND)</th>
  </tr>
  <tr>
    <td style="border: 1px solid #dee2e6; padding: 12px;">Khách sạn (2 đêm)</td>
    <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">2,500,000</td>
  </tr>
  <tr>
    <td style="border: 1px solid #dee2e6; padding: 12px;">Ăn uống</td>
    <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">1,200,000</td>
  </tr>
  <tr>
    <td style="border: 1px solid #dee2e6; padding: 12px;">Di chuyển & tham quan</td>
    <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">800,000</td>
  </tr>
  <tr style="background-color: #f8f9fa; font-weight: bold;">
    <td style="border: 1px solid #dee2e6; padding: 12px;">Tổng cộng</td>
    <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">4,500,000</td>
  </tr>
</table>

<hr>

<p><strong>Tips nhỏ:</strong> Nên mang theo áo ấm vì Đà Lạt khá lạnh, đặc biệt vào buổi sáng sớm và tối. Đừng quên thử <code>cà phê vợt</code> - một đặc sản không thể bỏ qua! ☕</p>`,
    },
  };

  return (
    <div className="w-full py-5 space-y-5">
      <PostCard {...postData} />
      <PostCard {...postData2} />
    </div>
  );
};
