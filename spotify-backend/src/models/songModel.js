import mongoose from "mongoose";

// Hàm loại bỏ dấu tiếng Việt
function removeDiacritics(str) {
    return str
        .normalize("NFD") // Tách các ký tự dấu ra
        .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu
        .replace(/đ/g, "d") // Thay 'đ' bằng 'd'
        .replace(/Đ/g, "D"); // Thay 'Đ' bằng 'D'
}

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    album: { type: String, required: true },
    image: { type: String, required: true },
    file: { type: String, required: true },
    actor: { type: String, required: true },
    duration: { type: String, required: true },
    playedAt: { type: Date, required: false, default:null },
    khong_dau: { type: String, required: true } // Thêm trường không dấ
    // u
},
{
    timestamps: true, // Mongoose tự động thêm `createdAt` và `updatedAt`
}
);

// Hook để tự động gán giá trị cho `khong_dau` trước khi lưu
const songModel = mongoose.models.song || mongoose.model("song", songSchema);

export default songModel;
