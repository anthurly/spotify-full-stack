import mongoose from "mongoose";

// Hàm loại bỏ dấu tiếng Việt
function removeDiacritics(str) {
    return str
        .normalize("NFD") // Tách các ký tự dấu ra
        .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu
        .replace(/đ/g, "d") // Thay 'đ' bằng 'd'
        .replace(/Đ/g, "D"); // Thay 'Đ' bằng 'D'
}

const albumSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    bgColour: { type: String, required: true },
    image: { type: String, required: true },
});

// Hook để tự động gán giá trị cho `khong_dau` trước khi lưu

const albumModel = mongoose.models.album || mongoose.model("album", albumSchema);

export default albumModel;
