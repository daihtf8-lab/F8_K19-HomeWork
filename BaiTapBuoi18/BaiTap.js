
    Bài 1: Spread Operator với Object 2 lớp
    - student.name: Không đổi (vẫn là 'hoang')
    - student.parent.name: Có bị đổi thành 'bo bang'

    - Toán tử Spread ({...student}) thực hiện Shallow Copy (sao chép nông)
    - Nó sao chép các giá trị ở lớp đầu tiên. name là kiểu dữ liệu nguyên thủy (string) nên được sao chép giá trị mới độc lập
    - Tuy nhiên, parent là một Object. Khi sao chép nông, nó chỉ sao chép địa chỉ vùng nhớ (tham chiếu). Do đó, cả student.parent và mentor.parent đều trỏ chung vào một "ngôi nhà" trên bộ nhớ

    Bài 2: Deep Copy bằng JSON
    - student.parent.name: Không bị ảnh hưởng (vẫn là 'bo hoang')

    - JSON.stringify chuyển Object thành một chuỗi văn bản, sau đó JSON.parse chuyển chuỗi đó ngược lại thành một Object hoàn toàn mới
    - Cách này tạo ra một Deep Copy (sao chép sâu). Mọi lớp bên trong (kể cả lớp parent) đều được tạo mới và không còn liên kết gì với Object gốc. Nó khác Spread ở chỗ Spread chỉ mới ở lớp ngoài cùng, còn JSON làm mới toàn bộ các lớp bên trong

    Bài 3: Spread Operator với Mảng (Array)
    - Mảng students (về mặt danh sách): Không đổi
    - Phần tử bên trong (students[0].name): Có bị thay đổi thành 'z'

    - Tương tự bài 1, [...students] tạo ra một mảng mới chứa các phần tử của mảng cũ. Nhưng các phần tử bên trong lại là các Object { name: 'a' }. Mảng mới chỉ sao chép tham chiếu của các Object này. Khi truy cập newStudents[0] và sửa thuộc tính của nó, là đang sửa trực tiếp Object mà mảng cũ cũng đang trỏ tới

    Bài 4: Truy cập sâu (Deep Nesting)
    - Kết quả: 999

    - Toán tử Spread { ...user } chỉ có tác dụng bảo vệ lớp đầu tiên (thuộc tính name). Các lớp sâu hơn như address, và sâu hơn nữa là location đều không được sao chép mới mà chỉ truyền lại địa chỉ tham chiếu
    - Khi viết newUser.address.location.lat = 999 là đang đi sâu vào vùng nhớ chung mà cả user và newUser đang sử dụng để sửa đổi giá trị