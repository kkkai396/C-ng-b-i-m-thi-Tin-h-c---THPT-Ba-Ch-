/**
 * ============================================================================
 * CỔNG TRA CỨU & CÔNG BỐ ĐIỂM THI MÔN TIN HỌC - TRƯỜNG THPT BA CHẼ
 * File: app.js
 * Mô tả: Quản lý dữ liệu chuẩn biểu mẫu Bộ GD&ĐT (VNEDU/SMAS), xác thực Mã PIN,
 *        hiển thị bảng điểm 15 cột (Bảng chuẩn & Thẻ Điện thoại), đồng bộ data.json
 *        giữa Máy tính và Điện thoại, quản trị Admin & Import/Export Excel.
 * ============================================================================
 */

const STORAGE_KEY = 'THPT_BACHE_TINHOC_PORTAL_V4';
const LEGACY_KEYS = ['THPT_BACHE_TINHOC_PORTAL_V3', 'THPT_BACHE_TINHOC_PORTAL_V2', 'THPT_BACHE_TINHOC_PORTAL_V1'];
const VALID_SEMESTERS = ['Giữa kỳ I', 'Cuối kỳ I', 'Giữa kỳ II', 'Cuối kỳ II'];

/**
 * 1. DỮ LIỆU MẶC ĐỊNH THEO ĐÚNG FILE ĐIỂM RIÊNG CỦA TỪNG LỚP (10A1, 10A3, 10A4, 10A6, 11A1, 11A3, 12A1)
 * Tuyệt đối không dùng chung 1 danh sách học sinh cho tất cả các lớp.
 */
const DEFAULT_PORTAL_DATA = {
    "dataVersion":  1794502000000,
    "schoolName":  "Trường THPT Ba Chẽ",
    "schoolYear":  "2026 - 2027",
    "adminPassword":  "admin123",
    "classes":  [
                    {
                        "id":  "10A1",
                        "name":  "10A1",
                        "grade":  "10",
                        "pin":  "1000",
                        "published":  true,
                        "teacher":  "Vi Anh Quân",
                        "semester":  "Giữa kỳ I",
                        "updatedAt":  "12/11/2026",
                        "students":  [
                                         {
                                             "stt":  1,
                                             "mdd":  "2272825039",
                                             "name":  "Triệu Hoa Tuệ An",
                                             "dob":  "03/03/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  2,
                                             "mdd":  "2204841038",
                                             "name":  "Dịp Thị Vân Anh",
                                             "dob":  "22/09/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.2,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  3,
                                             "mdd":  "2272824988",
                                             "name":  "Vũ Thiện Anh",
                                             "dob":  "20/11/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  4,
                                             "mdd":  "2276668138",
                                             "name":  "Triệu Quốc Ánh",
                                             "dob":  "01/02/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  5,
                                             "mdd":  "2237266732",
                                             "name":  "Vi Hoàng Bách",
                                             "dob":  "03/08/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  6,
                                             "mdd":  "2220105814",
                                             "name":  "Đàm Hiếu Bình",
                                             "dob":  "28/02/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.2,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  7,
                                             "mdd":  "2272825022",
                                             "name":  "Nguyễn Bảo Châu",
                                             "dob":  "31/08/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  8,
                                             "mdd":  "2237243084",
                                             "name":  "Lương Minh Dũng",
                                             "dob":  "27/09/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  9,
                                             "mdd":  "2202310777",
                                             "name":  "Bùi Việt Đức",
                                             "dob":  "07/12/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  10,
                                             "mdd":  "2234630693",
                                             "name":  "Vi Chu Hải Hà",
                                             "dob":  "24/05/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  11,
                                             "mdd":  "2272825027",
                                             "name":  "Trần Mỹ Hạnh",
                                             "dob":  "12/02/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  12,
                                             "mdd":  "2272824997",
                                             "name":  "Lã Việt Hoàng",
                                             "dob":  "04/06/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  13,
                                             "mdd":  "2237243063",
                                             "name":  "Nịnh Quốc Huy",
                                             "dob":  "06/08/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  14,
                                             "mdd":  "6702526852",
                                             "name":  "Lê Chấn Hưng",
                                             "dob":  "29/08/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  15,
                                             "mdd":  "2234607234",
                                             "name":  "Nịnh Quốc Hưng",
                                             "dob":  "11/09/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  16,
                                             "mdd":  "2234668016",
                                             "name":  "Nguyễn Bảo Khang",
                                             "dob":  "09/09/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  17,
                                             "mdd":  "3320099402",
                                             "name":  "Phạm Hoàng Bảo Khanh",
                                             "dob":  "13/11/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  18,
                                             "mdd":  "2220099403",
                                             "name":  "Nguyễn Gia Khánh",
                                             "dob":  "28/09/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  19,
                                             "mdd":  "2220016703",
                                             "name":  "Nông Duy Khánh",
                                             "dob":  "18/12/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  20,
                                             "mdd":  "3420099404",
                                             "name":  "Phạm Ngọc Khánh",
                                             "dob":  "10/09/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  21,
                                             "mdd":  "2220099405",
                                             "name":  "HỒ DUY KHIÊM",
                                             "dob":  "28/06/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  22,
                                             "mdd":  "2203382185",
                                             "name":  "Vũ Tùng Lâm",
                                             "dob":  "16/03/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  23,
                                             "mdd":  "2272825025",
                                             "name":  "Bùi Thanh Mai",
                                             "dob":  "19/10/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.2,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  24,
                                             "mdd":  "2220016711",
                                             "name":  "Lộc Phương Nga",
                                             "dob":  "06/06/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  25,
                                             "mdd":  "2220016712",
                                             "name":  "Đinh Hoàng Nghiệp",
                                             "dob":  "08/11/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  26,
                                             "mdd":  "2237301972",
                                             "name":  "Bàn Thế Nhân",
                                             "dob":  "10/02/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  27,
                                             "mdd":  "3420099410",
                                             "name":  "Phạm Thị Phương Nhi",
                                             "dob":  "03/04/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  28,
                                             "mdd":  "2272825002",
                                             "name":  "Phạm Tô Uyển Nhi",
                                             "dob":  "03/10/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  29,
                                             "mdd":  "2220099413",
                                             "name":  "Lê Chấn Phong",
                                             "dob":  "24/12/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  30,
                                             "mdd":  "2276668154",
                                             "name":  "Lương Bằng Quang",
                                             "dob":  "23/12/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  31,
                                             "mdd":  "2272825034",
                                             "name":  "Khiếu Minh Quân",
                                             "dob":  "17/05/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  32,
                                             "mdd":  "2237243077",
                                             "name":  "Bùi Danh Thái",
                                             "dob":  "23/10/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  33,
                                             "mdd":  "2220099414",
                                             "name":  "Đặng Nhật Thành",
                                             "dob":  "16/04/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  34,
                                             "mdd":  "2237301974",
                                             "name":  "Triệu Thị Phương Thảo",
                                             "dob":  "03/06/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  35,
                                             "mdd":  "2272825000",
                                             "name":  "Vi Hùng Thắng",
                                             "dob":  "25/12/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  36,
                                             "mdd":  "2260412006",
                                             "name":  "Phạm Mẫn Thi",
                                             "dob":  "21/02/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  37,
                                             "mdd":  "2237243078",
                                             "name":  "Nguyễn Duy Thịnh",
                                             "dob":  "25/10/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  38,
                                             "mdd":  "2220016725",
                                             "name":  "Nịnh Thanh Thùy",
                                             "dob":  "12/07/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  39,
                                             "mdd":  "2235885913",
                                             "name":  "Khúc Mạnh Trường",
                                             "dob":  "27/02/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  40,
                                             "mdd":  "2237301950",
                                             "name":  "Hoàng Duy Tùng",
                                             "dob":  "31/03/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.2,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  41,
                                             "mdd":  "2272825040",
                                             "name":  "Tô Khánh Vân",
                                             "dob":  "20/07/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  42,
                                             "mdd":  "2272825038",
                                             "name":  "Hoàng Khánh Vy",
                                             "dob":  "25/07/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  43,
                                             "mdd":  "2220807810",
                                             "name":  "Đặng Thị Xoan",
                                             "dob":  "24/08/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         }
                                     ]
                    },
                    {
                        "id":  "10A3",
                        "name":  "10A3",
                        "grade":  "10",
                        "pin":  "3000",
                        "published":  true,
                        "teacher":  "Vi Anh Quân",
                        "semester":  "Giữa kỳ I",
                        "updatedAt":  "12/11/2026",
                        "students":  [
                                         {
                                             "stt":  1,
                                             "mdd":  "2237243058",
                                             "name":  "Chương Bảo Anh",
                                             "dob":  "20/01/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  2,
                                             "mdd":  "2234590723",
                                             "name":  "Hà Kỳ Anh",
                                             "dob":  "12/02/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  3,
                                             "mdd":  "2234673880",
                                             "name":  "Nguyễn Trung Anh",
                                             "dob":  "14/06/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  4,
                                             "mdd":  "2220765868",
                                             "name":  "Tô Thị Vân Anh",
                                             "dob":  "11/08/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  5,
                                             "mdd":  "2233192423",
                                             "name":  "Mã Ngọc Bích",
                                             "dob":  "06/03/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  6,
                                             "mdd":  "2237301955",
                                             "name":  "Nguyễn Quỳnh Chi",
                                             "dob":  "30/07/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  7,
                                             "mdd":  "2237243074",
                                             "name":  "Nguyễn Ngọc Diệp",
                                             "dob":  "17/06/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  8,
                                             "mdd":  "3161451785",
                                             "name":  "Lê Khánh Duy",
                                             "dob":  "16/12/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  9,
                                             "mdd":  "2237266737",
                                             "name":  "Vi Hoàng Thành Đạt",
                                             "dob":  "12/10/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  10,
                                             "mdd":  "2237301961",
                                             "name":  "Mông Thúy Hà",
                                             "dob":  "16/08/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  11,
                                             "mdd":  "2220765890",
                                             "name":  "CHÍU THỊ HOA",
                                             "dob":  "26/08/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  12,
                                             "mdd":  "2234661396",
                                             "name":  "Đinh Thị Hồng",
                                             "dob":  "27/11/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  13,
                                             "mdd":  "2272824996",
                                             "name":  "Hoàng Gia Huy",
                                             "dob":  "15/11/2011",
                                             "gender":  "Nam",
                                             "tx1":  7.5,
                                             "tx2":  7.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  14,
                                             "mdd":  "2234598318",
                                             "name":  "Tô Gia Hưng",
                                             "dob":  "04/12/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  15,
                                             "mdd":  "2233861442",
                                             "name":  "Hoàng Minh Khánh",
                                             "dob":  "09/12/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  16,
                                             "mdd":  "2220016705",
                                             "name":  "Đoàn Minh Kiệt",
                                             "dob":  "21/12/2011",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  17,
                                             "mdd":  "2237300990",
                                             "name":  "Nịnh Thị Lan",
                                             "dob":  "03/09/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  18,
                                             "mdd":  "2235524150",
                                             "name":  "NGUYỄN THỊ MỸ LỆ",
                                             "dob":  "22/09/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  19,
                                             "mdd":  "2234673740",
                                             "name":  "Nịnh Thị Khánh Linh",
                                             "dob":  "24/03/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  20,
                                             "mdd":  "2220941623",
                                             "name":  "Vi Thị Linh",
                                             "dob":  "23/03/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  21,
                                             "mdd":  "2234630589",
                                             "name":  "Trần Thị Hằng Nga",
                                             "dob":  "28/05/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  22,
                                             "mdd":  "2235524112",
                                             "name":  "Phùn Bảo Ngọc",
                                             "dob":  "25/02/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  23,
                                             "mdd":  "2235524154",
                                             "name":  "Đặng Thị Tuyết Nhâm",
                                             "dob":  "02/01/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  24,
                                             "mdd":  "2234667034",
                                             "name":  "Vi Thành Nhân",
                                             "dob":  "28/02/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  25,
                                             "mdd":  "2237301940",
                                             "name":  "Mông Thị Nhi",
                                             "dob":  "13/09/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  26,
                                             "mdd":  "2234694421",
                                             "name":  "Lý Thị Quỳnh Như",
                                             "dob":  "31/10/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  27,
                                             "mdd":  "2235524116",
                                             "name":  "PHÙN QUỲNH NHƯ",
                                             "dob":  "25/02/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  28,
                                             "mdd":  "2220016719",
                                             "name":  "La Hà Phương",
                                             "dob":  "19/08/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  29,
                                             "mdd":  "2234588709",
                                             "name":  "Dương Văn Quyết",
                                             "dob":  "08/01/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  30,
                                             "mdd":  "2235885908",
                                             "name":  "Mã Lâm Thanh",
                                             "dob":  "24/06/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  31,
                                             "mdd":  "2237300988",
                                             "name":  "Bùi Khánh Thi",
                                             "dob":  "02/09/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  32,
                                             "mdd":  "2235524119",
                                             "name":  "ĐẶNG PHÚC THỊNH",
                                             "dob":  "18/02/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  33,
                                             "mdd":  "2220389458",
                                             "name":  "Chìu Thanh Thủy",
                                             "dob":  "21/02/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  34,
                                             "mdd":  "2237301946",
                                             "name":  "Lộc Mai Trang",
                                             "dob":  "23/10/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  35,
                                             "mdd":  "2237301947",
                                             "name":  "Tạ Thị Huyền Trang",
                                             "dob":  "28/08/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  36,
                                             "mdd":  "2234632329",
                                             "name":  "Lâm Bảo Trâm",
                                             "dob":  "08/09/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  37,
                                             "mdd":  "2234581228",
                                             "name":  "Trần Thị Bảo Trâm",
                                             "dob":  "07/08/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  38,
                                             "mdd":  "2272825010",
                                             "name":  "Bùi Hoàng Anh Tú",
                                             "dob":  "18/02/2011",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  39,
                                             "mdd":  "2220765932",
                                             "name":  "TRIỆU ANH TUẤN",
                                             "dob":  "18/05/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  40,
                                             "mdd":  "2248150026",
                                             "name":  "CHÌU THỊ TƯƠNG",
                                             "dob":  "16/05/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  41,
                                             "mdd":  "2235524102",
                                             "name":  "Lý Thị Mai Uyên",
                                             "dob":  "15/03/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  42,
                                             "mdd":  "2235885916",
                                             "name":  "Triệu Hồng Vân",
                                             "dob":  "22/04/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  43,
                                             "mdd":  "2276668156",
                                             "name":  "Đinh Tường Vy",
                                             "dob":  "17/04/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  44,
                                             "mdd":  "2220016730",
                                             "name":  "Đoàn Hải Yến",
                                             "dob":  "22/07/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  45,
                                             "mdd":  "2220016728",
                                             "name":  "Nịnh Thanh Tùng",
                                             "dob":  "08/07/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         }
                                     ]
                    },
                    {
                        "id":  "10A4",
                        "name":  "10A4",
                        "grade":  "10",
                        "pin":  "5000",
                        "published":  true,
                        "teacher":  "Vi Anh Quân",
                        "semester":  "Giữa kỳ I",
                        "updatedAt":  "12/11/2026",
                        "students":  [
                                         {
                                             "stt":  1,
                                             "mdd":  "2237243081",
                                             "name":  "Nguyễn Đức Phúc An",
                                             "dob":  "26/09/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  2,
                                             "mdd":  "2233857473",
                                             "name":  "TRIỆU NGỌC ÁNH",
                                             "dob":  "10/11/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  3,
                                             "mdd":  "2220765879",
                                             "name":  "TRIỆU THU BÌNH",
                                             "dob":  "11/06/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  4,
                                             "mdd":  "2234569784",
                                             "name":  "ĐẶNG NAM CAO",
                                             "dob":  "07/02/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  5,
                                             "mdd":  "2237301956",
                                             "name":  "Trần Thiên Di",
                                             "dob":  "22/09/2011",
                                             "gender":  "Nữ",
                                             "tx1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "M",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  6,
                                             "mdd":  "2237266186",
                                             "name":  "LA ĐÌNH DŨNG",
                                             "dob":  "03/07/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  7,
                                             "mdd":  "2235524107",
                                             "name":  "LÝ BẢO HÂN",
                                             "dob":  "09/12/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  8,
                                             "mdd":  "2237301964",
                                             "name":  "Dịp Bách Hoa",
                                             "dob":  "03/08/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  9,
                                             "mdd":  "2248150031",
                                             "name":  "MỄ THANH HÒA",
                                             "dob":  "10/09/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  10,
                                             "mdd":  "2220818674",
                                             "name":  "Vy Thị Hòa",
                                             "dob":  "16/11/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  11,
                                             "mdd":  "2235524098",
                                             "name":  "LÝ XUÂN HOÀN",
                                             "dob":  "11/07/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  12,
                                             "mdd":  "2234641526",
                                             "name":  "Trương Huy Hoàng",
                                             "dob":  "05/03/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  13,
                                             "mdd":  "2237301936",
                                             "name":  "Lộc Thế Huy",
                                             "dob":  "17/11/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  14,
                                             "mdd":  "2237266189",
                                             "name":  "TRẦN KHẢI",
                                             "dob":  "01/08/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  6.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  15,
                                             "mdd":  "2220765900",
                                             "name":  "TRIỆU THÚY LAN",
                                             "dob":  "01/08/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  16,
                                             "mdd":  "2233189862",
                                             "name":  "HOÀNG THỊ LINH",
                                             "dob":  "09/08/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  17,
                                             "mdd":  "2276668128",
                                             "name":  "Chíu Tiến Long",
                                             "dob":  "02/06/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  18,
                                             "mdd":  "2220537090",
                                             "name":  "TRIỆU THỊ NA",
                                             "dob":  "19/08/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  19,
                                             "mdd":  "2235524134",
                                             "name":  "PHÙN THỊ NGÂN",
                                             "dob":  "08/03/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  20,
                                             "mdd":  "2274984233",
                                             "name":  "Hoàng Thiên Ngọc",
                                             "dob":  "20/12/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  6.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  21,
                                             "mdd":  "2272825003",
                                             "name":  "Nguyễn Đăng Nguyên",
                                             "dob":  "13/06/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  6.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  22,
                                             "mdd":  "2220807804",
                                             "name":  "LINH THỊ NGUYỆT",
                                             "dob":  "26/10/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  23,
                                             "mdd":  "2234626126",
                                             "name":  "LỤC THỊ ÁNH NGUYỆT",
                                             "dob":  "13/07/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  24,
                                             "mdd":  "2234688470",
                                             "name":  "TRIỆU THÚY NHI",
                                             "dob":  "19/11/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  25,
                                             "mdd":  "2234632268",
                                             "name":  "LA TRỌNG NINH",
                                             "dob":  "17/10/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  26,
                                             "mdd":  "2220016718",
                                             "name":  "Hà Kim Oanh",
                                             "dob":  "24/04/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  27,
                                             "mdd":  "2237301944",
                                             "name":  "Dương Chí Phi",
                                             "dob":  "14/09/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  28,
                                             "mdd":  "2220099411",
                                             "name":  "Hoàng Trung Phong",
                                             "dob":  "17/03/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  29,
                                             "mdd":  "2234627996",
                                             "name":  "CHU THỊ DIỄM QUỲNH",
                                             "dob":  "22/12/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  30,
                                             "mdd":  "2235524117",
                                             "name":  "LA THỊ NHƯ QUỲNH",
                                             "dob":  "02/02/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  31,
                                             "mdd":  "2237243069",
                                             "name":  "Phạm Ngọc Sơn",
                                             "dob":  "07/01/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  32,
                                             "mdd":  "2220537095",
                                             "name":  "CHÍU THỊ THANH THẢO",
                                             "dob":  "18/05/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  33,
                                             "mdd":  "2235888621",
                                             "name":  "TẰNG THỊ THÊM",
                                             "dob":  "06/01/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  34,
                                             "mdd":  "2002469863",
                                             "name":  "TRIỆU VĂN THUẬN",
                                             "dob":  "12/12/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  35,
                                             "mdd":  "2220537105",
                                             "name":  "CHÍU THỊ THƯƠNG",
                                             "dob":  "05/08/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  36,
                                             "mdd":  "2235524138",
                                             "name":  "BÀN THÙY BẢO TRÂM",
                                             "dob":  "28/01/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  37,
                                             "mdd":  "2235524122",
                                             "name":  "LÝ THỊ THANH TRÚC",
                                             "dob":  "13/05/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  38,
                                             "mdd":  "2272824998",
                                             "name":  "Nguyễn Duy Tuấn",
                                             "dob":  "02/10/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  39,
                                             "mdd":  "2234656173",
                                             "name":  "BÙI ÁNH TUYẾT",
                                             "dob":  "25/02/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  40,
                                             "mdd":  "2237300983",
                                             "name":  "ĐÀM TỐ UYÊN",
                                             "dob":  "12/11/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  41,
                                             "mdd":  "2235524157",
                                             "name":  "LÝ THỊ MINH VI",
                                             "dob":  "04/06/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  42,
                                             "mdd":  "2237269972",
                                             "name":  "NGUYỄN NGỌC VI",
                                             "dob":  "01/01/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  43,
                                             "mdd":  "2237301953",
                                             "name":  "Hoàng Thành Vinh",
                                             "dob":  "20/08/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  6.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  44,
                                             "mdd":  "2235524125",
                                             "name":  "HÀ ANH VŨ",
                                             "dob":  "22/09/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  6.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  45,
                                             "mdd":  "2235524103",
                                             "name":  "PHÙN HỒNG VY",
                                             "dob":  "12/10/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         }
                                     ]
                    },
                    {
                        "id":  "10A6",
                        "name":  "10A6",
                        "grade":  "10",
                        "pin":  "7000",
                        "published":  true,
                        "teacher":  "Vi Anh Quân",
                        "semester":  "Giữa kỳ I",
                        "updatedAt":  "12/11/2026",
                        "students":  [
                                         {
                                             "stt":  1,
                                             "mdd":  "2237266731",
                                             "name":  "Linh Thị Hoàng Anh",
                                             "dob":  "03/10/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  2,
                                             "mdd":  "2234600291",
                                             "name":  "Nịnh Tuấn Anh",
                                             "dob":  "04/01/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  3,
                                             "mdd":  "2235524104",
                                             "name":  "Lý Sao Băng",
                                             "dob":  "07/05/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  4,
                                             "mdd":  "2235524096",
                                             "name":  "LÝ CÔNG DANH",
                                             "dob":  "10/10/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  5,
                                             "mdd":  "2237301958",
                                             "name":  "Trần Tiến Dũng",
                                             "dob":  "07/03/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  6,
                                             "mdd":  "2237301976",
                                             "name":  "Đặng Thu Duyên",
                                             "dob":  "07/02/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  7,
                                             "mdd":  "2235524106",
                                             "name":  "Phùn Thùy Dương",
                                             "dob":  "06/08/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  8,
                                             "mdd":  "2220938312",
                                             "name":  "Hoàng Quốc Đại",
                                             "dob":  "26/04/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  9,
                                             "mdd":  "2220939331",
                                             "name":  "Lan Hoàng Giang",
                                             "dob":  "20/01/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  10,
                                             "mdd":  "2235885899",
                                             "name":  "Triệu Thị Hạnh",
                                             "dob":  "19/01/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  11,
                                             "mdd":  "2248165285",
                                             "name":  "Đặng Thị Nguyên Hằng",
                                             "dob":  "25/09/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  12,
                                             "mdd":  "2235885900",
                                             "name":  "Lương Minh Hiếu",
                                             "dob":  "01/08/2011",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  13,
                                             "mdd":  "2237300989",
                                             "name":  "Trần Thị Thu Hoài",
                                             "dob":  "02/03/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  14,
                                             "mdd":  "2220860949",
                                             "name":  "TRIỆU THỊ HOAN",
                                             "dob":  "24/11/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  15,
                                             "mdd":  "2233857470",
                                             "name":  "Hoàng Gia Huy",
                                             "dob":  "21/01/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  16,
                                             "mdd":  "2235885921",
                                             "name":  "Triệu Thu Huyền",
                                             "dob":  "14/08/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  17,
                                             "mdd":  "2276668150",
                                             "name":  "Đinh Duy Khoa",
                                             "dob":  "05/02/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  18,
                                             "mdd":  "2233195984",
                                             "name":  "Nịnh Đức Kiên",
                                             "dob":  "25/09/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  19,
                                             "mdd":  "2234604053",
                                             "name":  "Triệu Anh Kiệt",
                                             "dob":  "02/09/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  20,
                                             "mdd":  "2235885923",
                                             "name":  "Đặng Hữu Bảo Kỳ",
                                             "dob":  "21/08/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  21,
                                             "mdd":  "2235524081",
                                             "name":  "Trần Hương Linh",
                                             "dob":  "15/12/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  22,
                                             "mdd":  "2234618421",
                                             "name":  "Trần Thị Hoàng Linh",
                                             "dob":  "08/12/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  23,
                                             "mdd":  "2234685007",
                                             "name":  "Triệu Thúy Loan",
                                             "dob":  "10/06/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  24,
                                             "mdd":  "2235885926",
                                             "name":  "Triệu Văn Lưu",
                                             "dob":  "25/12/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  25,
                                             "mdd":  "2220765910",
                                             "name":  "Triệu Tuyết Ly",
                                             "dob":  "14/07/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  26,
                                             "mdd":  "2234631476",
                                             "name":  "Chìu Kim Ngân",
                                             "dob":  "22/12/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  27,
                                             "mdd":  "2234693038",
                                             "name":  "Nịnh Minh Nghĩa",
                                             "dob":  "04/05/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  28,
                                             "mdd":  "2259507316",
                                             "name":  "PHÙN ĐỊNH NGUYÊN",
                                             "dob":  "11/04/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  29,
                                             "mdd":  "2237301971",
                                             "name":  "Vũ Ánh Nguyệt",
                                             "dob":  "12/03/2011",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  30,
                                             "mdd":  "2237301941",
                                             "name":  "Lìu Trọng Nhiên",
                                             "dob":  "18/04/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  31,
                                             "mdd":  "2235524115",
                                             "name":  "Đặng Thị Quỳnh Như",
                                             "dob":  "24/09/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  32,
                                             "mdd":  "2220537107",
                                             "name":  "CHÍU THÀNH QUANG",
                                             "dob":  "17/09/2010",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  33,
                                             "mdd":  "2237300986",
                                             "name":  "Trần Thị Thanh Thảo",
                                             "dob":  "11/04/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  34,
                                             "mdd":  "2235888627",
                                             "name":  "Tô Anh Thư",
                                             "dob":  "08/08/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  35,
                                             "mdd":  "2237300982",
                                             "name":  "ĐÀM VĂN TIẾN",
                                             "dob":  "08/03/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  36,
                                             "mdd":  "2235885911",
                                             "name":  "Hoàng Trung Tín",
                                             "dob":  "27/08/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  37,
                                             "mdd":  "2234579010",
                                             "name":  "Triệu Huyền Trang",
                                             "dob":  "07/04/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  38,
                                             "mdd":  "2220860956",
                                             "name":  "Triệu Thúy Trang",
                                             "dob":  "04/03/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  39,
                                             "mdd":  "2235524109",
                                             "name":  "Đặng Bảo Trân",
                                             "dob":  "04/06/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  40,
                                             "mdd":  "2235524124",
                                             "name":  "Đặng Thúy Vân",
                                             "dob":  "22/05/2011",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  41,
                                             "mdd":  "2235524158",
                                             "name":  "VI XUÂN VIÊN",
                                             "dob":  "30/12/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  42,
                                             "mdd":  "2235885918",
                                             "name":  "Hoàng Nguyên Vũ",
                                             "dob":  "28/02/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  43,
                                             "mdd":  "2259092510",
                                             "name":  "Nông Lâm Vũ",
                                             "dob":  "24/08/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  44,
                                             "mdd":  "2220942466",
                                             "name":  "Nịnh Thanh Tùng",
                                             "dob":  "09/11/2011",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         }
                                     ]
                    },
                    {
                        "id":  "11A1",
                        "name":  "11A1",
                        "grade":  "11",
                        "pin":  "1111",
                        "published":  true,
                        "teacher":  "Vi Anh Quân",
                        "semester":  "Giữa kỳ I",
                        "updatedAt":  "12/11/2026",
                        "students":  [
                                         {
                                             "stt":  1,
                                             "mdd":  "2220050871",
                                             "name":  "Đoàn Quỳnh Anh",
                                             "dob":  "01/08/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  2,
                                             "mdd":  "2220105945",
                                             "name":  "Nịnh Gia Bảo",
                                             "dob":  "22/02/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  3,
                                             "mdd":  "2248166430",
                                             "name":  "Vi Gia Bảo",
                                             "dob":  "05/07/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  4,
                                             "mdd":  "2262611963",
                                             "name":  "Ngô Việt Bắc",
                                             "dob":  "17/03/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.3,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  5,
                                             "mdd":  "2220050874",
                                             "name":  "Đàm Xuyến Chi",
                                             "dob":  "18/08/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  6,
                                             "mdd":  "2248166415",
                                             "name":  "Nguyễn Ninh Ngọc Diệp",
                                             "dob":  "31/03/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  7,
                                             "mdd":  "2237302006",
                                             "name":  "Hoàng Việt Dũng",
                                             "dob":  "31/03/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  8,
                                             "mdd":  "2220050884",
                                             "name":  "Nguyễn Anh Dũng",
                                             "dob":  "27/08/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  9,
                                             "mdd":  "2220050880",
                                             "name":  "Nguyễn Hoàng Duy",
                                             "dob":  "22/12/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  10,
                                             "mdd":  "2220050888",
                                             "name":  "Hoàng Linh Đan",
                                             "dob":  "05/12/2010",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  11,
                                             "mdd":  "2237302027",
                                             "name":  "Nguyễn Thành Đạt",
                                             "dob":  "18/11/2010",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  12,
                                             "mdd":  "2220050892",
                                             "name":  "Vi Tiến Đạt",
                                             "dob":  "30/11/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  13,
                                             "mdd":  "2248166489",
                                             "name":  "Vũ Thành Đạt",
                                             "dob":  "26/01/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  14,
                                             "mdd":  "2248166500",
                                             "name":  "Bùi Hải Đăng",
                                             "dob":  "02/07/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  15,
                                             "mdd":  "2220050894",
                                             "name":  "La Ngọc Điệp",
                                             "dob":  "21/02/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.7,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  16,
                                             "mdd":  "2248166479",
                                             "name":  "Hoàng Trung Hải",
                                             "dob":  "10/08/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.3,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  17,
                                             "mdd":  "2248166797",
                                             "name":  "Hoàng Trung Hải",
                                             "dob":  "04/12/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  18,
                                             "mdd":  "2262612253",
                                             "name":  "Phạm Thanh Hằng",
                                             "dob":  "07/02/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  19,
                                             "mdd":  "2262611856",
                                             "name":  "Ngô Duy Hiếu",
                                             "dob":  "17/03/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  20,
                                             "mdd":  "2233958585",
                                             "name":  "TRƯƠNG ĐAN HÙNG",
                                             "dob":  "04/06/2009",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  21,
                                             "mdd":  "2235524207",
                                             "name":  "LÝ GIA HUY",
                                             "dob":  "05/11/2010",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  22,
                                             "mdd":  "2262611855",
                                             "name":  "Nguyễn Việt Hưng",
                                             "dob":  "02/08/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  23,
                                             "mdd":  "2259052921",
                                             "name":  "Phạm Khánh Linh",
                                             "dob":  "23/04/2010",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  24,
                                             "mdd":  "2220105958",
                                             "name":  "Đinh Đức Mạnh",
                                             "dob":  "27/10/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  25,
                                             "mdd":  "2220050914",
                                             "name":  "Bùi Trần Nhật Minh",
                                             "dob":  "30/11/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  26,
                                             "mdd":  "2220050918",
                                             "name":  "Nông Nhật Minh",
                                             "dob":  "23/10/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  27,
                                             "mdd":  "2220050919",
                                             "name":  "Vi Đức Nhật Minh",
                                             "dob":  "19/04/2010",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  28,
                                             "mdd":  "2237276193",
                                             "name":  "Lương Xuân Nghi",
                                             "dob":  "22/06/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  29,
                                             "mdd":  "2220050920",
                                             "name":  "Nguyễn Trần Sơn Nguyên",
                                             "dob":  "27/08/2010",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  30,
                                             "mdd":  "2248166914",
                                             "name":  "Lê Yến Nhi",
                                             "dob":  "02/11/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  31,
                                             "mdd":  "2237302039",
                                             "name":  "Triệu Thị Hoàn Nhi",
                                             "dob":  "17/08/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  32,
                                             "mdd":  "2262611889",
                                             "name":  "Phạm Thành Phan",
                                             "dob":  "02/05/2010",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  33,
                                             "mdd":  "2262611902",
                                             "name":  "Nguyễn Thu Phương",
                                             "dob":  "28/03/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.3,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  34,
                                             "mdd":  "2237302040",
                                             "name":  "Trần Mạnh Quân",
                                             "dob":  "15/08/2010",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  35,
                                             "mdd":  "2262612233",
                                             "name":  "Lê Minh Sơn",
                                             "dob":  "10/04/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.3,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  36,
                                             "mdd":  "2220050928",
                                             "name":  "Hoàng Đức Thiên",
                                             "dob":  "13/07/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.3,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  37,
                                             "mdd":  "2235829918",
                                             "name":  "Nguyễn Thành Thiện",
                                             "dob":  "16/03/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  38,
                                             "mdd":  "2220105963",
                                             "name":  "Hoàng Thu Trang",
                                             "dob":  "24/10/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  39,
                                             "mdd":  "2237302021",
                                             "name":  "Lý Huyền Trâm",
                                             "dob":  "13/05/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  40,
                                             "mdd":  "2262612223",
                                             "name":  "Hoàng Thế Vinh",
                                             "dob":  "12/11/2010",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.3,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  41,
                                             "mdd":  "2220050935",
                                             "name":  "Đinh Hoàng Vũ",
                                             "dob":  "05/07/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  42,
                                             "mdd":  "2248164928",
                                             "name":  "Niệm Thiên Vũ",
                                             "dob":  "21/02/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  43,
                                             "mdd":  "2235885968",
                                             "name":  "Khúc Hà Xinh",
                                             "dob":  "20/12/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  44,
                                             "mdd":  "2235524190",
                                             "name":  "LÝ BÌNH YÊN",
                                             "dob":  "28/04/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  45,
                                             "mdd":  "2261857741",
                                             "name":  "Lương Quốc Khánh",
                                             "dob":  "02/09/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         }
                                     ]
                    },
                    {
                        "id":  "11A3",
                        "name":  "11A3",
                        "grade":  "11",
                        "pin":  "3333",
                        "published":  true,
                        "teacher":  "Vi Anh Quân",
                        "semester":  "Giữa kỳ I",
                        "updatedAt":  "12/11/2026",
                        "students":  [
                                         {
                                             "stt":  1,
                                             "mdd":  "2262611965",
                                             "name":  "TRẦN THÙY ANH",
                                             "dob":  "31/01/2010",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  2,
                                             "mdd":  "2259052967",
                                             "name":  "ĐÀM THỊ BÍNH",
                                             "dob":  "29/05/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  3,
                                             "mdd":  "2230435648",
                                             "name":  "TRẦN THÙY CHI",
                                             "dob":  "28/06/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  4,
                                             "mdd":  "2235524171",
                                             "name":  "ĐẶNG HẢI ĐĂNG",
                                             "dob":  "23/11/2010",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  5,
                                             "mdd":  "2248579574",
                                             "name":  "DƯƠNG THU HÀ",
                                             "dob":  "23/04/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  6,
                                             "mdd":  "2235524183",
                                             "name":  "ĐẶNG VĂN HẢI",
                                             "dob":  "12/02/2010",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  7,
                                             "mdd":  "2235524202",
                                             "name":  "ĐẶNG THỊ THU HẰNG",
                                             "dob":  "14/07/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  8,
                                             "mdd":  "2220509486",
                                             "name":  "TRIỆU THỊ ÁI HÂN",
                                             "dob":  "30/10/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  9,
                                             "mdd":  "2248150007",
                                             "name":  "NỊNH THỊ HIỀN",
                                             "dob":  "13/04/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  10,
                                             "mdd":  "2248165212",
                                             "name":  "LƯƠNG MINH HIẾU",
                                             "dob":  "22/12/2010",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  11,
                                             "mdd":  "2235886986",
                                             "name":  "DƯƠNG THỊ HÒA",
                                             "dob":  "06/02/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  12,
                                             "mdd":  "2237266205",
                                             "name":  "CHÌU THÚY HOAN",
                                             "dob":  "31/01/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  13,
                                             "mdd":  "2235886978",
                                             "name":  "BAN THỊ HUỆ",
                                             "dob":  "08/09/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  14,
                                             "mdd":  "2248164946",
                                             "name":  "Tô Mạnh Hùng",
                                             "dob":  "31/07/2010",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.3,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  15,
                                             "mdd":  "2262612195",
                                             "name":  "HOÀNG DUY KHÁNH",
                                             "dob":  "05/01/2010",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.2,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  16,
                                             "mdd":  "2248149529",
                                             "name":  "NỊNH QUỐC KHÁNH",
                                             "dob":  "18/01/2010",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  17,
                                             "mdd":  "2235524186",
                                             "name":  "TRIỆU VĂN KHOAN",
                                             "dob":  "24/10/2010",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  18,
                                             "mdd":  "2235524229",
                                             "name":  "BÀN THỊ LAN",
                                             "dob":  "11/08/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  19,
                                             "mdd":  "2262139357",
                                             "name":  "BAN THỊ THÙY LINH",
                                             "dob":  "05/11/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  20,
                                             "mdd":  "2262146865",
                                             "name":  "TRIỆU HÀ LINH",
                                             "dob":  "06/08/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  21,
                                             "mdd":  "2237266245",
                                             "name":  "NỊNH GIA LONG",
                                             "dob":  "17/12/2010",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  22,
                                             "mdd":  "2220655880",
                                             "name":  "TRIỆU NGỌC LUYẾN",
                                             "dob":  "13/05/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  23,
                                             "mdd":  "2233865846",
                                             "name":  "LA ĐỨC MINH",
                                             "dob":  "16/06/2010",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  24,
                                             "mdd":  "1230226771",
                                             "name":  "NGUYỄN ĐÌNH NGUYÊN",
                                             "dob":  "01/03/2010",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  25,
                                             "mdd":  "2259052922",
                                             "name":  "HOÀNG MẠNH NINH",
                                             "dob":  "02/12/2010",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  26,
                                             "mdd":  "2259052933",
                                             "name":  "TRIỆU THỊ NINH",
                                             "dob":  "04/05/2010",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  27,
                                             "mdd":  "2002469922",
                                             "name":  "TRIỆU VĂN TÀI",
                                             "dob":  "01/04/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  28,
                                             "mdd":  "2235524176",
                                             "name":  "TRẦN MẠNH TÂN",
                                             "dob":  "10/12/2010",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  29,
                                             "mdd":  "2220050930",
                                             "name":  "NGUYỄN ÁNH THIÊN",
                                             "dob":  "12/06/2010",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  30,
                                             "mdd":  "2276668157",
                                             "name":  "CHÍU XUÂN THỊNH",
                                             "dob":  "07/02/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  31,
                                             "mdd":  "2237302020",
                                             "name":  "Nguyễn Minh Thuấn",
                                             "dob":  "17/03/2010",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  32,
                                             "mdd":  "2220375416",
                                             "name":  "PHÙN THỊ THÚY",
                                             "dob":  "26/03/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.2,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  33,
                                             "mdd":  "2237301987",
                                             "name":  "HỒ THỊ THỦY TIÊN",
                                             "dob":  "06/08/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  34,
                                             "mdd":  "2220105962",
                                             "name":  "TÔ HUY TOÀN",
                                             "dob":  "30/11/2010",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  35,
                                             "mdd":  "2220377936",
                                             "name":  "BÀN THỊ TRANG",
                                             "dob":  "07/04/2009",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  36,
                                             "mdd":  "2220509502",
                                             "name":  "LINH THỊ TRANG",
                                             "dob":  "29/03/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  37,
                                             "mdd":  "2248149814",
                                             "name":  "LỤC VĂN TRUYỀN",
                                             "dob":  "24/08/2010",
                                             "gender":  "Nam",
                                             "tx1":  7.5,
                                             "tx2":  7.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.2,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  38,
                                             "mdd":  "2262139343",
                                             "name":  "NỊNH QUANG TRƯỜNG",
                                             "dob":  "08/04/2010",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.2,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  39,
                                             "mdd":  "2248579598",
                                             "name":  "HỒ THANH TÙNG",
                                             "dob":  "12/03/2010",
                                             "gender":  "Nam",
                                             "tx1":  7.5,
                                             "tx2":  7.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  40,
                                             "mdd":  "2248164919",
                                             "name":  "MỄ HẢI TUYÊN",
                                             "dob":  "23/04/2010",
                                             "gender":  "Nam",
                                             "tx1":  7.5,
                                             "tx2":  7.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  41,
                                             "mdd":  "2220370986",
                                             "name":  "NGUYỄN THỊ KIM TUYẾN",
                                             "dob":  "03/06/2010",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.3,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  42,
                                             "mdd":  "2248149807",
                                             "name":  "MỄ THỊ TUYẾT",
                                             "dob":  "12/09/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  43,
                                             "mdd":  "2237301991",
                                             "name":  "TRIỆU TƯỜNG VY",
                                             "dob":  "22/05/2010",
                                             "gender":  "Nữ",
                                             "tx1":  8.5,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  44,
                                             "mdd":  "2237302010",
                                             "name":  "TRIỆU GIA HUY",
                                             "dob":  "14/01/2010",
                                             "gender":  "Nam",
                                             "tx1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         }
                                     ]
                    },
                    {
                        "id":  "12A1",
                        "name":  "12A1",
                        "grade":  "12",
                        "pin":  "12A1",
                        "published":  true,
                        "teacher":  "Vi Anh Quân",
                        "semester":  "Giữa kỳ I",
                        "updatedAt":  "12/11/2026",
                        "students":  [
                                         {
                                             "stt":  1,
                                             "mdd":  "2259052896",
                                             "name":  "Lã Thị Trâm Anh",
                                             "dob":  "18/10/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  2,
                                             "mdd":  "2234672696",
                                             "name":  "Lý Như Hoàng Anh",
                                             "dob":  "24/05/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  3,
                                             "mdd":  "2234606260",
                                             "name":  "Lành Thàm Thảo Chi",
                                             "dob":  "22/08/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  4,
                                             "mdd":  "2235524250",
                                             "name":  "NỊNH QUỐC CƯỜNG",
                                             "dob":  "06/02/2009",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.3,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  5,
                                             "mdd":  "2276668222",
                                             "name":  "Vũ Ngọc Diệp",
                                             "dob":  "03/09/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  6,
                                             "mdd":  "2259052859",
                                             "name":  "Mễ Thùy Dung",
                                             "dob":  "12/10/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  7,
                                             "mdd":  "2276668227",
                                             "name":  "Nguyễn Hoàng Trung Dũng",
                                             "dob":  "09/05/2009",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  8,
                                             "mdd":  "2259052860",
                                             "name":  "Vi Minh Đức",
                                             "dob":  "01/03/2009",
                                             "gender":  "Nam",
                                             "tx1":  8.5,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.3,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  9,
                                             "mdd":  "2235885989",
                                             "name":  "Khúc Thanh Hải",
                                             "dob":  "18/06/2009",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  10,
                                             "mdd":  "2237243128",
                                             "name":  "Phạm Bảo Hằng",
                                             "dob":  "19/11/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  11,
                                             "mdd":  "2276668203",
                                             "name":  "Trần Thị Mai Hoa",
                                             "dob":  "01/12/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  12,
                                             "mdd":  "2075733123",
                                             "name":  "Bùi Hoàng Huy",
                                             "dob":  "15/06/2009",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.3,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  13,
                                             "mdd":  "2276668182",
                                             "name":  "Nông Thu Huyền",
                                             "dob":  "11/10/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  14,
                                             "mdd":  "2259052839",
                                             "name":  "Bàn Gia Hưng",
                                             "dob":  "06/10/2009",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  15,
                                             "mdd":  "2276668125",
                                             "name":  "Lâm Văn Kết",
                                             "dob":  "04/10/2009",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.3,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  16,
                                             "mdd":  "2259052844",
                                             "name":  "Hoàng Việt Khánh",
                                             "dob":  "03/01/2009",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.3,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  17,
                                             "mdd":  "2235886000",
                                             "name":  "Khúc Minh Khôi",
                                             "dob":  "18/04/2009",
                                             "gender":  "Nam",
                                             "tx1":  8,
                                             "tx2":  8,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  18,
                                             "mdd":  "2259052807",
                                             "name":  "Nguyễn Trung Kiên",
                                             "dob":  "15/10/2009",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  19,
                                             "mdd":  "2220343323",
                                             "name":  "TRIỆU HỒNG KIÊN",
                                             "dob":  "22/01/2009",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  7.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  20,
                                             "mdd":  "2276668176",
                                             "name":  "Nguyễn Tuấn Kiệt",
                                             "dob":  "12/08/2009",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  10,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  21,
                                             "mdd":  "2237243135",
                                             "name":  "Phạm Thùy Linh",
                                             "dob":  "15/10/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  22,
                                             "mdd":  "2259052835",
                                             "name":  "Vắn Huyền Linh",
                                             "dob":  "28/08/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  23,
                                             "mdd":  "2219985664",
                                             "name":  "Tô Quỳnh Mai",
                                             "dob":  "26/06/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  24,
                                             "mdd":  "2276668200",
                                             "name":  "Phạm Ngọc Minh",
                                             "dob":  "06/10/2009",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.3,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  25,
                                             "mdd":  "2276668235",
                                             "name":  "Đinh Ngọc Ngân",
                                             "dob":  "04/12/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  26,
                                             "mdd":  "2259052951",
                                             "name":  "Lê Yến Ngọc",
                                             "dob":  "02/05/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  27,
                                             "mdd":  "2276668237",
                                             "name":  "Đàm Trung Nguyên",
                                             "dob":  "27/06/2009",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  28,
                                             "mdd":  "2276668168",
                                             "name":  "Lộc Hoàng Thu Nguyệt",
                                             "dob":  "22/08/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  29,
                                             "mdd":  "2237243141",
                                             "name":  "Bàn Thị Ngọc Nhi",
                                             "dob":  "01/09/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  30,
                                             "mdd":  "2276668186",
                                             "name":  "Đinh Thị Khánh Nhi",
                                             "dob":  "30/10/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  31,
                                             "mdd":  "2276668159",
                                             "name":  "Vi Dương Nhi",
                                             "dob":  "24/04/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.9,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  32,
                                             "mdd":  "2259052911",
                                             "name":  "Lan Nguyễn Anh Quân",
                                             "dob":  "24/12/2009",
                                             "gender":  "Nam",
                                             "tx1":  9.5,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  33,
                                             "mdd":  "2276668187",
                                             "name":  "Đỗ Phương Thảo",
                                             "dob":  "24/07/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  34,
                                             "mdd":  "2259052945",
                                             "name":  "Lê Thanh Thảo",
                                             "dob":  "25/06/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.5,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  35,
                                             "mdd":  "2235886024",
                                             "name":  "Vi Quốc Thi",
                                             "dob":  "28/08/2009",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  36,
                                             "mdd":  "2276668177",
                                             "name":  "Đinh Mạnh Thiên",
                                             "dob":  "08/07/2009",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  37,
                                             "mdd":  "2220343331",
                                             "name":  "TRIỆU KIM THÚY",
                                             "dob":  "10/01/2009",
                                             "gender":  "Nữ",
                                             "tx1":  8,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  38,
                                             "mdd":  "2259052831",
                                             "name":  "Hà Quỳnh Trang",
                                             "dob":  "12/04/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  39,
                                             "mdd":  "2259052937",
                                             "name":  "Nịnh Thu Trang",
                                             "dob":  "02/06/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  40,
                                             "mdd":  "2259052936",
                                             "name":  "Nguyễn Hoàng Tùng",
                                             "dob":  "14/02/2009",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  41,
                                             "mdd":  "2259745215",
                                             "name":  "Đặng Uy Vũ",
                                             "dob":  "06/11/2009",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.3,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  42,
                                             "mdd":  "2259052774",
                                             "name":  "Hoàng Phương Vy",
                                             "dob":  "02/02/2009",
                                             "gender":  "Nữ",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8.9,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  43,
                                             "mdd":  "2259052874",
                                             "name":  "Đàm Minh Công",
                                             "dob":  "28/02/2009",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  9,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  9.8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         },
                                         {
                                             "stt":  44,
                                             "mdd":  "2259052877",
                                             "name":  "Tạ Thành Long",
                                             "dob":  "27/03/2009",
                                             "gender":  "Nam",
                                             "tx1":  9,
                                             "tx2":  8.5,
                                             "tx3":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx4":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "tx5":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "gk":  8,
                                             "ck":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb1":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtb2":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH",
                                             "dtbcn":  "SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH"
                                         }
                                     ]
                    }
                ]
};
// Biến trạng thái toàn cục của ứng dụng
let portalData = null;
let currentUnlockedClassId = null;
let isAdminAuthenticated = false;
let currentAdminEditingClassId = '10A1';
let scoreboardDisplayMode = 'table'; // 'table' hoặc 'cards'

/**
 * 2. KHỞI TẠO DỮ LIỆU & ĐỒNG BỘ TỰ ĐỘNG GIỮA MÁY TÍNH VÀ ĐIỆN THOẠI
 */
document.addEventListener('DOMContentLoaded', async () => {
  // Trên màn hình điện thoại nhỏ (< 640px), mặc định gợi ý hoặc giữ chế độ hiển thị tối ưu
  await loadPortalData();
  initAuthScreen();
  refreshIcons();
});

/**
 * Kiểm tra cấu trúc dữ liệu từng lớp (KHÔNG dùng chung 1 danh sách học sinh cho mọi lớp).
 * Nếu lớp nào bị thiếu dữ liệu trong bộ nhớ tạm thì lấy đúng danh sách riêng của lớp đó từ DEFAULT_PORTAL_DATA.
 */
function ensureStandard15ColFormat(dataObj) {
  if (!dataObj || !Array.isArray(dataObj.classes)) {
    return JSON.parse(JSON.stringify(DEFAULT_PORTAL_DATA));
  }

  // Đảm bảo có đầy đủ tất cả các lớp trong DEFAULT_PORTAL_DATA (VD: 10A1, 10A3, 10A4, 10A6, 11A1, 11A3, 12A1)
  DEFAULT_PORTAL_DATA.classes.forEach((defaultCls) => {
    const existing = dataObj.classes.find((c) => c.id === defaultCls.id);
    if (!existing) {
      dataObj.classes.push(JSON.parse(JSON.stringify(defaultCls)));
    }
  });

  dataObj.classes.forEach((cls) => {
    if (!VALID_SEMESTERS.includes(cls.semester)) {
      cls.semester = 'Giữa kỳ I';
    }
    if (!cls.teacher || cls.teacher.includes('Tổ Toán')) {
      cls.teacher = 'Vi Anh Quân';
    }
    const defaultCls = DEFAULT_PORTAL_DATA.classes.find((c) => c.id === cls.id);
    if (
      !Array.isArray(cls.students) ||
      cls.students.length === 0 ||
      cls.students[0].tx1 === undefined
    ) {
      cls.students = defaultCls ? JSON.parse(JSON.stringify(defaultCls.students)) : [];
    }
  });
  return dataObj;
}

async function loadPortalData() {
  let localData = null;
  try {
    // Xóa các bộ nhớ đệm phiên bản cũ từng dùng chung 1 danh sách học sinh
    LEGACY_KEYS.forEach((k) => localStorage.removeItem(k));

    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      localData = ensureStandard15ColFormat(JSON.parse(raw));
    }
  } catch (err) {
    console.warn('Không đọc được LocalStorage:', err);
  }

  // Luôn thử tải file data.json mới nhất từ máy chủ / thư mục web (chống lưu cache cũ trên Điện thoại)
  try {
    const res = await fetch(`./data.json?t=${Date.now()}`, { cache: 'no-store' });
    if (res.ok) {
      const serverData = ensureStandard15ColFormat(await res.json());
      const serverVer = Number(serverData.dataVersion || 0);
      const localVer = Number(localData?.dataVersion || 0);

      // Nếu dữ liệu trên server (data.json) mới hơn hoặc chưa có localData thì ưu tiên dùng serverData
      if (!localData || serverVer >= localVer) {
        portalData = serverData;
        savePortalData(false);
        return;
      }
    }
  } catch (fetchErr) {
    // Khi chạy trực tiếp qua giao thức file:// trên máy tính, fetch có thể bị trình duyệt chặn CORS -> dùng localData
  }

  portalData = localData || JSON.parse(JSON.stringify(DEFAULT_PORTAL_DATA));
  savePortalData(false);
}

function savePortalData(bumpVersion = true) {
  try {
    if (bumpVersion && portalData) {
      portalData.dataVersion = Date.now();
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portalData));
  } catch (err) {
    console.error('Không thể lưu vào LocalStorage:', err);
  }
}

/**
 * Tải lại dữ liệu mới nhất từ file data.json trên máy chủ (Dành cho Điện thoại bấm Làm mới)
 */
async function forceReloadServerData() {
  try {
    const res = await fetch(`./data.json?t=${Date.now()}`, { cache: 'no-store' });
    if (res.ok) {
      const serverData = ensureStandard15ColFormat(await res.json());
      portalData = serverData;
      savePortalData(false);
      if (currentUnlockedClassId) {
        openScoreboardForClass(currentUnlockedClassId);
      } else {
        initAuthScreen();
      }
      showToast('Đã đồng bộ bảng điểm mới nhất từ hệ thống!', 'success');
      return;
    }
  } catch (e) {
    // Bỏ qua nếu mở trực tiếp file://
  }
  if (currentUnlockedClassId) {
    openScoreboardForClass(currentUnlockedClassId);
  }
  showToast('Đã làm mới bảng điểm hiện tại!', 'info');
}

/**
 * Xuất / Lưu trực tiếp file data.json để đồng bộ bảng điểm vừa Import trên máy tính sang Điện thoại
 */
async function saveDataJsonForMobileSync() {
  if (!portalData) return;
  portalData.dataVersion = Date.now();
  savePortalData(false);

  const jsonString = JSON.stringify(portalData, null, 2);

  // Hỗ trợ ghi đè trực tiếp vào file data.json trên Chrome / Edge máy tính
  if (window.showSaveFilePicker) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: 'data.json',
        types: [
          {
            description: 'JSON Data File (data.json)',
            accept: { 'application/json': ['.json'] }
          }
        ]
      });
      const writable = await handle.createWritable();
      await writable.write(jsonString);
      await writable.close();
      showToast('Đã lưu thành công vào file data.json! Điện thoại truy cập sẽ thấy ngay bảng điểm này.', 'success');
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
    }
  }

  // Fallback tải file data.json về máy
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Đã tải xuống file data.json! Hãy đặt đè vào thư mục web để đồng bộ sang Điện thoại.', 'info');
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * 3. HÀM TÍNH ĐIỂM TRUNG BÌNH MÔN HỌC KỲ & ĐIỂM THAM CHIẾU THỐNG KÊ
 */
function parseScoreOrNull(val) {
  if (val === '' || val === null || val === undefined) return null;
  const normalized = String(val).replace(',', '.').trim();
  if (!normalized) return null;
  const num = parseFloat(normalized);
  return isNaN(num) ? null : num;
}

function computeFormulaSemesterAvg(student) {
  const txCols = [student.tx1, student.tx2, student.tx3, student.tx4, student.tx5]
    .map(parseScoreOrNull)
    .filter((v) => v !== null);
  const gk = parseScoreOrNull(student.gk);
  const ck = parseScoreOrNull(student.ck);

  if (txCols.length > 0 && gk !== null && ck !== null) {
    const sumTx = txCols.reduce((a, b) => a + b, 0);
    const totalWeight = txCols.length + 5;
    const avg = (sumTx + 2 * gk + 3 * ck) / totalWeight;
    return Math.round(avg * 10) / 10;
  }
  return null;
}

function calculateStudentAverage(student) {
  const dtbcn = parseScoreOrNull(student.dtbcn);
  if (dtbcn !== null) return dtbcn;

  const dtb2 = parseScoreOrNull(student.dtb2);
  if (dtb2 !== null) return dtb2;

  const dtb1 = parseScoreOrNull(student.dtb1);
  if (dtb1 !== null) return dtb1;

  const txCols = [student.tx1, student.tx2, student.tx3, student.tx4, student.tx5]
    .map(parseScoreOrNull)
    .filter((v) => v !== null);
  const gk = parseScoreOrNull(student.gk);
  const ck = parseScoreOrNull(student.ck);

  let weightedSum = txCols.reduce((a, b) => a + b, 0);
  let totalWeight = txCols.length;

  if (gk !== null) {
    weightedSum += 2 * gk;
    totalWeight += 2;
  }
  if (ck !== null) {
    weightedSum += 3 * ck;
    totalWeight += 3;
  }

  if (totalWeight === 0) return 0;
  return Math.round((weightedSum / totalWeight) * 10) / 10;
}

function normalizeVietnamese(str) {
  if (!str) return '';
  return str
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .trim();
}

/**
 * 4. ĐIỀU HƯỚNG GIỮA CÁC MÀN HÌNH (AUTH / SCOREBOARD / ADMIN)
 */
function switchView(viewName) {
  const views = ['view-auth', 'view-scoreboard', 'view-admin-login', 'view-admin-dashboard'];
  views.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  const target = document.getElementById(`view-${viewName}`);
  if (target) {
    target.classList.remove('hidden');
  }

  const btnStudent = document.getElementById('nav-btn-student');
  const btnAdmin = document.getElementById('nav-btn-admin');

  if (viewName === 'auth' || viewName === 'scoreboard') {
    btnStudent.className = 'inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200/80 transition-all';
    btnAdmin.className = 'inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 hover:text-blue-700 border border-slate-200 shadow-sm transition-all';
  } else {
    btnAdmin.className = 'inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200/80 transition-all';
    btnStudent.className = 'inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 hover:text-blue-700 border border-slate-200 shadow-sm transition-all';
  }

  if (viewName === 'auth') {
    initAuthScreen();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  refreshIcons();
}

/**
 * 5. MÀN HÌNH XÁC THỰC MÃ PIN (TRANG CHỦ)
 */
function initAuthScreen() {
  const gradeSelect = document.getElementById('select-grade');
  const currentGrade = gradeSelect ? gradeSelect.value : '10';
  handleGradeChange(currentGrade);
}

function selectGradeQuick(grade) {
  const gradeSelect = document.getElementById('select-grade');
  if (gradeSelect) {
    gradeSelect.value = grade;
    handleGradeChange(grade);
  }
}

function handleGradeChange(grade) {
  ['10', '11', '12'].forEach((g) => {
    const pill = document.getElementById(`grade-pill-${g}`);
    if (!pill) return;
    if (g === grade) {
      pill.className = 'grade-pill py-2 px-3 rounded-xl text-sm font-bold border border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/20 transition-all flex items-center justify-center gap-1.5';
    } else {
      pill.className = 'grade-pill py-2 px-3 rounded-xl text-sm font-bold border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700 transition-all flex items-center justify-center gap-1.5';
    }
  });

  const classSelect = document.getElementById('select-class');
  const classesInGrade = portalData.classes.filter((c) => c.grade === grade);

  classSelect.innerHTML = '';
  classesInGrade.forEach((cls) => {
    const opt = document.createElement('option');
    opt.value = cls.id;
    const statusText = cls.published ? 'Đã công bố điểm' : 'Chưa mở công bố';
    const semText = cls.semester || 'Giữa kỳ I';
    opt.textContent = `Lớp ${cls.name} — (${semText} • ${cls.students.length} học sinh • ${statusText})`;
    classSelect.appendChild(opt);
  });

  handleClassSelectionChange();
  hideAuthError();
}

function handleClassSelectionChange() {
  const classSelect = document.getElementById('select-class');
  const statusBadge = document.getElementById('class-status-badge');
  if (!classSelect || !statusBadge) return;

  const selectedClass = portalData.classes.find((c) => c.id === classSelect.value);
  if (!selectedClass) return;

  if (selectedClass.published) {
    statusBadge.className = 'text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200';
    statusBadge.textContent = '● Đã công bố điểm';
  } else {
    statusBadge.className = 'text-xs font-semibold px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200';
    statusBadge.textContent = '○ Tạm khóa công bố';
  }
  hideAuthError();
}

function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!input || !icon) return;

  if (input.type === 'password') {
    input.type = 'text';
    icon.setAttribute('data-lucide', 'eye-off');
  } else {
    input.type = 'password';
    icon.setAttribute('data-lucide', 'eye');
  }
  refreshIcons();
}

function showAuthError(msg) {
  const errBox = document.getElementById('auth-error-box');
  const errMsg = document.getElementById('auth-error-message');
  const authCard = document.getElementById('auth-card');

  errMsg.textContent = msg;
  errBox.classList.remove('hidden');

  authCard.classList.remove('shake-error');
  void authCard.offsetWidth;
  authCard.classList.add('shake-error');
}

function hideAuthError() {
  const errBox = document.getElementById('auth-error-box');
  if (errBox) errBox.classList.add('hidden');
}

function handleUnlockScoreboard(event) {
  event.preventDefault();
  const classId = document.getElementById('select-class').value;
  const enteredPin = document.getElementById('input-class-pin').value.trim();

  const targetClass = portalData.classes.find((c) => c.id === classId);
  if (!targetClass) {
    showAuthError('Không tìm thấy thông tin lớp học đã chọn.');
    return;
  }

  if (!targetClass.published) {
    showAuthError(
      `Bảng điểm lớp ${targetClass.name} hiện đang được giáo viên tạm khóa hoặc chưa đến giờ công bố. Vui lòng quay lại sau!`
    );
    return;
  }

  if (enteredPin !== targetClass.pin) {
    showAuthError(
      `Mã PIN lớp ${targetClass.name} không chính xác! Vui lòng kiểm tra lại mã PIN do giáo viên cung cấp.`
    );
    return;
  }

  hideAuthError();
  currentUnlockedClassId = targetClass.id;
  openScoreboardForClass(targetClass.id);
  showToast(`Mở khóa thành công bảng điểm lớp ${targetClass.name}!`, 'success');
}

/**
 * 6. MÀN HÌNH BẢNG ĐIỂM TOÀN LỚP (CHẾ ĐỘ BẢNG 15 CỘT & CHẾ ĐỘ THẺ ĐIỆN THOẠI)
 */
function setScoreboardDisplayMode(mode) {
  scoreboardDisplayMode = mode;
  const tableWrapper = document.getElementById('scoreboard-table-wrapper');
  const cardsWrapper = document.getElementById('scoreboard-cards-wrapper');
  const btnTable = document.getElementById('btn-mode-table');
  const btnCards = document.getElementById('btn-mode-cards');

  if (!tableWrapper || !cardsWrapper) return;

  if (mode === 'cards') {
    tableWrapper.classList.add('hidden');
    cardsWrapper.classList.remove('hidden');
    if (btnCards) {
      btnCards.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm transition-all flex items-center gap-1.5';
    }
    if (btnTable) {
      btnTable.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-1.5';
    }
  } else {
    cardsWrapper.classList.add('hidden');
    tableWrapper.classList.remove('hidden');
    if (btnTable) {
      btnTable.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm transition-all flex items-center gap-1.5';
    }
    if (btnCards) {
      btnCards.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-1.5';
    }
  }
}

function openScoreboardForClass(classId) {
  const cls = portalData.classes.find((c) => c.id === classId);
  if (!cls) return;

  currentUnlockedClassId = classId;

  document.getElementById('sb-class-badge').textContent = cls.name;
  document.getElementById('sb-semester-badge').textContent = cls.semester || 'Giữa kỳ I';
  document.getElementById('sb-class-title').textContent = `Bảng Điểm Môn Tin Học — Lớp ${cls.name}`;
  document.getElementById('sb-teacher-name').textContent = cls.teacher || 'Vi Anh Quân';
  document.getElementById('sb-updated-at').textContent = cls.updatedAt || '12/11/2026';

  document.getElementById('print-title').textContent = `BẢNG ĐIỂM HỌC KỲ MÔN TIN HỌC - LỚP ${cls.name}`;
  document.getElementById('print-subtitle').textContent = `Năm học: ${portalData.schoolYear} - Đợt: ${cls.semester} | Môn học: TIN HỌC - GV: ${cls.teacher}`;

  document.getElementById('search-student-input').value = '';
  document.getElementById('filter-tier').value = 'all';
  document.getElementById('sort-by').value = 'stt';

  updateClassStatistics(cls);
  renderScoreboardTable();
  switchView('scoreboard');
}

function updateClassStatistics(cls) {
  const total = cls.students.length;
  document.getElementById('stat-total-students').textContent = total;

  if (total === 0) {
    document.getElementById('stat-class-avg').textContent = '0.0';
    document.getElementById('stat-highest-score').textContent = 'Cao nhất: 0.0';
    document.getElementById('stat-good-count').textContent = '0';
    document.getElementById('stat-good-detail').textContent = '(0 Giỏi, 0 Khá)';
    document.getElementById('stat-pass-rate').textContent = '0%';
    document.getElementById('stat-need-effort').textContent = '0 cần cố gắng';
    return;
  }

  const averages = cls.students.map((s) => calculateStudentAverage(s)).filter((v) => v > 0);
  const validCount = averages.length || 1;
  const sumAvg = averages.reduce((acc, v) => acc + v, 0);
  const classAvg = (sumAvg / validCount).toFixed(1);
  const maxAvg = averages.length > 0 ? Math.max(...averages).toFixed(1) : '0.0';

  const excellentCount = averages.filter((a) => a >= 8.0).length;
  const goodCount = averages.filter((a) => a >= 6.5 && a < 8.0).length;
  const passCount = averages.filter((a) => a >= 5.0).length;
  const effortCount = averages.filter((a) => a < 5.0).length;
  const passRate = Math.round((passCount / validCount) * 100);

  document.getElementById('stat-class-avg').textContent = classAvg;
  document.getElementById('stat-highest-score').textContent = `Cao nhất: ${maxAvg}`;
  document.getElementById('stat-good-count').textContent = excellentCount + goodCount;
  document.getElementById('stat-good-detail').textContent = `(${excellentCount} Giỏi, ${goodCount} Khá)`;
  document.getElementById('stat-pass-rate').textContent = `${passRate}%`;
  document.getElementById('stat-need-effort').textContent = `${effortCount} cần cố gắng`;
}

function getScoreBadgeInfo(avg, student = null) {
  if (
    student &&
    (String(student.dtb1 || '').trim().toUpperCase() === 'M' ||
      String(student.dtb2 || '').trim().toUpperCase() === 'M' ||
      String(student.dtbcn || '').trim().toUpperCase() === 'M')
  ) {
    return {
      label: 'Miễn (M)',
      rowTint: 'hover:bg-slate-50/60',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
      scoreTextClass: 'text-slate-700'
    };
  }
  if (avg >= 8.0) {
    return {
      label: 'Giỏi / Tốt',
      rowTint: 'hover:bg-emerald-50/40',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      scoreTextClass: 'text-emerald-700'
    };
  }
  if (avg >= 6.5) {
    return {
      label: 'Khá',
      rowTint: 'hover:bg-blue-50/40',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
      scoreTextClass: 'text-blue-700'
    };
  }
  if (avg >= 5.0) {
    return {
      label: 'Đạt',
      rowTint: 'hover:bg-amber-50/40',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
      scoreTextClass: 'text-amber-700'
    };
  }
  return {
    label: 'Cần cố gắng',
    rowTint: 'hover:bg-rose-50/40',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-200',
    scoreTextClass: 'text-rose-700'
  };
}

function formatScoreCell(val, isSummaryCol = false) {
  if (val !== null && val !== undefined) {
    const rawStr = String(val).trim().toUpperCase();
    if (rawStr === 'M' || rawStr === 'Đ' || rawStr === 'CĐ') {
      return `<span class="inline-flex items-center px-2 py-0.5 rounded-md border font-mono-tech font-extrabold text-xs bg-slate-100 text-slate-700 border-slate-300">${rawStr}</span>`;
    }
  }
  const num = parseScoreOrNull(val);
  if (num === null) return '<span class="text-slate-300">-</span>';

  const display = Number.isInteger(num) ? String(num) : num.toFixed(1);
  if (isSummaryCol) {
    const badge = getScoreBadgeInfo(num);
    return `<span class="inline-flex items-center px-2 py-0.5 rounded-md border font-mono-tech font-extrabold text-xs ${badge.badgeClass}">${display}</span>`;
  }

  if (num >= 8.0) return `<span class="font-mono-tech font-bold text-emerald-700">${display}</span>`;
  if (num < 5.0) return `<span class="font-mono-tech font-bold text-rose-600">${display}</span>`;
  return `<span class="font-mono-tech font-semibold text-slate-700">${display}</span>`;
}

function renderScoreboardTable() {
  const cls = portalData.classes.find((c) => c.id === currentUnlockedClassId);
  if (!cls) return;

  const searchInput = document.getElementById('search-student-input');
  const clearBtn = document.getElementById('btn-clear-search');
  const rawQuery = searchInput ? searchInput.value : '';
  const query = normalizeVietnamese(rawQuery);

  if (clearBtn) {
    clearBtn.classList.toggle('hidden', rawQuery.length === 0);
  }

  const tierFilter = document.getElementById('filter-tier').value;
  const sortBy = document.getElementById('sort-by').value;

  let rows = cls.students.map((student, idx) => {
    const avg = calculateStudentAverage(student);
    return {
      ...student,
      stt: student.stt || idx + 1,
      avg
    };
  });

  if (query) {
    rows = rows.filter(
      (r) =>
        normalizeVietnamese(r.name).includes(query) ||
        normalizeVietnamese(r.mdd || '').includes(query) ||
        normalizeVietnamese(r.dob || '').includes(query)
    );
  }

  if (tierFilter !== 'all') {
    rows = rows.filter((r) => {
      if (tierFilter === 'excellent') return r.avg >= 8.0;
      if (tierFilter === 'good') return r.avg >= 6.5 && r.avg < 8.0;
      if (tierFilter === 'average') return r.avg >= 5.0 && r.avg < 6.5;
      if (tierFilter === 'effort') return r.avg > 0 && r.avg < 5.0;
      return true;
    });
  }

  rows.sort((a, b) => {
    if (sortBy === 'avg-desc') return b.avg - a.avg;
    if (sortBy === 'avg-asc') return a.avg - b.avg;
    if (sortBy === 'name-asc') {
      const lastNameA = a.name.trim().split(/\s+/).pop() || '';
      const lastNameB = b.name.trim().split(/\s+/).pop() || '';
      return lastNameA.localeCompare(lastNameB, 'vi');
    }
    return a.stt - b.stt;
  });

  const tbody = document.getElementById('scoreboard-tbody');
  const cardsContainer = document.getElementById('scoreboard-cards-wrapper');
  const emptyState = document.getElementById('scoreboard-empty');

  tbody.innerHTML = '';
  if (cardsContainer) cardsContainer.innerHTML = '';

  if (rows.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  rows.forEach((student) => {
    const badge = getScoreBadgeInfo(student.avg, student);

    // 1. Render dòng cho Bảng 15 cột chuẩn (có cột Họ và tên cố định khi vuốt ngang trên ĐT)
    const tr = document.createElement('tr');
    tr.className = `transition-colors ${badge.rowTint}`;
    tr.innerHTML = `
      <td class="py-2.5 px-2.5 text-center font-mono-tech font-bold text-slate-500 border-r border-slate-100">
        ${student.stt}
      </td>
      <td class="py-2.5 px-2.5 text-center font-mono-tech text-xs font-semibold text-slate-600 border-r border-slate-100">
        ${escapeHtml(student.mdd || '')}
      </td>
      <td class="py-2.5 px-3.5 font-bold text-slate-900 border-r border-slate-100 sticky-col-name">
        ${escapeHtml(student.name)}
      </td>
      <td class="py-2.5 px-2.5 text-center font-mono-tech text-xs text-slate-600 border-r border-slate-100">
        ${escapeHtml(student.dob || '')}
      </td>
      <td class="py-2.5 px-2 text-center text-xs font-medium text-slate-700 border-r border-slate-100">
        ${escapeHtml(student.gender || '')}
      </td>
      <td class="py-2.5 px-2 text-center border-r border-slate-100 bg-blue-50/15">${formatScoreCell(student.tx1)}</td>
      <td class="py-2.5 px-2 text-center border-r border-slate-100 bg-blue-50/15">${formatScoreCell(student.tx2)}</td>
      <td class="py-2.5 px-2 text-center border-r border-slate-100 bg-blue-50/15">${formatScoreCell(student.tx3)}</td>
      <td class="py-2.5 px-2 text-center border-r border-slate-100 bg-blue-50/15">${formatScoreCell(student.tx4)}</td>
      <td class="py-2.5 px-2 text-center border-r border-slate-100 bg-blue-50/15">${formatScoreCell(student.tx5)}</td>
      <td class="py-2.5 px-2.5 text-center border-r border-slate-100 font-semibold">${formatScoreCell(student.gk)}</td>
      <td class="py-2.5 px-2.5 text-center border-r border-slate-100 font-semibold">${formatScoreCell(student.ck)}</td>
      <td class="py-2.5 px-2.5 text-center border-r border-slate-100 bg-blue-50/35">${formatScoreCell(student.dtb1, true)}</td>
      <td class="py-2.5 px-2.5 text-center border-r border-slate-100 bg-blue-50/35">${formatScoreCell(student.dtb2, true)}</td>
      <td class="py-2.5 px-2.5 text-center bg-indigo-50/40">${formatScoreCell(student.dtbcn, true)}</td>
    `;
    tbody.appendChild(tr);

    // 2. Render Thẻ Học sinh tối ưu cho Điện thoại (hiển thị trọn vẹn 15 cột không bị tràn)
    if (cardsContainer) {
      const card = document.createElement('div');
      card.className = 'glass-card rounded-2xl p-4 border border-slate-200/90 space-y-3';
      card.innerHTML = `
        <div class="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-200/80">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-xl bg-blue-700 text-white font-mono-tech font-bold text-xs flex items-center justify-center shrink-0">
              ${student.stt}
            </span>
            <div>
              <h4 class="font-extrabold text-slate-900 text-sm sm:text-base">${escapeHtml(student.name)}</h4>
              <p class="text-[11px] font-mono-tech text-slate-500">
                Mã ĐD: <strong class="text-slate-700">${escapeHtml(student.mdd || '-')}</strong> • ${escapeHtml(student.dob || '-')} • ${escapeHtml(student.gender || '-')}
              </p>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded-lg border text-[11px] font-bold ${badge.badgeClass}">
            ${badge.label}
          </span>
        </div>

        <!-- Cụm 5 cột ĐĐGtx -->
        <div>
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Điểm đánh giá thường xuyên (ĐĐGtx 1 → 5)</p>
          <div class="grid grid-cols-5 gap-1.5 text-center">
            <div class="rounded-lg bg-slate-50 border border-slate-200/80 py-1">
              <span class="block text-[10px] text-slate-400 font-mono-tech">TX1</span>
              <span class="text-xs font-bold">${formatScoreCell(student.tx1)}</span>
            </div>
            <div class="rounded-lg bg-slate-50 border border-slate-200/80 py-1">
              <span class="block text-[10px] text-slate-400 font-mono-tech">TX2</span>
              <span class="text-xs font-bold">${formatScoreCell(student.tx2)}</span>
            </div>
            <div class="rounded-lg bg-slate-50 border border-slate-200/80 py-1">
              <span class="block text-[10px] text-slate-400 font-mono-tech">TX3</span>
              <span class="text-xs font-bold">${formatScoreCell(student.tx3)}</span>
            </div>
            <div class="rounded-lg bg-slate-50 border border-slate-200/80 py-1">
              <span class="block text-[10px] text-slate-400 font-mono-tech">TX4</span>
              <span class="text-xs font-bold">${formatScoreCell(student.tx4)}</span>
            </div>
            <div class="rounded-lg bg-slate-50 border border-slate-200/80 py-1">
              <span class="block text-[10px] text-slate-400 font-mono-tech">TX5</span>
              <span class="text-xs font-bold">${formatScoreCell(student.tx5)}</span>
            </div>
          </div>
        </div>

        <!-- Cụm ĐĐGgk, ĐĐGck, ĐTBmhk1, ĐTBmhk2, ĐTBmcn -->
        <div class="grid grid-cols-5 gap-1.5 text-center pt-1">
          <div class="rounded-xl bg-blue-50/50 border border-blue-200/70 py-1.5">
            <span class="block text-[10px] font-bold text-blue-800">ĐĐGgk</span>
            <span class="text-xs font-extrabold">${formatScoreCell(student.gk)}</span>
          </div>
          <div class="rounded-xl bg-blue-50/50 border border-blue-200/70 py-1.5">
            <span class="block text-[10px] font-bold text-blue-800">ĐĐGck</span>
            <span class="text-xs font-extrabold">${formatScoreCell(student.ck)}</span>
          </div>
          <div class="rounded-xl bg-indigo-50/60 border border-indigo-200/70 py-1.5">
            <span class="block text-[10px] font-bold text-indigo-800">ĐTBmhk1</span>
            <span class="text-xs font-extrabold">${formatScoreCell(student.dtb1)}</span>
          </div>
          <div class="rounded-xl bg-indigo-50/60 border border-indigo-200/70 py-1.5">
            <span class="block text-[10px] font-bold text-indigo-800">ĐTBmhk2</span>
            <span class="text-xs font-extrabold">${formatScoreCell(student.dtb2)}</span>
          </div>
          <div class="rounded-xl bg-emerald-50/60 border border-emerald-200/70 py-1.5">
            <span class="block text-[10px] font-bold text-emerald-800">ĐTBmcn</span>
            <span class="text-xs font-extrabold">${formatScoreCell(student.dtbcn)}</span>
          </div>
        </div>
      `;
      cardsContainer.appendChild(card);
    }
  });
}

function clearStudentSearch() {
  const input = document.getElementById('search-student-input');
  if (input) {
    input.value = '';
    renderScoreboardTable();
    input.focus();
  }
}

/**
 * 7. TẠO WORKBOOK EXCEL CHUẨN BIỂU MẪU BỘ GD&ĐT / THPT BA CHẼ
 */
function buildStandardSchoolExcelAOA(cls) {
  const teacherName = cls?.teacher || 'Vi Anh Quân';
  const semText = (cls?.semester || 'Giữa kỳ I').includes('II') ? 'II' : 'I';
  const students = cls?.students || [];

  const aoa = [
    ['SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ QUẢNG NINH', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['THPT BA CHẼ', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['BẢNG ĐIỂM HỌC KỲ', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    [`Năm học: ${portalData?.schoolYear || '2026-2027'} - Học kỳ: ${semText}`, '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    [`Môn học: TIN HỌC - GV: ${teacherName}`, '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['STT', 'Mã định danh Bộ GD&ĐT', 'Họ và tên', 'Ngày sinh', 'Giới tính', 'ĐĐGtx', '', '', '', '', 'ĐĐGgk', 'ĐĐGck', 'ĐTBmhk1', 'ĐTBmhk2', 'ĐTBmcn'],
    ['', '', '', '', '', 1, 2, 3, 4, 5, '', '', '', '', '']
  ];

  students.forEach((s, idx) => {
    aoa.push([
      s.stt || idx + 1,
      s.mdd || '',
      s.name || '',
      s.dob || '',
      s.gender || '',
      s.tx1 ?? '',
      s.tx2 ?? '',
      s.tx3 ?? '',
      s.tx4 ?? '',
      s.tx5 ?? '',
      s.gk ?? '',
      s.ck ?? '',
      s.dtb1 ?? '',
      s.dtb2 ?? '',
      s.dtbcn ?? ''
    ]);
  });

  aoa.push(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
  aoa.push(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
  aoa.push(['', '', '', '', '', '', '', '', '', '', 'Người lập biểu\n(Ký và ghi rõ họ tên)', '', '', '', '']);

  return aoa;
}

function downloadExcelFromAOA(aoa, fileNameBase, sheetName = 'BangDiem') {
  if (window.XLSX) {
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    ws['!merges'] = [
      { s: { r: 6, c: 0 }, e: { r: 7, c: 0 } },
      { s: { r: 6, c: 1 }, e: { r: 7, c: 1 } },
      { s: { r: 6, c: 2 }, e: { r: 7, c: 2 } },
      { s: { r: 6, c: 3 }, e: { r: 7, c: 3 } },
      { s: { r: 6, c: 4 }, e: { r: 7, c: 4 } },
      { s: { r: 6, c: 5 }, e: { r: 6, c: 9 } },
      { s: { r: 6, c: 10 }, e: { r: 7, c: 10 } },
      { s: { r: 6, c: 11 }, e: { r: 7, c: 11 } },
      { s: { r: 6, c: 12 }, e: { r: 7, c: 12 } },
      { s: { r: 6, c: 13 }, e: { r: 7, c: 13 } },
      { s: { r: 6, c: 14 }, e: { r: 7, c: 14 } }
    ];
    ws['!cols'] = [
      { wch: 6 },
      { wch: 16 },
      { wch: 24 },
      { wch: 12 },
      { wch: 9 },
      { wch: 6 },
      { wch: 6 },
      { wch: 6 },
      { wch: 6 },
      { wch: 6 },
      { wch: 8 },
      { wch: 8 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 }
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileNameBase}.xlsx`);
  } else {
    const csvContent = aoa
      .map((row) =>
        row
          .map((cell) => {
            const s = String(cell ?? '');
            return s.includes(',') || s.includes('"') || s.includes('\n')
              ? `"${s.replace(/"/g, '""')}"`
              : s;
          })
          .join(',')
      )
      .join('\r\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileNameBase}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

function exportCurrentClassExcel() {
  const cls = portalData.classes.find((c) => c.id === currentUnlockedClassId);
  if (!cls) return;

  const aoa = buildStandardSchoolExcelAOA(cls);
  downloadExcelFromAOA(aoa, `Bang_Diem_Tin_Hoc_Lop_${cls.name}_THPT_Ba_Che`, `Lop_${cls.name}`);
  showToast(`Đã xuất file Excel chuẩn biểu mẫu cho lớp ${cls.name}!`, 'success');
}

function downloadSampleExcelTemplate() {
  const cls = portalData.classes.find((c) => c.id === currentAdminEditingClassId) || portalData.classes[0];
  const aoa = buildStandardSchoolExcelAOA(cls);
  downloadExcelFromAOA(aoa, `Mau_Bang_Diem_Hoc_Ky_Tin_Hoc_THPT_Ba_Che`, 'Bang_Diem_Hoc_Ky');
  showToast('Đã tải xuống file Excel mẫu chuẩn THPT Ba Chẽ!', 'info');
}

/**
 * 8. CỔNG GIÁO VIÊN (ADMIN DASHBOARD)
 */
function openAdminPortal() {
  if (isAdminAuthenticated) {
    initAdminDashboard();
    switchView('admin-dashboard');
  } else {
    document.getElementById('admin-password-input').value = '';
    document.getElementById('admin-login-error').classList.add('hidden');
    switchView('admin-login');
  }
}

function handleAdminLogin(event) {
  event.preventDefault();
  const entered = document.getElementById('admin-password-input').value.trim();
  const errEl = document.getElementById('admin-login-error');

  if (entered === portalData.adminPassword) {
    isAdminAuthenticated = true;
    errEl.classList.add('hidden');
    initAdminDashboard();
    switchView('admin-dashboard');
    showToast('Đăng nhập Cổng Giáo Viên thành công!', 'success');
  } else {
    errEl.classList.remove('hidden');
  }
}

function handleAdminLogout() {
  isAdminAuthenticated = false;
  switchView('auth');
  showToast('Đã đăng xuất khỏi Cổng Giáo Viên.', 'info');
}

function initAdminDashboard() {
  if (!portalData.classes.some((c) => c.id === currentAdminEditingClassId)) {
    currentAdminEditingClassId = portalData.classes[0]?.id || '10A1';
  }
  renderAdminClassCards();
  populateAdminClassSelector();
  renderAdminScoreEditor();
  refreshIcons();
}

function renderAdminClassCards() {
  const grid = document.getElementById('admin-class-grid');
  const gradeFilter = document.getElementById('admin-filter-grade').value;
  if (!grid) return;

  grid.innerHTML = '';
  const filteredClasses = portalData.classes.filter(
    (c) => gradeFilter === 'all' || c.grade === gradeFilter
  );

  filteredClasses.forEach((cls) => {
    const totalStudents = cls.students.length;
    const validAvgs = cls.students.map((s) => calculateStudentAverage(s)).filter((v) => v > 0);
    const avgClass =
      validAvgs.length > 0
        ? (validAvgs.reduce((sum, v) => sum + v, 0) / validAvgs.length).toFixed(1)
        : '0.0';

    const card = document.createElement('div');
    const isEditingThis = cls.id === currentAdminEditingClassId;
    card.className = `rounded-2xl p-4 bg-white border transition-all ${
      isEditingThis
        ? 'border-blue-600 ring-2 ring-blue-600/15 shadow-md'
        : 'border-slate-200/90 shadow-sm hover:border-blue-300'
    }`;

    card.innerHTML = `
      <div class="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div class="flex items-center gap-2.5">
          <span class="px-2.5 py-1 rounded-xl bg-blue-700 text-white font-extrabold text-sm">
            ${cls.name}
          </span>
          <div>
            <p class="text-xs font-bold text-slate-800">Khối ${cls.grade} • ${escapeHtml(cls.semester || 'Giữa kỳ I')} • ${totalStudents} HS</p>
            <p class="text-[11px] text-slate-500">Điểm TB lớp: <strong class="text-blue-700">${avgClass}</strong></p>
          </div>
        </div>

        <label class="inline-flex items-center gap-2 cursor-pointer select-none" title="Bật hoặc tắt công bố điểm lớp ${cls.name}">
          <span class="text-xs font-semibold ${cls.published ? 'text-emerald-700' : 'text-slate-400'}">
            ${cls.published ? 'Đã công bố' : 'Tạm khóa'}
          </span>
          <input
            type="checkbox"
            ${cls.published ? 'checked' : ''}
            onchange="toggleClassPublishStatus('${cls.id}', this.checked)"
            class="sr-only peer"
          />
          <div class="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all relative peer-checked:bg-emerald-600"></div>
        </label>
      </div>

      <div class="mt-3">
        <label class="block text-[11px] font-bold uppercase text-slate-500 mb-1">
          Mã PIN mở khóa lớp ${cls.name}
        </label>
        <div class="flex items-center gap-2">
          <input
            type="text"
            id="pin-edit-${cls.id}"
            value="${escapeHtml(cls.pin)}"
            class="w-full rounded-xl border border-slate-300 px-3 py-1.5 text-xs sm:text-sm font-mono-tech font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
          />
          <button
            type="button"
            onclick="saveClassPin('${cls.id}')"
            class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-700 text-white text-xs font-bold shrink-0 transition-colors"
          >
            Lưu PIN
          </button>
        </div>
      </div>

      <div class="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          type="button"
          onclick="selectClassForAdminEdit('${cls.id}')"
          class="flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            isEditingThis
              ? 'bg-blue-600 text-white'
              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
          }"
        >
          <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
          <span>${isEditingThis ? 'Đang chỉnh sửa điểm' : 'Quản lý bảng điểm'}</span>
        </button>

        <button
          type="button"
          onclick="deleteClassInAdmin('${cls.id}')"
          class="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          title="Xóa lớp ${cls.name}"
        >
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  refreshIcons();
}

function toggleClassPublishStatus(classId, isPublished) {
  const cls = portalData.classes.find((c) => c.id === classId);
  if (!cls) return;

  cls.published = isPublished;
  savePortalData();
  renderAdminClassCards();

  showToast(
    isPublished
      ? `Đã BẬT công bố điểm cho lớp ${cls.name}!`
      : `Đã TẠM KHÓA công bố điểm lớp ${cls.name}.`,
    isPublished ? 'success' : 'info'
  );
}

function saveClassPin(classId) {
  const input = document.getElementById(`pin-edit-${classId}`);
  if (!input) return;

  const newPin = input.value.trim();
  if (!newPin) {
    showToast('Mã PIN không được để trống!', 'error');
    return;
  }

  const cls = portalData.classes.find((c) => c.id === classId);
  if (!cls) return;

  cls.pin = newPin;
  savePortalData();
  renderAdminClassCards();
  showToast(`Đã cập nhật Mã PIN lớp ${cls.name} thành: ${newPin}`, 'success');
}

function populateAdminClassSelector() {
  const select = document.getElementById('admin-select-class-editor');
  if (!select) return;

  select.innerHTML = '';
  portalData.classes.forEach((cls) => {
    const opt = document.createElement('option');
    opt.value = cls.id;
    opt.textContent = `${cls.name} (Khối ${cls.grade} • ${cls.students.length} HS)`;
    if (cls.id === currentAdminEditingClassId) opt.selected = true;
    select.appendChild(opt);
  });
}

function selectClassForAdminEdit(classId) {
  currentAdminEditingClassId = classId;
  renderAdminClassCards();
  populateAdminClassSelector();
  renderAdminScoreEditor();

  const editorSection = document.getElementById('admin-score-editor-section');
  if (editorSection) {
    editorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function handleAdminSelectClassForEdit(classId) {
  currentAdminEditingClassId = classId;
  renderAdminClassCards();
  renderAdminScoreEditor();
}

function renderAdminScoreEditor() {
  const cls = portalData.classes.find((c) => c.id === currentAdminEditingClassId);
  if (!cls) return;

  document.getElementById('admin-edit-teacher').value = cls.teacher || 'Vi Anh Quân';
  const semSelect = document.getElementById('admin-edit-semester');
  if (semSelect) {
    semSelect.value = VALID_SEMESTERS.includes(cls.semester) ? cls.semester : 'Giữa kỳ I';
  }

  const tbody = document.getElementById('admin-editor-tbody');
  tbody.innerHTML = '';

  const scoreFields = ['tx1', 'tx2', 'tx3', 'tx4', 'tx5', 'gk', 'ck', 'dtb1', 'dtb2', 'dtbcn'];

  cls.students.forEach((student, idx) => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/80 transition-colors';

    const scoreInputsHtml = scoreFields
      .map((field) => {
        const isDtb = field.startsWith('dtb');
        const val = student[field] !== undefined && student[field] !== null ? student[field] : '';
        return `
          <td class="py-2 px-1 text-center ${isDtb ? 'bg-blue-50/35' : ''}">
            <input
              type="text"
              inputmode="decimal"
              value="${escapeHtml(val)}"
              placeholder="-"
              onchange="updateStudentField(${idx}, '${field}', this.value)"
              class="w-12 text-center py-1 px-1 rounded-lg border ${
                isDtb ? 'border-blue-300 font-extrabold text-blue-900 bg-white' : 'border-slate-200 font-semibold text-slate-800'
              } font-mono-tech text-xs focus:border-blue-600 focus:outline-none"
            />
          </td>
        `;
      })
      .join('');

    tr.innerHTML = `
      <td class="py-2 px-2 text-center font-mono-tech font-bold text-slate-500 text-xs">
        ${idx + 1}
      </td>
      <td class="py-2 px-1.5">
        <input
          type="text"
          value="${escapeHtml(student.mdd || '')}"
          onchange="updateStudentField(${idx}, 'mdd', this.value)"
          class="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs font-mono-tech text-center text-slate-700 focus:border-blue-600 focus:outline-none"
        />
      </td>
      <td class="py-2 px-2">
        <input
          type="text"
          value="${escapeHtml(student.name || '')}"
          onchange="updateStudentField(${idx}, 'name', this.value)"
          class="w-full rounded-lg border border-slate-200 px-2.5 py-1 text-xs sm:text-sm font-semibold text-slate-900 focus:border-blue-600 focus:outline-none"
        />
      </td>
      <td class="py-2 px-1.5">
        <input
          type="text"
          value="${escapeHtml(student.dob || '')}"
          placeholder="DD/MM/YYYY"
          onchange="updateStudentField(${idx}, 'dob', this.value)"
          class="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs font-mono-tech text-center text-slate-700 focus:border-blue-600 focus:outline-none"
        />
      </td>
      <td class="py-2 px-1.5">
        <select
          onchange="updateStudentField(${idx}, 'gender', this.value)"
          class="w-full rounded-lg border border-slate-200 px-1.5 py-1 text-xs font-medium text-slate-700 focus:border-blue-600 focus:outline-none"
        >
          <option value="Nam" ${student.gender === 'Nam' ? 'selected' : ''}>Nam</option>
          <option value="Nữ" ${student.gender === 'Nữ' ? 'selected' : ''}>Nữ</option>
        </select>
      </td>
      ${scoreInputsHtml}
      <td class="py-2 px-2 text-center">
        <button
          type="button"
          onclick="removeStudentRowInAdmin(${idx})"
          class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          title="Xóa học sinh này"
        >
          <i data-lucide="trash" class="w-4 h-4"></i>
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  refreshIcons();
}

function updateStudentField(studentIndex, field, rawValue) {
  const cls = portalData.classes.find((c) => c.id === currentAdminEditingClassId);
  if (!cls || !cls.students[studentIndex]) return;

  const scoreFields = ['tx1', 'tx2', 'tx3', 'tx4', 'tx5', 'gk', 'ck', 'dtb1', 'dtb2', 'dtbcn'];
  if (scoreFields.includes(field)) {
    const trimmed = String(rawValue).trim();
    const upper = trimmed.toUpperCase();
    if (trimmed === '') {
      cls.students[studentIndex][field] = '';
    } else if (upper === 'M' || upper === 'Đ' || upper === 'CĐ') {
      cls.students[studentIndex][field] = upper;
    } else {
      let num = parseFloat(trimmed.replace(',', '.'));
      if (isNaN(num)) {
        cls.students[studentIndex][field] = '';
      } else {
        num = Math.max(0, Math.min(10, Math.round(num * 10) / 10));
        cls.students[studentIndex][field] = num;
      }
    }
  } else {
    cls.students[studentIndex][field] = String(rawValue).trim();
  }

  cls.updatedAt = new Date().toLocaleDateString('vi-VN');
  savePortalData();

  renderAdminScoreEditor();
  renderAdminClassCards();
  showToast(`Đã lưu thay đổi điểm lớp ${cls.name}`, 'success');
}

function saveClassMetadataFromAdmin() {
  const cls = portalData.classes.find((c) => c.id === currentAdminEditingClassId);
  if (!cls) return;

  cls.teacher = document.getElementById('admin-edit-teacher').value.trim();
  cls.semester = document.getElementById('admin-edit-semester').value.trim();
  cls.updatedAt = new Date().toLocaleDateString('vi-VN');

  savePortalData();
  renderAdminClassCards();
  showToast(`Đã cập nhật thông tin lớp ${cls.name} (${cls.semester})`, 'success');
}

function applySemesterToAllClasses() {
  const semEl = document.getElementById('admin-edit-semester');
  if (!semEl) return;
  const selectedSemester = semEl.value;
  portalData.classes.forEach((c) => {
    c.semester = selectedSemester;
  });
  savePortalData();
  renderAdminClassCards();
  showToast(`Đã áp dụng đợt "${selectedSemester}" cho toàn bộ các lớp!`, 'success');
}

function addStudentRowInAdmin() {
  const cls = portalData.classes.find((c) => c.id === currentAdminEditingClassId);
  if (!cls) return;

  const newStt = cls.students.length + 1;
  cls.students.push({
    stt: newStt,
    mdd: '',
    name: `Học sinh mới ${newStt}`,
    dob: '01/01/2011',
    gender: 'Nam',
    tx1: 9,
    tx2: 9,
    tx3: '',
    tx4: '',
    tx5: '',
    gk: 8.5,
    ck: '',
    dtb1: '',
    dtb2: '',
    dtbcn: ''
  });

  cls.updatedAt = new Date().toLocaleDateString('vi-VN');
  savePortalData();
  renderAdminScoreEditor();
  renderAdminClassCards();
  populateAdminClassSelector();
  showToast(`Đã thêm dòng học sinh mới vào lớp ${cls.name}`, 'success');
}

function removeStudentRowInAdmin(studentIndex) {
  const cls = portalData.classes.find((c) => c.id === currentAdminEditingClassId);
  if (!cls) return;

  const targetName = cls.students[studentIndex]?.name || 'học sinh này';
  if (!confirm(`Bạn có chắc muốn xóa "${targetName}" khỏi bảng điểm lớp ${cls.name}?`)) {
    return;
  }

  cls.students.splice(studentIndex, 1);
  cls.students.forEach((s, i) => {
    s.stt = i + 1;
  });

  savePortalData();
  renderAdminScoreEditor();
  renderAdminClassCards();
  populateAdminClassSelector();
  showToast(`Đã xóa học sinh khỏi lớp ${cls.name}`, 'info');
}

function autoCalculateSemesterAverageForClass() {
  const cls = portalData.classes.find((c) => c.id === currentAdminEditingClassId);
  if (!cls) return;

  const isSem2 = (cls.semester || '').includes('II');
  let countUpdated = 0;

  cls.students.forEach((s) => {
    const computed = computeFormulaSemesterAvg(s);
    if (computed !== null) {
      if (isSem2) s.dtb2 = computed;
      else s.dtb1 = computed;
      countUpdated++;
    } else {
      const refAvg = calculateStudentAverage(s);
      if (refAvg > 0) {
        if (isSem2) s.dtb2 = refAvg;
        else s.dtb1 = refAvg;
        countUpdated++;
      }
    }

    const d1 = parseScoreOrNull(s.dtb1);
    const d2 = parseScoreOrNull(s.dtb2);
    if (d1 !== null && d2 !== null) {
      s.dtbcn = Math.round(((d1 + 2 * d2) / 3) * 10) / 10;
    }
  });

  savePortalData();
  renderAdminScoreEditor();
  renderAdminClassCards();
  showToast(`Đã tự động tính Điểm TB học kỳ cho ${countUpdated} học sinh lớp ${cls.name}!`, 'success');
}

function previewClassAsStudent() {
  openScoreboardForClass(currentAdminEditingClassId);
}

/**
 * 9. IMPORT DỮ LIỆU ĐIỂM TỪ FILE EXCEL (.XLSX / .XLS / .CSV) THEO ĐÚNG MẪU NHÀ TRƯỜNG
 */
function cleanCellScore(val) {
  if (val === '' || val === null || val === undefined) return '';
  const trimmed = String(val).trim();
  const upper = trimmed.toUpperCase();
  if (upper === 'M' || upper === 'Đ' || upper === 'CĐ') return upper;
  const num = parseFloat(trimmed.replace(',', '.'));
  if (isNaN(num)) return '';
  return Math.max(0, Math.min(10, Math.round(num * 10) / 10));
}

function handleExcelFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const cls = portalData.classes.find((c) => c.id === currentAdminEditingClassId);
  if (!cls) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

      if (!rows || rows.length === 0) {
        showToast('File Excel không có dữ liệu!', 'error');
        return;
      }

      for (let i = 0; i < Math.min(8, rows.length); i++) {
        const firstCell = String(rows[i][0] || '').trim();
        if (firstCell.includes('GV:')) {
          const parts = firstCell.split('GV:');
          if (parts[1] && parts[1].trim()) {
            cls.teacher = parts[1].trim();
          }
        }
      }

      const importedStudents = [];
      for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        if (!row || row.length < 3) continue;

        const sttCandidate = String(row[0] ?? '').trim();
        const mddCandidate = String(row[1] ?? '').trim();
        const nameCandidate = String(row[2] ?? '').trim();

        if (!nameCandidate || normalizeVietnamese(nameCandidate) === 'ho va ten') continue;
        if (sttCandidate !== '' && isNaN(parseInt(sttCandidate, 10))) continue;
        if (sttCandidate === '' && mddCandidate === '') continue;

        importedStudents.push({
          stt: importedStudents.length + 1,
          mdd: mddCandidate,
          name: nameCandidate,
          dob: String(row[3] ?? '').trim(),
          gender: String(row[4] ?? '').trim() || 'Nam',
          tx1: cleanCellScore(row[5]),
          tx2: cleanCellScore(row[6]),
          tx3: cleanCellScore(row[7]),
          tx4: cleanCellScore(row[8]),
          tx5: cleanCellScore(row[9]),
          gk: cleanCellScore(row[10]),
          ck: cleanCellScore(row[11]),
          dtb1: cleanCellScore(row[12]),
          dtb2: cleanCellScore(row[13]),
          dtbcn: cleanCellScore(row[14])
        });
      }

      if (importedStudents.length === 0) {
        showToast('Không tìm thấy danh sách học sinh hợp lệ trong file Excel!', 'error');
        return;
      }

      cls.students = importedStudents;
      cls.updatedAt = new Date().toLocaleDateString('vi-VN');
      savePortalData();

      renderAdminScoreEditor();
      renderAdminClassCards();
      populateAdminClassSelector();
      showToast(
        `Đã nhập ${importedStudents.length} học sinh vào lớp ${cls.name}! Nhấn "Lưu đồng bộ Điện thoại (data.json)" để cập nhật sang Điện thoại.`,
        'success'
      );
    } catch (err) {
      console.error('Lỗi đọc file Excel:', err);
      showToast('Không thể đọc file Excel. Vui lòng kiểm tra định dạng .xlsx hoặc .csv!', 'error');
    } finally {
      event.target.value = '';
    }
  };

  reader.readAsArrayBuffer(file);
}

/**
 * 10. THÊM / XÓA LỚP HỌC & KHÔI PHỤC DỮ LIỆU MẪU
 */
function openAddClassModal() {
  document.getElementById('new-class-name').value = '';
  document.getElementById('new-class-pin').value = '';
  document.getElementById('modal-add-class').classList.remove('hidden');
}

function closeAddClassModal() {
  document.getElementById('modal-add-class').classList.add('hidden');
}

function handleCreateNewClass(event) {
  event.preventDefault();
  const grade = document.getElementById('new-class-grade').value;
  const rawName = document.getElementById('new-class-name').value.trim().toUpperCase();
  const pin = document.getElementById('new-class-pin').value.trim();
  const semesterEl = document.getElementById('new-class-semester');
  const semester = semesterEl ? semesterEl.value : 'Giữa kỳ I';
  const teacher = document.getElementById('new-class-teacher').value.trim() || 'Vi Anh Quân';

  if (!rawName || !pin) return;

  if (portalData.classes.some((c) => c.id.toUpperCase() === rawName)) {
    showToast(`Lớp ${rawName} đã tồn tại trong hệ thống!`, 'error');
    return;
  }

  const newClassObj = {
    id: rawName,
    name: rawName,
    grade,
    pin,
    published: true,
    teacher,
    semester,
    updatedAt: new Date().toLocaleDateString('vi-VN'),
    students: []
  };

  portalData.classes.push(newClassObj);
  currentAdminEditingClassId = rawName;
  savePortalData();

  closeAddClassModal();
  initAdminDashboard();
  showToast(`Đã tạo lớp ${rawName} (Mã PIN: ${pin}). Hãy chọn Import Excel để tải danh sách học sinh riêng của lớp!`, 'success');
}

function deleteClassInAdmin(classId) {
  if (portalData.classes.length <= 1) {
    showToast('Hệ thống cần giữ lại ít nhất 1 lớp học!', 'error');
    return;
  }

  if (!confirm(`Bạn có chắc chắn muốn xóa lớp ${classId} và toàn bộ bảng điểm của lớp này?`)) {
    return;
  }

  portalData.classes = portalData.classes.filter((c) => c.id !== classId);
  if (currentAdminEditingClassId === classId) {
    currentAdminEditingClassId = portalData.classes[0].id;
  }

  savePortalData();
  initAdminDashboard();
  showToast(`Đã xóa lớp ${classId}.`, 'info');
}

function resetToDefaultData() {
  if (
    !confirm(
      'Khôi phục toàn bộ dữ liệu bảng điểm gốc của từng lớp (10A1, 10A3, 10A4, 10A6, 11A1, 11A3, 12A1) theo file điểm riêng của mỗi lớp?'
    )
  ) {
    return;
  }

  portalData = JSON.parse(JSON.stringify(DEFAULT_PORTAL_DATA));
  portalData.dataVersion = Date.now();
  currentAdminEditingClassId = '10A1';
  savePortalData(false);
  initAdminDashboard();
  showToast('Đã khôi phục danh sách học sinh và bảng điểm riêng cho từng lớp!', 'success');
}

/**
 * 11. TIỆN ÍCH HIỂN THỊ THÔNG BÁO (TOAST) & BẢO MẬT CHUỖI HTML
 */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const styles = {
    success: 'bg-emerald-900 text-white border-emerald-700',
    error: 'bg-rose-900 text-white border-rose-700',
    info: 'bg-slate-900 text-white border-blue-700'
  };

  toast.className = `pointer-events-auto max-w-sm px-4 py-3 rounded-2xl border shadow-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 view-section ${
    styles[type] || styles.info
  }`;
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full ${
      type === 'success' ? 'bg-emerald-400' : type === 'error' ? 'bg-rose-400' : 'bg-sky-400'
    } shrink-0"></span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.25s ease';
    setTimeout(() => toast.remove(), 260);
  }, 3800);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
