Câu 1: Selector nào có độ ưu tiên cao nhất trong CSS?
- Inline có độ ưu tiên cao nhất, sau đó là ID selector, class selector, và cuối cùng là element selector

Câu 2: Nếu một phần tử HTML có cả h1, .title, và #main cùng set color — selector nào thắng? Tại sao?
- ID selector (#main) sẽ thắng vì nó có độ ưu tiên cao hơn so với class selector (.title) và element selector (h1). Trong CSS, ID selector có độ ưu tiên cao hơn class selector và element selector, do đó màu sắc được áp dụng từ ID selector sẽ được hiển thị trên phần tử đó.

Câu 3: Nếu bạn thêm style="color: pink" trực tiếp vào phần tử ở Câu 2, kết quả thay đổi như thế nào?
- Nếu thêm style="color: pink" trực tiếp vào phần tử, thì inline style sẽ có độ ưu tiên cao nhất và sẽ thắng tất cả các selector khác. Do đó, màu sắc của phần tử sẽ được hiển thị là màu hồng (pink) thay vì màu được xác định bởi ID selector (#main).

Câu 4: Tại sao theme.css có thể override style từ base.css? Điều kiện để override thành công là gì?
- theme.css có thể override style từ base.css nếu nó được load sau base.css trong HTML. Điều kiện để override thành công là theme.css phải có độ ưu tiên cao hơn hoặc bằng với các selector trong base.css, hoặc nó phải sử dụng các selector có độ ưu tiên cao hơn. Nếu theme.css chỉ sử dụng các selector có độ ưu tiên thấp hơn so với base.css, thì nó sẽ không override được style từ base.css.

Câu 5: Trong project của bạn, có hai phần tử đều dùng class .title nhưng hiển thị màu khác nhau. Giải thích tại sao?
- Là có các selector khác nhau tác động lên hai phần tử đó, ví dụ như một phần tử có thêm một ID selector hoặc một class selector khác có độ ưu tiên cao hơn. Ngoài ra, cũng có thể có các inline style hoặc các thuộc tính CSS khác được áp dụng trực tiếp lên một trong hai phần tử, làm thay đổi màu sắc hiển thị của nó so với phần tử còn lại.

Câu 6: Phần tử nào trong project của bạn có CSS phức tạp nhất? Liệt kê các selector tác động lên nó và giải thích selector nào thắng cuối cùng.
- Phần tử có CSS phức tạp nhất trong project là phần tử có class .header. Các selector tác động lên nó bao gồm: 
  1. element selector (h1)
  2. class selector (.header)
  3. ID selector (#main)
  4. inline style (style="color: red")
- Selector thắng cuối cùng là inline style (style="color: red") vì nó có độ ưu tiên cao nhất trong CSS, vượt qua cả ID selector, class selector và element selector. Do đó, màu sắc của phần tử .header sẽ được hiển thị là màu đỏ.