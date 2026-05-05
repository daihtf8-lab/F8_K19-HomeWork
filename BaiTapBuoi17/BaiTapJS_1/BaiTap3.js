function cleanName(name, keyword) {
    const cleanedName = name.trim().toLowerCase();
    const cleanedKeyword = keyword.toLowerCase();
    // Quy tắc (F) has/contains + Danh từ
    const hasKeyword = cleanedName.includes(cleanedKeyword);

    return hasKeyword;
}

// TEST THỬ KẾT QUẢ
console.log(cleanName('   NGUYEN Van An   ', 'an'));
console.log(cleanName('   Tran Thi B ', 'hoang'));