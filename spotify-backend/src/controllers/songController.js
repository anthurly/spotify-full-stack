import { v2 as cloudinary } from 'cloudinary'
import songModel from '../models/songModel.js';

const addSong = async (req, res) => {

    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const actor = req.body.actor;
        const khong_dau = req.body.khong_dau;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

        const songData = {
            name,
            desc,
            album,
            actor,
            khong_dau,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        };

        const song = songModel(songData);
        await song.save();

        res.json({ success: true, message: "Song Added" });

    } catch (error) {

        res.json({ success: false,error:error.message });

    }

}
const updatePlayedAt = async (req, res) => {
    try {
        const { songId } = req.params; // Lấy `songId` từ params
        const currentTime = new Date(); // Lấy thời gian hiện tại

        // Cập nhật bài hát trong database
        const updatedSong = await songModel.findByIdAndUpdate(
            songId,
            { playedAt: currentTime }, // Cập nhật trường playedAt
            { new: true } // Trả về bản ghi sau khi cập nhật
        );

        if (!updatedSong) {
            return res.status(404).json({ success: false, message: "Song not found" });
        }

        res.json({ success: true, message: "PlayedAt updated", data: updatedSong });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
const listSong = async (req, res) => {

    try {

        const allSongs = await songModel.find({});
        res.json({ success: true, songs: allSongs });

    } catch (error) {

        res.json({ success: false });
        
    }

}
const listSongSeacrch = async (req, res) => {
    try {
        const { original, normalized } = req.body; // Lấy dữ liệu từ body
        console.log("Original query:", original);
        console.log("Normalized query:", normalized);

        const query = normalized
            ? { khong_dau: { $regex: normalized, $options: "i" } }
            : {};

        const allSongs = await songModel.find(query);
        res.json({ success: true, songs: allSongs });
    } catch (error) {
        console.error("Error:", error);
        res.json({ success: false, message: "Error occurred" });
    }
};

const removeSong = async (req, res) => {

    try {

        await songModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Song Remove" });

    } catch (error) {

        res.json({ success: false });
        
    }

}
const listRecentSongs = async (req, res) => {
    try {
        // Lấy danh sách bài hát, sắp xếp theo playedAt giảm dần và giới hạn 10 bài
        const recentSongs = await songModel
            .find({playedAt: { $exists: true, $ne: null } }) // Chỉ lấy bài hát có trường playedAt
            .sort({ playedAt: -1 }) // Sắp xếp theo playedAt giảm dần
            .limit(10); // Giới hạn 10 bài

        res.json({ success: true, songs: recentSongs });
    } catch (error) {
        console.error("Error fetching recent songs:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};
export { addSong, listSong, removeSong,listSongSeacrch,updatePlayedAt,listRecentSongs }