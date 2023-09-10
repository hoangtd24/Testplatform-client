export const questions = [
  {
    id: 1,
    type: "radio",
    quiz: "Việc cung cấp dịch vụ giám sát an toàn thông tin có bao gồm sẵn dịch vụ ứng cứu và xử lý sự cố hay không",
    answers: ["có", "không"],
  },
  {
    id: 2,
    type: "checkbox",
    quiz: "Chi phí quá trình onboarding bao gồm nhưng chi phí nào:",
    answers: [
      "Chi phí nhân sự triển khai hệ thống công nghệ phục vụ giám sát",
      "Chi phí nhân sự giám sát 24/7",
      "Chi phí PM quản lý dự án",
      "Chi phí nhân sự Content Analysis thực hiện thiết lập bộ rule phục vụ giám sát baseline",
    ],
  },
  {
    id: 3,
    type: "checkbox",
    quiz: "Tổng manday cho dịch vụ PS bao gồm các thành phần nào ?",
    answers: [
      "Manday khảo sát",
      "Manday triển khai",
      "Manday Báo cáo",
      "Manday ReTest",
      "Manday POC",
    ],
  },
  {
    id: 4,
    type: "radio",
    quiz: "Giá 01 manday cho việc Xây dựng bộ use case giám sát cho khách hàng là bao nhiêu tiền theo đơn giá SOC 2023 ?",
    answers: ["7.5 triệu", "5.5 triệu", "9.5 triệu", "3 triệu"],
  },
  {
    id: 5,
    type: "radio",
    quiz: "Theo quy trình đánh giá bảo mật của VSEC thì bước nào liên quan đến việc PoC lỗ hổng mà pentester đã tìm ra ?",
    answers: [
      "Báo cáo và khuyến nghị",
      "Dò quét điểm yếu",
      "Đánh giá mức độ nguy hiểm của lổ hổng",
      "Khảo sát mục tiêu/Thu thập thông tin",
      "Xác minh lỗ hổng và tấn công kiểm thử",
    ],
  },
];



export const results = [
  {
    id: 1,
    type: "radio",
    quiz: "Việc cung cấp dịch vụ giám sát an toàn thông tin có bao gồm sẵn dịch vụ ứng cứu và xử lý sự cố hay không",
    answers: ["có", "không"],
    corrects : [0, 1]
  },
  {
    id: 2,
    type: "checkbox",
    quiz: "Chi phí quá trình onboarding bao gồm nhưng chi phí nào:",
    answers: [
      "Chi phí nhân sự triển khai hệ thống công nghệ phục vụ giám sát",
      "Chi phí nhân sự giám sát 24/7",
      "Chi phí PM quản lý dự án",
      "Chi phí nhân sự Content Analysis thực hiện thiết lập bộ rule phục vụ giám sát baseline",
    ],
    corrects : [0, 1]
  },
  {
    id: 3,
    type: "checkbox",
    quiz: "Tổng manday cho dịch vụ PS bao gồm các thành phần nào ?",
    answers: [
      "Manday khảo sát",
      "Manday triển khai",
      "Manday Báo cáo",
      "Manday ReTest",
      "Manday POC",
    ],
    corrects : [0, 1]
  },
  {
    id: 4,
    type: "radio",
    quiz: "Giá 01 manday cho việc Xây dựng bộ use case giám sát cho khách hàng là bao nhiêu tiền theo đơn giá SOC 2023 ?",
    answers: ["7.5 triệu", "5.5 triệu", "9.5 triệu", "3 triệu"],
    corrects : [0, 1]
  },
  {
    id: 5,
    type: "radio",
    quiz: "Theo quy trình đánh giá bảo mật của VSEC thì bước nào liên quan đến việc PoC lỗ hổng mà pentester đã tìm ra ?",
    answers: [
      "Báo cáo và khuyến nghị",
      "Dò quét điểm yếu",
      "Đánh giá mức độ nguy hiểm của lổ hổng",
      "Khảo sát mục tiêu/Thu thập thông tin",
      "Xác minh lỗ hổng và tấn công kiểm thử",
    ],
    corrects : [0, 1]
  },
];
