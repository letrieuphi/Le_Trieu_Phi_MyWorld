# HƯỚNG DẪN BỔ SUNG ẢNH / VIDEO — TRIỆU PHI

Website hiện dùng file tĩnh: chưa có màn hình upload/admin. Đưa file vào thư mục public, khai báo đường dẫn trong dữ liệu rồi build/deploy lại. Không cần sửa layout. Kích thước dưới đây là kích thước file gợi ý, không phải kích thước hiển thị cố định.

## 1. Toàn bộ vị trí ảnh

| Vị trí | File gợi ý (pixel) | Tên và nơi đặt | Khai báo |
|---|---|---|---|
| Chân dung Home + About, dùng chung | 1200 × 1500, 4:5 | public/images/profile/portrait.jpg | profile.ts: profileImage; portraitAvailable: true |
| Cover mỗi dự án, dùng chung Home / Work / trang lĩnh vực | 1600 × 1100 | public/projects/<slug>/cover.webp | projects.ts: cover |
| Hero trang chi tiết dự án | 2400 × 1350, 16:9 | public/projects/<slug>/hero.webp | heroMedia |
| Gallery ảnh ngang | 1600 × 1067, 3:2 | public/projects/<slug>/gallery-01.webp, gallery-02.webp... | gallery[] |
| Gallery ảnh dọc | 1200 × 1800, 2:3 | public/projects/<slug>/gallery-03.webp | gallery[]; width/height đúng file |
| Gallery ảnh vuông | 1600 × 1600 | public/projects/<slug>/gallery-04.webp | gallery[] |
| Ảnh hậu trường | 1600 × 1067 hoặc tỉ lệ gốc | public/projects/<slug>/bts-01.webp... | bts[] |
| Ảnh quá trình / test ánh sáng | 1600 × 1067 hoặc tỉ lệ gốc | public/projects/<slug>/process-01.webp... | process[].media[] |
| Ảnh rộng hết vùng nội dung | 2400 × 1350 hoặc 2400 × 1600 | public/projects/<slug>/wide-01.webp | gallery[] với layout: 'full' |
| Dải ảnh kéo ngang | cạnh dài 1600–2000 | public/projects/<slug>/study-01.webp... | mediaSections[].items; layout: 'strip' |
| Album nhiếp ảnh | ngang 2000 × 1333; dọc 1333 × 2000 | public/photography/photo-01.webp... | dự án photography-collection: gallery[] |
| Banner nhiếp ảnh Home | 2400 × 900 | public/photography/banner.webp | profile.ts: photographyBanner |
| Poster video | 1920 × 1080, 16:9 | public/projects/<slug>/video-poster.webp | media video: poster |

Cover crop chính giữa theo khung ~1.45:1 desktop, ~1.35:1 mobile: giữ chủ thể/chữ quan trọng ở giữa, chừa mép. Chân dung crop 4:5. Banner crop mạnh tùy màn hình: chọn hình ít chữ, vùng trái đủ tối để đọc tiêu đề. Gallery dùng kích thước thực; khai báo width/height đúng file. Hero có chiều cao tối đa 750px, có thể crop ảnh quá cao; dùng fit: 'contain' nếu muốn giữ toàn khung. Các khối full-width rộng hết vùng nội dung, không tràn mép màn hình.

Không có ảnh riêng bắt buộc cho CV/Contact. Logo, dấu sao, hình điêu khắc ánh sáng và các hình trang trí lĩnh vực là đồ họa bằng code, không phải file cần upload.

## 2. Tên thư mục dự án

- LẠC: public/projects/lac/
- CỔ SẮC: public/projects/co-sac/
- DA&A: public/projects/daa-stopmotion/
- Photography Collection: public/projects/photography-collection/ (cover/hero); ảnh album ở public/photography/
- Motion Design: public/projects/motion-design-collection/

Tên file viết thường, không dấu, không khoảng trắng; dùng dấu gạch ngang và số 01, 02... Ví dụ lac-bts-01.webp hoặc bts-01.webp trong thư mục lac. Đuôi trong code phải khớp file thật, phân biệt hoa/thường trên GitHub Pages. JPG/WebP phù hợp ảnh; PNG khi cần nền trong suốt. Gợi ý nén cover/gallery khoảng 200–500 KB, hero dưới 1 MB nếu vẫn đủ đẹp. Đây là mục tiêu tối ưu, không phải giới hạn bắt buộc.

## 3. Thêm ảnh — ví dụ dự án LẠC

Mở src/content/projects.ts, tìm slug: 'lac', thêm các trường này trong object dự án (không tạo object thứ hai cùng slug):

```ts
cover: { src: '/projects/lac/cover.webp', alt: 'Khung hình phim LẠC', width: 1600, height: 1100 },
heroMedia: { src: '/projects/lac/hero.webp', alt: 'Cảnh chính phim LẠC', width: 2400, height: 1350 },
gallery: [
  { src: '/projects/lac/gallery-01.webp', alt: 'Mô tả ảnh 1', width: 1600, height: 1067 },
  { src: '/projects/lac/wide-01.webp', alt: 'Mô tả toàn cảnh', width: 2400, height: 1350, layout: 'full', fit: 'contain' },
],
bts: [
  { src: '/projects/lac/bts-01.webp', alt: 'Thiết lập ánh sáng', width: 1600, height: 1067, caption: 'Hậu trường ánh sáng' },
],
process: [{ title: 'Lighting tests', text: 'Mô tả quá trình thử ánh sáng.', media: [
  { src: '/projects/lac/process-01.webp', alt: 'Test ánh sáng', width: 1600, height: 1067 },
]}],
```

Đường dẫn code bắt đầu bằng /projects/..., KHÔNG có public và KHÔNG tự thêm /Le_Trieu_Phi_MyWorld. Website tự xử lý đường dẫn triển khai. Thêm bao nhiêu ảnh tùy nhu cầu: mỗi ảnh là một object, thứ tự trong mảng là thứ tự hiển thị. Chưa có ảnh thì bỏ trường hoặc để placeholder. Alt mô tả ảnh để hỗ trợ người đọc màn hình; caption là chú thích nhìn thấy. Copy mới có thể thêm bản dịch trong src/content/locales/vi.ts.

Chân dung: chép portrait.jpg vào public/images/profile/, đổi portraitAvailable thành true trong src/content/profile.ts. Banner: đổi photographyBanner từ '' thành '/photography/banner.webp'. Không cần sửa component.

## 4. Nút Xem video

LẠC, CỔ SẮC, DA&A và Motion Design đã có watchUrl: ''. Nút hiện “Xem video” và “Video sẽ được cập nhật”, đang vô hiệu hóa. Chỉ cần điền link công khai:

```ts
watchUrl: 'https://www.youtube.com/watch?v=VIDEO_ID_THAT',
```

Có thể dùng YouTube, Vimeo hoặc link HTTPS khác tới trang video; mở tab mới. Không cần upload video nếu chỉ dùng nút. Để thêm nút cho dự án mới, thêm watchUrl. Bỏ hẳn trường này nếu không cần nút. Không dùng link giả khi chưa có video.

Từng media video/embed cũng có nút riêng, tự dùng src nếu không có watchUrl; có thể đặt watchUrl riêng để dẫn tới bản đầy đủ. Preview cover không chứa nút để tránh link lồng nhau.

## 5. Video phát trong trang (tùy chọn)

```ts
videos: [
  { type: 'embed', src: 'https://www.youtube.com/watch?v=VIDEO_ID_THAT', alt: 'Phim hoàn chỉnh', layout: 'full' },
  { type: 'embed', src: 'https://vimeo.com/ID_SO_THAT', alt: 'Phim trên Vimeo', layout: 'full' },
  { type: 'video', src: '/videos/lac-trailer.mp4', poster: '/projects/lac/video-poster.webp', alt: 'Trailer LẠC', layout: 'full' },
  { type: 'video', src: 'https://your-host.example/film.mp4', alt: 'Video trực tiếp', layout: 'full' },
],
```

MP4: đặt public/videos/lac-trailer.mp4; gợi ý 1920 × 1080, H.264/AAC để tương thích phổ biến. Khung player hiện tại 16:9. YouTube/Vimeo phải cho phép nhúng; link trang xem không phải link MP4, nên dùng type: 'embed'. Video dài nên dùng dịch vụ video thay vì đưa file lớn vào Git. Chưa có nguồn nhưng muốn giữ vị trí: { type: 'video', alt: 'Trailer LẠC', placeholder: 'Video link coming soon' }. Video có thể dùng làm heroMedia với cùng cấu trúc.

## 6. Cách đưa lên GitHub

1. Mở repo letrieuphi/Le_Trieu_Phi_MyWorld, vào đúng thư mục public/... rồi Add file → Upload files. Tải file và commit.
2. Sửa src/content/projects.ts hoặc profile.ts theo hướng dẫn rồi commit. Có thể làm cả hai trong một commit nếu dùng Git trên máy.
3. Chờ Actions “Deploy portfolio to GitHub Pages” thành công, mở website và tải lại.

Chỉ upload file không tự tạo gallery: phải khai báo đường dẫn trong dữ liệu. Nếu muốn tuii nhập hộ, gửi thư mục đã đặt tên và bảng ghi ảnh thuộc dự án/vị trí nào, kèm link video; không cần sửa layout.
